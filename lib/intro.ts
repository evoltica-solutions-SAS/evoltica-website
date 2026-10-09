/**
 * Intro de marca: cuándo se muestra.
 *
 * Se muestra si nunca se ha visto o si pasó más de INTRO_COOLDOWN_MS desde la
 * última vez (marca con timestamp en localStorage: sobrevive a refrescos,
 * pestañas nuevas y cierres del navegador). Nunca con prefers-reduced-motion.
 *
 * Solo en el sitio público (ver INTRO_EXCLUDED_PATH).
 * Desarrollo: `?intro=1` la fuerza y `window.resetIntro()` borra la marca.
 * Ninguno de los dos existe en producción.
 */
export const INTRO_COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 horas
export const INTRO_STORAGE_KEY = "evoltica-intro-at";

/**
 * Rutas sin intro (portal, admin y acceso, ADR-012): no la muestran ni consumen
 * el cooldown, así que la primera visita al sitio público la conserva.
 */
export const INTRO_EXCLUDED_PATH = /^\/(app|admin|login|registro|recuperar-password|restablecer-password)(\/|$)/;

/** Duración total de la intro en segundos (debe coincidir con la coreografía CSS). */
export const INTRO_DURATION_S = 1.6;

/**
 * Script inline que corre en <head> ANTES del primer pintado: decide la intro y
 * aplica el tema guardado (sin parpadeo). Marca `html[data-intro="play"|"seen"]`.
 */
export function buildHeadScript(isDevelopment: boolean): string {
  const devForce = isDevelopment
    ? `if(new URLSearchParams(location.search).get("intro")==="1"){play=true}` +
      `window.resetIntro=function(){try{localStorage.removeItem(K)}catch(e){}return "Intro reiniciada: recarga la página."};`
    : "";
  return (
    `(function(){var d=document.documentElement;` +
    `try{if(localStorage.getItem("evoltica-theme")==="light"){d.classList.add("light");d.classList.remove("dark")}}catch(e){}` +
    `var K=${JSON.stringify(INTRO_STORAGE_KEY)},C=${INTRO_COOLDOWN_MS},play=false;` +
    `try{var last=Number(localStorage.getItem(K)||0);play=!last||Date.now()-last>C;}catch(e){play=false}` +
    devForce +
    `if(${INTRO_EXCLUDED_PATH.toString()}.test(location.pathname)){play=false}` +
    `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches){play=false}}catch(e){}` +
    `if(play){d.dataset.intro="play";try{localStorage.setItem(K,String(Date.now()))}catch(e){}}else{d.dataset.intro="seen"}` +
    `})();`
  );
}

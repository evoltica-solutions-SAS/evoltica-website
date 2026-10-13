/**
 * Preguntas frecuentes — contenido heredado de la versión anterior (se
 * corrigieron las respuestas sobre costos, soporte y primer paso).
 *
 * TODO: INFORMACIÓN PENDIENTE DE EVOLTICA — validar con el negocio las
 * afirmaciones comerciales que quedan (plazos de proyecto, integraciones
 * citadas, medidas de seguridad, países atendidos). El 2026-10-10 se retiraron,
 * por no estar aprobados: rangos de precio, modelos de pago, planes de soporte
 * con plazos, garantía de 30 días y "consultoría gratuita".
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question:
      "¿Cuánto tiempo tarda en desarrollarse un proyecto de software empresarial?",
    answer:
      "El tiempo varía según la complejidad del proyecto. Un ERP básico puede estar listo en 8-12 semanas, mientras que soluciones más complejas con múltiples integraciones pueden tomar 16-24 semanas. Durante la fase de diagnóstico y análisis definimos un cronograma detallado y realista que respetamos durante toda la ejecución. Trabajamos con metodologías ágiles que permiten entregas parciales para que puedas ver avances desde las primeras semanas.",
  },
  {
    question: "¿Desarrollan software completamente a medida o usan plataformas existentes?",
    answer:
      "Hacemos ambas cosas, dependiendo de lo que sea mejor para tu negocio. Para ERP y CRM frecuentemente usamos Odoo como base y lo personalizamos profundamente, lo que reduce costos y tiempos. Para plataformas web, aplicaciones móviles o sistemas muy específicos, desarrollamos desde cero con Next.js, React Native, Python y Node.js. Siempre recomendamos la opción que entrega mayor valor al menor costo de propiedad total.",
  },
  {
    question: "¿Cuál es el costo aproximado de un proyecto de transformación digital?",
    answer:
      // Sin precios, rangos ni modelos de pago: no hay aprobación comercial
      // documentada (ADR-014, decisión 2026-10-10).
      "El valor depende del alcance, la complejidad y las tecnologías involucradas, por eso no publicamos precios. Se define en una propuesta personalizada, después de entender tu operación. Puedes solicitar una cotización o empezar por una reunión de descubrimiento.",
  },
  {
    question: "¿Qué sucede si el proyecto tiene cambios durante el desarrollo?",
    answer:
      "Entendemos que los negocios evolucionan y los requerimientos cambian. Manejamos cambios a través de un proceso de control de cambios (change management) claro: el cliente solicita el cambio, lo evaluamos en términos de impacto en tiempo y costo, y si se aprueba, lo incorporamos al plan. Trabajamos con sprints de 2 semanas que permiten ajustes periódicos sin afectar la calidad del entregable final.",
  },
  {
    question: "¿Ofrecen soporte y mantenimiento después de la implementación?",
    answer:
      // Sin planes, plazos ni garantías: no están aprobados como compromiso
      // comercial (decisión 2026-10-10). Solo el alcance declarado de la línea 04.
      "Sí. Con los Servicios Administrados acompañamos la operación después de la implementación: administración del ERP, mesa de ayuda, soporte TI por niveles y gestión de usuarios y permisos. El alcance y los tiempos de atención se acuerdan con cada empresa antes de empezar.",
  },
  {
    question: "¿Pueden integrar el nuevo sistema con los sistemas que ya tenemos?",
    answer:
      "Esta es una de nuestras fortalezas principales. Contamos con amplia experiencia integrando sistemas mediante APIs REST, webhooks, conectores nativos y middlewares. Hemos integrado ERPs con sistemas contables (Siigo, World Office, SAP), plataformas e-commerce (Shopify, WooCommerce), pasarelas de pago, sistemas de facturación electrónica DIAN y decenas de herramientas empresariales. Antes de cualquier propuesta, auditamos tu ecosistema tecnológico actual.",
  },
  {
    question:
      "¿Cómo garantizan la seguridad de los datos empresariales durante y después del desarrollo?",
    answer:
      "La seguridad es una prioridad no negociable. Implementamos: encriptación AES-256 en reposo y en tránsito (HTTPS/TLS 1.3), autenticación multifactor (MFA), control de acceso basado en roles (RBAC), auditorías de seguridad del código (SAST), backups automáticos cifrados, y cumplimiento con la Ley 1581 de Habeas Data de Colombia. Para sectores regulados (financiero, salud) aplicamos controles adicionales según el marco normativo correspondiente.",
  },
  {
    question:
      "¿Trabajan con empresas fuera de Colombia?",
    answer:
      "Sí, atendemos clientes en toda Latinoamérica. Nuestro modelo de trabajo es principalmente remoto con reuniones virtuales por videollamada, lo cual nos permite servir empresas en Colombia, Ecuador, Perú, Venezuela, Panamá y otros países de la región. Para proyectos que requieren presencia física, podemos coordinar visitas. Los contratos y pagos son en pesos colombianos o dólares según la preferencia del cliente.",
  },
  {
    question: "¿Qué tan difícil es para nuestro equipo adaptarse a la nueva tecnología?",
    answer:
      "El cambio tecnológico puede generar resistencia, por eso el proceso de capacitación y gestión del cambio es parte integral de nuestra metodología. Entregamos: talleres prácticos presenciales/virtuales, documentación en español con capturas de pantalla, videos tutoriales grabados, un período de soporte intensivo post-lanzamiento y acceso a materiales de referencia permanentes. Diseñamos las interfaces priorizando la usabilidad y la curva de aprendizaje mínima.",
  },
  {
    question:
      "¿Cómo empiezo? ¿Cuál es el primer paso para trabajar con EVOLTICA?",
    answer:
      "El proceso comienza con una reunión de descubrimiento de 60 minutos, sin compromiso, donde conversamos sobre tu empresa, tus desafíos actuales y tus objetivos de negocio. No necesitas tener todo claro de antemano, nosotros hacemos las preguntas correctas. A partir de esa sesión, en los siguientes 5 días hábiles preparamos una propuesta técnica y económica detallada sin costo ni compromiso. Puedes agendar directamente por WhatsApp o completando el formulario de contacto.",
  },
];

import {
  Search,
  FileText,
  Map,
  Code2,
  Rocket,
  GraduationCap,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export interface MethodologyStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  deliverable: string;
}

/** Metodología de ejecución de proyectos (después de aprobada la propuesta). */
export const METHODOLOGY: MethodologyStep[] = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analizamos en profundidad tu empresa, procesos actuales, brechas tecnológicas y oportunidades de mejora para entender tu situación real.",
    duration: "1-2 semanas",
    deliverable: "Informe de diagnóstico",
  },
  {
    number: "02",
    icon: FileText,
    title: "Análisis",
    description:
      "Definimos requerimientos técnicos y funcionales, arquitectura de la solución, integraciones necesarias y el alcance detallado del proyecto.",
    duration: "1-2 semanas",
    deliverable: "Documento de especificaciones",
  },
  {
    number: "03",
    icon: Map,
    title: "Planeación",
    description:
      "Estructuramos el plan de trabajo con hitos, entregables, presupuesto y cronograma ajustado a tus prioridades de negocio.",
    duration: "1 semana",
    deliverable: "Plan de proyecto y presupuesto",
  },
  {
    number: "04",
    icon: Code2,
    title: "Configuración y desarrollo",
    description:
      "Construimos la solución con entregas iterativas y validaciones continuas para asegurar que cumple tus expectativas.",
    duration: "4-16 semanas",
    deliverable: "Solución validada y probada",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Implementación",
    description:
      "Desplegamos la solución en producción con estrategia de migración de datos, pruebas de rendimiento y plan de contingencia.",
    duration: "1-2 semanas",
    deliverable: "Sistema en producción",
  },
  {
    number: "06",
    icon: GraduationCap,
    title: "Capacitación",
    description:
      "Formamos a tu equipo con talleres prácticos, documentación completa y material de referencia para una adopción exitosa.",
    duration: "1-2 semanas",
    deliverable: "Equipo capacitado",
  },
  {
    number: "07",
    icon: HeartHandshake,
    title: "Soporte",
    description:
      "Acompañamiento post-implementación con monitoreo proactivo, mantenimiento evolutivo y soporte especializado.",
    duration: "Continuo",
    deliverable: "SLA definido",
  },
];

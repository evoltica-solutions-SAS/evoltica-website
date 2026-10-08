interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Inserta datos estructurados schema.org; se escapa "<" para no cerrar el script. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

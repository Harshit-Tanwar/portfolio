/** Renders a JSON-LD structured-data script. */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Safe: data is built from our own constants, "<" is escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

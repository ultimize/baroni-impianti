import sanitizeHtml from "sanitize-html"

const ALLOWED_TAGS = [
  "p",
  "a",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "blockquote",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "img",
  "figure",
  "figcaption",
  "br",
  "hr",
  "code",
  "pre",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "span",
  "div",
  "iframe",
  "small",
  "sup",
  "sub",
]

const COMMON_ATTR = [
  "class",
  "id",
  "title",
  "lang",
  "dir",
]

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel", ...COMMON_ATTR],
      img: ["src", "alt", "width", "height", "loading", "srcset", "sizes", ...COMMON_ATTR],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
        ...COMMON_ATTR,
      ],
      "*": COMMON_ATTR,
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: attribs.target === "_blank" ? "noopener noreferrer" : attribs.rel ?? "",
        },
      }),
    },
  })
}

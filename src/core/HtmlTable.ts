type HTMLRow = string[]
export type HTMLTable = HTMLRow[]

const getTag = (pos: number, html: string, tag: string) => {
  const startTag = `<${tag}`
  const endTag = `</${tag}>`
  const start = html.indexOf(startTag, pos)
  const end1 = start >= 0 ? html.indexOf(endTag, start) : -1
  const end = end1 >= 0 ? end1 + endTag.length : end1
  return end > start ? { tag: html.substring(start, end), pos: end } : undefined
}

const getTags = (html: string, tag: string): string[] => {
  const g = (tags: string[], pos: number): string[] => {
    const r = getTag(pos, html, tag)
    return r ? g([...tags, r.tag], r.pos) : tags
  }

  return g([], 0)
}

export const removeTags = (html: string) => html.replace(/<[^>]*>/g, "")

export const getHTMLTableContents = (html: string): HTMLTable => {
  return getTags(html, "tr").map(trTag => getTags(trTag, "td").map(removeTags))
}

const buildTag = (tag: string, content: string) => `<${tag}>${content}</${tag}>`

export const buildHTMLTable = (table: HTMLTable) =>
  table.reduce((trs, tr) => trs + buildTag("tr", tr.reduce((tds, td) => tds + buildTag("td", td), "")), "")

type HTMLRow = string[]
export type HTMLTable = HTMLRow[]

type GetTagBlockResult = {
  pos: number
  tag: string
}

export const getTagBlock = (pos: number, html: string, tag: string): GetTagBlockResult | undefined => {
  const startTag = `<${tag}`
  const endTag = `</${tag}>`
  const startTagPos = html.indexOf(startTag, pos)

  const getEndPos = (startTagPos: number, endTagPos: number): number => {
    const nextStartTagPos = startTagPos >= 0 ? html.indexOf(startTag, startTagPos + 1) : -1
    const nextEndTagPos = endTagPos >= 0 ? html.indexOf(endTag, endTagPos + 1) : -1
    return nextStartTagPos >= 0 && nextEndTagPos >= 0 && nextStartTagPos < nextEndTagPos
      ? getEndPos(nextStartTagPos + 1, nextEndTagPos + 1)
      : nextEndTagPos
  }

  const endTagPosTemp = getEndPos(startTagPos, startTagPos)
  const endTagPos = endTagPosTemp >= 0 ? endTagPosTemp + endTag.length : -1

  return endTagPos > startTagPos ? { tag: html.substring(startTagPos, endTagPos), pos: endTagPos } : undefined
}

type GetTagBlocksResult = {
  pos: number
  tags: string[]
}

const getTags = (pos: number, tags: string[], html: string, tag: string): GetTagBlocksResult => {
  const result = getTagBlock(pos, html, tag)
  return result
    ? getTags(result.pos, [...tags, result.tag], html, tag)
    : {
        pos,
        tags,
      }
}

export const getTagBlocks = (tag: string) => (html: string): string[] => getTags(0, [], html, tag).tags

export const removeTags = (html: string) => html.replace(/<[^>]*>/g, "")

export const removeOuterTag = (tag: string) => (html: string) => {
  const startTag = `<${tag}`
  const startTagPos = html.indexOf(startTag)
  const startTagEndPos = startTagPos >= 0 ? html.indexOf(">", startTagPos) : -1
  const endTag = `</${tag}>`
  const endTagPos = html.lastIndexOf(endTag)
  return startTagEndPos >= 0 && endTagPos >= 0 ? html.substring(startTagEndPos + 1, endTagPos) : html
}

export const getHTMLTableContents = (html: string): HTMLTable => {
  return getTagBlocks("tr")(html).map(trTag => getTagBlocks("td")(trTag).map(removeTags))
}

const buildTag = (tag: string, content: string) => `<${tag}>${content}</${tag}>`

export const buildHTMLTable = (table: HTMLTable) =>
  table.reduce((trs, tr) => trs + buildTag("tr", tr.reduce((tds, td) => tds + buildTag("td", td), "")), "")

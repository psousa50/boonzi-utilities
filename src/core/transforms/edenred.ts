import { getTagBlocks, removeTags, buildHTMLTable, removeOuterTag, HTMLTable } from "../htmlParser"

export const extractTableFromDivs = (html: string) =>
  getTagBlocks("div")(html)
    .map(removeOuterTag("div"))
    .map(getTagBlocks("div"))
    .map(divs => divs.map(removeOuterTag("div")))
    .map(divs => divs.map(removeTags))

const transformTable = (table: HTMLTable) => table.map(r => r.map((c, i) => (i === 0 ? c.substr(0, 10) : c)))

export const processEdenred = (html: string) => buildHTMLTable(transformTable(extractTableFromDivs(html)))

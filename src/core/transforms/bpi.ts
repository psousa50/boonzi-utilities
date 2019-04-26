import { HTMLTable, getHTMLTableContents, buildHTMLTable } from "../htmlParser"

const invertSign = (value: string) => {
  const v = value.trim()
  return v.startsWith("-") ? v.substring(1) : `-${v.trim()}`
}

const transformTable = (table: HTMLTable) => table.map(r => r.map((c, i) => (i === 3 ? invertSign(c) : c)))

export const processCreditCardBPI = (html: string) => buildHTMLTable(transformTable(getHTMLTableContents(html)))

import { HTMLTable } from "./HtmlTable"

const invertSign = (value: string) => {
  const v = value.trim()
  return v.startsWith("-") ? v.substring(1) : `-${v.trim()}`
}

export const transformTableBPI = (table: HTMLTable) => table.map(r => r.map((c, i) => (i === 3 ? invertSign(c) : c)))

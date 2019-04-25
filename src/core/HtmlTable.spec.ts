import { getHTMLTableContents, removeTags, buildHTMLTable } from "./HtmlTable"

describe("removeTags", () => {
  it("removes tags from an html string", () => {
    expect(removeTags("<div>something</div>")).toBe("something")
  })
})

describe("getHTMLTableContents", () => {
  it("returns an HTMLTable from an html string", () => {
    const row1 = "<tr><td>r1c1</td><td>r1c2</td></tr>"
    const row2 = "<tr><td><a>r2c1</a></td><td>r2c2</td></tr>"
    const row3 = "<tr><td>r3c1</td></tr>"
    const html = `${row1}${row2}${row3}`

    const result = getHTMLTableContents(html)

    const expected = [["r1c1", "r1c2"], ["r2c1", "r2c2"], ["r3c1"]]

    expect(result).toEqual(expected)
  })

  it("returns empty array for empty string", () => {
    expect(getHTMLTableContents("")).toEqual([])
  })
})

describe("buildHTMLTable", () => {
  it("builds an html string from an HTMLTable", () => {
    const table = [["r1c1", "r1c2"], ["r2c1", "r2c2"], ["r3c1"]]

    const row1 = "<tr><td>r1c1</td><td>r1c2</td></tr>"
    const row2 = "<tr><td>r2c1</td><td>r2c2</td></tr>"
    const row3 = "<tr><td>r3c1</td></tr>"
    const expected = `${row1}${row2}${row3}`

    expect(buildHTMLTable(table)).toBe(expected)
  })
})

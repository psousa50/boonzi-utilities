import {
  getHTMLTableContents,
  removeTags,
  buildHTMLTable,
  getTagBlock,
  getTagBlocks,
  removeOuterTag,
} from "./htmlParser"

describe("removeTags", () => {
  it("removes tags from an html string", () => {
    expect(removeTags("<div>something</div>")).toBe("something")
  })
})

describe("removeOuterTag", () => {
  it("removes the outer tag of an html string", () => {
    const html = "<div><div></div><div></div></div>"
    expect(removeOuterTag("div")(html)).toBe("<div></div><div></div>")
  })
})

describe("getTagBlock", () => {
  it("returns a tag contents and the position after it", () => {
    const html = "<tag1><tag2 attr1='a'>something</tag2></tag1>"
    const expected = {
      pos: 38,
      tag: "<tag2 attr1='a'>something</tag2>",
    }
    expect(getTagBlock(0, html, "tag2")).toEqual(expected)
  })

  it("returns a tag contents and the position after it, recursively skipping similar tags", () => {
    const html = "<tag1><tag2 attr='a'><other><tag2 attr='b'>something</tag2></other></tag2></tag1>"
    const expected = {
      pos: 74,
      tag: "<tag2 attr='a'><other><tag2 attr='b'>something</tag2></other></tag2>",
    }
    expect(getTagBlock(0, html, "tag2")).toEqual(expected)
  })
})

describe("getTagBlocks", () => {
  it("skips similar inner blocks", () => {
    const r1 = "<div><div><div>r1c1</div><div>r1c2</div></div></div>"
    const r2 = "<div><div><div>r2c1</div><div>r2c2</div></div></div>"
    const html = `${r1}${r2}`

    expect(getTagBlocks("div")(html)).toEqual([r1, r2])
  })
})

describe("getHTMLTableContents", () => {
  it("returns an HTMLTable from an html string", () => {
    const row1 = "<tr><td>r1c1</td><td>r1c2</td></tr>"
    const row2 = "<tr><td><a>r2c1</a></td><td>r2c2</td></tr>"
    const row3 = "<tr><td>r3c1</td></tr>"
    const html = `${row1}${row2}${row3}`

    const expected = [["r1c1", "r1c2"], ["r2c1", "r2c2"], ["r3c1"]]

    expect(getHTMLTableContents(html)).toEqual(expected)
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

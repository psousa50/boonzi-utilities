import { processEdenred, extractTableFromDivs } from "./edenred"
import { buildHTMLTable } from "../htmlParser"

describe("extractTableFromDivs", () => {
  it("return contents of a three level divs", () => {
    const lines = [
      "<div>",
      "<div><div>r1c1</div></div>",
      "<div><div>r1c2</div></div>",
      "</div>",
      "<div>",
      "<div><div>r2c1</div></div>",
      "<div><div>r2c2</div></div>",
      "</div>",
      "<div>",
      "<div><div>r3c1</div></div>",
      "</div>",
    ]

    const html = lines.join()

    const expected = [["r1c1", "r1c2"], ["r2c1", "r2c2"], ["r3c1"]]

    expect(extractTableFromDivs(html)).toEqual(expected)
  })
})

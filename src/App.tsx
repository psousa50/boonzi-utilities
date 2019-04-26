import React, { ChangeEvent } from "react"
import "./App.css"
import { processCreditCardBPI } from "./core/transforms/bpi"

interface AppState {
  html: string
  result: string
}

class App extends React.PureComponent<{}, AppState> {
  state = { html: "", result: "" }

  public render() {
    return (
      <div className={"rowC"}>
        <div>
          <textarea
            style={{ width: "50%" }}
            autoFocus
            onPaste={this.onPaste}
            onChange={this.onChange}
            value={this.state.html}
          />
        </div>
        <div dangerouslySetInnerHTML={this.buildInnerHTMLTable()} />
      </div>
    )
  }

  private buildInnerHTMLTable = () => ({
    __html: `<table>${this.state.result}</table>`,
  })

  private onPaste = (event: any) => {
    this.updateResult(event.clipboardData.getData("text/html"))
  }

  private onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.updateResult(event.target.value)
  }

  private updateResult = (html: string) => {
    const result = processCreditCardBPI(html)

    if (result) {
      navigator.clipboard.writeText(result)
    }

    this.setState(state => ({ ...state, result, html }))
  }
}

export default App

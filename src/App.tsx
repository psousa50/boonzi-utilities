import React, { ChangeEvent } from "react"
import "./App.css"
import { processCreditCardBPI } from "./core/transforms/bpi"
import { processEdenred } from "./core/transforms/edenred"
const logoBPI = require("./images/logo-bpi.png")
const logoEdenred = require("./images/logo-edenred.png")

interface AppState {
  html: string
  result: string
}

class App extends React.PureComponent<{}, AppState> {
  state = { html: "", result: "" }

  public render() {
    return (
      <div className={"col"}>
        <div>
          <textarea
            style={{ width: "50%" }}
            autoFocus
            onPaste={this.onPaste}
            onChange={this.onChange}
            value={this.state.html}
            onClick={this.clearInput}
            placeholder={"paste table here..."}
          />
        </div>
        <div className={"row"}>
          <button onClick={this.processBPI}>Copy</button>
          <img width={100} src={logoBPI} alt="BPI" />
        </div>
        <div className={"row"}>
          <button onClick={this.processEdenred}>Copy</button>
          <img width={100} src={logoEdenred} alt="BPI" />
        </div>
        <div dangerouslySetInnerHTML={this.buildInnerHTMLTable()} />
      </div>
    )
  }

  private clearInput = () => {
    this.updateInput("")
  }

  private buildInnerHTMLTable = () => ({
    __html: `<table>${this.state.result}</table>`,
  })

  private onPaste = (event: any) => {
    this.updateInput(event.clipboardData.getData("text/html"))
  }

  private onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.updateInput(event.target.value)
  }

  private updateInput = (html: string) => {
    this.setState(state => ({ ...state, html }))
  }

  private processBPI = () => {
    const html = this.state.html
    const result = processCreditCardBPI(html)
    this.setState(state => ({ ...state, result }))

    if (result) {
      navigator.clipboard.writeText(result)
    }
  }

  private processEdenred = () => {
    const html = this.state.html
    const result = processEdenred(html)
    this.setState(state => ({ ...state, result }))

    if (result) {
      navigator.clipboard.writeText(result)
    }
  }
}

export default App

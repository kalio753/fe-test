import { Collapse, Collapsex } from "antd"
import "./App.css"
import data from "./data/data"

const regex = /\[(.+?)(?:\((.*?)\))?\]\((.*?)\)/
const FIXED_DOMAIN = "https://igx.biz"

data.reports.forEach((section) => {
    section.lines.sort((a, b) => {
        const matchA = regex.exec(a)
        const matchB = regex.exec(b)
        const valueA = matchA && matchA[3] ? matchA[3].replace(/^\/en/, "") : ""
        const valueB = matchB && matchB[3] ? matchB[3].replace(/^\/en/, "") : ""
        return valueA.localeCompare(valueB)
    })
})

const reports = data.reports

function App() {
    const items = reports.map((rp, index) => {
        return {
            key: index + 1,
            label: rp.section,
            children: (
                <>
                    <ol>
                        {rp.lines.map((line) => {
                            let title
                            let code
                            let link
                            const matches = line.match(regex)

                            if (matches) {
                                title = matches[1]
                                code = matches[2] || ""
                                link = FIXED_DOMAIN + matches[3]

                                // console.log("Title:", title)
                                // console.log("Code:", code)
                                // console.log("Link:", link)
                            }

                            return (
                                <li>
                                    <a href={link}>{title ? title : null}</a>{" "}
                                    {code ? "(" + code + ")" : null}
                                </li>
                            )
                        })}
                    </ol>
                </>
            ),
        }
    })

    return (
        <div className="App">
            <Collapse items={items} accordion />
        </div>
    )
}

export default App

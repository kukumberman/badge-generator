const fs = require("fs")
const path = require("path")

function main() {
  const filePath = path.resolve("input.json")
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath))
    const { style, badges } = data
    const generated = badges.map(badge => {
      const { title, logo, color, logoColor } = badge
      const t = encodeURIComponent(title)
      const c = encodeURIComponent(color)
      const l = encodeURIComponent(logo)
      let result = `https://img.shields.io/badge/${t}-${c}?style=${style}&logo=${l}&logoColor=${logoColor}`
      result = `![](${result})`
      if (badge.clickable) {
        result = `[${result}](${badge.clickable})`
      }
      return result
    })
    const plainText = generated.join("\n\n")
    const saveFile = path.resolve(`output-${Date.now()}.txt`)
    fs.writeFileSync(saveFile, plainText)
  }
}

main()
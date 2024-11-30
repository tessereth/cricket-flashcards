const fs = require("fs")
const yaml = require("js-yaml")

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const ymlDoc = yaml.load(fs.readFileSync("./data/decks.yml", "utf-8"))
  ymlDoc.forEach(deck => {
    createPage({
      path: deck.slug,
      component: require.resolve("./src/templates/deck.tsx"),
      context: {
        deck: deck
      },
    })
  })
}
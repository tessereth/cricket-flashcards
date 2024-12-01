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
        slug: deck.slug
      },
    })
    createPage({
      path: `/${deck.slug}/name`,
      component: require.resolve("./src/templates/guess-name.tsx"),
      context: {
        slug: deck.slug,
        guess: "name",
      },
    })
    createPage({
      path: `/${deck.slug}/position`,
      component: require.resolve("./src/templates/guess-position.tsx"),
      context: {
        slug: deck.slug,
        guess: "position",
      },
    })
  })
}
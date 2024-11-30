export type DeckPosition = {
  name: string
}

export type Deck = {
  name: string
  slug: string
  positions: DeckPosition[]
};
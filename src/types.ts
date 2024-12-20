export type DeckPosition = {
  name: string
  allNames: string[]
  x: number
  y: number
}

export type Deck = {
  name: string
  slug: string
  description: string
  positions: DeckPosition[]
}

export enum GuessDirection {
  Name = "name",
  Position = "position"
}

export type Position = {
  x: number,
  y: number
}
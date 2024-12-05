// @ts-ignore
import Positions from "../data/positions.yml"
// @ts-ignore
import Decks from "../data/decks.yml"
import { Deck, DeckPosition } from "./types"

export function allDecks(): Deck[] {
  return Decks.map(addLocationsToDeck)
}

export function getDeck(slug: string): Deck {
  return addLocationsToDeck(Decks.find((d: Deck) => d.slug === slug))
}

export function addLocationsToDeck(deck: Deck) : Deck {
  return {
    ...deck,
    positions: deck.positions.map(addLocationToPosition)
  }
}

function addLocationToPosition(position: { name: string }) : DeckPosition {
  const data = Positions.find((p: DeckPosition) => p.name === position.name)
  if (!data) {
    throw new Error(`Unknown position: ${position.name}`)
  }
  return {
    ...position,
    x: data.x,
    y: data.y
  }
}
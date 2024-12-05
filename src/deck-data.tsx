// @ts-ignore
import Positions from "../data/positions.yml"
// @ts-ignore
import Decks from "../data/decks.yml"
import { Deck, DeckPosition } from "./types"

export function allDecks(): Deck[] {
  return Decks.map(addDataToDeck)
}

export function getDeck(slug: string): Deck {
  return addDataToDeck(Decks.find((d: Deck) => d.slug === slug))
}

function addDataToDeck(deck: Deck) : Deck {
  return {
    ...deck,
    positions: deck.positions.map(addDataToPosition)
  }
}

function addDataToPosition(position: { name: string }) : DeckPosition {
  const data = Positions.find((p: DeckPosition) => p.name === position.name)
  if (!data) {
    throw new Error(`Unknown position: ${position.name}`)
  }
  let allNames = [position.name]
  if (data['alternate_names']) {
    allNames = allNames.concat(data['alternate_names'])
  }
  return {
    ...position,
    x: data.x,
    y: data.y,
    allNames
  }
}
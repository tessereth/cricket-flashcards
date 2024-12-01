import React, { FormEvent, useState } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Deck, GuessDirection, Position } from '../types'
import TitleBar from '../components/title-bar'
import FieldPosition from '../components/field-position'

import { getDeck } from '../deck-data'

enum Result {
  Unknown,
  Success,
  Fail,
}

export default function GuessPosition({ pageContext } : { pageContext : { slug: string, guess: GuessDirection } }) {
  const { slug, guess } = pageContext
  const deck = getDeck(slug)

  const [positionNumber, setPositionNumber] = useState(0)
  const position = deck.positions[positionNumber]
  console.log(position)

  const [positionGuess, setPositionGuess] = useState<Position>({x: null, y: null})
  const [result, setResult] = useState(Result.Unknown)

  const checkAnswer = () => {
    console.log("Checking answer", positionGuess, position)
    // TODO
    if (true) {
      setResult(Result.Success)
    } else {
      setResult(Result.Fail)
    }
  }

  const onReveal = () => {
    setPositionGuess({x: position.x, y: position.y})
    setResult(Result.Success)
  }

  const onNext = () => {
    setPositionNumber(positionNumber + 1)
    setPositionGuess({x: null, y: null})
    setResult(Result.Unknown)
  }

  return (
    <Layout>
      <TitleBar>
        <h1 className="title">{deck.name}</h1>
      </TitleBar>
      <section className="section">
        <div className="container">
          <div className='content'>
            <p>Click on the field at the given fielding position, assuming a right handed batter and the bowler coming from below.</p>
          </div>
          <div className="columns">
            <div className="column">
              <div className="card" style={{ maxWidth: "40rem" }}>
                <div className="card-header">
                  <div className="card-header-title has-text-centered is-block">
                    {position.name}
                  </div>
                </div>
                <div className="card-content">
                  <FieldPosition x={positionGuess.x} y={positionGuess.y} setPosition={setPositionGuess} />
                </div>
              </div>
            </div>
            <div className='column'>
              <div className="block">
                <button className="button is-primary" onClick={checkAnswer}>Check</button>
              </div>
              {result === Result.Success && (
                <div className='notification is-light is-success'>
                  <div className='level'>
                    <div className='level-left'>
                      Correct!
                    </div>
                    <div className='level-right'>
                      <button className='button is-primary' onClick={onNext}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {result === Result.Fail && (
                <div className='notification is-light is-danger'>
                  <div className='level'>
                    <div className='level-left'>
                      Incorrect, try again.
                    </div>
                    <div className='level-right'>
                      <button className='button is-primary' onClick={onReveal}>
                        Reveal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

import React, { FormEvent, useState } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Deck, GuessDirection } from '../types'
import TitleBar from '../components/title-bar'
import FieldPosition from '../components/field-position'

import { getDeck } from '../deck-data'

enum Result {
  Unknown,
  Success,
  Fail,
}

export default function GuessName({ pageContext } : { pageContext : { slug: string, guess: GuessDirection } }) {
  const { slug, guess } = pageContext
  const deck = getDeck(slug)

  const [positionNumber, setPositionNumber] = useState(0)
  const position = deck.positions[positionNumber]
  console.log(position)

  const [positionName, setPositionName] = useState('')
  const [result, setResult] = useState(Result.Unknown)

  const checkAnswer = () => {
    console.log("Checking answer", positionName, position.name)
    // TODO: handle variations
    if (positionName === position.name) {
      setResult(Result.Success)
    } else {
      setResult(Result.Fail)
    }
  }

  const onSubmit = (e : FormEvent) => {
    e.preventDefault()
    checkAnswer()
  }

  const onReveal = () => {
    setPositionName(position.name)
    setResult(Result.Success)
  }

  const onNext = () => {
    setPositionNumber(positionNumber + 1)
    setPositionName('')
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
            <p>Name the marked fielding position, assuming a right handed batter and the bowler coming from below.</p>
          </div>
          <div className="columns">
            <div className='column'>
              <div className='box'>
                <FieldPosition x={position.x} y={position.y} />
              </div>
            </div>
            <div className='column'>
              <form className='block' onSubmit={onSubmit}>
                <div className='field'>
                  <label className='label'>
                    Position name
                  </label>
                  <div className='control'>
                    <input className='input' value={positionName} onChange={(e) => setPositionName(e.target.value)} />
                  </div>
                </div>
                <div className='field'>
                  <div className='control'>
                    <button className='button is-primary'>Check</button>
                  </div>
                </div>
              </form>
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

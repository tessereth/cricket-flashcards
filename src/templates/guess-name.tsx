import React, { FormEvent, useState } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Deck, GuessDirection } from '../types'
import TitleBar from '../components/title-bar'
import FieldPosition from '../components/field-position'

import { getDeck } from '../deck-data'
import classNames from 'classnames'

enum Result {
  Unknown,
  Success,
  Fail,
}

function cleanName(name : string) {
  return name.toLowerCase().replaceAll('-', ' ')
}

export default function GuessName({ pageContext } : { pageContext : { slug: string, guess: GuessDirection } }) {
  const { slug, guess } = pageContext
  const deck = getDeck(slug)

  const [positionNumber, setPositionNumber] = useState(0)
  const position = deck.positions[positionNumber]

  const [positionName, setPositionName] = useState('')
  const [result, setResult] = useState(Result.Unknown)

  const checkAnswer = () => {
    console.log("Checking answer", positionName, position.allNames)
    if (position.allNames.map(cleanName).includes(cleanName(positionName))) {
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
                    <input
                      className={classNames('input', { 'is-success': result === Result.Success, 'is-danger': result === Result.Fail })}
                      value={positionName}
                      onChange={(e) => setPositionName(e.target.value)}
                    />
                  </div>
                  {result === Result.Unknown && (
                    <p className='help'>Guess the position name</p>
                  )}
                  {result === Result.Success && (
                    <p className='help is-success'>Correct!</p>
                  )}
                  {result === Result.Fail && (
                    <p className='help is-danger'>Incorrect, try again.</p>
                  )}
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-primary" disabled={result === Result.Success}>Check</button>
                  </div>
                  <div className="control">
                    <button className="button is-primary" disabled={result === Result.Success} onClick={onReveal}>Reveal</button>
                  </div>
                  <div className="control">
                    <button className="button is-primary" disabled={result !== Result.Success} onClick={onNext}>Next</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

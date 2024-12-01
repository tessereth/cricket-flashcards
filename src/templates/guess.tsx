import React, { FormEvent, useState } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Deck, GuessDirection } from '../types'
import TitleBar from '../components/title-bar'
import FieldPosition from '../components/field-position'

enum Result {
  Unknown,
  Success,
  Fail,
}

export default function Guess({ pageContext } : { pageContext : { deck: Deck, guess: GuessDirection } }) {
  const { deck, guess } = pageContext

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
          <div className="columns">
            <div className='column'>
              <FieldPosition />
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

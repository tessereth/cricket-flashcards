import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Deck as DeckType } from '../types'
import TitleBar from '../components/title-bar'

const Deck = ({ pageContext } : { pageContext : { deck: DeckType } }) => {
  const { deck } = pageContext
  return (
    <Layout>
      <TitleBar>
        <div className="level">
          <div className="level-left">
            <h1 className="title">{deck.name}</h1>
          </div>
          <div className="level-right">
            <div className="buttons">
              <Link
                to={deck.slug + '/sign'}
                className="button is-primary is-outlined is-inverted"
              >
                Guess sign
              </Link>
              <Link
                to={deck.slug + '/word'}
                className="button is-primary is-outlined is-inverted"
              >
                Guess word
              </Link>
            </div>
          </div>
        </div>
      </TitleBar>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {deck.positions.map(position => (
              <div key={position.name} className="column is-half is-one-third-fullhd">
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-title has-text-centered is-block">
                      <strong className="is-size-4">
                        {position.name}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Deck

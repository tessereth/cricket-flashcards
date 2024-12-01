import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import TitleBar from '../components/title-bar'
import FieldPosition from '../components/field-position'
import { getDeck } from '../deck-data'

const Deck = ({ pageContext } : { pageContext : { slug: string } }) => {
  const { slug } = pageContext
  const deck = getDeck(slug)
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
                to="name"
                className="button is-primary is-outlined is-inverted"
              >
                Guess name
              </Link>
              <Link
                to="position"
                className="button is-primary is-outlined is-inverted"
              >
                Guess position
              </Link>
            </div>
          </div>
        </div>
      </TitleBar>
      <section className="section">
        <div className="container">
          <div className="grid is-col-min-12">
            {deck.positions.map(position => (
              <div key={position.name}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-title has-text-centered is-block">
                      {position.name}
                    </div>
                  </div>
                  <div className="card-content">
                    <FieldPosition x={position.x} y={position.y} />
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

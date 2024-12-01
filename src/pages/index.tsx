import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import Layout from "../components/layout"
import TitleBar from "../components/title-bar"

import { allDecks } from "../deck-data"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <TitleBar>
        <h1 className='title'>Cricket Flashcards</h1>
      </TitleBar>
      <div className="section">
        <div className="container">
          <div className="fixed-grid">
            <div className="grid">
              {allDecks().map(deck => (
                <div className="cell" key={deck.slug}>
                  <div className="card">
                    <div className="card-header">
                      <p className="card-header-title">{deck.name}</p>
                    </div>
                    <div className="card-content">
                      <div className="content">
                        {deck.description}
                      </div>
                    </div>
                    <div className="card-footer">
                      <Link
                        to={`/${deck.slug}/name`}
                        className="card-footer-item"
                      >
                        Guess name
                      </Link>
                      <Link
                        to={`/${deck.slug}/position`}
                        className="card-footer-item"
                      >
                        Guess position
                      </Link>
                      <Link
                        to={`/${deck.slug}`}
                        className="card-footer-item"
                      >
                        Show all
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

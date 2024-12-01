import React, { useState } from 'react'
import { Link } from 'gatsby'

import { allDecks } from '../deck-data'

export default function PrimaryNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Cricket flashcards
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            role="button"
            className={`navbar-burger ${
              menuOpen ? 'is-active' : ''
            }`}
            aria-label="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          className={`navbar-menu ${
            menuOpen ? 'is-active' : ''
          }`}
        >
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">Decks</div>
              <div className="navbar-dropdown">
                {allDecks().map(deck => (
                  <Link
                    key={deck.slug}
                    to={`/${deck.slug}`}
                    className="navbar-item"
                  >
                    {deck.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

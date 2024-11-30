import React from 'react'

const TitleBar = ({ children } : { children: React.ReactNode }) => {
  return (
    <section className="hero is-primary is-small">
      <div className="hero-body">
        <div className="container">{children}</div>
      </div>
    </section>
  )
}

export default TitleBar
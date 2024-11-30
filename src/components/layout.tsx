import * as React from 'react'
import { Link } from 'gatsby'
import PrimaryNav from './primary-nav'
import "../css/application.scss"

const Layout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div>
      <PrimaryNav />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
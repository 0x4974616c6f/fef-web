import React from 'react'
import Navigation from '../menuNavigation'
import s from "./styles.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

function Layout({children}: Props) {
  return (
    <div className={s.layout}>
      <Navigation />
      {children}
    </div>
  )
}

export default Layout
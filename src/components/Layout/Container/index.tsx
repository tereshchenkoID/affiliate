import React from 'react'

import style from './index.module.scss'

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.block}>
      {children}
    </div>
  )
}

export default Container

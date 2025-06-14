import React from 'react'
import styles from './Loader.module.scss'

type LoaderProps = {
  fullScreen?: boolean
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
  const loaderClass = `${styles.loader} ${fullScreen ? styles['loader--fullscreen'] : ''}`

  return (
    <div className={loaderClass}>
      <div className={styles.spinner} />
    </div>
  )
}

Loader.displayName = 'Loader'
export { Loader }

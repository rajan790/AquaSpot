import React from 'react'
import styles from './Bubble.module.css'
const Bubble = ({move,size,top,left}) => {
  return (
        <div style={{width:size,height:size,top:top,left:left}} className={`${styles.bubble} ${styles[move]}`}></div>
  )
}

export default Bubble
import React from 'react'
import monkey from '../assets/monkey.svg'

export const Loading = () => {
  return (
    <div>
        <h1>Loading....</h1>
        <br />
        <img src={monkey} alt='Should be a monkey here'/>
    </div>
  )
}

import React from 'react'
import PropTypes from 'prop-types'

const Background = ({ children }) => {
  return (
    <div className='background-container'>
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.node.isRequired
}

export default Background

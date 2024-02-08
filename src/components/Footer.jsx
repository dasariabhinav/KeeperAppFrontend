import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer>
        <p> Powered by Abhinav Dasari. Copyright © {year}. </p>
    </footer>
  )
}

export default Footer
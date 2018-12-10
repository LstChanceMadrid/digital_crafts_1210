
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './header/Nav'

class Header extends Component {
  render() {
    return (
      <div>
        <h1>Header</h1>
        <Nav />
      </div>
    )
  }
}


export default connect()(Header)
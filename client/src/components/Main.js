
import React, { Component } from 'react'


export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user : {}
    }
  }
  render() {
    return (
      <div>
          <h1>Main</h1>
          {this.props.children}
      </div>
    )
  }
}

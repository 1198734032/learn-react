import React, { Component } from 'react'
// import store from './redux/store'
// import Counter from './components/Count/index'
import Counter from './container/count/index'

export default class App extends Component {
  render() {
    return (
      <div>
        <Counter />
      </div>
    )
  }
}

import React from 'react'
import { Component } from 'react'
import axios from 'axios';
import PubSub from 'pubsub-js'  //发布订阅（兄弟组件间的传值）
import { Link, BrowserRouter, Route } from 'react-router-dom'

import Item1 from './components/item/item'
import Item2 from './components/item2/item2'

class App extends Component {

  componentDidMount() {
    PubSub.subscribe("msg", function (msg, data) {
      console.log("=====", msg, data)
    })
  }

  sendRequst = () => {
    axios.get("/api1/react")
      .then(response => { console.log("yes", response.data) },
        fail => { console.log("no", fail) })
  }

  show = () => {
    console.log(this);
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.sendRequst}>点我发请求</button>
        <button onClick={this.show}>我是App</button>
        <Item show={this.show} /> */}
        <BrowserRouter>
          <Link to="/item1">ITEM1</Link>
          <Link to="/item2">ITEM2</Link>
          <Route path="/item1" component={Item1} />
          <Route path="/item1" component={Item2} />
        </BrowserRouter >
      </div >
    );
  }
}

export default App;

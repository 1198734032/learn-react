import React, { Component } from 'react'
// import store from '../../redux/store'
import {createIncrementAction,createDecrementAction} from '../../redux/count_action'


//引入connect连接UI组件与redux
//使用容器组件则不用监测store.subscribe..
import { connect } from 'react-redux'

class Count extends Component {
    increment = () =>{
        const {value} = this.selectNumber;
        this.props.increase(value)
        // store.dispatch(createIncrementAction(value))
    }

    decrement = () =>{
        const {value} = this.selectNumber;
        this.props.decrease(value)
        // store.dispatch(createDecrementAction(value))
    }

    // componentDidMount(){
    //     store.subscribe(()=>{
    //         this.setState({})
    //     })
    // }

    render() {
        return (
            <div>
                <h1>当前组件求和{this.props.n}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button>奇加</button>
                <button>异步加</button>
            </div>
        )
    }
}

//a函数返回对象中的Key作为传递给UI组建的porps key，value作为对应的值
//state为store里的值
// function mapStateToProps(state) {
//     return { n: state }
// }

//b函数返回的对象中的key最为传递给UI组建的props key,value作为对应的值
// function mapDispatchToProps(dispach) {
//     return {
//         increase: value => dispach(createIncrementAction(value)),
//         decrease: value => dispach(createDecrementAction(value))

//     }
// }
//使用connect()()创建并暴露一个Count的容器组件

export default connect(
    state => ({ n: state }),
    // mapDispatchToProps
    {
        increase:createIncrementAction,
        decrease:createDecrementAction,
    }
)(Count)
    


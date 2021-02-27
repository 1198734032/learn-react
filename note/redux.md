### 基础

![image-20210126160804366](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210126160804366.png)

+ store是唯一的
+ 只有store能改变自己内容
+ reducer必须是纯函数(给定固定的输入，就会有固定输出，且不会有副作用)(不涉及ajax,异步操作，时间操作等)



#### 有关store的API

+ createStore
+ store.dispatch
+ store.getState
+ store.subscribe

```react
/*
	+components
	 |-com1.jsx
	+redux
	 |-store.js
	 |-reducer.js
	 |-action.js
	 |-constant.js
*/
//store.js
import {createStore} from 'redux'
import Reducer from './reducer'

export default createStore(Reducer)
=========================================
//constant.js
export const INCREMENT = 'increase'
export const DECREMENT = 'decrease'
=================================================
//reducer.js
import{INCREMENT,DECREMENT} from './constant'
const initState ={
    a:1,
    b:2
};
export default (preState = initState, action) => {
    const { type, data } = action
    switch (type) {
        case INCREMENT:
           //xxx
            break;
        default:break
    }
    return preState
}
=================================================
//action.js
import{INCREMENT,DECREMENT} from './constant'
export const createIncrementAction = (value) => ({type:INCREMENT,data:value})
export const createDecrementAction = (value) => ({type:DECREMENT,data:value})
=================================================
//com1.jsx
import store from '../../redux/store'
//获取值
store.getState()
//改变某个值
store.dispatch({type:xxx,data:xxx})
//监听变化后改变
store.subscribe(()=>{
    this.setState({})
})
```



### redux-thunk

+ 异步action的中间件

```react
//npm i redux-thunk
//store.js
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'

export default createStore(Reducer,applyMiddleware(thunk))

//action.js
import{INCREMENT,DECREMENT} from './constant'
//同步
export const createIncrementAction = (value) => ({type:INCREMENT,data:value})
//异步
export const createIncrementAsyncAction = (value,time)=>{
    return (dispatch)=>{
        setTimeOut(()=>{
            dispatch(createIncrementAction(value))
        },time)
    }
}
//xx.jsx
//使用
store.dispatch(createIncrementAsyncAction(xx,500))
```



![image-20210127203951494](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210127203951494.png)

![image-20210127204538330](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210127204538330.png)

### redux-saga

![image-20210128161714381](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210128161714381.png)

![image-20210128162745451](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210128162745451.png)

### react-redux

![image-20210225182246394](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210225182246394.png)

```react
import React, { Component } from 'react'
import {createIncrementAction,createDecrementAction} from '../../redux/count_action'

//引入connect连接UI组件与redux
import { connect } from 'react-redux'

class Count extends Component {
    increment = () =>{
        const {value} = this.selectNumber;
        this.props.increase(value)
    }

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
            </div>
        )
    }
}

//mapStateToProps函数返回对象中的Key作为传递给UI组建的porps key，value作为对应的值
//state为store里的值
// function mapStateToProps(state) {
//     return { n: state }
// }

//mapDispatchToProps函数返回的对象中的key最为传递给UI组建的props key,value作为对应的值
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
    })(Count)
====================================================
//index.js
//使用react-redux时可以不用每个容器组件挨个传store
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


```

#### react-redux优化

+ 容器组件和UI组件整合成一个文件
+ 无需自己给容器组件传递store，给`<App/>` 报错一个`<Provider store={store}>` 即可
+ 使用react-redux后不用自己检测redux中状态的改变，容器组件可自动完成这个工作
+ `mapDispatchToProps` 也可以写成一个对象

#### 多个reducer

```react
/*
	+ reducers
	  |-count.js
	  |-people.js
*/
//store.js
//引入创建store,合并reducer,使用thunk中间件
import {createStore,combineReducers,applyMiddleware} from 'react-redux'
//支持异步
import thunk from 'redux-thunk'
//引入reducer
import countReducer from './reducers/count'
import peopleReducer from './reducers/people'

const allReducer = combineReducers({
    count:countReducer,
    people:peopleReducer
})

export default createStore(allReducer,applyMiddleware(thunk))

//容器组件中获取
connect(
    state=>{count:state.count,people:state.people},
    {}
)(Count)


```

### 纯函数

+ 一类特别的函数，只要是有同样的输入，必定会得到同样的输出
+ 遵守一下约束
  + 不得改写参数数据
  + 不会产生任何副作用，例如发送网络请求，输入输出设备
  + 不能调用`Date.now()/Math.random()` 等不纯的方法

**redux中的reducer必须为纯函数**

### 注意

```react
//reducer
export default (preState = initState, action) => {
    const { type, data } = action
    switch (type) {
        case INCREMENT:
            preState.push(data) ; //见下方解释
            return preState;
            break;
        default:break
    }
    return preState
}
/*此方法有时并不会返回更新后值，因为当preState为引用类型时，引用地址并没有发生改变，会被redux认为值没有发生变化，此外，reducer中的函数应该为纯函数*/
```

### redux-devtools

```react
//npm i redux-devtools-extension

//store.js
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
//或者
export default createStore(allReducer,composeWithDevTools())
```


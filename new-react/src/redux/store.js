// 该文件用于暴露一个store对象，整个应用只有一个store对象
import {createStore} from 'redux'
import countReducer from './count_reducer'
//加载redux-devtools拓展程序
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(countReducer,composeWithDevTools())
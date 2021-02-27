import{INCREMENT,DECREMENT} from './constant'
export const createIncrementAction = (value) => ({type:INCREMENT,data:value})
export const createDecrementAction = (value) => ({type:DECREMENT,data:value})
import{INCREMENT,DECREMENT} from './constant'

const initState = 0;
export default (preState = initState, action) => {
    let { type, data } = action
    data = data*1
    switch (type) {
        case INCREMENT:
            preState += data;
            break;
        case DECREMENT:
            preState -= data;
            break;
        default:break
    }
    return preState
}
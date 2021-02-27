//引入 Count 的 UI组件
import CountUI from '../../components/Count/index'
import { createIncrementAction, createDecrementAction } from '../../redux/count_action'


//引入connect连接UI组件与redux
//使用容器组件则不用监测store.subscribe..
import { connect } from 'react-redux'

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
)(CountUI)
    
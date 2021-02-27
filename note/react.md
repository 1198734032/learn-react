# REACT

（函数式编程）（all in js）

SPA （single page application)

### 创建

##### 旧

``` npm install create-react-app```  安装脚手架工具(已全局安装)

```create-react-app xxx``` 创建react项目

##### 新

We no longer support global installation of Create React App.

Please remove any global installs with one of the following commands:

- npm uninstall -g create-react-app

`npx create-react-app xxx`



#### 启动项目

``` npm start``` 默认端口3000

#### 文件简介

+ READEME.md 项目简介
+ src/index.js 整个项目的入口文件
+ reportWebVitals 分析性能  [名词解释](https://blog.csdn.net/c_kite/article/details/104237256)



### 基础知识

#### react特点

+ 可以与其他框架并存 `JQuery`等
+ 组件化
+ 单向数据流（子组件不允许直接修改父组件的值，`this.props.xxx = xxx` 是错误的，需通过调用父组件的函数来修改其值）
+ 视图层框架
+ 函数式编程  (更容易实现前端自动化测试)

#### REACT组件

```react
import React from 'react'
class App extends React.Component{
    del=()=>{
        //卸载组件
        ReactDom.unmountComponentAtNode("document.getElementById('xx')")
    }
	render(){
		return (
			<div onClcik={this.del}>123</div>
		);
	}
}
export default App
```

#### ReactDOM

用于把某个组件挂载到页面的某个节点下（public/index.html）

#### JSX

+ `javascript xml` 

+ `xml` 早期用于数据传播

  ```xml
  <student>
  	<name>zs</name>
      <age>19</age>
  </student>
  ```

  

+ render函数里的标签其实是JSX语法
+ 如果是自定义组件，以大写字母开头

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />  <!--把模块当标签使用 即为JSX语法，需要引入React包-->
  </React.StrictMode>,
  document.getElementById('root')
);
```

#### return 里的内容

+ 必须被一个大的元素包裹

+ 可以用``` Fragment```标签作为占位符，页面中不会出现该标签

  ```react
  import { Fragment } from "react";
  ```

#### 注释

```react
{ 
    // xxxxx
}
{/* xxxxx */}
```

#### this指向问题

```js
class Person{
    speak(){
        console.log(this)
	}
}

let p1 = new Person();
p1.speak();  //Person{}   此时this指向实例p1

let s = p1.speak;
s();  // undefined   
//把p1.speak赋值给s，此时s相当于speak函数
//而s()相当于直接调用函数，因开启严格模式，this指向undefined

/*
	1、类里的函数默认开启严格模式 ‘use strict'
	2、类里的this指向当前实例,类里得方法供实例调取
*/
```

#### 精简写法

```react
//类里可以直接写赋值语句，将被添加到实例得属性上
class Person extends React.Component{
    state = {};
	changeValue = () =>{};
	render(){return }
}
```

#### 函数式组件

+ 旧版只能有props，无states、ref

#### 组件间的传值

##### 父子组件的传值

+ 父组件向子组件传值----通过属性的方式

  ```react
  import App from './App'
  ...
  	let msg = { 
      	index:xxx,
          itemName:xxx
      }
  	return(
      	<App index={index} itemName={item}/>
          <App {...msg}/>  //此写法仅用于标签间属性得传递
      )
  
  
  //子组件接收
  ...
  getIndex(){
      const {index,itemName} = this.props //利用解构赋值
      const index = this.props.index  //常用方式
  }
  ```

+ 子组件向父组件传值----通过调用父组件方法

  ```react
  import App from './App'
  ...
  	return(
      	<App handleClick={this.handleClick.bind(this)}/>
      )
  
  //子组件调用父组件方法
  ...
  render(){
         return(
              <div onClick={this.handleItemClick}></div> 
              <div onClick={this.props.handleClick}></div> 
              <div onClick={(index)=>{this.props.handleClick(index)}}></div> 
          )
  }
  handleItemClick(){
      this.props.handleClick(/*写参数*/) 
      //相当于调用了父组件的handleClick方法
  }
  ```

##### 兄弟组件的传值

```js
//npm i pubsub-js

//使用值的组件：
import PubSub from 'pubsub-js'

//通常写在生命周期函数里
componentDidMount(){
    this.token = PubSub.subscribe("msg",function(msg,data){  //订阅msg，当msg发生变化时，调用函数
      console.log(msg,data)
    })
 }

componentWillUnmount(){
    PubSub.unsubscribe(this.token) //取消订阅
}

=======================================
//改变值的组件
import PubSub from 'pubsub-js'

change = () = >{
     PubSub.publish("msg",{a:1,b:2})   //更改msg的值
}

```



#### 参数限制

```react
import PropTypes from 'prop-types'

组件名.propTypes = {
    xxx : PropTypes.func/number/string... //限制父组件传递过来的参数类型
    xxx : PropTypes.arrayOf(PropTypes.number,PropTypes.string)//限制该数组的元素要么为number，或者string
    xxx : PropTypes.oneOfType(PropTypes.number,PropTypes.string)//限制类型要么为number，或者string
    xxx : PropTypes.number.isRequired //要求此number类型的参数为必传参数
}

//设置参数的默认值
组件名.defaultProps = {
    XXX : 'hello world'
}


//精简版  使用static使这些属性添加在原型上而不是实例上
class Person extends Component{
    static propTypes = {}
	static defaultProps = {}
}
```

#### render/state/props

+ 当组建的`state`或者`props`发生改变的时候，`render`函数就会重新执行
+ 当父组件的`render`函数被运行时，他的子组件的`render`函数都将被重新运行

#### 标签体

```
<Mytitle> xxx </Mytitle>
等同于
<Mytitle children="xxx"/>
即：通过this.props.children可以获得标签体里面的内容
```



#### 虚拟DOM

+ 本质为`Object`  

react的渲染方式：

1. state数据

2. JSX模板

3. 数据 + 模板 结合，生成虚拟DOM （虚拟DOM 是一个JS对象）

   `<div id="a"><span> hello world </span></div>`

   生成类似于`['div',{id:'a'},['span',{},'hello world']]`的虚拟DOM

4. 根据虚拟DOM,生成真实的DOM

5. state数据发生变化

6. 数据 + 模板 生成新的虚拟DOM （极大的提升了性能）

7. 与原来的虚拟DOM 进行比较，找出区别（极大的提升了性能）

8. 修改DOM中发生变化的节点

#### JSX的渲染过程

1、`JSX `-->`createElement`  -->`虚拟DOM` -->真实DOM

```react
render(){
	return (<div><span>hello world</span></div>)
    //等同于
    return React.createElement('div',{},React.createElement('span',{},'hello word'))
}
```

![image-20210203211845041](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210203211845041.png)

#### diff算法

![image-20210207213055628](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210207213055628.png)

+ setState异步函数
+ 同层比对
+ key值的确认

#### ref

+ 用于获取DOM节点

##### string类型的ref

+ 效率低/已过时

```react
render(){
    return(
    	<div>
        	<input ref = "ipt1"/>
            <input ref = "ipt2"/>
        </div>
    )
}

getValue(){
	let {ipt1,ipt2} = this.refs;  //获取到ipt1所指的DOM元素
    console.log(ipt1.value)
}
```



##### 回调类型的ref

```react
render(){
	return (<input ref={(currentNode)=>{this.input = currentNode}}   //是一个回调函数，参数获取的是当前节点元素
                   onChange={this.change.bind(this)}/>)
}
change(){
	console.log(this.input)//打印出input节点
    this.setState(()=>{  //异步函数
        inputValue : this.input.value
    },()=>{
        //callback
    })
}
```

```react
change = (c) => {
	this.ipt1 = c.value  //c为节点
}
render(){
     (<input ref={this.change}/>)
}
```

##### 创建ref

```react
//React.createRef()调用后可返回一个容器，该容器储存被ref所标识的节点，专人专用！ 
ref1 = React.createRef() 
ref2 = React.createRef()
show = () =>{
    console.log(this.ref1.current)  //取出ref1所储存的节点
}
render(){
	return(
    	<input ref = {this.ref1} />
    	<input ref = {this.ref2} />
        <button onClick = {this.show}></button>
    )
}
```



#### 生命周期函数

##### 旧版本

![image-20210206161117063](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210206161117063.png)

+ 指在某一时刻组件会自动执行的函数

```react
//Initialization
//setup props and state

================================================
//Mounting
componentWillMount(){}  //组件挂载到页面之前
render(){}
componentDidMount(){}   //组件挂载到页面之后  通常发送AJAX请求

================================================
//Update
//props
componentWillReceiveProps(){} 
//一个组件从父组件接收参数，当父组件调用render函数时，就会执行子组件的这个生命周期函数

//props/state
shouldComponentUpdate(){ //提升性能
    return flase/true  
    //true会更新，执行下面的生命周期函数；false不会更新，下面的生命周期函数不执行
}
componentWillUpdate(){}
render(){}
componentDidUpdate(){}

=================================================
//Unmounting
componentWillUnmount(){} //当子组件从页面移除时调用
```

##### 新版本

![image-20210207155830015](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20210207155830015.png)

```js
//componentWillMount ---> UNSAFE_componentWillMoun-->即将废弃

//componentWillUpdate ---> UNSAFE_componentWillUpdate-->即将废弃

//componentWillReiceiveProps--->UNSAFE_componentWillReiceiveProps-->即将废弃

//新的生命周期：
static getDerivedStateFromProps(props,state){}
/*
   注意：
   1、该方法为静态方法
   2、能接受两个参数，props 和 state 
   3、返回值为 null 或者一个 state object，返回的状态不会被改变
*/

getSnapshotBeforeUpdate
/*
	在最近一次渲染输出之前调用，
	使组件能在发生更改之前从DOM种捕获一些信息，
	例如滚轮的位置
	
	其返回的值将作为第三个参数给componentDidUpdate
*/


```



##### 通过生命周期函数提升性能

```react
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.content!=this.props.content){
            return true;
        }else{
            return false;
        }
    }
```

#### react提升性能的方式

+ shouldComponentUpdate函数
+ setState异步函数，降低渲染频率
+ 虚拟DOM ，diff算法

#### 普通组件/UI组件/容器组件/无状态组件

##### 无状态组件

+ 一个函数/只有render
+ 性能更高

#### 样式模块化

``` js
//css 文件名为 xx.module.css

//引入方式 import hello from 'xx.module.css'

//组件里取名 <h2 className={hello.title}>xxxxx</h2>
```

#### proxy代理

##### 方法一

+ 在`package.json` 中加上

```json
 "proxy":"http://localhost:5000"
```

+ 发送请求时，先检测自己根路径是否有需要的内容（`public` 文件），若有，则直接返回，不会转发请求；若没有，则转发去5000端口
+ 只能设置一个代理

##### 方法二

+ 在`src` 下配置`setupProxy.js`  文件 （需要用`commonJS` 语法）

  ```js
  //setupProxy.js
  const proxy = require('http-proxy-middleware')//已存在
  
  module.exports = function (app) {
      app.use(
          proxy('/api1', {  //遇见/api1前缀的请求就会触发该代理配置
          target: 'http://localhost:5000', //请求转发给谁
          changeOrigin: true, //控制服务器收到的请求头中host字段的值
          pathRewrite: { '^/api1': '' } //重写请求路径 /api1/xxx ==>/xxx
      })
          
          proxy('/api2', {  
          target: 'http://localhost:6000',
          changeOrigin: true,
          pathRewrite: { '^/api2': '' } 
      })
    )
  }
  ```

  

#### 路由

+ SPA （单页面应用）
+ 点击导航引起路径变化
+ 路径变化被前端路由器检测到
+ 展示对应组件

```react
// npm i react-router-dom
import {Link,BrowserRouter, Route } from 'react-router-dom'

<Link to = "/index">INDEX </Link>
<Route path="/index" component={App}/>
    
ReactDom.render(
	<BrowserRouter>
    	<all></all>
    </BrowserRouter>
).docu.....
```



##### 路由组件和一般组件的区别

+ 储存位置不同
  + 路由组件一般存放于`pages` 中
  + 一般组件一般存放于`components` 中
+ 使用方式不同
  + 路由组件 `<Route path="/index" component={Index}` 
  + 一般组件 `<Index/>` 
+ 接收到的`props`不同
  + 路由组件接收到三个固定属性`history` `location` `match` 
  + 一般组件传什么接收什么

##### navLink

```react
<Link to = "/index">INDEX </Link>
<navLink activeClassName = "active" className="xxx">INDEX</navLink>
/**使用navLink点击谁 谁会添加activeClassName里的类名**/
```

##### switch

```react
<Route path="/index" component = {Index}/>  //即使匹配到了第一个，也会继续往下匹配
<Route path="/index" component = {Index}/>
======================================
import {Switch} from 'react-router-dom'

<Switch>
	<Route path="/index" component = {Index}/>  //匹配到第一个后，不会像继续匹配
	<Route path="/index" component = {Index}/>
</Switch>
```

##### index

+ 如果请求了不存在的路径 ，则返回 `public/index.html`文件

##### 模糊匹配

```react
<navLink to = "/home">HOME</navLink>
<Route path = "/home/a/b" component = {Home}/>
//不能成功跳转

<navLink to = "/home/a/b">HOME</navLink>
<Route path = "/home" component = {Home}/>
//能成功跳转

<navLink to = "/home/a/b">HOME</navLink>
<Route exact = {true} path = "/home" component = {Home}/>
//exact = {true} 开启严格匹配 （通常不开，有二级路由时容易出现问题）
```

##### redirect

+ 重定向

+ 一般写在所有路由的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

  ```react
  <Redirect to="/index" />
  ```

##### 嵌套路由

```react
//App.js
<navLink to = "/home">HOME</navLink>
<Route path = "/home" component = {Home}/>

//home.js
<navLink to = "/home/msg">MSG</navLink>
<Route path = "/home/msg" component = {Msg}/>

/*匹配过程：输入/home/msg
  先去App.js,由于模糊匹配，匹配到/home，展现/home所对应的组件
  在/home对应的组件中，匹配到/home/msg
*/

```

##### 参数

+ 向路由组件传递`params`参数

```react
<navLink to=`/home/msg/${id}/${title}`>MSG</navLink>
<Route path="/home/msg/:id/:title" component = {Msg}/> //:id/:title声明接收

//Msg.js接收参数
const {id,title} = this.props.match.params
```

+ 向路由组件传递`search`参数

```react
<navLink to=`/home/msg/?id=${id}&title=${title}`>MSG</navLink>
<Route path="/home/msg" component = {Msg}/> //无需声明接收

//Msg.js
import qs from 'querystring'  
//脚手架已自动下载,可以将obj转化为urlencoded(key=value)形式，qs.stringify(obj)
//也可以将urlencoded转化为obj qs.parse()

const {id,title} = qs.parse(this.props.location.slice(1))


```

+ 向路由组件传递`state`参数,(刷新不丢)

```react
<navLink to={{pathname:'/home/msg',state:{id:id,title:title}}}>MSG</navLink>
<Route path="/home/msg" component = {Msg}/> //无需声明接收

Msg.js
const {id,title} = this.props.location.state
```

##### 编程式路由导航跳转

+ 只适用于路由组件

```react
goto = () =>{
    this.props.history.replace("/xxx")
    this.props.history.replace("/xxx?id=xx&title=xx")
    this.props.history.replace("/xxx",{id:xx,name:xx})
    
    this.props.history.push("/xxx")
    this.props.history.push("/xxx?id=xx&title=xx")
    this.props.history.push("/xxx",{id:xx,name:xx})
}

//...
<button onClick="goto">xx</button>
```

+ 非路由组件
  + `withRouter`可以加工一般组件，让一般组件具备路由组件的API
  + `withRouter`的返回值是一个新组件

```react
import {WithRouter} from 'react-router-dom'

class Header extends Component{...}

export default withRouter(Header)
```

##### `BrowserRouter` 和`HashRouter`的区别

+ 底层原理不同
  + `BrowserRouter` 使用的是h5的history API , 不兼容IE9-版本
  + `HashRouter`使用的是URP的哈希值
+ path表现形式不同
  + `BrowserRouter` 的路径中没有#
  + `HashRouter`的路径中包含#
+ 刷新后对**路由state参数**的影响不同
  + `BrowserRouter`无任何影响，因为state保存在history中
  + `HashRouter`刷新后会导致路由state参数丢失
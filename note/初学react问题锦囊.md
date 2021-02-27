### 1、create-react-app : 无法加载文件

因为在此系统上禁止运行脚本。[受限制官网解释](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1)

需要更改为可以执行脚本

[解决方法](https://blog.csdn.net/weixin_36775115/article/details/103599176)

### 2、[未查明原因]Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state

```react
//修改前：
    render(){
        return(
            <div onClick={this.handleItemClick(this.props.index)}>{this.props.content}</div>
        )
    }

    handleItemClick(index){
        const handle = this.props.handleItemClick;
        handle(index);
    }


//修改后 (这样就不报错了，为啥呢？？)
render(){
        return(
            <div onClick={this.handleItemClick}>{this.props.content}</div>
        )
    }

    handleItemClick(){
        const {handleItemClick,index} = this.props
        handleItemClick(index);
    }
```

### 3、使用prop-types库时报错：'propTypes' is not defined  

```react
//修改前：
Select.propTypes = {  //就是这里报错！！
    chooseItem:PropTypes.array,
    currenValue:PropTypes.array,
    changeItem:PropTypes.func
}


//检查了一下发现，最新版的已经变成了ReactPropTypes(v15.7.2)；修改后：
Select.ReactPropTypes = {
    chooseItem:PropTypes.array,
    currenValue:PropTypes.array,
    changeItem:PropTypes.func
}


```


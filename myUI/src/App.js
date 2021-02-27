import React ,{ Component } from 'react';
import Select from './common/select'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            chooseItem:['item1','item2','item3'],
            itemValue:['item1','item2','item3'],
            currentValue:'item1'
        }
        this.change = this.change.bind(this);
    }
    render(){
        return(
            <Select 
                    chooseItem={this.state.chooseItem}
                    itemValue={this.state.itemValue}
                    currentValue={this.state.currentValue}
                    changeItem={this.change}
            />
        )
    }
    change(value){
        this.setState(_ => ({
            currentValue: value
        }))
    }
}

export default App
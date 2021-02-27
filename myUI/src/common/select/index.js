import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'

class Select extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }
    render() {
        return (
            <div className='select_container'>
                {this.renderItem()}
            </div>
        )
    };

    renderItem() {
        return this.props.chooseItem.map((item, index) => {
            return (<div className={this.props.itemValue[index] === this.props.currentValue ? "select_item active" : "select_item"}
                key={item}
                onClick={() => { this.props.changeItem(this.props.itemValue[index]) }}
                value={this.props.itemValue[index]}
            >
                {item}
            </div>
            )
        })
    }




}

Select.ReactPropTypes = {
    chooseItem: PropTypes.array,
    itemValue: PropTypes.array,
    currentValue: PropTypes.string,
    changeItem: PropTypes.func
}

Select.defaultProps = {
    chooseItem: ['none'],
    itemValue: ['none'],
}

export default Select
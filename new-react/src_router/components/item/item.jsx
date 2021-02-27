import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class item extends Component {


    show = () => {
        //    PubSub.publish("msg",{a:1,b:2})
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/api1', true);

        //发送合适的请求头信息
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            // 请求结束后,在此处写处理代码
        };
        xhr.send("foo=bar&lorem=ipsum");
    }

    render() {
        return (
            <div>
                <button onClick={this.show}>点我ITEM1</button>
            </div>
        )
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


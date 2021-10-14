/*
 * @Author: hft
 * @Date: 2021-10-13 15:55:27
 * @LastEditors: hft
 * @LastEditTime: 2021-10-13 16:03:49
 * @Description: file content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
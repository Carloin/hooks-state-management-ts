/*
 * @Author: hft
 * @Date: 2021-10-13 15:55:27
 * @LastEditors: hft
 * @LastEditTime: 2021-10-14 16:37:14
 * @Description: file content
 */
import React from 'react';
import './App.css';
import { appReducer, IAction, payload, returnValue } from './reducer/appReducer';
import Header from './components/Header';


export interface IState {
  isAuthenticated: boolean,
  user: string | null,
  token: string | null,
}
const initialState: IState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
// createContext要有初始值，可以不用再约束类型，会根据初始值识别类型
export const AuthContext = React.createContext<any>(initialState)

function App() {
  const [state, dispatch]: any = React.useReducer<any>(appReducer, initialState)
  React.useEffect(() => {
    const user = JSON.parse(getMyItem('user') || null)
    const token = JSON.parse(getMyItem('token') || null)
    if (user && token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Header />
      {/* <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div> */}
      <Login />
    </AuthContext.Provider>
  );
}
const getMyItem = (key: string): any => {
  return localStorage.getItem(key)
}
export default App;

/*
 * @Author: hft
 * @Date: 2021-10-14 16:38:07
 * @LastEditors: hft
 * @LastEditTime: 2021-10-15 15:17:01
 * @Description: file content
 */

import React from "react";
import logo from "../logo.svg";
import { AuthContext } from "../App";
interface IData {
    email: string |any
    password: string|any
    isSubmitting: boolean
    errorMessage: string | null
}


const Login = () => {
    const { dispatch } = React.useContext(AuthContext)
    const initialState: IData = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    };
    const [data, setData] = React.useState(initialState)
    const handleInputChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const handleFormSubmit = (event: any) => {
        event.preventDefault()
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })
        fetch("https://hookedbe.herokuapp.com/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.email,
                password: data.password
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw res
            })
            .then(resJson => {
                dispatch({
                    type: "LOGIN",
                    payload: resJson
                })
            })
            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error.message || error.statusText
                })
            })
    }
    return (
        <div className="login-container">
            <div className="card">
                <div className="container">
                    <form onSubmit={handleFormSubmit}>
                        <h1>Login</h1>

                        <label htmlFor="email">
                            Email Address
                            <input
                                type="text"
                                value={data.email}
                                onChange={handleInputChange}
                                name="email"
                                id="email"
                            />
                        </label>

                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"
                            />
                        </label>

                        {data.errorMessage && (
                            <span className="form-error">{data.errorMessage}</span>
                        )}

                        <button disabled={data.isSubmitting}>
                            {data.isSubmitting ? (
                                <img className="spinner" src={logo} alt="loading icon" />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login
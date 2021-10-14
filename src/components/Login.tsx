/*
 * @Author: hft
 * @Date: 2021-10-14 16:38:07
 * @LastEditors: hft
 * @LastEditTime: 2021-10-14 17:03:37
 * @Description: file content
 */

import React from "react";
import logo from "../logo.svg";
import { AuthContext } from "../App";
interface IData {
    email: string
    password: string
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
    return (
        <div className="login-container">

        </div>
    )
}
export default Login
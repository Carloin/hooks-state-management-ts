/*
 * @Author: hft
 * @Date: 2021-10-14 15:44:37
 * @LastEditors: hft
 * @LastEditTime: 2021-10-14 16:21:19
 * @Description: file content
 */
import React from 'react'
import { AuthContext } from '../App'

const Header = () => {
    const { state, dispatch }: any = React.useContext(AuthContext)
    return (
        <nav id="navigation">
            {/* href变ref ref="#" */}
            <h1 className="logo">
                HOOKED
            </h1>
            <button
                onClick={() =>
                    dispatch({
                        type: "LOGOUT"
                    })
                }
            >
                {state.isAuthenticated && (
                    <h1>Hi {state.user.firstName} (LOGOUT)</h1>
                )}
            </button>
        </nav>
    )
}
export default Header
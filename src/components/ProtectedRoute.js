import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


export default function ProtectedRoute(props) {
    const { accessToken } = useSelector(state => state.auth)

    return (
        <>
            {accessToken ?
            <Route {...props}>
                {props.children}
            </Route > : <Redirect to="/login"/>}
        </>
    )
}

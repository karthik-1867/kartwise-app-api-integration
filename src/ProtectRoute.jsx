import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectRoute({ element}) {
    const loggedInUser = useSelector((state)=>state.user.user);
    console.log("ur logged in user")
    console.log(loggedInUser)
    return loggedInUser==null || loggedInUser==undefined ? <Navigate to="/" replace /> : element;
}

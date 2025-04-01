import React, { useEffect, useState } from 'react'
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Flag } from '@mui/icons-material';

export default function ProtectRoute({ element}) {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(()=>{


            const checkProtectRoute = async() => {
                try{
                const loggedInUser1 = await axios.post(`${process.env.REACT_APP_URL}/user/protectRoute`,{},{withCredentials:true})

                console.log("ur logged in user",loggedInUser1.data,element)
                console.log(loggedInUser1)
                setIsAuthenticated(loggedInUser1.data === "ok");
                setCheckingAuth(false)

               }catch(e){
                    setIsAuthenticated(false);
                    setCheckingAuth(false)
                }
            }

        checkProtectRoute();
    },[element])



    if (checkingAuth) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? element : <Navigate to="/" replace />;


}

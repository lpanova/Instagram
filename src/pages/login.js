import React from "react";
import { useState,useEffect, useContext } from "react";
import  FirebaseContext from '../context/firebase';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
export default function Login() {

     const navigate = useNavigate();
     const { firebase } = useContext(FirebaseContext);
     const [emailAddress, setEmailAddress] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const isInValid = password === "" || emailAddress === "";

     const handleLogin = async (event) =>{
            event.preventDefault();

            try{
                await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
                navigate(ROUTES.DASHBOARD)
            }catch(error){
            setEmailAddress('')
            setPassword('')
            setError(error.message)
            }
     }

     useEffect(()=>{
         document.title = 'Login - Instagram';
     }, []);

    return (
    <div className="container flex mx-auto max-m-screen-md itmes-center h-screen">
        <div className="flex w-3/5">
            <img src=""></img>
        </div>
        <div className="flex flex-col  w-2/5">
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary  mb-4">
            <h1 className="flex justify-center w-full">
            <img src="" alt="Instagram" className="mt-2 w-6/12 mb-4"></img>
            </h1>
            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleLogin} metod="POST">

                <input
                aria-label="Enter your e-mail address"
                type="text"
                placeholder="E-mail address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary roundet mb-2"
                onChange={({target})=>setEmailAddress(target.value)}
                />

                <input
                aria-label="Enter your e-mail password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary roundet mb-2"
                onChange={({target})=>setPassword(target.value)}
                />

                <button
                disabled={isInValid}
                type="submit"
                className={`bg-blue-800 px-4 text-white m-full border roundet h-8 font-bold w-full
                ${isInValid && 'bg-opacity-50'}`}>Log In</button>    
            </form>
        </div>
        <div className="flex justify-center  w-full bg-white p-4 border border-gray-primary">
            <p className="m-2">Do not have an account? </p>
            <Link to={ROUTES.SIGN_UP}className="font-bold text-blue-medium"> Sign up</Link>
        </div>
        </div>
    </div>
    )
}


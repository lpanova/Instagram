import React from "react";
import { useState,useEffect, useContext } from "react";
import  FirebaseContext from '../context/firebase';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import doesUsernameExist from '../services/firebase';

export default function Login() {

    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);
    const [username, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInValid = password === "" || emailAddress === "";
    
    const handleSignUp = async (event) =>{
            event.preventDefault();

            const usernameExist = await doesUsernameExist(username);
            if(!usernameExist.length){
                try{
              const createdUserResult = await firebase
              .auth()
              .createUserWithEmailAndPassword(emailAddress, password);
              await createdUserResult.user.updateProfile({
                  displayName: username
              });
              await firebase.firestore().collection('users').add({
                  userid: createdUserResult.user.uid,
                  username: username. toLowerCase(),
                  fullName,
                  emailAddress: emailAddress. toLowerCase(),
                  fallowing:[],
                  dateCreatde: Date.now()

              })
              navigate(ROUTES.DASHBOARD)
                }catch(error){
            setFullName('');
            setEmailAddress('');
            setPassword('')
            
                }
            }
            else{
                setError('This username is awredy taken! Please try another!')
            }
     }

     useEffect(()=>{
         document.title = 'Sign Up- Instagram';
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
            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

            <form onSubmit={handleSignUp} metod="POST">
            <input
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary roundet mb-2"
                onChange={({target})=>setUserName(target.value)}
                value={username || ''}
                />

            <input
                aria-label="Enter full name"
                type="text"
                placeholder="Full name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary roundet mb-2"
                onChange={({target})=>setFullName(target.value)}
                value={fullName || ''}
                />  

                <input
                aria-label="Enter your e-mail address"
                type="text"
                placeholder="E-mail address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary roundet mb-2"
                onChange={({target})=>setEmailAddress(target.value)}
                value={emailAddress}
                />

                <input
                aria-label="Enter your e-mail password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary roundet mb-2"
                onChange={({target})=>setPassword(target.value)}
                value={password}
                />

                <button
                disabled={isInValid}
                type="submit"
                className={`bg-blue-800 px-4 text-white m-full border roundet h-8 font-bold w-full
                ${isInValid && 'bg-opacity-50'}`}>Sing Up</button>    
            </form>
        </div>
        <div className="flex justify-center  w-full bg-white p-4 border border-gray-primary">
            <p className="m-2">Have an account? </p>
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium"> Sing up</Link>
        </div>
        </div>
    </div>
    )
}


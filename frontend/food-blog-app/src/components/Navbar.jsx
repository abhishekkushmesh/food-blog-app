import React from 'react'
import { useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom'

import { useEffect } from 'react';

export default function Navbar() {
   const[isOpen, setIsOpen] = useState(false);
   const token = localStorage.getItem("token");
   const [isLogin, setIsLogin] = useState(token ? false : true);

   useEffect(() => {
    setIsLogin(token ? false : true);
   },[token])

   const checkLogin = () => {
    if(token){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(true);
   }

   else{
    setIsOpen(true);
    
   }
  }
  return (
    <>
    <header>
        <h2>Food Blog App</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
           <li><NavLink onClick={()=>isLogin && setIsOpen(true)} to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
            <li><NavLink onClick={()=>isLogin && setIsOpen(true)} to= {!isLogin ? "/favRecipe": "/"}>Favourites</NavLink></li>
            <li onClick={checkLogin}> <p className='login'>{(isLogin) ? "Login": "Logout"}</p></li>
        </ul>
    </header>
    {(isOpen )&& <Modal onClose = {()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}

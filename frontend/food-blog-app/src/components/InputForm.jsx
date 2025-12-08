import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../App' // Import the URL we created in App.jsx

export default function InputForm({ setIsOpen, setIsLogin, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleOnsubmit = async (e) => {
        e.preventDefault();
        let endpoint = isSignUp ? "signUp" : "login";
        
        try {
            // Use API_URL here instead of localhost
            const res = await axios.post(`${API_URL}/${endpoint}`, { email, password });
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            // Update parent state
            setIsLogin(true);
            setUser(res.data.user);
            setIsOpen(false); 
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    }

    return (
        <>
            <form className='form' onSubmit={handleOnsubmit}>
                <div className='form-header'>
                   <h3>{isSignUp ? "Sign Up" : "Login"}</h3>
                </div>
                <div className='form-control'>
                    <label>Email</label>
                    <input type="email" className='input' onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type="password" className='input' onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>{isSignUp ? "Sign Up" : "Login"}</button> 
                <br />
                {error && <h6 className='error'>{error}</h6>}
                <p onClick={() => { setIsSignUp(pre => !pre); setError(""); }} style={{cursor: "pointer", marginTop: "10px"}}>
                    {isSignUp ? "Already have an account? Login" : "Create new account"}
                </p>
            </form>
        </>
    )
}
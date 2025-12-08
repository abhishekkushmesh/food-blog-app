import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { API_URL } from '../App' // Import the URL from App.jsx

export default function RecipeItems() {
    const allRecipes = useLoaderData() || [];

    return (
        <>
            <div className='card-container'>
                {allRecipes.map((item, index) => {
                    return (
                        <div key={index} className='card'>
                            {/* FIX: Use API_URL for images */}
                            <img 
                                src={`${API_URL}/images/${item.coverImage}`} 
                                width="120px" 
                                height="100px" 
                                alt={item.title} 
                                onError={(e) => { e.target.src = "https://placehold.co/400x300?text=No+Image"; }} // Fallback if image fails
                            />
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><BsFillStopwatchFill /> {item.time || "30"} Min</div>
                                    <FaHeart style={{color: "red"}}/> 
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
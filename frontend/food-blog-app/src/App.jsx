import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import axios from 'axios'

// --- 1. SET YOUR LIVE BACKEND URL HERE ---
// Replace this string with your actual Render URL (e.g., https://food-blog-api.onrender.com)
export const API_URL = "https://your-backend-app.onrender.com"; 
// -----------------------------------------

// 2. Get ALL Recipes
const getAllRecipes = async () => {
  let allRecipes = []
  try {
    const res = await axios.get(`${API_URL}/recipe`); // Uses API_URL
    allRecipes = res.data;
  } catch (error) { console.log(error) }
  return allRecipes;
}

// 3. Get MY Recipes (Logged In User)
const getMyRecipes = async () => {
  let userRecipes = []
  const token = localStorage.getItem("token");
  if(!token) return [];

  try {
    const res = await axios.get(`${API_URL}/recipe/my`, { // Uses API_URL
      headers: { Authorization: `Bearer ${token}` }
    });
    userRecipes = res.data;
  } catch (error) { console.log(error) }
  return userRecipes;
}

// 4. Get FAV Recipes (FIXED: Now fetches from Backend, not LocalStorage)
const getFavRecipes = async () => {
  let favRecipes = [];
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const res = await axios.get(`${API_URL}/recipe/fav`, { // Uses API_URL
      headers: { Authorization: `Bearer ${token}` }
    });
    favRecipes = res.data;
  } catch (error) { console.log(error); }
  return favRecipes;
}

const router = createBrowserRouter([
  {
    path: '/', element: <MainNavigation />,
    children: [
      { path: '/', element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
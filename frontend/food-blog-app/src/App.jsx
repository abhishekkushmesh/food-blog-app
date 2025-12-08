import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import axios from 'axios'

// 1. Get ALL Recipes
const getAllRecipes = async () => {
  let allRecipes = []
  try {
    const res = await axios.get("http://localhost:5000/recipe");
    allRecipes = res.data;
  } catch (error) { console.log(error) }
  return allRecipes;
}

// 2. Get MY Recipes (Send Token)
const getMyRecipes = async () => {
  let userRecipes = []
  const token = localStorage.getItem("token"); // Assuming you stored token here on login
  
  if(!token) return []; // If not logged in, return empty

  try {
    const res = await axios.get("http://localhost:5000/recipe/my", {
      headers: { Authorization: `Bearer ${token}` }
    });
    userRecipes = res.data;
  } catch (error) { console.log(error) }
  return userRecipes;
}

// 3. Get FAV Recipes (For now, use LocalStorage or Dummy data)
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("favRecipes")) || [];
}

const router = createBrowserRouter([
  {
    path: '/', element: <MainNavigation />,
    children: [
      // Pass the specific loaders to each route
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
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddFoodRecipe from './pages/AddFoodRecipe'; // ✅ Add this

import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'


const getAllrecipes = async () => {
  let allRecipes = []
  await axios.get("http://localhost:5000/recipe").then(res=>{
    allRecipes = res.data
  })
  return allRecipes
}

const router = createBrowserRouter([
  {
    path: '/',element: <MainNavigation />,
    children: [
      { path: '/', element: <Home />, loader: getAllrecipes },
      {path:"/myRecipe", element:<Home/>},
      {path:"/favRecipe", element:<Home/>},
      {path:"/addRecipe", element:<AddFoodRecipe/>}
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}



const express = require('express');
const router = express.Router();
const { 
    getRecipes, 
    getRecipe, 
    addRecipe, 
    editRecipe, 
    deleteRecipe, 
    upload, 
    getMyRecipes, 
    favoriteRecipe, 
    getFavoriteRecipes 
} = require('../controller/recipe');

const verifyToken = require('../middleware/auth'); 

// 1. Specific Routes FIRST (to prevent conflict with :id)
router.get('/my', verifyToken, getMyRecipes);
router.get('/fav', verifyToken, getFavoriteRecipes);

// 2. General Routes
router.get('/', getRecipes);
router.get('/:id', getRecipe); 

// 3. Action Routes
router.post('/', verifyToken, upload.single('file'), addRecipe);
router.put('/fav', verifyToken, favoriteRecipe);
router.put('/:id', verifyToken, editRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
const express = require('express');
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require('../controller/recipe');
const router = express.Router();

router.get('/', getRecipes);             // GET all recipes
router.get('/:id', getRecipe);           // GET a specific recipe by ID
router.post('/', upload.single('file'), addRecipe); // ✅ POST a new recipe
router.put('/:id', editRecipe);          // UPDATE a recipe by ID
router.delete('/:id', deleteRecipe);     // DELETE a recipe by ID

module.exports = router;

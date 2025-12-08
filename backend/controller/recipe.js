const Recipes = require("../models/recipe");
const User = require("../models/user"); // 1. Ensure User model is imported
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// --- CONTROLLER FUNCTIONS ---

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

const getRecipe = async (req, res) => {
  try {
      const recipe = await Recipes.findById(req.params.id);
      res.json(recipe);
  } catch (err) {
      res.status(404).json({ message: "Recipe not found" });
  }
};

const getMyRecipes = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await Recipes.find({ createdBy: userId });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching my recipes" });
    }
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file ? req.file.filename : "", 
      createdBy: req.user.id 
    });
    return res.json(newRecipe);
  } catch (err) {
      return res.status(500).json({ message: "Error creating recipe" });
  }
};

const editRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(404).json({ message: 'Error updating recipe'});
  }
};

const deleteRecipe = async (req, res) => {
    try {
        await Recipes.findByIdAndDelete(req.params.id);
        res.json({message:'Recipe deleted'}); 
    } catch (err) {
        res.status(404).json({ message: 'Error deleting'});
    }
};

const favoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id; 

    try {
        const user = await User.findById(userId);
        if (user.favorites.includes(recipeId)) {
            user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
        } else {
            user.favorites.push(recipeId);
        }
        await user.save();
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: "Error updating favorites" });
    }
};

const getFavoriteRecipes = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('favorites'); 
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: "Error fetching favorites" });
    }
};

// 2. EXPORT ALL FUNCTIONS (Crucial Step)
module.exports = { 
    getRecipes, 
    getRecipe, 
    getMyRecipes, 
    addRecipe, 
    editRecipe, 
    deleteRecipe, 
    upload, 
    favoriteRecipe, 
    getFavoriteRecipes 
};

const Recipes=require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })

const upload = multer({ storage: storage })


const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    res.json(recipes);
  
}

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  return res.json(recipe);
}


const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, coverImage } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRecipe = await Recipes.create({
    title,
    ingredients,
    instructions,
    time,
    // use uploaded file if available, otherwise fallback to body coverImage
    coverImage: req.file.filename ,
  });

  return res.json(newRecipe);
};


const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = Recipes.findById(req.params.id);
  try {
    if(recipe){
    await Recipes.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    res.json({title, ingredients, instructions, time})
    }
  } 
  catch (err) {
    res.status(404).json({ message: 'Error'});
  }
    
}
const deleteRecipe = (req, res) => {
  res.json({message:'Hello World!'}); 
}


module.exports = { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload }    
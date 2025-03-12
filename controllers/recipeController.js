const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const { convertRecipeToIngredient } = require("../helpers/converter");

// Rezept aus DB holen und in Zutat umwandeln
exports.convertRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Rezept nicht gefunden" });

        const ingredientData = convertRecipeToIngredient(recipe);
        const ingredient = new Ingredient(ingredientData);
        await ingredient.save();

        res.json({ message: "Rezept erfolgreich umgewandelt", ingredient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverfehler" });
    }
};

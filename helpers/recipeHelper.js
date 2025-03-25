import Recipe from "../models/Recipe.js";
import { Zutat } from "../models/Zutat.js";

export const updateRecipesWithZutat = async (zutatName) => {
  try {
    // Zutat finden, die mit dem angegebenen Namen übereinstimmt
    const zutat = await Zutat.findOne({ name: zutatName });
    if (!zutat) {
      console.log(`Zutat "${zutatName}" nicht gefunden!`);
      return;
    }

    // Alle Rezepte mit dem gleichen Namen wie die Zutat finden
    const recipes = await Recipe.find({ name: zutatName });

    if (recipes.length === 0) {
      console.log(`Kein Rezept mit dem Namen "${zutatName}" gefunden.`);
      return;
    }

    // Jedes Rezept aktualisieren
    for (let recipe of recipes) {
      // Rezept in der Datenbank mit den Zutatendaten aktualisieren
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipe._id, {
        $set: {
          b2bPreis: zutat.b2bPreis,
          b2cPreis: zutat.b2cPreis,
          istlagerbestand: zutat.istlagerbestand,
          solllagerbestand: zutat.solllagerbestand,
          zusatz: zutat.zusatz
        }
      }, { new: true });

      if (updatedRecipe) {
        console.log(`Rezept "${recipe.name}" wurde mit den Zutatendaten "${zutatName}" aktualisiert.`);
      } else {
        console.log(`Fehler beim Aktualisieren des Rezepts "${recipe.name}".`);
      }
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Rezepte:", error);
  }
};

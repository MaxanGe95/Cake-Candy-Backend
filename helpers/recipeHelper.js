import Recipe from "../models/Recipe.js";
import { Zutat } from "../models/Zutat.js";
import Inventory from "../models/Inventory.js";

export const updateRecipesWithZutat = async (zutatName) => {
  try {
    // Zutat finden
    const zutat = await Zutat.findOne({ name: zutatName });
    if (!zutat) {
      console.log(`Zutat "${zutatName}" nicht gefunden!`);
      return;
    }

    // Inventory nach Ist-Lagerbestand durchsuchen
    const inventoryItem = await Inventory.findOne({ itemName: zutatName });
    const istlagerbestand = inventoryItem ? inventoryItem.quantity : zutat.istlagerbestand;

    // Zutat mit aktuellem Lagerbestand aktualisieren
    await Zutat.findByIdAndUpdate(zutat._id, { istlagerbestand });

    // Alle passenden Rezepte finden
    const recipes = await Recipe.find({ name: zutatName });

    if (recipes.length === 0) {
      console.log(`Kein Rezept mit dem Namen "${zutatName}" gefunden.`);
      return;
    }

    // Jedes Rezept aktualisieren
    for (let recipe of recipes) {
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipe._id, {
        $set: {
          b2bPreis: zutat.b2bPreis,
          b2cPreis: zutat.b2cPreis,
          istlagerbestand: istlagerbestand, // Wert aus Inventory oder Zutat
          solllagerbestand: zutat.solllagerbestand,
          zusatz: zutat.zusatz
        }
      }, { new: true });

      if (updatedRecipe) {
        console.log(`Rezept "${recipe.name}" wurde mit den Zutatendaten und Ist-Lagerbestand aktualisiert.`);
      } else {
        console.log(`Fehler beim Aktualisieren des Rezepts "${recipe.name}".`);
      }
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Rezepte:", error);
  }
};

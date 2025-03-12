export const convertRecipeToIngredient = (recipe) => ({
    name: recipe.name,
    typ: recipe.typ, // Typ bleibt erhalten
    ekPreis: recipe.unitPrice || 0, // Der unitPrice wird direkt als ekPreis verwendet
    b2bPreis: recipe.b2bPreis,
    b2cPreis: recipe.b2cPreis,
    istlagerbestand: recipe.istlagerbestand,
    solllagerbestand: recipe.solllagerbestand,
    zusatz: recipe.zusatz || ""
  });
  
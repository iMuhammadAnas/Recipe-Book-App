import React, { useState } from "react";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
  favorite?: boolean;
}

interface Props {
  existingRecipe?: Recipe;
  onSubmit: (recipe: Recipe) => void; 
  onClose?: () => void;
}

const RecipeForm: React.FC<Props> = ({ existingRecipe, onSubmit, onClose }) => {
  const [name, setName] = useState(existingRecipe?.name || "");
  const [ingredients, setIngredients] = useState(
    existingRecipe?.ingredients.join(", ") || ""
  );
  const [instructions, setInstructions] = useState(
    existingRecipe?.instructions || ""
  );
  const [image, setImage] = useState(existingRecipe?.image || "");
  const [category, setCategory] = useState(existingRecipe?.category || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipe: Recipe = {
      id: existingRecipe?.id || Date.now().toString(),
      name,
      ingredients: ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      instructions,
      image,
      category,
      favorite: existingRecipe?.favorite || false,
    };

    onSubmit(recipe);

    if (!existingRecipe) {
      // Reset form
      setName("");
      setIngredients("");
      setInstructions("");
      setImage("");
      setCategory("");
    }

    if (onClose) onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-md px-3 py-2"
        required
      />
      <textarea
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full border rounded-md px-3 py-2"
        required
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="w-full border rounded-md px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded-md px-3 py-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
      >
        {existingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;

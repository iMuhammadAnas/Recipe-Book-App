import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { addRecipe } from "../features/recipes/recipesSlice";
import RecipeGrid from "../features/recipes/components/RecipeGrid";
import RecipeFilter from "../features/recipes/components/RecipeFilter";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.items);

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  // API data fetch and store load
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("https://dummyjson.com/recipes");
        const data = await res.json();

        if (data.recipes) {
          data.recipes.forEach((r: any) => {
            dispatch(
              addRecipe({
                id: r.id.toString(),
                name: r.name,
                ingredients: r.ingredients || [],
                instructions: r.instructions || "",
                image: r.image || "https://via.placeholder.com/300",
                category: r.cuisine || "Other",
                favorite: false,
              })
            );
          });
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    //  only load if store is empty
    if (recipes.length === 0) {
      fetchRecipes();
    }
  }, [dispatch, recipes.length]);

  //  categories extract
  const categories = Array.from(new Set(recipes.map((r) => r.category).filter(Boolean))) as string[];

  // filtering
  let filteredRecipes = recipes;

  if (category) {
    filteredRecipes = filteredRecipes.filter((r) => r.category === category);
  }

  if (search) {
    filteredRecipes = filteredRecipes.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.ingredients.some((ing) =>
          ing.toLowerCase().includes(search.toLowerCase())
        )
    );
  }

  if (showFavorites) {
    filteredRecipes = filteredRecipes.filter((r) => r.favorite);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>

      {/* Filter bar */}
      <RecipeFilter
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />

      {/* Favorites toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            showFavorites ? "bg-yellow-400 text-black" : "bg-gray-200"
          }`}
        >
          {showFavorites ? "★ Showing Favorites" : "☆ Show Favorites"}
        </button>
      </div>

      {/* Recipe grid */}
      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
};

export default Home;

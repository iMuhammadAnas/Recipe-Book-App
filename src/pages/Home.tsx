// src/pages/Home.tsx
import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectAllRecipes } from "../features/recipes/selectors";
import RecipeGrid from "../features/recipes/components/RecipeGrid";
import RecipeFilter from "../features/recipes/components/RecipeFilter";

const Home: React.FC = () => {
  const recipes = useAppSelector(selectAllRecipes);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const categories = Array.from(
    new Set(recipes.map((r) => r.category).filter(Boolean))
  ) as string[];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = category ? recipe.category === category : true;
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Recipe Book
      </h1>

      <RecipeFilter
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />

      {filteredRecipes.length > 0 ? (
        <RecipeGrid recipes={filteredRecipes} />
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No recipes found. Try adding some!
        </p>
      )}
    </div>
  );
};

export default Home;

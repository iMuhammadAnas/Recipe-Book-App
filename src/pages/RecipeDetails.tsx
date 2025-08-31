import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";   // <-- Correct import
import Button from "../components/UI/Button";    // <-- Correct import

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Redux state se recipe fetch
  const recipe = useAppSelector((state: RootState) =>
    state.recipes.items.find((r) => r.id === id)
  );

  if (!recipe) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Recipe not found</h2>
        <Button onClick={() => navigate(-1)} className="mt-4 cursor-pointer">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Button onClick={() => navigate(-1)} className="mb-4 cursor-pointer ">
        ← Back
      </Button>

      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {recipe.category && (
        <p className="text-gray-500 italic mb-4">Category: {recipe.category}</p>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {recipe.instructions}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;

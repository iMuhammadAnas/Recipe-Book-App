

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
  favorite?: boolean;
}


export const fetchRecipes = async (): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Chocolate Cake",
          ingredients: ["Flour", "Sugar", "Cocoa", "Eggs"],
          instructions: "Mix ingredients and bake at 180°C for 30 mins.",
          image: "https://via.placeholder.com/150",
          category: "Dessert",
          favorite: false,
        },
      ]);
    }, 500);
  });
};

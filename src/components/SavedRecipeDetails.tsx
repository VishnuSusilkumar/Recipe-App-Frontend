import React from "react";

interface RecipeDetailsData {
  _id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
  instructions: Array<{ number: number; instruction: string }>;
}

interface RecipeDetailComponentProps {
  recipeDetails: RecipeDetailsData | null;
}

const SavedRecipeDetails: React.FC<RecipeDetailComponentProps> = ({
  recipeDetails,
}) => {
  if (!recipeDetails) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-r from-gray-50 to-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-5xl font-bold text-gray-800 mb-4 text-center">
        {recipeDetails.title}
      </h2>
      <img
        src={recipeDetails.image}
        alt={recipeDetails.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <p
        className="text-gray-700 mb-6 text-lg"
        dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
      ></p>

      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-md shadow-inner">
        <span className="text-sm text-gray-500">
          Ready in: {recipeDetails.readyInMinutes} minutes
        </span>
        <span className="text-sm text-gray-500">
          Servings: {recipeDetails.servings}
        </span>
      </div>

      <h3 className="text-3xl font-semibold mt-4 border-b-2 border-gray-400 pb-2">
        Ingredients
      </h3>
      <ul className="list-disc list-inside mb-6 pl-5">
        {recipeDetails.ingredients.map((ingredient) => (
          <li key={ingredient.id} className="text-gray-800 text-lg mb-1">
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      <h3 className="text-3xl font-semibold mt-4 border-b-2 border-gray-400 pb-2">
        Instructions
      </h3>
      <ol className="list-decimal list-inside mb-6 pl-5">
        {recipeDetails.instructions.map((step) => (
          <li key={step.number} className="text-gray-800 text-lg mb-1">
            {step.instruction}
          </li>
        ))}
      </ol>

      <div className="mt-auto">
        <a
          href={recipeDetails.sourceUrl}
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-md text-center hover:bg-blue-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Original Recipe
        </a>
      </div>
    </div>
  );
};

export default SavedRecipeDetails;

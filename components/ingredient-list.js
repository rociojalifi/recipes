import { useState } from "react";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";

export default function IngredientList() {
  const [newIngredient, setNewIngredient] = useState("");
  const [result, setResult] = useState();
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextIngredient = ingredients.concat({
      id: Date.now(),
      name: newIngredient,
    });
    setIngredients(nextIngredient);

    // [x] clean the form
    setNewIngredient("");
  };
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredient: ingredientInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setNewIngrediet("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center pt-10">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Write your available Ingredients
            </h1>
            <div>{result}</div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ingredient
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {ingredients.map((ingredient, ingredientIdx) => (
                      <tr
                        key={ingredient.id}
                        className={
                          ingredientIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {ingredient.name}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => removeIngredient(ingredient.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                  <div className="bg-gray-100 flex justify-between">
                    <div className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 w-full">
                      <input
                        type="text"
                        name="ingredient"
                        placeholder="Enter an ingredient"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        autoComplete="off"
                        className="bg-transparent appearance-none border-none outline-none py-3 w-full"
                      />
                    </div>
                    <div className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        type="submit"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

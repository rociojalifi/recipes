const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const ingredient = req.body.animal || "";
  if (ingredient.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid ingredient",
      },
    });
    return;
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Write a recipe based on these ingredients and instructions:\n\nFrito Pie\n\nIngredients:\nFritos\nChili\nShredded cheddar cheese\nSweet white or red onions, diced small\nSour cream\n\nInstructions:\n\n1. Preheat oven to 350°F.\n\n2. Spread a single layer of Fritos in the bottom of a 9x13 inch baking dish.\n\n3. Pour chili over the Fritos, spreading it evenly.\n\n4. Sprinkle the shredded cheddar cheese over the chili.\n\n5. Sprinkle the diced onions over the cheese.\n\n6. Bake in preheated oven for 20 minutes.\n\n7. Remove from oven and let cool for 5 minutes.\n\n8. Serve with a dollop of sour cream",
      temperature: 0.3,
      max_tokens: 120,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({ result: response.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(ingredient) {
  const capitalizedIngredient =
    ingredient[0].toUpperCase() + ingredient.slice(1).toLowerCase();
  return `Suggest recipes provided by this ingredients.

  Ingredients: Carrots, garlic, paprika
  Recipes: Carrot Soup
  Ingredients: ${capitalizedIngredient}
  Recipes:`;
}

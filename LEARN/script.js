document.addEventListener("DOMContentLoaded", function () {
  console.log("recipe finder is ready.");
  console.log("Number of recipes", RECIPES.length);

  const findButton = document.getElementById("findRecipes");
  findButton.addEventListener("click", function () {
    findRecipes();
  });
});

function findRecipes() {
  console.log("Finding recipes...");

  // Step 1: Get what the user typed
  const userInput = document.getElementById("ingredients").value;

  // Step 2: Make it lowercase (so "Tomato" matches "tomato")
  const lowerInput = userInput.toLowerCase();

  // Step 3: Split by commas to make a list
  const searchIngredients = lowerInput.split(",");

  // Step 4: Trim extra spaces like " tomato " → "tomato"
  for (let i = 0; i < searchIngredients.length; i++) {
    searchIngredients[i] = searchIngredients[i].trim();
  }

  // Step 5: Get the selected diet type (vegan / vegetarian / etc.)
  const selectedDiet = document.querySelector(
    'input[name="dietType"]:checked'
  ).value;

  // Step 6: Empty box to collect matching recipes
  const matchingRecipes = [];

  // Step 7: Check every recipe in our list
  for (let i = 0; i < RECIPES.length; i++) {
    const recipe = RECIPES[i];
    console.log("Checking recipe:", recipe.name);

    // Skip recipes that don’t fit the chosen diet
    if (selectedDiet !== "all" && recipe.diet !== selectedDiet) {
      console.log("  ❌ Wrong diet, skipping");
      continue;
    }

    // Count how many of the user's ingredients match this recipe
    let matchCount = 0;

    // Look through each word the user typed
    for (let j = 0; j < searchIngredients.length; j++) {
      const userIngredient = searchIngredients[j];
      if (userIngredient === "") continue; // skip blanks

      // Check inside this recipe’s ingredient list
      for (let k = 0; k < recipe.ingredients.length; k++) {
        const recipeIngredient = recipe.ingredients[k];

        // Does it contain that word? (e.g. "rice" inside "boiled rice")
        if (recipeIngredient.includes(userIngredient)) {
          matchCount++;
          break; // stop searching this word
        }
      }
    }

    console.log("  Matches found:", matchCount);

    // If 2 or more ingredients match, keep the recipe
    if (matchCount >= 2) {
      matchingRecipes.push(recipe);
    }
  }

  // Step 8: Log and show the results
  console.log("Total recipes found:", matchingRecipes.length);
  displayRecipes(matchingRecipes);
}

function displayRecipes(recipes) {
    console.log("Displaying recipes...");
    
    // Find the containers
    const resultsSection = document.getElementById("resultsSection");
    const recipeContainer = document.getElementById("recipeContainer");
    const resultsTitle = document.getElementById("resultsTitle");
    
    // Clear any old content
    recipeContainer.innerHTML = "";
    
    // Check if we found any recipes
    if (recipes.length === 0) {
        // No recipes found
        resultsTitle.textContent = "No Recipes Found 😔";
        
        // Add a message
        recipeContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    <h5>No recipes match your search</h5>
                    <p>Try these tips:</p>
                    <ul class="list-unstyled">
                        <li>✓ Use simpler ingredients (tomato instead of tomatoes)</li>
                        <li>✓ Check spelling</li>
                        <li>✓ Try different combinations</li>
                        <li>✓ We need at least 2 matching ingredients</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        // Found recipes!
        if (recipes.length === 1) {
            resultsTitle.textContent = "Found 1 Recipe! 🎉";
        } else {
            resultsTitle.textContent = "Found " + recipes.length + " Recipes! 🎉";
        }
        
        // Create a card for each recipe
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            
            // Build ingredients list HTML
            let ingredientsList = "";
            for (let j = 0; j < recipe.ingredients.length; j++) {
                ingredientsList += "<li>• " + recipe.ingredients[j] + "</li>";
            }

            // Build cooking steps HTML
            let stepsList = "";
            if (recipe.steps && recipe.steps.length > 0) {
                for (let j = 0; j < recipe.steps.length; j++) {
                    stepsList += "<li>" + recipe.steps[j] + "</li>";
                }
            }

            // Create the recipe card
            const cardHTML = `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card recipe-card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.name}</h5>

                            <span class="badge bg-success mb-2">
                                ${recipe.diet}
                            </span>

                            <h6 class="mt-3">📝 Ingredients:</h6>
                            <ul class="small list-unstyled">
                                ${ingredientsList}
                            </ul>

                            <h6 class="mt-3">👨‍🍳 Cooking Steps:</h6>
                            <ol class="small">
                                ${stepsList}
                            </ol>

                            <div class="d-flex justify-content-between text-muted small mt-2">
                                <span>⏱️ ${recipe.time}</span>
                                <span>📦 ${recipe.shelfLife}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add the card to container
            recipeContainer.innerHTML += cardHTML;
        }
    }
    
    // Show the results section
    resultsSection.style.display = "block";
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: "smooth" });
}
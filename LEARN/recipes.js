// Our Recipe Cookbook - Store all recipes here
const RECIPES = [
    {
        name: "Tomato Rice",
        ingredients: ["tomatoes", "rice", "onion", "garlic", "oil"],
        steps: [
            "Heat oil in a large pan over medium heat",
            "Add diced onions and minced garlic, sauté until fragrant (3-4 minutes)",
            "Add diced tomatoes and cook until they break down (8-10 minutes)",
            "Add rice and stir to coat with the tomato mixture",
            "Pour in 2 cups of warm water or broth",
            "Bring to a boil, then reduce heat and simmer covered for 18-20 minutes",
            "Let rest for 5 minutes before fluffing with a fork and serving"
        ],
        time: "30 minutes",
        diet: "vegan",
        method: "acid",
        shelfLife: "3-4 days in fridge",
        chemistry: "Tomatoes contain natural acids (pH 4.3-4.9) that prevent harmful bacteria growth. The acid creates an environment where bacteria cannot survive, keeping food fresh longer."
    },
    {
        name: "🍚 Egg Fried Rice",
        ingredients: ["rice", "eggs", "soy sauce", "vegetables", "oil"],
        steps: [
            "Cook rice and let it cool (day-old rice works best)",
            "Heat oil in a wok or large skillet over high heat",
            "Push rice to one side, scramble eggs on the other side",
            "Mix eggs with rice",
            "Add chopped vegetables and stir-fry for 2-3 minutes",
            "Add soy sauce and toss everything together",
            "Serve hot, garnished with green onions"
        ],
        time: "20 minutes",
        diet: "vegetarian",
        method: "heat",
        shelfLife: "2 days in fridge",
        chemistry: "High heat (165°F+) kills harmful bacteria by destroying their proteins. Cooking eggs coagulates proteins, making them safe to eat and easier to digest."
    },
    {
        name: "Chicken Quesadillas",
        ingredients: ["tortillas", "cheese", "chicken", "veggies"],
        steps: [
            "Cook and shred the chicken (or use leftover cooked chicken)",
            "Mix shredded chicken with shredded cheese and chopped veggies",
            "Season with your favorite spices (cumin, paprika, salt)",
            "Place mixture on one half of a tortilla",
            "Fold tortilla in half to create a half-moon shape",
            "Heat a skillet over medium heat",
            "Cook quesadilla for 2-3 minutes per side until golden and crispy",
            "Slice into wedges and serve with sour cream, salsa, or guacamole"
        ],
        time: "15 minutes",
        diet: "non-veg",
        method: "heat",
        shelfLife: "2 days in fridge",
        chemistry: "Cooking chicken to 165°F destroys harmful bacteria like Salmonella. Heat denatures proteins, making meat safe and digestible while creating flavor through the Maillard reaction."
    },
    {
        name: "🥗 Spinach Salad with Feta",
        ingredients: ["spinach", "feta cheese", "olive oil", "vinegar", "tomatoes"],
        steps: [
            "Wash fresh spinach leaves thoroughly and pat dry",
            "Place spinach in a large bowl",
            "Cut cherry tomatoes in half and add to the bowl",
            "Crumble feta cheese over the spinach and tomatoes",
            "Drizzle with olive oil (2-3 tablespoons)",
            "Add vinegar (1 tablespoon) for acidity",
            "Toss gently to combine and serve immediately"
        ],
        time: "10 minutes",
        diet: "vegetarian",
        method: "acid",
        shelfLife: "Best fresh, 1 day in fridge",
        chemistry: "Vinegar's acetic acid (pH 2.5) prevents bacterial growth and slows oxidation. Acid helps preserve nutrients and keeps vegetables fresh by creating an environment hostile to bacteria."
    },
    {
        name: "🍝 Garlic Lemon Pasta",
        ingredients: ["pasta", "garlic", "lemon", "olive oil", "herbs", "parmesan"],
        steps: [
            "Cook pasta in salted boiling water according to package directions",
            "While pasta cooks, heat olive oil in a large pan over medium heat",
            "Add minced garlic (3-4 cloves) and cook for 1-2 minutes until fragrant",
            "Reserve 1 cup of pasta water before draining",
            "Add drained pasta to the garlic oil",
            "Add lemon juice and zest, toss well",
            "Add pasta water gradually until sauce is creamy",
            "Stir in fresh herbs (basil or parsley) and grated parmesan",
            "Season with salt and pepper, serve immediately"
        ],
        time: "20 minutes",
        diet: "vegetarian",
        method: "acid",
        shelfLife: "3-4 days in fridge",
        chemistry: "Lemon's citric acid (pH 2-3) inhibits bacterial growth and prevents oxidation. The acid helps emulsify oil and water, creating a smooth sauce while preserving the dish."
    },
    {
        name: "🥘 Root Vegetable Curry",
        ingredients: ["potatoes", "carrots", "onion", "tomatoes", "spices", "oil"],
        steps: [
            "Heat oil in a large pot over medium heat",
            "Add cumin seeds and let them sizzle for 30 seconds",
            "Add chopped onions and cook until golden (5-6 minutes)",
            "Add ginger-garlic paste and cook for 2 minutes",
            "Add spices (turmeric, coriander, cumin powder) and stir for 1 minute",
            "Add diced tomatoes and cook until soft (8 minutes)",
            "Add cubed potatoes and carrots with 2 cups water",
            "Bring to boil, then simmer covered for 25 minutes until vegetables are tender",
            "Garnish with fresh cilantro and serve with rice or bread"
        ],
        time: "40 minutes",
        diet: "vegan",
        method: "heat",
        shelfLife: "4-5 days in fridge",
        chemistry: "Boiling at 212°F kills bacteria and breaks down tough vegetable fibers. Spices like turmeric contain antimicrobial compounds that help preserve food naturally."
    },  
    {
        name: "🍲 Cabbage and Bean Soup",
        ingredients: ["cabbage", "beans", "carrots", "onion", "garlic", "broth"],
        steps: [
            "If using dried beans, soak overnight and cook until tender (or use canned)",
            "Heat oil in a large pot over medium heat",
            "Sauté chopped onions and minced garlic until softened (4-5 minutes)",
            "Add chopped carrots and cook for 5 minutes",
            "Add shredded cabbage and cook until slightly wilted (3-4 minutes)",
            "Add diced tomatoes (if available), beans, and broth",
            "Bring to a boil, then reduce heat and simmer for 25-30 minutes",
            "Season with herbs (thyme, bay leaf), salt, and pepper",
            "Serve hot with crusty bread"
        ],
        time: "45 minutes",
        diet: "vegan",
        method: "heat",
        shelfLife: "5-6 days in fridge",
        chemistry: "Extended simmering creates a sterile environment by maintaining temperatures above 165°F, destroying harmful bacteria. The liquid helps distribute heat evenly, ensuring food safety."
    }
];
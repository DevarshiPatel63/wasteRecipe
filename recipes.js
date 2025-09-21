// Local Recipe Database
// This file contains a comprehensive database of waste-free recipes with ingredient mappings,
// food preservation chemistry explanations, and cultural context

const RECIPE_DATABASE = {
    recipes: [
        {
            id: 1,
            name: "Mediterranean Tomato Rice",
            ingredients: ["tomatoes", "rice", "onion", "garlic", "olive oil"],
            keyWords: ["tomato", "rice", "onion", "garlic", "oil"],
            dietaryType: "vegan",
            servings: 4,
            prepTime: "30 minutes",
            videoUrl: "https://www.youtube.com/watch?v=KTJB5rGD6a0",
            instructions: "1. Heat olive oil in a large pan over medium heat. 2. Sauté diced onions and minced garlic until fragrant (3-4 minutes). 3. Add diced tomatoes and cook until they break down (8-10 minutes). 4. Add rice and stir to coat with the tomato mixture. 5. Pour in 2 cups of warm water or broth. 6. Bring to a boil, then reduce heat and simmer covered for 18-20 minutes. 7. Let rest for 5 minutes before fluffing with a fork.",
            preservationMethod: "acid",
            shelfLife: "3-4 days refrigerated",
            chemistry: {
                title: "Acid Preservation in Tomatoes",
                explanation: "Tomatoes contain natural citric acid and malic acid, which create an acidic environment (pH 4.3-4.9) that inhibits harmful bacterial growth. The acidity helps preserve the dish while enhancing flavors through the Maillard reaction during cooking.",
                process: "The natural acids in tomatoes denature proteins in harmful bacteria, preventing spoilage and extending shelf life."
            },
            foodSafety: "Store in refrigerator within 2 hours of cooking. Reheat to 165°F (74°C) before serving. Do not leave at room temperature for more than 2 hours.",
            culturalContext: "This recipe draws from Mediterranean traditions where tomatoes and olive oil are staples. The combination maximizes the bioavailability of lycopene from tomatoes when paired with healthy fats.",
            nutritionalBenefits: "Rich in lycopene, vitamin C, and healthy monounsaturated fats"
        },
        {
            id: 2,
            name: "Asian Stir-Fried Vegetables",
            ingredients: ["cabbage", "carrots", "soy sauce", "ginger", "garlic", "oil"],
            keyWords: ["cabbage", "carrot", "soy", "ginger", "garlic", "oil", "vegetable"],
            dietaryType: "vegan",
            servings: 3,
            prepTime: "15 minutes",
            instructions: "1. Heat oil in a wok or large skillet over high heat. 2. Add minced ginger and garlic, stir-fry for 30 seconds. 3. Add sliced carrots first and cook for 2 minutes. 4. Add chopped cabbage and stir-fry for 3-4 minutes until crisp-tender. 5. Add soy sauce and toss to combine. 6. Cook for another 1-2 minutes. 7. Serve immediately while hot.",
            preservationMethod: "salt",
            shelfLife: "2-3 days refrigerated",
            chemistry: {
                title: "Salt Preservation and Fermentation",
                explanation: "Soy sauce contains high sodium content (up to 6% salt) which draws moisture out of ingredients through osmosis, creating an inhospitable environment for harmful bacteria while preserving nutrients.",
                process: "Salt denatures proteins and creates osmotic pressure that dehydrates bacterial cells, preventing spoilage and enhancing umami flavors."
            },
            foodSafety: "Best consumed fresh. Store leftovers in refrigerator and consume within 2-3 days. Reheat thoroughly before serving.",
            culturalContext: "Traditional Asian stir-frying technique preserves vegetables' nutrients and natural flavors while using minimal oil. The high-heat, quick-cooking method originated in China to conserve fuel.",
            nutritionalBenefits: "High in fiber, vitamin K, vitamin C, and antioxidants"
        },
        {
            id: 3,
            name: "Simple Spinach Salad",
            ingredients: ["spinach", "cheese", "oil", "vinegar"],
            keyWords: ["spinach", "cheese", "feta", "oil", "vinegar", "salad"],
            dietaryType: "vegetarian",
            servings: 2,
            prepTime: "10 minutes",
            instructions: "1. Wash and dry fresh spinach leaves. 2. Crumble cheese over spinach. 3. Drizzle with oil and vinegar. 4. Toss gently and serve immediately.",
            preservationMethod: "acid",
            shelfLife: "Best consumed fresh",
            chemistry: {
                title: "Acid Preservation",
                explanation: "Vinegar's acetic acid helps preserve the salad while enhancing flavors and nutrient absorption.",
                process: "Acid prevents oxidation and maintains freshness of leafy greens."
            },
            foodSafety: "Wash spinach thoroughly. Consume immediately for best quality.",
            culturalContext: "Simple Mediterranean-style salad that showcases fresh ingredients.",
            nutritionalBenefits: "High in iron, vitamins A and K, and calcium from cheese"
        },
        {
            id: 4,
            name: "Simple Chicken Stir-fry",
            ingredients: ["chicken", "vegetables", "soy sauce", "ginger", "garlic", "oil"],
            keyWords: ["chicken", "vegetable", "soy", "ginger", "garlic", "oil", "meat"],
            dietaryType: "non-vegetarian",
            servings: 4,
            prepTime: "25 minutes",
            videoUrl: "https://www.youtube.com/watch?v=nmEchGTdBrY",
            instructions: "1. Cut chicken into bite-sized pieces. 2. Heat oil in a wok over high heat. 3. Add chicken and cook until golden (5-6 minutes). 4. Add vegetables, ginger, and garlic. 5. Stir-fry for 3-4 minutes. 6. Add soy sauce and cook for 2 more minutes. 7. Serve hot.",
            preservationMethod: "heat",
            shelfLife: "3-4 days refrigerated",
            chemistry: {
                title: "Heat Treatment for Meat",
                explanation: "High-temperature cooking denatures proteins in chicken and destroys harmful bacteria, making the meat safe to eat and extending its shelf life.",
                process: "Heat coagulates proteins and destroys pathogenic microorganisms in meat while preserving nutrients."
            },
            foodSafety: "Cook chicken to internal temperature of 165°F (74°C). Store in refrigerator within 2 hours. Reheat thoroughly before serving.",
            culturalContext: "Quick stir-frying technique preserves nutrients while ensuring meat safety through proper heat treatment.",
            nutritionalBenefits: "High-quality protein, essential amino acids, and vitamins from vegetables"
        },
        {
            id: 5,
            name: "Soya Chunks Rice Bowl",
            ingredients: ["soya chunks", "rice", "onion", "spices", "oil", "tomatoes"],
            keyWords: ["soya", "chunks", "rice", "onion", "spices", "oil", "tomato", "protein"],
            dietaryType: "vegan",
            servings: 4,
            prepTime: "35 minutes",
            videoUrl: "https://www.youtube.com/watch?v=FLuQN4kE_rI",
            instructions: "1. Soak soya chunks in warm water for 15 minutes, then drain. 2. Heat oil in a pan and sauté onions until golden. 3. Add soaked soya chunks and cook for 5 minutes. 4. Add spices and diced tomatoes, cook until soft. 5. Add cooked rice and mix well. 6. Cook for 3-4 minutes until flavors blend. 7. Serve hot with fresh herbs.",
            preservationMethod: "heat",
            shelfLife: "3-4 days refrigerated",
            chemistry: {
                title: "Protein Denaturation and Heat Treatment",
                explanation: "Heat treatment denatures soy proteins making them more digestible while eliminating harmful bacteria. The cooking process also enhances flavor through Maillard reactions.",
                process: "Heat breaks down complex proteins into simpler forms and destroys any pathogens while preserving nutritional value."
            },
            foodSafety: "Ensure soya chunks are properly rehydrated and cooked thoroughly. Store in refrigerator within 2 hours of cooking.",
            culturalContext: "Soya chunks are a popular plant-based protein in Indian and Asian cuisines, providing meat-like texture without animal products.",
            nutritionalBenefits: "High in plant protein, fiber, and essential amino acids. Low in fat and cholesterol-free."
        }
    ],

    // Chemistry explanations for interactive modal
    chemistryExplanations: {
        salt: {
            title: "Salt Preservation - Nature's Original Preservative",
            explanation: "Salt preservation works through osmotic dehydration and creating an inhospitable environment for harmful bacteria. When salt is applied to food, it draws out moisture through osmosis, reducing water activity (aw) below 0.95, which most pathogenic bacteria need to survive.",
            process: "1. Osmosis: Salt draws water out of food and bacterial cells\n2. Dehydration: Reduced moisture prevents bacterial growth\n3. Protein denaturation: Salt denatures bacterial proteins\n4. Enhanced flavor: Concentrates natural flavors in food",
            examples: "Preserved lemons, salt-cured fish, sauerkraut, bacon",
            benefits: "Extends shelf life, enhances flavor, maintains texture, natural method"
        },
        acid: {
            title: "Acid Preservation - The Power of pH",
            explanation: "Acidic environments (pH below 4.6) prevent the growth of harmful bacteria, including Clostridium botulinum. Acids denature bacterial proteins and disrupt cell membranes, creating an inhospitable environment for pathogens.",
            process: "1. pH reduction: Acids lower environmental pH\n2. Protein denaturation: Acids unfold bacterial proteins\n3. Cell membrane disruption: Acids damage bacterial cell walls\n4. Enzyme inhibition: Acids prevent harmful enzyme activity",
            examples: "Pickled vegetables, vinegar preservation, citrus marinades, tomato-based sauces",
            benefits: "Safe preservation, enhanced digestion, vitamin C retention, probiotic potential"
        },
        heat: {
            title: "Heat Treatment - Thermal Destruction of Pathogens",
            explanation: "Heat treatment kills harmful microorganisms by denaturing their proteins and disrupting cellular structures. Different temperatures are effective against different pathogens, with 165°F (74°C) being the standard for most foods.",
            process: "1. Protein coagulation: Heat unfolds and coagulates proteins\n2. Cell membrane destruction: Heat damages cellular structures\n3. Enzyme deactivation: Heat destroys harmful enzymes\n4. Moisture reduction: Heat can remove water content",
            examples: "Cooking, pasteurization, canning, smoking",
            benefits: "Immediate pathogen destruction, enhanced digestibility, flavor development, versatile method"
        },
        oil: {
            title: "Oil Coating - Creating Protective Barriers",
            explanation: "Oil preservation works by creating an anaerobic (oxygen-free) environment that prevents oxidation and bacterial growth. Oil also extracts and preserves fat-soluble compounds while maintaining moisture in foods.",
            process: "1. Oxygen displacement: Oil creates anaerobic environment\n2. Moisture retention: Oil prevents water loss\n3. Compound extraction: Oil dissolves fat-soluble flavors\n4. Barrier formation: Oil coating prevents contamination",
            examples: "Confit, herb-infused oils, oil-packed vegetables, sardines in oil",
            benefits: "Extended shelf life, enhanced flavors, nutrient preservation, texture maintenance"
        },
        fermentation: {
            title: "Fermentation - Beneficial Bacteria at Work",
            explanation: "Fermentation uses beneficial bacteria to convert sugars into acids, alcohol, or gases. This process creates an acidic environment that preserves food while developing beneficial probiotics and enhanced nutritional value.",
            process: "1. Bacterial activity: Beneficial bacteria consume sugars\n2. Acid production: Bacteria produce lactic or acetic acid\n3. pH reduction: Acid lowers environmental pH\n4. Probiotic development: Beneficial bacteria multiply",
            examples: "Sauerkraut, kimchi, yogurt, sourdough, miso",
            benefits: "Probiotic development, enhanced nutrition, improved digestibility, unique flavors"
        }
    },

    // Ingredient mapping for search functionality
    ingredientMap: {
        // Vegetables
        'tomato': ['tomatoes', 'tomato'],
        'onion': ['onions', 'onion'],
        'garlic': ['garlic'],
        'carrot': ['carrots', 'carrot'],
        'cabbage': ['cabbage'],
        'herbs': ['herb', 'herbs', 'basil', 'parsley', 'cilantro', 'thyme', 'rosemary', 'oregano'],
        'vegetables': ['vegetable', 'vegetables', 'veggie', 'veggies'],
        'root vegetables': ['root', 'potato', 'potatoes', 'turnip', 'beet', 'parsnip'],

        // Proteins
        'chicken': ['chicken', 'poultry'],
        'fish': ['fish', 'salmon', 'cod', 'tuna'],
        'beans': ['bean', 'beans', 'lentils', 'chickpeas', 'legumes'],

        // Grains
        'rice': ['rice'],
        'pasta': ['pasta', 'noodles'],
        'bread': ['bread'],

        // Pantry items
        'oil': ['oil', 'olive oil', 'vegetable oil'],
        'vinegar': ['vinegar'],
        'salt': ['salt'],
        'spices': ['spice', 'spices'],
        'nuts': ['nuts', 'almonds', 'walnuts', 'pecans'],
        'cheese': ['cheese'],
        'lemon': ['lemon', 'citrus'],
        'broth': ['broth', 'stock'],
        'soy sauce': ['soy', 'soy sauce'],
        'ginger': ['ginger']
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RECIPE_DATABASE;
}
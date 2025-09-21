// Waste-Free Recipe Finder - Main Application Script
// This script handles the core functionality of the application including:
// - Local recipe database searching
// - Groq API integration for AI-generated recipes
// - User interface interactions
// - Food chemistry education components

// Global variables for application state
let currentApiKey = localStorage.getItem('groqApiKey') || ''
let isSearching = false;

// DOM elements - cached for better performance
const elementsCache = {
    ingredientsInput: null,
    findButton: null,
    apiKeySection: null,
    groqApiKeyInput: null,
    saveApiKeyButton: null,
    chemistryLegend: null,
    resultsSection: null,
    resultsTitle: null,
    recipeContainer: null,
    chemistryModal: null,
    modalTitle: null,
    modalContent: null,
    closeModal: null,
    videoModal: null,
    videoModalTitle: null,
    videoContainer: null,
    closeVideoModal: null,
    sidebar: null,
    sidebarToggle: null,
    closeSidebar: null,
    mainContent: null,
    errorMessage: null,
    errorText: null,
    loadingSpinner: null
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Waste-Free Recipe Finder initialized');

    // Cache DOM elements
    cacheElements();

    // Set up event listeners
    setupEventListeners();

    // Initialize API key if available
    initializeApiKey();
});

// Cache frequently used DOM elements for better performance
function cacheElements() {
    elementsCache.ingredientsInput = document.getElementById('ingredients');
    elementsCache.findButton = document.getElementById('findRecipes');
    elementsCache.apiKeySection = document.getElementById('apiKeySection');
    elementsCache.groqApiKeyInput = document.getElementById('groqApiKey');
    elementsCache.saveApiKeyButton = document.getElementById('saveApiKey');
    elementsCache.chemistryLegend = document.getElementById('chemistryLegend');
    elementsCache.resultsSection = document.getElementById('resultsSection');
    elementsCache.resultsTitle = document.getElementById('resultsTitle');
    elementsCache.recipeContainer = document.getElementById('recipeContainer');
    elementsCache.chemistryModal = document.getElementById('chemistryModal');
    elementsCache.modalTitle = document.getElementById('modalTitle');
    elementsCache.modalContent = document.getElementById('modalContent');
    elementsCache.closeModal = document.getElementById('closeModal');
    elementsCache.videoModal = document.getElementById('videoModal');
    elementsCache.videoModalTitle = document.getElementById('videoModalTitle');
    elementsCache.videoContainer = document.getElementById('videoContainer');
    elementsCache.closeVideoModal = document.getElementById('closeVideoModal');
    elementsCache.sidebar = document.getElementById('sidebar');
    elementsCache.sidebarToggle = document.getElementById('sidebarToggle');
    elementsCache.closeSidebar = document.getElementById('closeSidebar');
    elementsCache.mainContent = document.getElementById('mainContent');
    elementsCache.errorMessage = document.getElementById('errorMessage');
    elementsCache.errorText = document.getElementById('errorText');
    elementsCache.loadingSpinner = document.getElementById('loadingSpinner');
}

// Set up all event listeners for the application
function setupEventListeners() {
    // Main search functionality
    elementsCache.findButton.addEventListener('click', handleFindRecipes);

    // Allow Enter key to trigger search
    elementsCache.ingredientsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleFindRecipes();
        }
    });

    // API key management
    elementsCache.saveApiKeyButton.addEventListener('click', saveApiKey);
    elementsCache.groqApiKeyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveApiKey();
        }
    });

    // Modal interactions
    elementsCache.closeModal.addEventListener('click', closeChemistryModal);
    elementsCache.chemistryModal.addEventListener('click', function(e) {
        if (e.target === elementsCache.chemistryModal) {
            closeChemistryModal();
        }
    });

    // Video modal interactions
    elementsCache.closeVideoModal.addEventListener('click', closeVideoModal);
    elementsCache.videoModal.addEventListener('click', function(e) {
        if (e.target === elementsCache.videoModal) {
            closeVideoModal();
        }
    });

    // Sidebar interactions
    elementsCache.sidebarToggle.addEventListener('click', toggleSidebar);
    elementsCache.closeSidebar.addEventListener('click', closeSidebar);

    // Method cards in sidebar
    document.addEventListener('click', function(e) {
        const methodCard = e.target.closest('.method-card');
        if (methodCard) {
            const method = methodCard.dataset.method;
            showChemistryExplanation(method);
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (elementsCache.chemistryModal.style.display !== 'none') {
                closeChemistryModal();
            }
            if (elementsCache.videoModal.style.display !== 'none') {
                closeVideoModal();
            }
            if (elementsCache.sidebar.classList.contains('open')) {
                closeSidebar();
            }
        }
    });
}

// Initialize API key from localStorage
function initializeApiKey() {
    if (currentApiKey) {
        elementsCache.groqApiKeyInput.value = currentApiKey;
    }
}

// Main function to handle recipe search
async function handleFindRecipes() {
    if (isSearching) return; // Prevent multiple simultaneous searches

    const ingredients = elementsCache.ingredientsInput.value.trim();

    // Validate input
    if (!ingredients) {
        showError('Please enter some ingredients to search for recipes.');
        return;
    }

    // Clear previous results and errors
    hideError();
    hideResults();

    // Start search process
    isSearching = true;
    showLoading();
    updateButtonState(true);

    try {
        console.log('🔍 Searching for recipes with ingredients:', ingredients);

        // Step 1: Search local database first (prioritized)
        const localRecipes = searchLocalDatabase(ingredients);
        console.log(`📚 Found ${localRecipes.length} local recipes`);

        let allRecipes = [...localRecipes];

        // Step 2: Always try Groq API if available (for more recipe variety)
        if (currentApiKey) {
            console.log('🤖 Trying Groq API for additional recipes...');
            try {
                const aiRecipes = await searchGroqAPI(ingredients);
                allRecipes = [...allRecipes, ...aiRecipes];
                console.log(`🤖 Found ${aiRecipes.length} AI-generated recipes`);
            } catch (apiError) {
                console.error('API Error:', apiError);
                if (localRecipes.length === 0) {
                    showError('AI recipe generation failed. Check your API key or try different ingredients.');
                }
            }
        } else if (localRecipes.length === 0) {
            // Show API key input if no local results and no API key
            showApiKeySection();
        }

        // Display results
        if (allRecipes.length > 0) {
            displayRecipes(allRecipes);
        } else {
            showError('No recipes found for those ingredients. Try different combinations or add more ingredients.');
        }

    } catch (error) {
        console.error('Search error:', error);
        showError('An error occurred while searching for recipes. Please try again.');
    } finally {
        hideLoading();
        updateButtonState(false);
        isSearching = false;
    }
}

// Search the local recipe database
function searchLocalDatabase(ingredientsString) {
    const inputIngredients = parseIngredients(ingredientsString);
    const selectedDiet = document.querySelector('input[name="dietType"]:checked').value;
    console.log('🔍 Parsed ingredients:', inputIngredients);
    console.log('🥗 Selected diet:', selectedDiet);

    const matches = [];

    // Search through all recipes in the database
    RECIPE_DATABASE.recipes.forEach(recipe => {
        // Filter by dietary preference first
        if (selectedDiet !== 'all' && recipe.dietaryType !== selectedDiet) {
            return; // Skip this recipe if it doesn't match dietary preference
        }

        const score = calculateMatchScore(inputIngredients, recipe);
        if (score >= 3) {
            matches.push({
                ...recipe,
                matchScore: score,
                source: 'local'
            });
        }
    });

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);

    console.log('📊 Recipe matches with scores:', matches.map(m => ({name: m.name, score: m.matchScore})));

    return matches;
}

// Parse ingredients string into array of normalized ingredients
function parseIngredients(ingredientsString) {
    return ingredientsString
        .toLowerCase()
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
}

// Calculate match score between input ingredients and recipe
function calculateMatchScore(inputIngredients, recipe) {
    let score = 0;
    const recipeKeywords = recipe.keyWords || [];

    // Check each input ingredient against recipe keywords
    inputIngredients.forEach(inputIngredient => {
        // Direct keyword match (highest score)
        if (recipeKeywords.some(keyword => keyword.includes(inputIngredient) || inputIngredient.includes(keyword))) {
            score += 10;
            return;
        }

        // Check ingredient mapping for partial matches
        for (const [category, variations] of Object.entries(RECIPE_DATABASE.ingredientMap)) {
            if (variations.some(variation =>
                variation.includes(inputIngredient) ||
                inputIngredient.includes(variation)
            )) {
                if (recipeKeywords.includes(category) ||
                    recipeKeywords.some(keyword => keyword.includes(category))) {
                    score += 5;
                    break;
                }
            }
        }

        // Fuzzy matching for common ingredient variations
        recipeKeywords.forEach(keyword => {
            if (calculateSimilarity(inputIngredient, keyword) > 0.7) {
                score += 3;
            }
        });
    });

    return score;
}

// Calculate string similarity (simple implementation)
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

// Search Groq API for AI-generated recipes
async function searchGroqAPI(ingredients) {
    console.log('🔑 Using API key:', currentApiKey ? 'Available' : 'Missing');
    if (!currentApiKey) {
        throw new Error('No API key provided');
    }

    const selectedDiet = document.querySelector('input[name="dietType"]:checked').value;
    const dietaryNote = selectedDiet !== 'all' ?
        `IMPORTANT: This recipe must be ${selectedDiet}. Do not include any non-${selectedDiet} ingredients.` :
        '';

    const prompt = `Create a waste-free recipe using these leftover ingredients: ${ingredients}

${dietaryNote}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no extra text before or after):

{
    "name": "Recipe Name",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": "1. Step one. 2. Step two. 3. Step three.",
    "preservationMethod": "heat",
    "shelfLife": "3-4 days refrigerated",
    "chemistry": {
        "title": "Heat Treatment",
        "explanation": "Scientific explanation",
        "process": "How it works"
    },
    "foodSafety": "Storage tips",
    "culturalContext": "Background info",
    "servings": 4,
    "prepTime": "30 minutes",
    "videoUrl": "https://www.youtube.com/results?search_query=how+to+cook+RECIPE_NAME"
}

Make it educational for Grade 9 students. Return ONLY the JSON object.`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a culinary expert specializing in food science and waste-free cooking. Generate educational recipes with scientific explanations suitable for Grade 9 students.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        console.log('🤖 Raw AI response:', content);

        // Parse JSON response - try multiple methods
        let recipe;
        try {
            // Method 1: Find JSON block
            const jsonStart = content.indexOf('{');
            const jsonEnd = content.lastIndexOf('}') + 1;

            if (jsonStart === -1 || jsonEnd === 0) {
                throw new Error('No JSON found in response');
            }

            const jsonString = content.substring(jsonStart, jsonEnd);
            console.log('🧪 Extracted JSON:', jsonString);
            recipe = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('❌ JSON parse failed:', parseError);
            // Fallback: Create a simple recipe from the text response
            const cleanContent = content.replace(/[{}]/g, '').trim();
            const fallbackInstructions = cleanContent.length > 50 ?
                cleanContent :
                `1. Prepare your ${ingredients.split(',').map(i => i.trim()).join(', ')}. 2. Cook ingredients together using your preferred method. 3. Season to taste and serve hot. 4. Store leftovers in refrigerator.`;

            recipe = {
                name: `Waste-Free Recipe with ${ingredients}`,
                ingredients: ingredients.split(',').map(i => i.trim()),
                instructions: fallbackInstructions,
                preservationMethod: 'heat',
                shelfLife: '3-4 days refrigerated',
                chemistry: {
                    title: 'Heat Treatment',
                    explanation: 'Cooking with heat eliminates harmful bacteria and extends shelf life while making ingredients more digestible.',
                    process: 'Heat denatures proteins in harmful bacteria and breaks down cell walls, making nutrients more available.'
                },
                foodSafety: 'Store in refrigerator within 2 hours of cooking. Reheat thoroughly before serving leftovers.',
                culturalContext: 'This simple preparation method reduces food waste while creating nutritious meals from available ingredients.',
                servings: 4,
                prepTime: '30 minutes'
            };
        }

        // Add required fields and format for display
        return [{
            ...recipe,
            id: Date.now(), // Unique ID for AI recipes
            source: 'ai',
            keyWords: recipe.ingredients || [],
            matchScore: 5 // Medium score for AI recipes
        }];

    } catch (error) {
        console.error('Groq API Error:', error);
        throw error;
    }
}

// Display recipes in the UI
function displayRecipes(recipes) {
    elementsCache.recipeContainer.innerHTML = '';

    // Update results title
    const localCount = recipes.filter(r => r.source === 'local').length;
    const aiCount = recipes.filter(r => r.source === 'ai').length;

    let titleText = `Found ${recipes.length} Recipe${recipes.length !== 1 ? 's' : ''}`;
    if (localCount > 0 && aiCount > 0) {
        titleText += ` (${localCount} local, ${aiCount} AI-generated)`;
    } else if (aiCount > 0) {
        titleText += ` (AI-generated)`;
    }

    elementsCache.resultsTitle.textContent = titleText;

    // Create recipe cards
    recipes.forEach((recipe, index) => {
        const recipeCard = createRecipeCard(recipe, index);
        elementsCache.recipeContainer.appendChild(recipeCard);
    });

    showResults();
}

// Create a recipe card element
function createRecipeCard(recipe, index) {
    const cardCol = document.createElement('div');
    cardCol.className = 'col-12 col-md-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'card recipe-card h-100 shadow border-0 fade-in';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <div class="card-header bg-light border-bottom-0">
            <h5 class="card-title mb-2 fw-bold">${recipe.name}</h5>
            <div class="d-flex flex-wrap gap-2 mb-2">
                <span class="badge chemistry-badge ${recipe.preservationMethod} px-3 py-2" onclick="showChemistryExplanation('${recipe.preservationMethod}')" style="cursor: pointer;">
                    ${getPreservationIcon(recipe.preservationMethod)} ${getPreservationName(recipe.preservationMethod)}
                </span>
                <span class="badge dietary-badge ${recipe.dietaryType || 'all'} px-3 py-2">
                    ${getDietaryIcon(recipe.dietaryType || 'all')} ${getDietaryName(recipe.dietaryType || 'all')}
                </span>
                ${recipe.source === 'ai' ? '<span class="badge bg-primary px-3 py-2">🤖 AI Generated</span>' : ''}
            </div>
            <div class="shelf-life p-2 rounded mb-2">
                ⏰ Shelf life: ${recipe.shelfLife}
            </div>
            <small class="text-muted">
                👥 Serves ${recipe.servings || 4} • ⏱️ ${recipe.prepTime || '30 minutes'}
            </small>
        </div>

        <div class="card-body">
            <h6 class="fw-semibold mb-2">🥄 Ingredients</h6>
            <ul class="list-unstyled mb-3">
                ${recipe.ingredients.map(ingredient => `<li class="mb-1"><small>• ${ingredient}</small></li>`).join('')}
            </ul>

            <h6 class="fw-semibold mb-2">👨‍🍳 Instructions</h6>
            <p class="small mb-3">${recipe.instructions}</p>

            ${recipe.videoUrl ? `
                <button class="btn video-button btn-sm mb-3 text-white" onclick="showVideoModal('${recipe.videoUrl}', '${recipe.name}')">
                    📹 Watch Video Tutorial
                </button>
            ` : ''}

            ${recipe.chemistry ? `
                <div class="chemistry-explanation p-3 rounded mb-3">
                    <h6 class="fw-semibold mb-2">🧪 ${recipe.chemistry.title}</h6>
                    <small>${recipe.chemistry.explanation}</small>
                </div>
            ` : ''}

            ${recipe.foodSafety ? `
                <div class="food-safety p-3 rounded mb-3">
                    <h6 class="fw-semibold mb-2">⚠️ Food Safety</h6>
                    <small>${recipe.foodSafety}</small>
                </div>
            ` : ''}

            ${recipe.culturalContext ? `
                <div class="cultural-context p-3 rounded">
                    <h6 class="fw-semibold mb-2">🌍 Cultural Context</h6>
                    <small>${recipe.culturalContext}</small>
                </div>
            ` : ''}
        </div>
    `;

    cardCol.appendChild(card);
    return cardCol;
}

// Get preservation method icon
function getPreservationIcon(method) {
    const icons = {
        salt: '🧂',
        acid: '🍋',
        heat: '🔥',
        oil: '🫒',
        fermentation: '🦠'
    };
    return icons[method] || '🔬';
}

// Get preservation method display name
function getPreservationName(method) {
    const names = {
        salt: 'Salt Preservation',
        acid: 'Acid Preservation',
        heat: 'Heat Treatment',
        oil: 'Oil Coating',
        fermentation: 'Fermentation'
    };
    return names[method] || 'Chemical Process';
}

// Get dietary type icon
function getDietaryIcon(type) {
    const icons = {
        all: '🍽️',
        vegetarian: '🥬',
        vegan: '🌱',
        'non-vegetarian': '🍖'
    };
    return icons[type] || '🍽️';
}

// Get dietary type display name
function getDietaryName(type) {
    const names = {
        all: 'All Diets',
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        'non-vegetarian': 'Non-Vegetarian'
    };
    return names[type] || 'All Diets';
}

// Show chemistry explanation in modal
function showChemistryExplanation(method) {
    const explanation = RECIPE_DATABASE.chemistryExplanations[method];

    if (!explanation) {
        console.error('No explanation found for method:', method);
        return;
    }

    elementsCache.modalTitle.textContent = explanation.title;
    elementsCache.modalContent.innerHTML = `
        <div class="chemistry-modal-content">
            <h4>How it works:</h4>
            <p>${explanation.explanation}</p>

            <h4>The Process:</h4>
            <p style="white-space: pre-line;">${explanation.process}</p>

            <h4>Examples:</h4>
            <p>${explanation.examples}</p>

            <h4>Benefits:</h4>
            <p>${explanation.benefits}</p>
        </div>
    `;

    elementsCache.chemistryModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close chemistry modal
function closeChemistryModal() {
    elementsCache.chemistryModal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Show video modal with YouTube embed
function showVideoModal(videoUrl, recipeName) {
    // Check if it's a search URL (for AI recipes)
    if (videoUrl.includes('youtube.com/results?search_query=')) {
        const searchTerm = videoUrl.split('search_query=')[1];
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm.replace('RECIPE_NAME', recipeName))}`;
        window.open(searchUrl, '_blank');
        return;
    }

    // Convert YouTube URL to embed format (for local recipes)
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) {
        showError('Invalid YouTube video URL');
        return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    elementsCache.videoModalTitle.textContent = `${recipeName} - Video Tutorial`;
    elementsCache.videoContainer.innerHTML = `
        <iframe
            src="${embedUrl}"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
        </iframe>
    `;

    elementsCache.videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close video modal
function closeVideoModal() {
    elementsCache.videoModal.style.display = 'none';
    elementsCache.videoContainer.innerHTML = ''; // Stop video playback
    document.body.style.overflow = ''; // Restore scrolling
}

// Extract YouTube video ID from various URL formats
function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}

// Save API key to localStorage
function saveApiKey() {
    const apiKey = elementsCache.groqApiKeyInput.value.trim();

    if (!apiKey) {
        showError('Please enter a valid API key.');
        return;
    }

    currentApiKey = apiKey;
    localStorage.setItem('groqApiKey', apiKey);
    hideApiKeySection();
    showSuccess('API key saved successfully! You can now get AI-generated recipes.');

    console.log('✅ API key saved');
}

// Show API key input section
function showApiKeySection() {
    elementsCache.apiKeySection.style.display = 'block';
}

// Hide API key input section
function hideApiKeySection() {
    elementsCache.apiKeySection.style.display = 'none';
}

// Sidebar functions
function toggleSidebar() {
    const isOpen = elementsCache.sidebar.classList.contains('open');
    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    elementsCache.sidebar.classList.add('open');
    elementsCache.mainContent.classList.add('shifted');
}

function closeSidebar() {
    elementsCache.sidebar.classList.remove('open');
    elementsCache.mainContent.classList.remove('shifted');
}

// Show results section
function showResults() {
    elementsCache.resultsSection.style.display = 'block';
}

// Hide results section
function hideResults() {
    elementsCache.resultsSection.style.display = 'none';
}

// Show loading spinner
function showLoading() {
    elementsCache.loadingSpinner.style.display = 'block';
}

// Hide loading spinner
function hideLoading() {
    elementsCache.loadingSpinner.style.display = 'none';
}

// Update button state during search
function updateButtonState(searching) {
    if (searching) {
        elementsCache.findButton.disabled = true;
        elementsCache.findButton.querySelector('.button-text').style.display = 'none';
        elementsCache.findButton.querySelector('.button-loader').style.display = 'inline';
    } else {
        elementsCache.findButton.disabled = false;
        elementsCache.findButton.querySelector('.button-text').style.display = 'inline';
        elementsCache.findButton.querySelector('.button-loader').style.display = 'none';
    }
}

// Show error message
function showError(message) {
    elementsCache.errorText.textContent = message;
    elementsCache.errorMessage.style.display = 'flex';

    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message
function hideError() {
    elementsCache.errorMessage.style.display = 'none';
}

// Show success message (reusing error styling with different color)
function showSuccess(message) {
    elementsCache.errorText.textContent = message;
    elementsCache.errorMessage.style.background = '#d4edda';
    elementsCache.errorMessage.style.color = '#155724';
    elementsCache.errorMessage.style.borderColor = '#c3e6cb';
    elementsCache.errorMessage.style.display = 'flex';

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
        hideError();
        // Reset to error styling
        elementsCache.errorMessage.style.background = '#f8d7da';
        elementsCache.errorMessage.style.color = '#721c24';
        elementsCache.errorMessage.style.borderColor = '#f5c6cb';
    }, 3000);
}

// Utility function to debounce API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive features for educational purposes
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for legend items to show explanations
    document.addEventListener('click', function(e) {
        if (e.target.closest('.legend-item')) {
            const legendItem = e.target.closest('.legend-item');
            const method = Array.from(legendItem.classList).find(cls =>
                ['salt', 'acid', 'heat', 'oil', 'fermentation'].includes(cls)
            );
            if (method) {
                showChemistryExplanation(method);
            }
        }
    });
});

console.log('📱 Waste-Free Recipe Finder script loaded successfully!');
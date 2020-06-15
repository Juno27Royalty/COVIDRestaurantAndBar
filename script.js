// 1. Displays food search on left and cocktail search on right
  // 1.1. Food pulls from themealdb.com api and drinks pulls from thecocktaildb.com api
  // 1.2. User will be able to search based on main ingredient/alcohol 
    // 1.2.1. Dropdown menu
    // *1.2.2. Free input
  // *1.3. User can filter results based on category or region

// 2. Takes user input of preferred ingredient
  // 2.1. App searches from database and displays random result from list

// 3. Modal popup of recommended recipe
  // 3.1. Choice to close modal/be redirected to cocktail selection
  // *3.2. Button to reroll random result recommendation

// *4. Random meal and random cocktail function

// *5. Nutritional fact option for each ingredent listed

// *6. Design main page to toggle between food and drink search

// *Stretch goals

const covidRBApp = {};

// Select Ingredients

covidRBApp.userSelection = () => {
  $(`form`).on(`submit`, function(e) {
    e.preventDefault();
    
    if ($(this).hasClass(`meal`)) {
      let choice = this[0].value;
      covidRBApp.getID(choice);
      covidRBApp.modal(`.foodResults`);
      covidRBApp.randomRecipe(choice);
    } 
    else if ($(this).hasClass(`cocktail`)) {
      covidRBApp.getDrinkID(this[0].value);
      covidRBApp.modal(`.drinkResults`);
      covidRBApp.randomRecipe(this[0].value)
    }
  })
}

// Call Food

covidRBApp.getID = (query) => {
  $.ajax({
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
    method: `GET`,
    dataType: `json`,
    })
    .then( idResponse => {
    const randomizedMealNumber = Math.floor(Math.random() * idResponse.meals.length);

    const randomizedMealId = idResponse.meals[randomizedMealNumber].idMeal;

    covidRBApp.getRecipe(randomizedMealId);
  })
}

covidRBApp.getRecipe = (mealId) => {
  $.ajax({
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    method:'GET',
    dataType:'json',
  }).then ( (recipeResponse) => {
    covidRBApp.cleanObject(recipeResponse);
  })
}

covidRBApp.cleanObject = (recipeObject) => {
  covidRBApp.cleanup =  recipeObject.meals[0];

  for (let key in covidRBApp.cleanup) {
    if (covidRBApp.cleanup[key] == null) {
      covidRBApp.cleanup[key] = "";
    }
  }
  
  covidRBApp.displayRecipe(covidRBApp.cleanup)
}

covidRBApp.displayRecipe = (recipe) => {
  $(".foodResults").html(`
    <h3>${recipe.strMeal}</h3>
    <img class="resultImg" src = "${recipe.strMealThumb}"></img>
    <div class="ingredients">
      <h4>Ingredients:</h4>
      <ul>
        <li>${recipe.strMeasure1} ${recipe.strIngredient1}</li>
        <li>${recipe.strMeasure2} ${recipe.strIngredient2}</li>
        <li>${recipe.strMeasure3} ${recipe.strIngredient3}</li>
        <li>${recipe.strMeasure4} ${recipe.strIngredient4}</li>
        <li>${recipe.strMeasure5} ${recipe.strIngredient5}</li>
        <li>${recipe.strMeasure6} ${recipe.strIngredient6}</li>
        <li>${recipe.strMeasure7} ${recipe.strIngredient7}</li>
        <li>${recipe.strMeasure8} ${recipe.strIngredient8}</li>
        <li>${recipe.strMeasure9} ${recipe.strIngredient9}</li>
        <li>${recipe.strMeasure10} ${recipe.strIngredient10}</li>
        <li>${recipe.strMeasure11} ${recipe.strIngredient11}</li>
        <li>${recipe.strMeasure12} ${recipe.strIngredient12}</li>
        <li>${recipe.strMeasure13} ${recipe.strIngredient13}</li>
        <li>${recipe.strMeasure14} ${recipe.strIngredient14}</li>
        <li>${recipe.strMeasure15} ${recipe.strIngredient15}</li>
        <li>${recipe.strMeasure16} ${recipe.strIngredient16}</li>
        <li>${recipe.strMeasure17} ${recipe.strIngredient17}</li>
        <li>${recipe.strMeasure18} ${recipe.strIngredient18}</li>
        <li>${recipe.strMeasure19} ${recipe.strIngredient19}</li>
        <li>${recipe.strMeasure20} ${recipe.strIngredient20}</li>
      </ul>
    </div>
    <div class="recipe"><h4>Directions:</h4>
      <p>${recipe.strInstructions}</p>
      <div class="video">
        <a class="recipeVideo" href="${recipe.strYoutube}" target="_blank">Click here for the recipe video!</a>
      </div>
    </div>
    <button class="randomize meal">I'm not feeling this one. Give me another.</button>
    <button class="closeModal">I'm full! Now I'm thirsty.</button>
  `);
}

// Call Drink

covidRBApp.getDrinkID = (query) => {
  $.ajax({
    url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,
    method: `GET`,
    dataType: `json`,
  }).then(idResponse => {
    const randomizedDrinkNumber = Math.floor(Math.random() * idResponse.drinks.length);

    const randomizedDrinkId = idResponse.drinks[randomizedDrinkNumber].idDrink

    covidRBApp.getDrinkRecipe(randomizedDrinkId)
  })
}

covidRBApp.getDrinkRecipe = (drinkId) => {
  $.ajax({
    url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
    method: 'GET',
    dataType: 'json',
  }).then((recipe) => {
    covidRBApp.cleanDrinkObject(recipe);
  })
}

covidRBApp.cleanDrinkObject = (recipeObject) => {
  covidRBApp.cleanupDrink = recipeObject.drinks[0];
  for (let key in covidRBApp.cleanupDrink) {
    if (covidRBApp.cleanupDrink[key] == null) {
      covidRBApp.cleanupDrink[key] = "" ;
    }
  }

  covidRBApp.displayDrinkRecipe(covidRBApp.cleanupDrink)
}

covidRBApp.displayDrinkRecipe = (recipe) => {
  $(".drinkResults").html(`
    <h3>${recipe.strDrink}</h3>
    <img class="resultImg" src = "${recipe.strDrinkThumb}"></img>
    <div class="ingredients">
    <h4>Ingredients:</h4>
      <ul>
        <li>${recipe.strMeasure1} ${recipe.strIngredient1}</li>
        <li>${recipe.strMeasure2} ${recipe.strIngredient2}</li>
        <li>${recipe.strMeasure3} ${recipe.strIngredient3}</li>
        <li>${recipe.strMeasure4} ${recipe.strIngredient4}</li>
        <li>${recipe.strMeasure5} ${recipe.strIngredient5}</li>
        <li>${recipe.strMeasure6} ${recipe.strIngredient6}</li>
        <li>${recipe.strMeasure7} ${recipe.strIngredient7}</li>
        <li>${recipe.strMeasure8} ${recipe.strIngredient8}</li>
        <li>${recipe.strMeasure9} ${recipe.strIngredient9}</li>
        <li>${recipe.strMeasure10} ${recipe.strIngredient10}</li>
        <li>${recipe.strMeasure11} ${recipe.strIngredient11}</li>
        <li>${recipe.strMeasure12} ${recipe.strIngredient12}</li>
        <li>${recipe.strMeasure13} ${recipe.strIngredient13}</li>
        <li>${recipe.strMeasure14} ${recipe.strIngredient14}</li>
        <li>${recipe.strMeasure15} ${recipe.strIngredient15}</li>
      </ul>
    </div>
    <div class="recipe"><h4>Directions:</h4>${recipe.strInstructions}</div>
    <button class="randomize cocktail">I'm not feeling this one. Give me another.</button>
    <button class="closeModal">Thirst quenched! Now I'm hungry.</button>
  `);
};

// Modal Functionality

covidRBApp.modal = (whichRecipe) => {
  $(whichRecipe).addClass(`show`);

  $(`.modal`).on(`click`, `.closeModal`, () => {
    $(whichRecipe).removeClass(`show`);
  })
};

// Randomize Button

covidRBApp.randomRecipe = (selectedIngredient) => {
  $(`.modal`).on(`click`, `.randomize`, function() {
    if ($(this).parent().hasClass(`foodResults`)) {
      $(`.foodResults`).removeClass(`show`);
      covidRBApp.getID(selectedIngredient)
      setTimeout(function(){ $(`.foodResults`).addClass(`show`); }, 300);
    }
    else if ($(this).parent().hasClass(`drinkResults`)) {
      $(`.drinkResults`).removeClass(`show`);
      covidRBApp.getDrinkID(selectedIngredient)
      setTimeout(function(){ $(`.drinkResults`).addClass(`show`); }, 300);
    }
  })
}

covidRBApp.init = () => {
  covidRBApp.userSelection();
}

$(() => {
  covidRBApp.init();
});
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

covidRBApp.getID = (query) => {
  $.ajax({
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
    method: `GET`,
    dataType: `json`,
  }).then( idResponse => {
    const randomizedMealNumber = Math.floor(Math.random() * idResponse.meals.length);

    const randomizedMealId = idResponse.meals[randomizedMealNumber].idMeal

    covidRBApp.getRecipe(randomizedMealId)
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
        <li>${recipe.strIngredient1} ${recipe.strMeasure1}</li>
        <li>${recipe.strIngredient2} ${recipe.strMeasure2}</li>
        <li>${recipe.strIngredient3} ${recipe.strMeasure3}</li>
        <li>${recipe.strIngredient4} ${recipe.strMeasure4}</li>
        <li>${recipe.strIngredient5} ${recipe.strMeasure5}</li>
        <li>${recipe.strIngredient6} ${recipe.strMeasure6}</li>
        <li>${recipe.strIngredient7} ${recipe.strMeasure7}</li>
        <li>${recipe.strIngredient8} ${recipe.strMeasure8}</li>
        <li>${recipe.strIngredient9} ${recipe.strMeasure9}</li>
        <li>${recipe.strIngredient10} ${recipe.strMeasure10}</li>
        <li>${recipe.strIngredient11} ${recipe.strMeasure11}</li>
        <li>${recipe.strIngredient12} ${recipe.strMeasure12}</li>
        <li>${recipe.strIngredient13} ${recipe.strMeasure13}</li>
        <li>${recipe.strIngredient14} ${recipe.strMeasure14}</li>
        <li>${recipe.strIngredient15} ${recipe.strMeasure15}</li>
        <li>${recipe.strIngredient16} ${recipe.strMeasure16}</li>
        <li>${recipe.strIngredient17} ${recipe.strMeasure17}</li>
        <li>${recipe.strIngredient18} ${recipe.strMeasure18}</li>
        <li>${recipe.strIngredient19} ${recipe.strMeasure19}</li>
        <li>${recipe.strIngredient20} ${recipe.strMeasure20}</li>
      </ul>
    </div>
    <div class="recipe"><h4>Directions:</h4>${recipe.strInstructions}
      <div class="video">
        <a class="recipeVideo" href="${recipe.strYoutube}" target="_blank">Click here for the recipe video!</a>
      </div>
    </div>
  `);
 
}
covidRBApp.getID('chicken')


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
        <li>${recipe.strIngredient1} ${recipe.strMeasure1}</li>
        <li>${recipe.strIngredient2} ${recipe.strMeasure2}</li>
        <li>${recipe.strIngredient3} ${recipe.strMeasure3}</li>
        <li>${recipe.strIngredient4} ${recipe.strMeasure4}</li>
        <li>${recipe.strIngredient5} ${recipe.strMeasure5}</li>
        <li>${recipe.strIngredient6} ${recipe.strMeasure6}</li>
        <li>${recipe.strIngredient7} ${recipe.strMeasure7}</li>
        <li>${recipe.strIngredient8} ${recipe.strMeasure8}</li>
        <li>${recipe.strIngredient9} ${recipe.strMeasure9}</li>
        <li>${recipe.strIngredient10} ${recipe.strMeasure10}</li>
        <li>${recipe.strIngredient11} ${recipe.strMeasure11}</li>
        <li>${recipe.strIngredient12} ${recipe.strMeasure12}</li>
        <li>${recipe.strIngredient13} ${recipe.strMeasure13}</li>
        <li>${recipe.strIngredient14} ${recipe.strMeasure14}</li>
        <li>${recipe.strIngredient15} ${recipe.strMeasure15}</li>
      </ul>
    </div>
    <div class="recipe"><h4>Directions:</h4>${recipe.strInstructions}</div>`);
}



// covidRBApp.getDrinkID(`vodka`)




// covidRBApp.userSelection = () => {
//   $(`select`).on('change', function() {
//     const selected = this.value
//     covidRBApp.getID(selected)
//   })
// }

// covidRBApp.init = () => {
//   covidRBApp.userSelection();
// }

// $(() => {
//   covidRBApp.init();
// });


// $("#meal option:selected").val()
// let userMealSelection = $('select[name="meal"]:selected').val();

// console.log(covidRBApp.selectedMeal)

// let userDrinkSelection = $('select[name="meal"]:selected').val();
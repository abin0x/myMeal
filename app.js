const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));


document.addEventListener('DOMContentLoaded', getInitialMeals);
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);


function getInitialMeals() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-4 mb-4">
                            <div class="card meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}/preview" class="card-img-top" alt="${meal.strMeal}">
                                </div>
                                <div class="card-body text-center">
                                    <h5 class="card-title meal-name">${meal.strMeal}</h5>
                                    <a href="#" class="btn btn-primary recipe-btn">Get Recipe</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            mealList.innerHTML = html;
        });
}


function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-4 mb-4">
                            <div class="card meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}/preview" class="card-img-top" alt="${meal.strMeal}">
                                </div>
                                <div class="card-body text-center">
                                    <h5 class="card-title meal-name">${meal.strMeal}</h5>
                                    <a href="#" class="btn btn-primary recipe-btn">Get Recipe</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = `<div class="col-12 text-center"><p class="text-danger">Sorry, we didn't find any meal!</p></div>`;
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
}


function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.closest('.meal-item');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}


function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    recipeModal.show();
}

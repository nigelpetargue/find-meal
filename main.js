// https://www.themealdb.com/api/json/v1/1/random.php
const btnGetMeal = document.querySelector('.get-meal');
const div_meal = document.querySelector('.meal');


// Events
btnGetMeal.addEventListener('click', getRandomMeal);

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomMeal = await resp.json();
    const meal = randomMeal.meals[0];
    
    createMeal(meal);
}


function createMeal(meal) {

    // Get all the ingredients 
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        }else {
            // Stop is there are no more ingredients
            break;  
        }
    }

    // Create new element
    const html = `
        <div class="col">
            <div class="meal-recipe">
                <div class="col-1">
                    <img class="meal-img" src="${meal.strMealThumb}">
                    <div class="meal-description">
                        <p>
                            <span class="description">Category: </span> ${
                                meal.strCategory ? meal.strCategory : ''
                            }
                        </p>
                        <p>
                            <span class="description">Area: </span> ${
                                meal.strArea ? meal.strArea : ''
                            }
                        </p>
                        <p>
                            <span class="description">Tags: </span> ${
                                meal.strTags ? meal.strTags.split(',').join(', ') : ''
                            }
                        </p>
                    </div>
                    <div class="meal-ingreadients">
                        <h2>Ingredients</h2>
                        <ul>
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="col2">
                    <h2 class="meal-title">${meal.strMeal}</h2>
                    <p class="meal-instruction">${meal.strInstructions}</p>
                </div>
            </div>
            <div class="meal-video">
                <h2>Video Recipe</h2>
                <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" frameborder="0" width="920" height="315"></iframe>
            </div>
        </div>
    `
    div_meal.innerHTML = html
}

// getRandomMeal()
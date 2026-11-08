//links&sections
let links = document.querySelectorAll(".nav-link")
let sections = document.querySelectorAll("#meals-section, #products-section, #foodlog-section")

links.forEach((link,index) => {
    link.addEventListener("click", function() {
        sections.forEach((section) => {
            section.classList.add("hidden")
        })
        sections[index].classList.remove("hidden")
        mealDetails.classList.add("hidden")
          let route = link.dataset.route;
        history.pushState({}, "", route);
    })
    
})

import * as meals from "./api/mealdb.js"
import * as state from "./state/appState.js"
import * as componant from "./ui/components.js"

//load categories and random meals
async function loadCategories() {
    let data = await meals.mealsCategrys()
    state.appState.mealsCategrys = data.results
    console.log(state.appState.mealsCategrys);
    document.getElementById("categories-grid").innerHTML = componant.createcategoryCard(state.appState.mealsCategrys)


}
loadCategories()

async function loadRandomMeals() {
    let data = await meals.randomMeal()
    state.randomMeals.meals = data.results
    console.log(state.randomMeals.meals);
    document.getElementById("recipes-grid").innerHTML = componant.handleRamdomMeals(state.randomMeals.meals)

updateRecipesCount(state.randomMeals.meals.length)
}

loadRandomMeals()

 

//search input
let searchInput = document.getElementById("search-input")
searchInput.addEventListener("input", function(e) {
    let searchValue = e.target.value.toLowerCase()
    let filteredMeals = state.randomMeals.meals.filter((meal) => {
        return( meal.name.toLowerCase().includes(searchValue) || meal.ingredients.
        some((item) => item.ingredient.toLowerCase().includes(searchValue)))
})
document.getElementById("recipes-grid").innerHTML = componant.handleRamdomMeals(filteredMeals)
updateRecipesCount(filteredMeals.length)
        notFoundMessage(filteredMeals)
})

//Filter recipes when clicking on a category

let categoryCards = document.getElementById("categories-grid")

    categoryCards.addEventListener("click",  function(e) {
    let categryName = e.target.closest(".category-card").dataset.category
    let filteredMeals = state.randomMeals.meals.filter((meal) => {
        return meal.category === categryName
    })
    
        document.getElementById("recipes-grid").innerHTML = componant.handleRamdomMeals(filteredMeals)
        updateRecipesCount(filteredMeals.length)
        notFoundMessage(filteredMeals)

    })

//not found message
function notFoundMessage(filteredMeals) {
    if(filteredMeals.length === 0) {
    document.getElementById("recipes-grid").innerHTML = `<p class="text-center text-gray-500">No recipes found</p>`
}
}    

// recipesCount
function updateRecipesCount(count) {
     let recipesCount = document.getElementById("recipes-count")
     recipesCount.textContent = `Showing ${count} recipes`
}

//Show meal details when clicking on a recipe card
let recipesGrid = document.getElementById("recipes-grid")
let mealDetails = document.getElementById("meal-details")
let mealsSection = document.getElementById("meals-section")
recipesGrid.addEventListener("click",async function(e) {
     mealDetails.classList.remove("hidden")
     mealsSection.classList.add("hidden")

     let cardId = e.target.closest(".recipe-card").dataset.mealId
     let meal = state.randomMeals.meals.find((meal) => meal.id === cardId)

     let result = await meals.getNutrition(meal)
     
     document.getElementById("meal-details-content").innerHTML = componant.handleMealDetails(meal,result);
    })

//Close meal details when clicking on the close button   
let closeBtn = document.getElementById("back-to-meals-btn") 
closeBtn.addEventListener("click", function() {
     mealDetails.classList.add("hidden")
     mealsSection.classList.remove("hidden")
})


//all recipes button
let allRecipesBtn = document.getElementById("all-recipes")
allRecipesBtn.addEventListener("click", function() {
     document.getElementById("recipes-grid").innerHTML = componant.handleRamdomMeals(state.randomMeals.meals)
     updateRecipesCount(state.randomMeals.meals.length)
    
})

//areas buttons
async function loadareas() {
    let data = await meals.mealArea()
    state.mealsArea.area = data.results
    document.getElementById("areas").innerHTML = componant.handelAreas(state.mealsArea.area)


}
loadareas()








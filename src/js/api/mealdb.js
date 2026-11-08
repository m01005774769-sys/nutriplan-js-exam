async function mealsCategrys() {
    try{
        let data = await fetch("https://nutriplan-api.vercel.app/api/meals/categories")
        if(!data.ok){
            throw new Error("somthing went wrong ")
        }
        let result = await data.json()
        return result;

    }catch(error){
        console.log(err)
    }
}

async function randomMeal() {
     let savedMeals = localStorage.getItem("meals");

    if (savedMeals) {
        return JSON.parse(savedMeals);
    }
    try{
        let data = await fetch("https://nutriplan-api.vercel.app/api/meals/random?count=25")
        if(!data.ok){
            throw new Error("somthing went wrong ")
        }
        let result = await data.json()

        localStorage.setItem("meals", JSON.stringify(result));
        return result;
    }catch(error){
        console.log(error)
    }
}


async function getNutrition (meal){

    let ingradients = meal.ingredients.map((item) => {
        return`${item.measure} ${item.ingredient}`
    })
    
    try{
        let data = await fetch(`https://nutriplan-api.vercel.app/api/nutrition/analyze`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "hnNFMqbKzH8mM9kdLH9FTchPWPM6hgncNk8cJkfd"
            },
            body: JSON.stringify({
                recipeName: meal.name,
                ingredients: ingradients
            })    
        })
        let result = await data.json();
        
        if(!data.ok){
            throw new Error(result.error || "somthing went wrong ")
        }
        

        console.log(result);

        return result;
        
    }catch(error){
        console.log(error)
    }
}

async function mealArea() {

    try{
        let data = await fetch("https://nutriplan-api.vercel.app/api/meals/areas")
        if(!data.ok){
            throw new Error("somthing went wrong ")
        }
        let result = await data.json()
        console.log(result)
        return result;
        
    }catch(error){
        console.log(error)
    }
}
mealArea()

export{ mealsCategrys, randomMeal, getNutrition, mealArea }
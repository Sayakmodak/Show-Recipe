const inpt = document.querySelector("input");
const search_btn = document.getElementById("btn");
const recipe_section = document.querySelector(".recipe-section");
const placeholder_heading = document.getElementById("placeholder_heading");
const recipe_details = document.querySelector(".recipe_details");
const more_info = document.querySelector(".more_info");


search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    inpt_val = inpt.value;
    if (inpt_val.length === 0) {
        placeholder_heading.innerText = "Type the meal in the search box";
    } else {
        showRecipe(inpt_val);
    }
})

const showRecipe = async (value) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    // Put the loading message before fetching 
    placeholder_heading.innerText = "Fetching Recipe Details";
    try {
        const api = await fetch(URL)
        const response = await api.json()
        // console.log(typeof (response));

        // Put the final loading message after fetching 
        placeholder_heading.innerText = ""
        console.log(response.meals);
        response.meals.forEach((elm) => {
            const div = document.createElement("div");
            div.classList.add("ind_recipe");

            div.innerHTML = `
        <img src="${elm.strMealThumb}" alt="Image of ${elm.strMealThumb}">
        <h2>${elm.strMeal}</h2>
        <h3>${elm.strArea}</h3>
        <h3>${elm.strCategory}</h3
        `
            const button = document.createElement("button");
            button.classList.add("more_info");
            button.innerText = "Read More";

            button.addEventListener("click", () => {
                showPopup(elm)
            })

            div.appendChild(button)
            recipe_section.appendChild(div)
        })
    } catch (e) {
        placeholder_heading.innerText = "Error In Fetching Recipe Details";
    }

}

const showIngredientList = (elm) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = elm[`strIngredient${i}`];
        if (ingredient) {
            const measure = elm[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;
}

const showPopup = (elm) => {
    popupDiv = document.createElement("div");
    popupDiv.classList.add("popupdiv")
    popupDiv.style.display = "block";
    popupDiv.innerHTML = `
        <button class="closeBtn">X</button>
        <h2>${elm.strMeal}</h2>
        <h2>Ingredients</h2>
        <ul>
        ${showIngredientList(elm)}
        </ul>
        <h3>Instructions</h3>
        <p>${elm.strInstructions}</p>
    `
    popupDiv.querySelector(".closeBtn").addEventListener("click", () => {
        popupDiv.style.display = "none";
    })
    recipe_details.appendChild(popupDiv)
}
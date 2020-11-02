import { Meal } from "./Meal.js";
import sendHttpRequest from "../httpRequest/httpRequest.js";
export default class ChooseMeal {
  meals = [
    new Meal("cassava", "Cassava", 0.38, 0.01, 0.02),
    new Meal("rice", "Rice", 0.28, 0.03, 0),
    new Meal("pea", "Pea", 0.16, 0.03, 0),
    new Meal("yogurt", "Yogurt", 0.07, 0.06, 0.06),
    new Meal("potatoes", "Potatoes", 0.26, 0.03, 0),
  ];
  mealObj = [];
  finalMealsUpdated = [];
  showMeConclusion = (event) => {
    event.preventDefault();
    console.log("changed");
    const mealChoosen = document.querySelector(".choose-meal");
    mealChoosen.style.display = "none";
    const conclusion = document.querySelector(".result-conclusion");
    conclusion.style.display = "block";
    let id = event.id;
    history.pushState({ id }, `Selected: ${id}`, `./selected=${id}`);
    /* __________ My Code_____________ */
    const inputTemplate = document.querySelectorAll(".input-template");

    for (const el of inputTemplate) {
      const selectedFood = el.children[0];
      if (selectedFood.children[0].className.includes("ab")) {
        const selectedInput_value = el.children[1].children[0].value;
        const selectedInput_name = el.children[0].children[0].name;
        this.mealObj.push({
          name: selectedInput_name,
          quantity: selectedInput_value,
        });
      }
    }
    let protein;
    let carbohydrate;
    let fats;
    let calories;
    let quantity;
    for (const selectedMeal of this.mealObj) {
      for (const mealInitial of this.meals) {
        if (mealInitial.mealName === selectedMeal.name) {
          quantity = selectedMeal.quantity;
          protein = quantity * mealInitial.protein;
          carbohydrate = quantity * mealInitial.carbohydrate;
          fats = quantity * mealInitial.fats;
          calories = 4 * protein + 4 * carbohydrate + 9 * fats;
          this.finalMealsUpdated.push({
            name: selectedMeal.name,
            carbohydrate: carbohydrate.toFixed(2),
            fats: fats.toFixed(2),
            protein: protein.toFixed(2),
            calorie: parseFloat(calories.toFixed(2)),
          });
        }
      }
    }
    const totalCalories = this.finalMealsUpdated.reduce((prev, curr) => {
      return prev + curr.calorie;
    }, 0);
    console.log(totalCalories);
    console.log(this.meals);
    console.log(this.finalMealsUpdated);
    return totalCalories;
  };
  render() {
    const chooseMeal = document.createElement("div");
    const mealTitle = document.createElement("div");
    mealTitle.className = "meal-title";
    mealTitle.innerHTML = `Choose your daily meal`;
    chooseMeal.className = "choose-meal";
    const formElement = document.createElement("form");
    try {
      sendHttpRequest("GET", "https://meeat-app.firebaseio.com/meal.json").then(
        (responseData) => {
          const responses = [];
          responses.push(responseData);
          console.log(responseData);
          responses.forEach((response) => {
            for (const key in response) {
              const results = response[key];
              console.log(results);
              const meals = [new Meal(results.mealName, results.mealName)];
              for (let item of meals) {
                console.log(item);
                const inputTemplate = document.createElement("div");
                inputTemplate.className = "input-template";
                inputTemplate.innerHTML = `
            <div>
               <input class="meal-choose" type="checkbox" id=${item.mealName} name=${item.mealName} value=${item.mealName}>
               <label for="${item.mealName}"> ${item.mealPrompt}</label><br>
               </div>
            <div class="input_display ">
            <input type="text" className=" ${item.mealName}" placeholder="${item.mealPrompt} weight in grams">
            </div>        
            `;
                formElement.append(inputTemplate);
                const choosing = inputTemplate.querySelector(".meal-choose");
                choosing.addEventListener("change", (e) => {
                  const meal_value_display =
                    e.target.parentNode.parentNode.children[1];
                  meal_value_display.classList.toggle("input_display");
                  const checkedMealValue =
                    e.target.parentNode.parentNode.children[1].children[0];
                  choosing.classList.toggle("ab");
                  console.log(choosing);
                });
              }
            }
            const button = document.createElement("button");
            button.innerHTML = "OK";
            formElement.append(button);
            formElement.addEventListener("submit", this.showMeConclusion);
          });
        }
      );
    } catch (error) {
      alert(error.message);
    }
    chooseMeal.append(mealTitle, formElement);
    return chooseMeal;
  }
}

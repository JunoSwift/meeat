import Header from "../Header/Header.js";
// import MassAmount from "../MassAmount/MassAmountRender.js";
import BodyMassTemplate from "../BodyMass/BodyMassTemplate.js";
import ResultConclusion from "../ResultConc/ResultConclusion.js";
// import ChooseMeal from "../ChooseMeal/ChooseMeal.js";
// import AddUserData from "./AddUserData.js";
import sendHttpRequest from "../httpRequest/httpRequest.js";
import { Input } from "../FormAsset/FormAsset.js";
import { Meal } from "../ChooseMeal/Meal.js";

// RENDER MASSAMOUNT 😸
class MassAmount {
  addTotalCalories(totalCalories) {
    this.totalCaloriesOutput.innerHTML = `<div class="mass-amount">${totalCalories}</div>`;
    return totalCalories;
  }
  render() {
    const AmountNumber = document.createElement("div");
    AmountNumber.className = "amount-mass";
    AmountNumber.innerHTML = `
                               <div>Mass Amount</div>
                               <div class="mass-amount">${0}</div>`;
    this.totalCaloriesOutput = AmountNumber.querySelector(".mass-amount");
    return AmountNumber;
  }
}

// MODAL ⛺✊✊
class Modal {
  render() {
    const modalHolder = document.getElementById("modal");
    const addUserData = new AddUserData().render();
    modalHolder.append(addUserData);
  }
}

//ADD USERDATA
class AddUserData {
  static finalBMI;
  form = [
    new Input("input", "text", "", "Age", "age"),
    new Input("input", "text", "", "Weight", "weight"),
    new Input("input", "text", "", "Height", "height"),
    new Input("input", "submit", "OK", "", "save"),
  ];
  finalResult = () => {
    const swift = 1000;
    return swift;
  };
  AddBmiHandler = (event) => {
    event.preventDefault();
    const modalTemplate = document.querySelector(".modal-template");
    modalTemplate.style.display = "none";

    const bodyMassButton = document.querySelector(".mass-button__container");
    bodyMassButton.style.display = "none";

    const mealChosen = document.querySelector(".choose-meal");
    mealChosen.style.display = "block";

    const age = document.querySelector(".age").value;
    const weight = document.querySelector(".weight").value;
    const height = document.querySelector(".height").value;
    const activity = document.querySelector("#activity").value;
    const gender = document.querySelector("#gender").value;

    let maleBMI = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    let femaleBMI = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    let caloriesPerDay;
    let BMI;
    if (gender === "Male") {
      caloriesPerDay = maleBMI * activity;
      BMI = {
        age: age,
        weight: weight,
        height: height,
        gender: gender,
        activity: activity,
        massAmount: maleBMI,
        caloriesPerDay: caloriesPerDay,
      };
    } else {
      caloriesPerDay = femaleBMI * activity;
      BMI = {
        age: age,
        weight: weight,
        height: height,
        gender: gender,
        activity: activity,
        massAmount: femaleBMI,
        caloriesPerDay: caloriesPerDay,
      };
      console.log("Female : ", BMI);
      console.log(
        "Female calories perday is : ",
        BMI.caloriesPerDay.toFixed(2)
      );
      this.finalBMI = BMI.caloriesPerDay.toFixed(2);
    }
    App.addCaloriesMassToDOM(BMI.caloriesPerDay.toFixed(2));
  };

  render() {
    const form = document.createElement("form");
    form.className = "mass-form";
    const formTitle = document.createElement("h4");
    formTitle.textContent = "Enter you Body Mass";
    const activity = document.createElement("div");
    activity.innerHTML = `<select id="activity">
                             <option value="1.2">No active at all O works</option>
                             <option value="1.375">Lightly active</option>
                             <option value="1.55">moderate</option>
                             <option value="1.725">Active</option>
                             <option value="1.9">Extremly active</option>
                          </select>
                          <select id="gender">
                            <option>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>`;
    activity.className = "activity";
    form.append(formTitle);
    form.append(activity);

    for (const key of this.form) {
      if (key.name === "input") {
        const input = document.createElement("input");
        input.type = key.inputType;
        input.className = key.inputId;
        input.placeholder = key.placeholder;
        input.value = key.inputValue;
        form.append(input);
      }
    }
    form.addEventListener("submit", this.AddBmiHandler);
    return form;
  }
}

//😃😃 MEAL SECTION
class ChooseMeal {
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
      try {
        let meals;
        sendHttpRequest("GET", "https://meeat-app.firebaseio.com/meal.json")
          .then((responseData) => {
            const responses = [];
            responses.push(responseData);
            console.log(responses);
            for (let key in responseData) {
              const results = responseData[key];
              meals = [
                new Meal(
                  results.mealName,
                  results.mealPrompt,
                  results.carbohydrate,
                  results.protein,
                  results.fats
                ),
              ];
              return meals;
            }
          })
          .then((meal) => {
            for (const mealInitial of meal) {
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

              const totalCalories = this.finalMealsUpdated.reduce(
                (prev, curr) => {
                  return prev + curr.calorie;
                },
                0
              );

              const massAmountSelect = document.querySelector(".mass-amount")
                .children[0].innerText;
              console.log(massAmountSelect);
              const massAount = parseFloat(massAmountSelect);
              let Conlusion;
              if (massAount > totalCalories) {
                Conlusion = `<p>Dear, After analyzing your data we recommend you to increase calories taken from your die  </p>`;
              }
              if (massAount < totalCalories) {
                Conclusion = `<p>Dear, Please try to decrease Calories taken from your diet inorder to avoid unwanted fats in your body   </p>`;
              }
              if (massAount === totalCalories) {
                Conclusion = `<p>Wow, Congratulations Dear, we find your body in good  condition  compared to taken diet    </p>`;
              }

              App.addHumanCaloriesToTheDom(totalCalories);
              App.addConclusionToTheDom(Conlusion);
            }
          });
      } catch (error) {
        alert(error.message);
      }
    }
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
          console.log(responses);
          responses.forEach((response) => {
            for (const key in response) {
              const results = response[key];
              console.log(results);
              const meals = [new Meal(results.mealName, results.mealPrompt)];
              for (let item of meals) {
                // console.log(item);
                const inputTemplate = document.createElement("div");
                inputTemplate.className = "input-template";
                inputTemplate.innerHTML = `
            <div>
               <input class="meal-choose" type="checkbox" id=${item.mealName} name=${item.mealName} value=${item.mealName}>
               <label for="${item.mealName}"> ${item.mealPrompt}</label><br>
               </div>
            <div class="input_display ">
            <input type="text" placeholder="${item.mealPrompt} ......." className="abc-input ${item.mealName}" weight in grams">
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
                  // console.log(choosing);
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
    // console.log(this.bb);
    chooseMeal.append(mealTitle, formElement);
    return chooseMeal;
  }
}

//CONTENT RENDER 🌝😇😁

class ContentRender {
  render() {
    const renderHook = document.getElementById("app");
    const header = new Header();
    const headerRender = header.render();

    this.massAmount = new MassAmount();
    const massAmountRender = this.massAmount.render();
    const bodyMassTemplate = new BodyMassTemplate();
    const bodyMassTemplateRender = bodyMassTemplate.render();
    this.resultConclusion = new ResultConclusion();
    const resultConclusionRender = this.resultConclusion.render();
    const chooseMeal = new ChooseMeal();
    const chooseMealRender = chooseMeal.render();

    renderHook.append(
      headerRender,
      massAmountRender,
      bodyMassTemplateRender,
      chooseMealRender,
      resultConclusionRender
    );
  }
}
class App {
  static init() {
    const content = new ContentRender();
    content.render();
    this.modal = new Modal();
    this.modal.render();
    this.massAmount = content.massAmount;
    this.resultConclusion = content.resultConclusion;
  }

  static addCaloriesMassToDOM(totalCalories) {
    this.massAmount.addTotalCalories(totalCalories);
  }
  static addHumanCaloriesToTheDom(totalCalories) {
    this.resultConclusion.addTotalHmumanCalories(totalCalories);
  }
  static addConclusionToTheDom(summary) {
    this.resultConclusion.conclusionRender(summary);
  }
}
App.init();

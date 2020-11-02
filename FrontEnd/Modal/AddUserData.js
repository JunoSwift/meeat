// import { Input } from "../FormAsset/FormAsset.js";
// export default class AddUserData {
//   constructor(BmiMass) {
//     this.BmiMass = BmiMass;
//   }
//   form = [
//     new Input("input", "text", "", "Age", "age"),
//     new Input("input", "text", "", "Weight", "weight"),
//     new Input("input", "text", "", "Height", "height"),
//     new Input("input", "submit", "OK", "", "save"),
//   ];
//   AddBmiHandler = (event) => {
//     event.preventDefault();
//     const modalTemplate = document.querySelector(".modal-template");
//     modalTemplate.style.display = "none";

//     const bodyMassButton = document.querySelector(".mass-button__container");
//     bodyMassButton.style.display = "none";

//     const mealChosen = document.querySelector(".choose-meal");
//     mealChosen.style.display = "block";

//     const age = document.querySelector(".age").value;
//     const weight = document.querySelector(".weight").value;
//     const height = document.querySelector(".height").value;
//     const activity = document.querySelector("#activity").value;
//     const gender = document.querySelector("#gender").value;

//     let maleBMI = 66 + 13.7 * weight + 5 * height - 6.8 * age;
//     let femaleBMI = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
//     let caloriesPerDay;
//     let BMI;
//     if (gender === "Male") {
//       caloriesPerDay = maleBMI * activity;
//       BMI = {
//         age: age,
//         weight: weight,
//         height: height,
//         gender: gender,
//         activity: activity,
//         massAmount: maleBMI,
//         caloriesPerDay: caloriesPerDay,
//       };
//       console.log("Male", BMI);
//       console.log("Male calories perday is : ", BMI.caloriesPerDay.toFixed(2));
//     } else {
//       caloriesPerDay = femaleBMI * activity;
//       BMI = {
//         age: age,
//         weight: weight,
//         height: height,
//         gender: gender,
//         activity: activity,
//         massAmount: femaleBMI,
//         caloriesPerDay: caloriesPerDay,
//       };
//       console.log("Female : ", BMI);
//       console.log(
//         "Female calories perday is : ",
//         BMI.caloriesPerDay.toFixed(2)
//       );
//       this.BmiMass = BMI.caloriesPerDay.toFixed(2);
//     }

//     // App.addCaloriesMassToDOM(BMI.caloriesPerDay.toFixed(2););
//   };

//   render() {
//     const form = document.createElement("form");
//     form.className = "mass-form";
//     const formTitle = document.createElement("h4");
//     formTitle.textContent = "Enter you Body Mass";
//     const activity = document.createElement("div");
//     activity.innerHTML = `<select id="activity">
//                              <option value="1.2">No active at all O works</option>
//                              <option value="1.375">Lightly active</option>
//                              <option value="1.55">moderate</option>
//                              <option value="1.725">Active</option>
//                              <option value="1.9">Extremly active</option>
//                           </select>
//                           <select id="gender">
//                             <option>Choose Gender</option>
//                             <option>Male</option>
//                             <option>Female</option>
//                           </select>`;
//     activity.className = "activity";
//     form.append(formTitle);
//     form.append(activity);

//     for (const key of this.form) {
//       if (key.name === "input") {
//         const input = document.createElement("input");
//         input.type = key.inputType;
//         input.className = key.inputId;
//         input.placeholder = key.placeholder;
//         input.value = key.inputValue;
//         form.append(input);
//       }
//     }
//     form.addEventListener("submit", this.AddBmiHandler);

//     return form;
//   }
// }

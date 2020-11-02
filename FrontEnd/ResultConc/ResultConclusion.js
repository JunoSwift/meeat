export default class ResultConclusion {
  items = [];

  addTotalHmumanCalories(totalCalories) {
    this.items.push(totalCalories);
    this.totalCaloriesOutput.innerHTML = `<h3>You Eat ${totalCalories}g of Calories</h3>`;
  }
  conclusionRender(summary) {
    this.conclusionOutput.innerHTML = `<div class="conclusion">
                                           ${summary}
                                           </div>`;
  }
  render() {
    const resultDiv = document.createElement("div");
    resultDiv.className = "result-conclusion";
    resultDiv.innerHTML = `<div class="conc-title">
                           <h2>You Eat ${0}g of Calories</h2>
                           </div>
                           <div class="conclusion">
                           <p>
                           Wait...!
                           </p>
                           </div>
                          `;
    this.totalCaloriesOutput = resultDiv.querySelector("h2");
    this.conclusionOutput = resultDiv.querySelector(".conclusion");
    return resultDiv;
  }
}

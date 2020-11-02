export default class MassAmount {
  items = [];
  addTotalCalories(totalCalories) {
    this.items.push(totalCalories);
    this.totalCaloriesOutput.innerHTML = `<div class="mass-amount">${1}</div>`;
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

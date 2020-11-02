export default class BodyMassTemplate {
  goToModalHandler = (event) => {
    const templateModal = document.querySelector(".modal-template");
    const backdrop = document.querySelector("#backdrop");
    if (event.target.id === "mass-button") {
      templateModal.style.display = "block";
    }
  };
  render() {
    const bodyMass = document.createElement("div");
    bodyMass.className = "mass-button__container";
    bodyMass.innerHTML = `
   <button id="mass-button">Enter Your Body Mass</button>
   `;
    const goToModal = bodyMass.querySelector("#mass-button");
    goToModal.addEventListener("click", this.goToModalHandler);
    return bodyMass;
  }
}

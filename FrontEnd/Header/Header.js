import HeaderItem from "./HeaderItem.js";
export default class Header {
  constructor() {}
  item = new HeaderItem(
    "MEeat",
    "./Assets/food/pesto_pasta.png",
    "./Assets/Icons//arrow-l-white.png",
    "./Assets/Icons//arrow-r-white.png"
  );
  render() {
    const headerAr = [];
    const header = document.createElement("header");
    header.innerHTML = `<div class="header-head">
                           <div class='back-buttton'><img src=${this.item.sideDrawer} alt=""></div>
                           <div>${this.item.logo}</div>
                           <div class="right-arrow"><img src=${this.item.rightArrow} alt=""></div>
                        </div>
                        <div class="header-image">
                        </div>`;
    headerAr.push(header);
    headerAr.forEach((head) => {
      if (head.querySelector(".back-buttton")) {
        head.addEventListener("popstate", (e) => {
          if (e.state !== null) {
            console.log("hello");
          }
        });
      }
    });
    return header;
  }
}

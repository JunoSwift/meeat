export class Input {
  constructor(name, inputType, inputValue, placeholder, inputId) {
    this.name = name;
    this.inputType = inputType;
    this.inputValue = inputValue;
    this.placeholder = placeholder;
    this.inputId = inputId;
  }
}
export class Email {
  constructor(name, email, message, postId) {
    this.name = name;
    this.email = email;
    this.message = message;
    this.postId = postId;
  }
}

export class TextArea {
  constructor(name, cols, rows, inputId) {
    this.name = name;
    this.cols = cols;
    this.rows = rows;
    this.inputId = inputId;
  }
}
export class Button {
  constructor(name, btnValue) {
    this.name = name;
    this.btnValue = btnValue;
  }
}

export class MenuItem {
  constructor(name, iconName, idName) {
    this.name = name;
    this.iconName = iconName;
    this.idName = idName;
  }
}

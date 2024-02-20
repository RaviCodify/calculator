const display = document.querySelector(".display");
const audio = document.getElementById("myAudio");

const clickables = document.querySelectorAll(".click-as");
clickables.forEach((elem) => {
  elem.addEventListener("click", () => {
    const newText = elem.innerText;
    addChar(newText);
  });
});

function addChar(newText) {
  if (!isNaN(parseInt(newText)) || newText === "." || isMathSymbol(newText)) {
    const oldText = display.innerText;
    display.innerText = oldText.concat(newText);
    audio.currentTime = 0;
    audio.play();
  }
}

function isMathSymbol(str) {
  return ["+", "-", "*", "/", "x", "÷"].includes(str);
}

document.querySelector(".clear").addEventListener("click", () => {
  display.innerText = "";
  audio.currentTime = 0;
  audio.play();
});
document.querySelector(".back").addEventListener("click", () => {
  display.innerText = display.innerText.slice(0, -1);
  audio.currentTime = 0;
  audio.play();
});
document.querySelector(".sqrt").addEventListener("click", () => {
  evaluate();
  display.innerText = Math.sqrt(display.innerText);
  audio.currentTime = 0;
  audio.play();
});
document.querySelector(".sqr").addEventListener("click", () => {
  evaluate();
  display.innerText = display.innerText ** 2;
  audio.currentTime = 0;
  audio.play();
});
document.querySelector(".result").addEventListener("click", evaluate);

document.addEventListener("keypress", function (e) {
  addChar(e.key);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    evaluate();
  }
  if (e.key === "Backspace") {
    display.innerText = display.innerText.slice(0, -1);
  }
  if (e.key === "Delete") {
    display.innerText = "";
  }
});

function evaluate() {
  if (display.innerText.includes("x") || display.innerText.includes("÷")) {
    const modifiedDisplay = display.innerText
      .replace("x", "*")
      .replace("÷", "/");
    display.innerText = eval(modifiedDisplay);
  } else {
    display.innerText = eval(display.innerText);
  }
  audio.currentTime = 0;
  audio.play();
}

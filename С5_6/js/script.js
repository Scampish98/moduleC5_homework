let btn = document.querySelector(".btn");
let result = document.querySelector(".div-result");
let error_input_text = "одно из чисел вне диапазона от 100 до 300";

function checkInputText(input_value) {
  if (!/^\d+$/.test(input_value)) {
    result.innerHTML = error_input_text;
    return false;
  }
  input_value = Number.parseInt(input_value);
  if (input_value < 100 || input_value > 300) {
    result.innerHTML = error_input_text;
    return false;
  }
  return input_value;
}

btn.addEventListener("click", () => {
  let width = checkInputText(document.querySelector(".input-width").value);
  let height = checkInputText(document.querySelector(".input-height").value);

  if (width && height) {
    let url = `https://picsum.photos/${width}/${height}`;
    result.innerHTML = `<img src="${url}" class="image"/>`;
  }
});

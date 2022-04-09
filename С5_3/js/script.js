let btn = document.querySelector(".btn");
let result = document.querySelector(".div-result");
const error_input_text =
  "Неверное значение в поле ввода: введите положительное целое число от 1 до 10";

function sendRequest(url, callback) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      result.innerHTML = "Неуспешный запрос, статус ответа: " + xhr.status;
    } else {
      if (callback) {
        callback(JSON.parse(xhr.response));
      }
    }
  };

  xhr.send();
}

function displayResult(apiData) {
  let cards = "";
  // console.log('start cards', cards);

  apiData.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

  result.innerHTML = cards;
}

btn.addEventListener("click", () => {
  let input_value = document.querySelector(".input").value;
  if (!/^\d+$/.test(input_value)) {
    result.innerHTML = error_input_text;
    return;
  }
  input_value = Number.parseInt(input_value);
  if (input_value < 1 || input_value > 10) {
    result.innerHTML = error_input_text;
    return;
  }

  sendRequest(
    "https://picsum.photos/v2/list?limit=" + input_value,
    displayResult
  );
});

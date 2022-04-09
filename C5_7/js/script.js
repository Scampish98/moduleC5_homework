let btn = document.querySelector(".btn");
let result = document.querySelector(".div-result");

function checkInputText(input_value) {
  if (!/^\d+$/.test(input_value)) {
    return false;
  }
  input_value = Number.parseInt(input_value);
  if (input_value < 1 || input_value > 10) {
    return false;
  }
  return input_value;
}

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

function queryString(page, limit) {
  return "page=" + page + "&limit=" + limit;
}

window.addEventListener("load", () => {
    const lastString = localStorage.getItem("last");
    if (lastString) {
        last = JSON.parse(lastString);
        document.querySelector(".input-page").value = last.page;
        document.querySelector(".input-limit").value = last.limit;
        displayResult(last.result);
    }
});

btn.addEventListener("click", () => {
    let page = checkInputText(document.querySelector(".input-page").value);
    let limit = checkInputText(document.querySelector(".input-limit").value);

    if (!page && !limit) {
        result.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    } else if (!page) {
        result.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    } else if (!limit) {
        result.innerHTML = "Лимит вне диапазона от 1 до 10";
    } else {
        sendRequest(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`, (json) => {
            displayResult(json);
            localStorage.setItem("last", JSON.stringify({page: page, limit: limit, result: json}));
        });
    }
});
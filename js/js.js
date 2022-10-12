var price = 0;
function updatePrice() {
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }

  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = select.value == "2" ? "block" : "none";

  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = select.value == "3" ? "block" : "none";

  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });
  let result = document.getElementById("result");
  result.innerHTML = price + " рублей";
}

function itd_calc() {
  let f1 = document.getElementsByName("field4");
  let res = document.getElementById("itd_result");
  res.innerHTML = f1[0].value * price;
  return false;
}

function getPrices() {
  return {
    prodTypes: [1000, 2000, 1500],
    prodOptions: {
      option1: 0,
      option2: 50,
      option3: 100,
    },
    prodProperties: {
      prop1: 149,
      prop2: 277,
      prop3: 4,
    },
  };
}

window.addEventListener("DOMContentLoaded", function (event) {
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";

  let s = document.getElementsByName("prodType");
  let select = s[0];
  select.addEventListener("change", function (event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });

  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  let but = document.getElementById("button");
  but.addEventListener("click", function (event) {
    console.log(event.target.value);
    itd_calc();
  });

  updatePrice();
});

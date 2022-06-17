//*=========================================================
//*                     FLAG-APP
//*=========================================================
// https://restcountries.com/

const countryDiv = document.querySelector(".countries");
const form = document.querySelector("select");

form.addEventListener("change", () => {
  const index = document.querySelector(".form-select").selectedIndex;
  let OptionText = document.getElementsByTagName("option")[index].innerText;
  console.log(index);
  if (index === 0) {
    countryDiv.innerHTML = ``;
  } else {
    fetchCountry(OptionText);
  }
});

const listOfCountryName = async () => {
  let url = "https://restcountries.com/v3.1/all";
  const response = await fetch(url);
  data = await response.json();

  data.forEach((country, index) => {
    const {
      name: { common },
    } = country;
    const options = document.createElement("option");
    options.setAttribute("value", index + 1);
    options.setAttribute("data-name", common);
    options.innerHTML = common;
    form.append(options);
    // console.log(options);
    // console.log(common, index + 1);
  });
};
listOfCountryName();
console.log(form.value);

async function fetchCountry(text) {
  const url = `https://restcountries.com/v3.1/name/${text}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      renderError(`Something went wrong ${response.status} `);
      throw new Error("There has been a problem");
    }

    const data = await response.json();
    console.log(data[0]);
    renderCountry(data[0]);
  } catch (error) {
    console.log(error);
  }
}

// fetchCountry("turkey");
// fetchCountry("usa");
// fetchCountry("belgium");
// fetchCountry("south africa");

function renderError(text) {
  countryDiv.innerHTML = `
<h1 class="text-danger"> ${text} </h1>
        <img src="img.png" class="img-error"  style="width:50%"/>
        
`;
}

function renderCountry(country) {
  const {
    capital,
    name: { common },
    flags: { svg },
    region,
    languages,
    currencies,
  } = country;

  const cardDiv = document.createElement("div");
  cardDiv.className = "card shadow";
  cardDiv.style = "width: 18rem;";

  carDivInnerHTML = `
  <img src="${svg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${common}</h5>
    <p class="card-text">${region}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
    <i class="fas fa-lg fa-landmark"></i>
    ${capital}</li>
    <li class="list-group-item">
    <i class="fas fa-lg fa-comments"></i>
    ${Object.values(languages)} </li>
    <li class="list-group-item">
    <i class="fas fa-lg fa-money-bill-wave"></i>
    ${Object.values(currencies)[0].symbol}
    ${Object.values(currencies)[0].name}
    </li>
  </ul>
`;
  cardDiv.innerHTML = carDivInnerHTML;
  countryDiv.prepend(cardDiv);
}

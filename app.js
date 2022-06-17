//*=========================================================
//*                     FLAG-APP
//*=========================================================
// https://restcountries.com/

const countryDiv = document.querySelector(".countries");

async function fetchCountry(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
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
fetchCountry("turkey");
fetchCountry("usa");
fetchCountry("belgium");
fetchCountry("south africa");

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
  //   console.log(capital, common, region, svg);
  //   console.log(Object.values(languages));
  //   console.log(Object.values(currencies)[0].name);
  //   console.log(Object.values(currencies)[0].symbol);

  countryDiv.innerHTML += `
<div class="card shadow"  style="width: 18rem;">
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
 
</div>

`;
}

const url = "https://makeup-api.herokuapp.com/api/v1/products.json";
const makeupContainer = document.getElementById("makeup-container");
const searchInput = document.getElementById("search");
let makeup = [];

function handleSearch(target) {
  const search = target.value.toLowerCase();
  const searchMatch = makeup.filter((element) => {
    const name = element.name.common.toLowerCase();
    return name.includes(search);
  });
  renderCards(searchMatch);
}

async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    makeup = [...data];
    renderCards(makeup);
  }
}
fetchData();
function renderCards(data = []) {
  // TRAVERSE THROIUGH DATA AND CREATE CARDS
  // NODES OF CARDS
  let cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(createCard(data[i]));
    
  }
  // EXISTING VALUE ARE KICKED-OUT
  makeupContainer.innerHTML = "";
  // NEW CARDS ARE ALLOWED IN AND UI RE-RENDERED
  makeupContainer.append(...cards);
}

function createCard(data = {}) {
  let card = document.createElement("div");
  let brandName = document.createElement("h2");
  let ProductName = document.createElement("h1");
  let ProductDescription = document.createElement("p");
  let ProductPrice = document.createElement("h1");
  let Productimage_link=document.createElement("a");
  

  card.setAttribute("class", "card");

  // OBJECT DESTRCUTING ES6
  const { brand = "", name = "" , description="", price="", image_link=""} = data;
  brandName.innerText = brand;
  ProductName.innerText = name;
  ProductDescription.innerText = description;
  ProductPrice.innerText = price;
  Productimage_link.innerHTML= image_link;
  
  
  card.append( brand , name, description, price, image_link);

  return card; 
}

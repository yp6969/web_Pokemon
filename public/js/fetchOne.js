/**
 * create a pokemon file with all the information about it 
 */
fetch("/api/pokemons/")
  .then((res) => res.json())
  .then((data) => {
    fetch(`/api/pokemons/${data.id}`)
      .then((res) => res.json())
      .then((data) => {
        display(data); // display the pokemon
      })
      .catch((e) => {
        console.log("Error", e);
      });
  })
  .catch((e) => {
    console.log("Error", e);
  });

/**
 * @param {Object} data single pokemon
 */
const display = (data) => {
  const container = document.querySelector(".container");
  const idAndName = document.createElement("div");
  const h1 = document.createElement("h1");

  h1.innerHTML = "#" + data.id + "    " + data.name;
  
  idAndName.appendChild(h1);
  container.appendChild(idAndName);


  const imgContainer = document.createElement("div");
  // imgContainer.classList.add("img-container");
  const img = document.createElement("img");
  img.src = `/assets/pokemons/${data.id}.png`;
  // img.classList.add("img");
  imgContainer.appendChild(img);
  container.appendChild(imgContainer);


  const types = document.createElement("div");
  container.appendChild(types);
  types.classList.add("skills-container");
  
  for (let typeName of data.type) {
    const type = document.createElement("p");
    type.classList.add("type");
    type.innerHTML = typeName;
    types.appendChild(type);
  }

  const hp = document.querySelector("#hp");
  hp.innerHTML = data.base.HP;

  const attack = document.querySelector("#attack");
  attack.innerHTML = data.base.Attack;

  const defense = document.querySelector("#defense");
  defense.innerHTML = data.base.Defense;

  const spattack = document.querySelector("#spattack");
  spattack.innerHTML = data.base["Sp. Attack"];

  const spdefense = document.querySelector("#spdefense");
  spdefense.innerHTML = data.base["Sp. Defense"];

  const speed = document.querySelector("#speed");
  speed.innerHTML = data.base.Speed;
};

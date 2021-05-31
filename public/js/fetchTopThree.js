/**
 * responsible inside fetch we extract the three top pokemons.
 * Popularity is measured by a server side count variable which is added to the pokemons json file variable (data).
 *  If the server has stoped the count variable disappears.
 */

let sortedData;
let popular;

fetch("/api")
  .then((res) => res.json())
  .then((data) => {
    sortedData = data
    .filter((p) => p.hasOwnProperty("count"))
    .sort((a, b) => b.count - a.count); // sort the data by popularty (count)
    popular = sortedData.slice(0, 3);
    display(popular);
  })
  .catch((e) => {
    console.log("Error", e);
  });


/**
 * 
 * @param {Array} data
 * 
 * afunction that display the Top 3 popular pokemons 
 */
function display(data){
  const li = document.createElement("li")
  const lis = document.querySelector("ul")
  
  for (let i = 0; i < data.length; i++) {
    const atr = document.createElement("a");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h4 = document.createElement("h4");
    
    // image import
    img.src = `/assets/pokemons/${data[i].id}.png`;
    img.classList.add("img");
    
    // pok name 
    h4.classList.add("name");
    h4.innerHTML = data[i].name;
    
    // link to the pokemon
    atr.href = `./pokemons/${data[i].id}`;

    div.appendChild(img);
    div.appendChild(h4);
    atr.appendChild(div);
    li.appendChild(atr);
    lis.appendChild(li);
  }
};

/**
 *Fetching the whole pokemons file and dsplaying it.
 * Fetch the whole JSON Object form the server and send the pokemons array to the function display(data).
 */
fetch("/api/pokemons/")
  .then((res) => res.json())
  .then((data) => {
    //show pokemons list
    display(data.data);
  })
  .catch((err) => {
    console.log("Error", err);
  });

/**
 * 
 * terate all over te pokemon data and arrange the elements
 * 
 * @param {Array} data all the pokemons
 */
const display = (data) => {
  const ul = document.getElementById("poklist");
  
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const div = document.createElement("div");
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");

    imgDiv.appendChild(img);
    div.appendChild(imgDiv);
    div.classList.add("inner-container");
    img.classList.add("img");
    img.src = `/assets/pokemons/${data[i].id}.png`;

   //  display pokemon properties
    const description = document.createElement("div");
    const idAndNameContainer = document.createElement("div");
    const idName = document.createElement("p");
    
    idAndNameContainer.appendChild(idName);
    description.appendChild(idAndNameContainer); 
    idAndNameContainer.classList.add("id-and-name-container");
    idName.innerHTML = "#" + data[i].id + "  " +data[i].name;
    
    const typesDiv = document.createElement("div");
    description.appendChild(typesDiv);
    div.appendChild(description);
    a.appendChild(div);
    li.appendChild(a);
    ul.appendChild(li);
    
    a.href = `./pokemons/${data[i].id}`;
    typesDiv.classList.add("types-container");
    
    for (let typeName of data[i].type) {
      const type = document.createElement("p");
      type.classList.add("type");
      type.innerHTML = typeName;
      typesDiv.appendChild(type);
    }
  }
};

let pokemonesLista = document.getElementById("pokemones-lista");
let links = document.getElementById("links");

updatePokemons("https://pokeapi.co/api/v2/pokemon");
function updatePokemons(url) {
  if (url) {

    //Reiniciamos pokemones actuales
    pokemonesLista.innerHTML = "";
    // Llamamos a la API de pokemon con Fetch
    fetch(url)
      .then(res => res.json())
      .then(res => {
        // Obtenemos y recorremos a los primeros 20 pokemones obtenidos
        for (let i of res.results) {

          // Realizamos otra solicitud Fetch con la URL especifica del pokemon actual recorrido, para obtener datos mas especficos como la imagen
          fetch(i.url)
            .then(x => x.json())
            .then(x => {
              // Vamos pintando o ingresando la imagen y nombre del pokemon actual que se esta evaluando 
              pokemonesLista.innerHTML += `<div class="card">
                                                  <img src="${x.sprites.front_default}" alt="">
                                                  <p>${x.name}</p>
                                              </div>`;
            });
        };
        // Pintamos los enlaces de siguiente o anterior de la paginacion de los pokemones 
        //Boton hacia atrás
        links.innerHTML = (res.previous) ? `<button onclick="updatePokemons('${res.previous}')">Atrás</button>` : "";
        //Botón hacia adelante
        links.innerHTML += (res.next) ? `<button onclick="updatePokemons('${res.next}')">Siguiente</button>` : "";

      });
  }

}


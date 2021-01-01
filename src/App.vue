<template>
  <div id="app">
    <img class="img-logo" src="./assets/mapps.png">
    <hr>

    <div class="div-search">
      <h4 class="is-size-4">Pokedex</h4>
      <input type="text" class="input is-rounded search" v-model="busca" placeholder="Buscar Pokemon pelo nome">
      <button @click="buscar" class="button is-fullwidth is-success search" id="buscabtn">Buscar</button>
    </div>

    <div class="columns is-mobile is-multiline div-pokemons">

      <div class="column is-one-quarter" v-for="(pokemon, index) in filteredPokemons" :key="pokemon.url">
        <Pokemon :name="pokemon.name" :url="pokemon.url" :num="index + 1" />
      </div>

  </div>


  </div>
</template>

<script>

import Pokemon from './components/Pokemon';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: ''
    }
  },
  created: function() {
    /**
     * Essa função será chamada sempre que a aplicação for iniciada
     */
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then(res => {
      console.info('LISTA DE POKEMONS RECUPERADA!');
      this.pokemons = res.data.results;
      this.filteredPokemons = res.data.results;
    });

  },
  components: {
    Pokemon
  },
  methods: {
    buscar: function() {
      this.filteredPokemons = this.pokemons;
      if(this.busca == '' || this.busca == ' ') {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca);
      }
    }
  },
  computed: {
    // resultadoBusca: function() {
    //   if(this.busca == '' || this.busca == ' ') {
    //     return this.pokemons;
    //   } else {
    //     return this.pokemons.filter(pokemon => pokemon.name == this.busca);
    //   }
    // }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.div-search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.img-logo {
  height: 170px;
}

#buscabtn {
  margin-top: 2%;
}

.search {
  width: 50% !important;
}

.div-pokemons {
  padding: 5px;
}

</style>

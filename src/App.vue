<template>
  <div id="app">
    <img class="img-logo" src="./assets/mapps.png">
    <hr>

    <div class="div-search">
      <h4 class="is-size-4">Pokedex</h4>

      <div class="select generation">
        <select v-model="generation" @change="selecionarGeracao">
          <option value="0">Primeira geração</option>
          <option value="1">Segunda geração</option>
          <option value="2">Terceira geração</option>
          <option value="3">Quarta geração</option>
          <option value="4">Quinta geração</option>
          <option value="5">Sexta geração</option>
          <option value="6">Sétima geração</option>
        </select>
      </div>

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
      generation: 1,
      pokemons: [],
      filteredPokemons: [],
      busca: ''
    }
  },
  created: function() {
    /**
     * Essa função será chamada sempre que a aplicação for iniciada
     * Primeira geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
     * Segunda geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=151
     * Terceira geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=302
     * Quarta geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=453
     * Quinta geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=604
     * Sexta geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=755
     * Sétima geração - https://pokeapi.co/api/v2/pokemon?limit=151&offset=906
     * 
     */
    // axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then(res => {
    //   console.info('LISTA DE POKEMONS RECUPERADA!');
    //   this.pokemons = res.data.results;
    //   this.filteredPokemons = res.data.results;
    // });
    this.capturarPokemons(0);

  },
  components: {
    Pokemon
  },
  methods: {
    capturarPokemons: function(offset) {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=${offset}`).then(res => {
        console.info('LISTA DE POKEMONS RECUPERADA!');
        this.pokemons = res.data.results;
        this.filteredPokemons = res.data.results;
      });
    },
    buscar: function() {
      this.filteredPokemons = this.pokemons;
      if(this.busca == '' || this.busca == ' ') {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca);
      }
    },
    selecionarGeracao: function() {
      if(this.generation > 0) {
        this.capturarPokemons(this.generation * 151);
      } else {
        this.capturarPokemons(0);
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

.generation {
  margin-bottom: 15px;
}

</style>

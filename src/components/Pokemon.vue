<template>
  <div id="pokemon">
    <div class="card">
      <div class="card-image">
        <figure>
          <img
            :src="currentImg"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          
          <div class="media-content">
            <p class="title is-4">{{ num }} - {{ name | upper }}</p>
            <p class="subtitle is-6">{{ pokemon.type }}</p>
          </div>
        </div>

        <div class="content">
            <button @click="goToDetails" class="button is-medium is-fullwidth btn-detalhes">Detalhes</button>
            <button @click="mudarSprite" class="button is-medium is-fullwidth">Mudar Sprite</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    axios.get(this.url).then((res) => {
      this.pokemon.type = res.data.types[0].type.name;
      this.pokemon.front = res.data.sprites.front_default;
      this.pokemon.back = res.data.sprites.back_default;
      this.currentImg = this.pokemon.front;
    });
  },
  data() {
    return {
        isFront: true,
        currentImg: '',
        pokemon: {
            type: '',
            front: '',
            back: ''
        },
    };
  },
  props: {
    num: Number,
    name: String,
    url: String,
  },
  filters: {
    upper: function (value) {
      var newName = value[0].toUpperCase() + value.slice(1); //pegando a primeira letra como se fosse uma posição de um array
      return newName;
    },
  },
  methods: {
      mudarSprite: function() {
          if(this.isFront) {
              this.isFront = false;
              this.currentImg = this.pokemon.back;
          } else {
              this.isFront = true;
              this.currentImg = this.pokemon.front;
          }
      },
      goToDetails: function() {
        var urlSplit = this.url.split('/');
        var id = urlSplit[urlSplit.length - 2];

        this.$router.push({name: 'details', params: {id: id, name: this.name, type: this.pokemon.type, front: this.pokemon.front, back: this.pokemon.back}});
      }
  }
};
</script>

<style scoped>
    #pokemon {
        margin-top: 2%;
    }
    .btn-detalhes {
      margin-bottom: 5px;
    }
</style>
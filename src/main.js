import Vue from 'vue'
import App from './App.vue'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import "../node_modules/bulma/css/bulma.css"

import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: PokemonList },
    { path: '/details/:id', name: 'details', component: PokemonDetails }
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

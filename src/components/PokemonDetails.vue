<template>
    <div class="principal">
        <div class="card div-card">
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
                    <p class="title is-4">{{ name }}</p>
                    <p class="subtitle is-6">{{ type }}</p>
                </div>
                </div>

                <div class="content">
                    <button @click="mudarSprite" class="button is-medium is-fullwidth">Mudar Sprite</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFront: true,
            currentImg: '',
            id: 0,
            name: '',
            type: '',
            front: '',
            back: ''
        }
    },
    created: function() {
        var params = this.$route.params;
        this.name = params.name;
        this.type = params.type;
        this.front = params.front;
        this.back = params.back;
        this.currentImg = this.front;
    },
    filters: {
        upper: function (value) {
        var newName = value[0].toUpperCase() + value.slice(1); //pegando a primeira letra como se fosse uma posição de um array
        return newName;
        }
    },
    methods: {
        mudarSprite: function() {
            if(this.isFront) {
                this.isFront = false;
                this.currentImg = this.back;
            } else {
                this.isFront = true;
                this.currentImg = this.front;
            }
        }
    }
    
}
</script>

<style scoped>
    .principal {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 15px;
    }

    .div-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
    }
</style>
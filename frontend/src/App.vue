<template>
  <div id="app">
    <button id="findGame" @click="createNewGame">Найти игру</button>
    <button id="createGame">Играть с друзьями</button>
  </div>
</template>

<script>
import Game from "./Game";

export default {
  name: "App",
  created() {

  },
  methods: {
    createNewGame() {
      const game = new Game();
      const randomNickName = this.makeid(10)

      game.login(randomNickName)
    },
    makeid(length) {
        let result = ""
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        const charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    };

  },
};
</script>

<style>
</style>

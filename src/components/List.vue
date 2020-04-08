<template>
        <ul>
      <li v-for="item in listItems">{{ item }}</li>
    </ul>

</template>

<script>


export default {
  name: 'List',
    data () {
    return {
      listItems: ['buy food', 'play games', 'sleep'],
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

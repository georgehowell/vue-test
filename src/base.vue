<template>
    <div>
        <li class="nav-item">  
            <router-link class="nav-link" to="/HelloWorld">HelloWorld</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/List">List</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/Quiz/">Quiz</router-link>
        </li>
    </div>
</template>

<script>


// export default {
//   name: 'base',
    // data () {
    // return {
    //   listItems: ['buy food', 'play games', 'sleep'],
    // }
//   }
  
// }

export default {  
    name: 'home',  
data () {    
    return {      
        title: 'Home',      
    }
  }
}

</script>

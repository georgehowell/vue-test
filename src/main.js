// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/components/List'
import quiz from "./components/quiz/index.vue";
import usersave from "./components/usersave/index.vue";
import filterbar from "./components/filterbar/index.vue";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        List,
        HelloWorld,
        quiz,
        usersave,
        filterbar
    },
    template: '<base />'
})

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/List',
            name: 'ToDo',
            component: List
        },
    ]
})
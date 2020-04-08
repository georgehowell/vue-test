<template>
        <div>    
        <quiz-start 
            v-if="showStart" 
            v-on:startQuiz="startQuiz"
            :image = "image"
            :header_text = "header_text"
            :text1 = "text1"
            :text2 = "text2"
            ></quiz-start>
        <quiz-slider v-if="!showStart"></quiz-slider>
        </div>
</template>

<script>
import Slider from "./quiz-slider.vue";
import QuizStart from "./quiz-start.vue";
export default {
    name: "quiz-index",
    props: [
            "image",
            "header_text",
            "text1",
            "text2" 
            ],
    data: function() {
        return {
          showStart: 1,
        }
      },
    methods:{
        startQuiz() {
           this.showStart = 0; 
        }
    },
    components: {
        'quiz-slider' : Slider,
        'quiz-start' : QuizStart,
    },
};
</script>

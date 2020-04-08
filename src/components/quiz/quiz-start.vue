<template>
    <div class="row">        
	    <div class="col-md-12">
	    	<img :src="image" class="intro-img"/>
	    </div>
	    <div class="col-md-12">
	    	<h1>
	    		{{ header_text }}
	    	</h1>
	    </div>
	    <div>
	    	<p class="intro">
	    		{{ text1 }} {{ text2 }}
	    	</p>
	    </div>
	    <div class="col-md-12">
	    	<button class="btn btn_yellow" @click="parentStartQuiz()">Begin</button>
	    </div>

    </div>
</template>

<script>
export default {
    name: "QuizStart",
    props: [
            "image",
            "header_text",
            "text1",
            "text2" 
            ],
  	methods : {
  		parentStartQuiz(){
  			this.$emit('startQuiz')
  		}
  	}  
};
</script>

<style>
 @media screen and (min-width: 320px) and (max-width: 1024px) and (orientation: landscape) {
  html {
    transform: rotate(-90deg);
    transform-origin: left top;
    width: 100vh;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }
}
</style>
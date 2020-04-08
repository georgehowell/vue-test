<template>
 <div id="slider">
    <div class="row">
      
      <div class="col-md-4">
        <div class="btn-vue btn-vue-prev" 
          aria-label="Previous slide" 
          @click="slide(-1)" 
          v-if="current">
          &#10094; Back 
        </div>  
      </div>
      <div class="col-md-4">
        <div class="index-show">
          {{ current + 1 }} of {{ questions.length }}
        </div>
      </div>
      <div class="col-md-4">
          <div class="btn-vue btn-vue-next"
               aria-label="Next slide"
               @click="slide(1)"
               v-if="checkIfAnswered() && (current + 1) != questions.length" 
               >
            Next &#10095;
          </div>
          <div class="btn btn-vue btn-vue-next" id="finished"
               @click="finish()"
               v-if="checkIfAnswered() && (current + 1) == questions.length">
            SEE RESULTS 
          </div>
      </div>
    </div>

  <transition-group tag="div" :name="transitionName" class="slides-group fade-in">
      <div v-if="show && questions && questions.length && questions[current]" :key="current" class="slide">
        <div class="row">
          <div class="col-md-12">
            <img :src="questions[current].image" class="skill-img fade-in" alt="cartoon"/>
            <h4> {{ questions[current].skill.title }} </h4>
            <p class="question">{{ questions[current].title }}</p>
             <div v-for="(answer, index) in questions[current].answer.items" 
                  v-if
                  :key="index"
                  :style="getClickedAnswer(questions[current].id, questions[current].answer.id, answer.id)"
                  @click="chooseAnswer(questions[current].id, questions[current].answer.id, answer.id)"
                  class="col-2">
                  <div class="vert-centered">
                    <h5>{{ answer.title }}</h5>
                  </div>
            </div>
          </div>
        </div>  <!--end: row  -->
      <div class="mask"><img src="/cdn/images/white-box.png" alt="" style="width:100%" /></div>
      </div>
  </transition-group>

 </div>
</template>

<script>
export default {
  name: "Slider",
  data: function() {
    return {
      current: 0,
      direction: 1,
      transitionName: "fade",
      show: false,
      questions: [],
      answers : []
    }
  },

  mounted: function() {
    this.show = true;
    this.loadQuetions();
  },

  methods: {
    async loadQuetions() {
          let questionsResponse = await axios.get(
            `api/questions`
          );
          this.questions = questionsResponse.data.data;
        },

    async sendAnswers() {
          let response = await axios.post(
            `api/answers`,
            {'items' : this.answers}
          )
          .then((response) => {
              window.location.href = '/results';
            }, (error) => {
              console.log(error);
              alert('Error occured');
            });          
        },

    checkIfAnswered()
    {
      var found = 0;
    
      for(var i = 0; i < this.answers.length; i++){
        if((this.answers[i].question_id == this.questions[this.current].id))
        {
          found = 1;
          break;
        }
      }  
      return found;              
    },

    slide(dir) {
            
      if(dir === 1){
        if(!this.checkIfAnswered())
          return;
      }

      this.direction = dir;
      dir === 1
      ? (this.transitionName = "slide-next")
      : (this.transitionName = "slide-prev");      
      var len = this.questions.length;
      this.current = (this.current + dir % len + len) % len;
    },

    getClickedAnswer(question_id, answer_id, item_id){
      var found = 0;
      for(var i = 0; i < this.answers.length; i++){
        if((this.answers[i].question_id == question_id) && (this.answers[i].answer_id == answer_id) && (this.answers[i].item_id == item_id))
        {
          found = 1;
          break;
        }
      }
      if(found)
        return 'background-color: #008094; color: #fff; border-bottom-color: #008094; border-left-color: #008094';
      else
        return;
    },

    chooseAnswer(question_id, answer_id, item_id){
      var push_allowed = 1;

      for(var i = 0; i < this.answers.length; i++){
        if(this.answers[i].question_id == question_id){
            if((this.answers[i].answer_id == answer_id) && (this.answers[i].item_id == item_id))
              push_allowed = 0;
            this.answers.splice(i, 1);             
          break;
        }
      }

      if(push_allowed)
      {
        
        this.answers.push({
          'question_id': question_id,
          'answer_id': answer_id,
          'item_id': item_id
        });      
        
        let self = this;
        setTimeout(function(){ 
          if((self.current + 1) != self.questions.length)
          self.slide(1);
          window.scrollTo(0, 0);
         });

      }
    },

    finish(){
      if(!this.checkIfAnswered())
          {
            alert('Please choose your answer, thanks.');
            return;
          }
        this.sendAnswers();
      }
  }
  
};
</script>
<style scoped>
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}

/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}
.clicked {
  background-color: #008094;
}
.btn {
  height: 40px;
  color: #1C4561;
  border: 1px #008094 solid;
  border-radius: 21px;
  padding: 5px 10px 5px 16px;
  text-align: left;
}
.btn img {
  margin-left: 15px;
}
/* SLIDES CLASSES */
/* #slider {
  width: 100%;
  height: 75vh;
  position: relative;
  overflow: hidden;
}

.slide {
  width: 100%;
  height: 75vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
 */

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
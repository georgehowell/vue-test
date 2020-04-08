<template>
  <div>    
    <span 
       class="favourite"
       v-if="category == 'small-heart'"
       @click="onClickHandler()"
       >
      <i class="icon favourite" v-if="!userSave"></i>
      <i class="icon fav-solid float-l" v-if="userSave"></i>
    </span>
    <button v-if="category == 'button'"
            type="button" 
            class="btn btn-primary float-l"
            @click="onClickHandler()">
            
            <div class="btn-txt" v-if="!userSave" title="add to favourites"><i class="icon favourite"></i> &nbsp; &nbsp;SAVE</div>
            <div class="btn-txt saved" v-if="userSave" title="remove from favourites"><i class="icon fav-solid float-l"></i> SAVED</div>
    </button>
  </div>
</template>

<script>
export default {
    name: "usersave",
    data: function() {
        return {
          userSave: null,
        }
      },
    
    props: {
            type : { default : null},
            item_id : { default : null},
            category : { default : 'button'},
            is_saved: { default : null}            
            },
    
    mounted: function() {
        this.userSave = this.is_saved
      },    

    methods:{        
        async onClickHandler(){

          if(!(this.type && this.item_id)) {
              window.location.href = '/login';
              return ;
          }

          
          var payload = {
            'type' : this.type,
            'item_id' : this.item_id
          }

          let response = await axios.post(
            `/api/saved`,
            payload
          );
          this.userSave = response.data.data;

        }
    },
};
</script>

<style>
.favourite {
  cursor: pointer;
}
.saved .icon {
  color: #1C4561;
}
</style>

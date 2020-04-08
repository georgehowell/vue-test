<template>
  <div>
    <section class="filter-bar">
      <div class="container">
        <div class="title" @click="shuffle()">
          Filter <span>by:</span>
        </div>
          <div class="dropdown">
            <span class="dropdown-toggle" href="#">Content Type
              <i class="icon caret"></i>
            </span>
            <ul class="dropdown-menu">                    
              <li v-for="type in types" @click="setFilterBy('type',type.slug)">{{ type.title }}</li>
            </ul>
          </div>
          <div class="dropdown">
            <span class="dropdown-toggle" href="#">Skill
              <i class="icon caret"></i>
            </span>
            <ul class="dropdown-menu">
              <li v-for="skill in skills" @click="setFilterBy('skill',skill.slug)">{{ skill.title }}</li>                    
            </ul>
          </div>
          <div class="title hide-mob">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="cursor: pointer;" @click="setResetFilter('type')">{{filter_type_slug}}</span>&nbsp;&nbsp;&nbsp;
            <span style="cursor: pointer;" @click="setResetFilter('skill')">{{filter_skill_slug}}</span>
          </div>
        </div>
    </section>    
    <section class="tile-list">
      <div class="container">
        <div v-masonry transition-duration="0.5s" item-selector=".item" class="grid" gutter="10" percentPosition="true" columnWidth=".grid-sizer">                
          <div v-masonry-tile v-if="grid_type=='topic'" v-for="(element, index) in items" :key="index" class = "item" :class="(element.tile_size.slug == 'small') ? 'tile-small' : 'tile-large'" >
            <div class="content">
              <div :style="{'background-image': 'url(' + element.image + ')'}" class="logo"></div>                        
              <p class="type">{{ element.type.title }}</p>                    
              <!-- <div class="title">{{ element.title }}</div> -->
              <div class="title">Example text</div>

              <div class="footer-block">

                <a :href="'/' + element.type.type + '/'+ element.slug">
                  <img src="/cdn/svg/learn_more.svg" class="learn-arrow" />
                </a>                            
                      <user-save
                          v-if="is_logged==1"
                          :type="element.type.type"
                          :item_id="element.id"
                          category="small-heart"                                                    
                          :is_saved="inArrayCustom({'item_id':element.id, 'type':element.type.type},user_saves_arr)"
                          ></user-save>
                        <user-save
                          v-if="is_logged==0"
                          category="small-heart"
                        ></user-save>
              </div>
            </div>
          </div>
          <div v-if="grid_type!='topic'" v-for="(element, index) in items" :key="index" class="col-md-4 partner-tile">
              <div class="header-block">
                  <img :src="element.logo" class="partner-logo" :alt="element.title + ' partner logo'"/>
                  <div class="title">{{ element.title }}</div>
                  <p class="sub-title">{{ element.type.title }}</p>
              </div>
              <p>{{ element.short_blurb }}</p>
              <div class="footer-block">
              <a :href="'/partners/' + element.slug"><img src="/cdn/svg/learn_more.svg" class="learn-arrow" alt="learn arrow" /></a>
                      <user-save
                          v-if="is_logged==1"
                          :type="element.type.type"
                          :item_id="element.id"
                          category="small-heart"                                                    
                          :is_saved="inArrayCustom({'item_id':element.id, 'type':element.type.type},user_saves_arr)"
                          ></user-save>
                        <user-save
                          v-if="is_logged==0"
                          category="small-heart"
                        ></user-save>
              </div>
          </div>                        
        </div>
        <div class="row" v-if="last_page_local >= next_page">
            <div class="col-md-12" style="text-align: center">
                <button class="btn btn_yellow" @click="loadMore(0)">Load more...</button>
            </div>
          </div>
        </div>
     </section>
  </div>
</template>

<script>


export default {
  name: "filter-bar",
  data: function() {
    return {
      items: [],
      last_page_local : 0,
      filter_type_slug : null,
      filter_skill_slug : null,
      next_page : 2,
      filterOption: "article",
      option: {
        itemSelector: '.grid-item',
        // layoutMode: 'fitRows',
        layoutMode: 'fitColumns',
        fitRows: {
          gutter: 30
        }
      },
    }
  },

  props: {
    types : { default : null},
    skills : { default : null},
    items_props : { default : null},
    is_logged : {default : 0},
    user_saves_arr : {default : null},
    path_url : {default : ''},
    path_slug : {default : ''},
    last_page : {default : 0},
    grid_type : {default : 'topic'}
  },

  mounted: function() {
    this.items = this.items_props;
    this.last_page_local = this.last_page;
  },    

  methods:{        
    async loadMore(isFiltered){            

      var query_param = "";        
      
      if(this.filter_type_slug && !this.filter_skill_slug)
        query_param = "&type=" + this.filter_type_slug;
        else
        if(!this.filter_type_slug && this.filter_skill_slug)
          query_param = "&skill=" + this.filter_skill_slug;
          else
          if(this.filter_type_slug && this.filter_skill_slug)
          query_param = "&skill=" + this.filter_skill_slug+"&type=" + this.filter_type_slug;

      if(isFiltered) this.next_page = 1;

      let response = await axios.get(
            `/api`+ this.path_url + this.path_slug + `?page=` + this.next_page + query_param
          )
          .then((response) => {
            
            this.last_page_local = response.data.last_page;
            var new_items = response.data.data;            
            
            if(isFiltered)
              {            
                this.items = new_items;                
              }
            else
            for (var i = 0; i < new_items.length; i++) {
               this.items.push(new_items[i]);
            }
            
            this.next_page = this.next_page + 1;
          });
    },

    shuffle(){
      let self = this;
      setTimeout(function(){ self.$refs.cpt.shuffle(); });
      
    },
    
    setFilterBy: function(type, key) {
      if(type === 'type') this.filter_type_slug = key;
      if(type === 'skill') this.filter_skill_slug = key;

      this.loadMore(1);
      this.shuffle();
    },

    setResetFilter: function(type) {
      if(type === 'type') this.filter_type_slug = null;
      if(type === 'skill') this.filter_skill_slug = null;

      this.loadMore(1);
      this.shuffle();
    },
    
    inArrayCustom(needle, haystack ){
      for (var i = 0; i < haystack.length; i++) {
        if((haystack[i].item_id == needle.item_id) && (haystack[i].type == needle.type))
          return true;
      }

      return false;
    }
  },
};
</script>
<style>
.dropdown-menu
 {
  cursor: pointer;
}

.grid {
  background: #EEE;
  max-width: 1200px;
}

/* clearfix */
.grid:after {
  content: '';
  display: block;
  clear: both;
}

.grid-sizer,
.grid-item { width: 20%; }
</style>



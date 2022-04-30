<template>
    <div>
    <div class="newsTitle w">
      <span>搜索结果</span>
    </div>
    <div class="newsContent">
      <div class="w">
        <div class="hotNewsRight" v-if="searchList.length!==0">
          <ul>
            <li v-for="(news,index) in searchList" :key="index" @click="enterNewDetail(news._id)">
              <a>
                <img :src="news.imgUrl" alt="">
                <h4 class="hotNews">{{news.classify}}</h4>
                <p class="hotNewsContent">{{news.title}}</p>
                <div class="sendTime">发布时间: {{news.newsDate}}</div>
              </a>
            </li>
          </ul>
        </div>
        <div v-else>
            <h1>很抱歉，没有找到与“<span class="keyWord">{{keyWord}}</span>”相关的内容</h1>
        </div>
      </div>
    </div>
    
    </div>
</template>

<script>
export default {
    name:'searchNews',
    props:{
        searchList:{
            type:Array,
            default:()=>[]
        },
        keyWord:{
            type:String,
        }
    },
    data() {
      return {
        
      }
    },
    mounted() {
      
    },
    methods: {
       //进入新闻详情页
      enterNewDetail(id) {
        this.$router.push(`detail/${id}`)
      },
    },
    computed:{
      
    }
}
</script>

<style scoped>
.w {
    width: 1200px;
    margin: 0 auto;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  .newsTitle {
    margin-top: 10px;
  }
  .newsTitle span::after {
    display: block;
    content: '';
    width: 20px;
    height: 2px;
    background-color: #eca478;
  }
  .newsContent {
    height: 1050px;
    margin-top: 20px;
    background-color: #eeeeee;
  }
  .hotNewsRight ul{
      width: 1250px;
  }
  .hotNewsRight ul li {
    position: relative;
    width: 285px;
    height: 320px;
    float: left;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #ffffff;
  }
  /* .hotNewsRight ul li:nth-child(4) {
    margin-right: 0px;
  } */
  .sendTime {
    position: absolute;
    bottom: 10px;
    padding-left: 10px;
    font-size: 12px;
    color: #b5b5b5;
  }
  .hotNews {
    color: #eca478;
    padding: 10px;
  }
  .hotNews::after {
    display: block;
    content: '';
    width: 25px;
    height: 2px;
    background-color: #eca478;
  }
  .hotNewsContent {
    padding: 0 10px 0 10px;
    color: #5a595b;
  }
  .hotNewsRight ul li img {
    width: 100%;
    height: 50%;
  }
  .keyWord {
      color: #cc0000;
  }
</style>
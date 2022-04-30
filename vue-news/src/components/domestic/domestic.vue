<template>
    <div id="app">
        <div class="w">
            <div class="newsTitle">
                <img src="../../../images/topLogo.png" alt="">
            </div>
            <div class="mainContent">
                <div class="changeView">
                    <span class="leftList" @click="listView" :class="{leftCur:viewMode === 'list'}">
                        <i :class="{leftIconActive:viewMode === 'list'}"></i>
                        <span>列表浏览</span>
                    </span>
                    <span class="rightCard" @click="cardView" :class="{rightCur:viewMode === 'card'}">
                        <i :class="{rightIconActive:viewMode === 'card'}"></i>
                        <span>卡片浏览</span>
                    </span>
                </div>
                <div class="con" v-if="viewMode === 'list'">
                    <ul class="newslist">
                        <li class="borderno" v-for="(item,index) in newsList" :key="index" @click="toDetail(item._id)">
                            <div class="image">
                                <a href=""><img :src="item.imgUrl" alt=""></a>
                            </div>
                                <div class="text_con">
                                    <h3 class="titlekapain"><a href="">{{item.title}}</a></h3>
                                    <p v-html="item.content"><a href="" class="brief">{{item.content}}</a></p>
                                    <div class="bottom">
                                        <span class="author">作者：{{item.author}}</span>
                                        <span class="date">发布时间：{{item.newsDate}}</span>
                                    </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="cardMode" v-show="viewMode === 'card'">
                    <ul>
                        <li v-for="(item,index) in newsList" :key="index" @click="toDetail(item._id)">
                            <img :src="item.imgUrl" alt="">
                            <p class="headline">{{item.title}}</p>
                            <div class="newsAuthor">责任编辑：{{item.author}}</div>
                            <div class="sendTime">发布时间: {{item.newsDate}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'domestic',
    props:{
        selectClassify:{
            type:String,
            default:''
        },
        newsList:{
            type:Array,
            default:() => []
        },
    },
    data() {
        return {
            viewMode:'list'
        }
    },
    mounted() {
        
    },
    methods: {
        toDetail (id) {
            this.$router.push(`/detail/${id}`).catch(() =>{})
            // window.open(detail.href,'_self')
        },
        listView(){
            this.viewMode = 'list';
        },
        cardView(){
            this.viewMode = 'card'
        }
 }
}
</script>

<style scoped>
#app {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
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
      height: 300px;
  }
  .newsTitle img {
      width: 100%;
      height: 100%;
  }
  .mainContent {
      margin-top: 30px;
  }
  .changeView {
      width: 250px;
      height: 32px;
      position: relative;
      border-radius: 4px;
      box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 10%);
      text-align: center;
      font-size: 15px;
      line-height: 32px;
  }
  .leftList {
      width: 115px;
      height: 32px;
      padding-right: 20px;
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      cursor: pointer;
      background: url(../../../images/left.png) no-repeat;
  }
  .rightCard {
      width: 115px;
      height: 32px;
      padding-left: 20px;
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      cursor: pointer;
      background: url(../../../images/right.png) no-repeat;
  }
  .leftList i {
      width: 13px;
      height: 13px;
      display: inline-block;
      margin-top: -3px;
      vertical-align: middle;
      background: url(../../../images/spriteIcon.png) no-repeat -15px -47px;
  }
  .rightCard i {
      width: 13px;
      height: 13px;
      display: inline-block;
      margin-top: -3px;
      vertical-align: middle;
      background: url(../../../images/spriteIcon.png) no-repeat -15px -62px;
  }
  .leftIconActive {
      background: url(../../../images/spriteIcon.png) no-repeat 0px -47px !important;
  }
  .rightIconActive {
      background: url(../../../images/spriteIcon.png) no-repeat 0px -62px !important;
  }
  .leftCur {
      color: #fff;
      background: url(../../../images/leftActive.png) no-repeat;
  }
  .rightCur {
      color: #fff;
      background: url(../../../images/rightActive.png) no-repeat;
  }
  .con {
      margin-top: 20px;
  }
  .borderno {
      width: 1160px;
      height: 160px;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid #e4e4e4;
      padding: 20px;
  }
  .image {
      width: 250px;
      height: 100%;
      float: left;
  }
  .image img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
  }
  .text_con {
    float: left;
    width: 867px;
    height: 100px;
    overflow: hidden;
    display: -moz-box;  /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
    display: -webkit-box;
    -moz-box-orient: vertical;/* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3   ;
    text-overflow: ellipsis;
    /*设置文字超出文本框的内容显示成...*/
    margin-left: 20px;
  }
  .text_con p {
      margin-top: 20px;
      font-size: 16px !important;
      line-height: 26px;
  }
  .bottom {
      width: 876px;
      height: 25px;
      font-size: 14px;
      color: #999999;
      position: absolute;
      bottom: 10px;
  }
  .bottom span:nth-child(2) {
      float: right;
      padding-right: 20px;
  }
  .text_con .brief {
      text-decoration: underline !important;
      color: rgb(112, 112, 252);
      cursor: pointer;
  }
  .cardMode ul{
      width: 1250px;
      min-height: 1000px;
  }
  .cardMode ul::after {
      display: block;
      content: '';
      height: 0;
      width: 0;
      clear: both;
      visibility: hidden;
  }
  .cardMode ul li {
    position: relative;
    width: 285px;
    height: 320px;
    float: left;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #ffffff;
  }
   .cardMode ul li img {
    width: 100%;
    height: 50%;
  }
  /* .newsClassify {
    color: #eca478;
    padding: 10px;
  }
  .newsClassify::after {
    display: block;
    content: '';
    width: 25px;
    height: 2px;
    background-color: #eca478;
  } */
  .headline {
    padding: 20px 10px 0 10px;
    color: #5a595b;
  }
  .newsAuthor {
      position: absolute;
      left: 10px;
      bottom: 40px;
      font-size: 12px;
      color: #b5b5b5;
  }
  .sendTime {
    position: absolute;
    bottom: 10px;
    padding-left: 10px;
    font-size: 12px;
    color: #b5b5b5;
  }
</style>
<template>
    <div>
    <div class="newsTitle w">
      <span>最热新闻</span>
    </div>
    <div class="newsContent">
      <div class="w">
        <div class="hotNewsLeft" @click="enterOneDetail(oneNews._id)">
          <img :src="oneNews.imgUrl" alt="">
          <h4 class="hotNews">{{oneNews.classify}}</h4>
          <h3>{{oneNews.title}}</h3>
          <p v-html="oneNews.content">{{oneNews.content}}</p>
          <div class="sendTime">发布时间: {{oneNews.newsDate}}</div>
        </div>
        <div class="hotNewsRight">
          <ul>
            <li v-for="(news,index) in lastEightNews" :key="index" @click="enterNewDetail(news._id)">
              <a>
                <img :src="news.imgUrl" alt="">
                <h4 class="hotNews">{{news.classify}}</h4>
                <p class="hotNewsContent">{{news.title}}</p>
                <div class="sendTime">发布时间: {{news.newsDate}}</div>
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="hotNewsBottom">
          <ul>
            <li>
              <a href="#">
                <img src="../../../images/new1.jpeg" alt="">
                <h4 class="hotNews">最热新闻</h4>
                <p class="hotNewsContent">冰墩墩到手！时隔十二年，中国短道速滑女队再登领奖台</p>
                <div class="sendTime">发布时间: 2022-02-13 20:54</div>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../../images/new1.jpeg" alt="">
                <h4 class="hotNews">最热新闻</h4>
                <p class="hotNewsContent">冰墩墩到手！时隔十二年，中国短道速滑女队再登领奖台</p>
                <div class="sendTime">发布时间: 2022-02-13 20:54</div>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../../images/new1.jpeg" alt="">
                <h4 class="hotNews">最热新闻</h4>
                <p class="hotNewsContent">冰墩墩到手！时隔十二年，中国短道速滑女队再登领奖台</p>
                <div class="sendTime">发布时间: 2022-02-13 20:54</div>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../../images/new1.jpeg" alt="">
                <h4 class="hotNews">最热新闻</h4>
                <p class="hotNewsContent">冰墩墩到手！时隔十二年，中国短道速滑女队再登领奖台</p>
                <div class="sendTime">发布时间: 2022-02-13 20:54</div>
              </a>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    </div>
</template>

<script>
import request from '../../network/request'
export default {
    name:'firstPage',
    data() {
      return {
        newsDetailList:[],
        oneNews:'',
        lastEightNews:[]
      }
    },
    mounted() {
      this.getNewsList();
    },
    methods: {
      //调用接口获取到所有新闻数据
      getNewsList(){
            request({
                method:"post",
                url:"/news/showNews"
            }).then(res => {
                if(res.data&&res.data.length>0){
                    this.newsDetailList = res.data.filter(item => {
                      return item;
                    })
                    //取出最新一条新闻数据
                    const newLength = this.newsDetailList.length
                    this.oneNews = this.newsDetailList[newLength-1]
                    //取出最新的后八条新闻数据
                    this.lastEightNews = this.newsDetailList.slice(newLength-9,newLength-1)
                   console.log(this.lastEightNews)
                }
                // console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
       //进入新闻详情页
      enterNewDetail(id) {
        this.$router.push(`detail/${id}`)
      },
      enterOneDetail(id) {
        this.$router.push(`detail/${id}`);
      }
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
  .header {
    height: 100px;
    background-color: #2e3c4b;
  }
  .logo img {
    vertical-align: middle;
  }
  .logo span {
    margin-left: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 100px;
  }
  .pic {
    line-height: 100px;
    float: left;
  }
  .headerRight {
    float: right;
  }
  .headerRight ul li {
    float: left;
    padding:0 20px;
    list-style: none;
  }
  .headerRight ul li a {
    font-size: 14px;
    color: #fff;
    line-height: 100px;
  }
  .nav {
    line-height: 60px;
    height: 60px;
    background-color: #eeeeee;
    border-bottom: 2px solid #eca478;
  }
  .newsNav ul li {
    float: left;
    list-style: none;
    display: block;
    padding: 0 42px;
    color: #5c5f5f;
    font-size: 18px;
  }
  .find {
    float: right;
  }
  .find input {
    height: 20px;
  }
  .find img {
    vertical-align: middle;
  }
  .mainHeader {
    height: 400px;
    background-color: #2e3c4b;
  }
  .slider {
    position: relative;
    top: 20px;
    float: left;
  }
  .announcement {
    float: right;
    position: relative;
    right: 80px;
    top: 20px;
    width: 450px;
    height: 350px;
    border: 1px solid rgba(255, 255, 255, 0.171);
    /* background-color: #fff; */
  }
  .noticeTitle {
    width: 450px;
    height: 40px;
    background-color: rgba(226, 184, 47, 0.411);
    text-align: center;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
  }
  .noticeContent ul li {
    height: 30px;
    list-style: none;
    line-height: 30px;
    text-align: center;
    color: rgba(241, 235, 235, 0.822);
    border-bottom: 1px solid rgba(255, 255, 255, 0.171);
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
  .hotNewsLeft {
    width: 590px;
    height: 660px;
    float: left;
    position: relative;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .hotNewsLeft img {
    width: 100%;
    height: 60%;
  }
  .hotNewsLeft h3 {
    padding: 0 0 10px 10px;
  }
  .newsContent .hotNewsLeft p {
    margin: 0 10px 0 10px;
    line-height: 22px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;   
  }
  .newsContent .hotNewsRight ul {
    padding-top: 20px;
  }
  .hotNewsRight ul li {
    position: relative;
    width: 285px;
    height: 320px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .hotNewsRight ul li:nth-child(1),
  .hotNewsRight ul li:nth-child(2) {
    margin-top: 0px;
  }
  .hotNewsRight ul li:nth-child(5) {
    margin-left: 0px;
  }
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
  .hotNewsBottom ul li img {
    width: 100%;
    height: 50%;
  }
  .footer {
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
    background-color: #2e3c4b;
  }
</style>
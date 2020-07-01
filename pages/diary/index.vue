<template>
    <view>
        <view class="article-meta">
            <text class="article-author">{{banner.author_name}}</text>
            <text class="article-text">发表于</text>
            <text class="article-time">{{banner.published_at}}</text>
		
        </view>
        <view class="article-content">
            <rich-text :nodes="htmlString"></rich-text>
        </view>
        <!-- #ifdef MP-WEIXIN -->
		<!-- 这里是小程序的广告位 -->
        <!-- <ad v-if="htmlString" unit-id="adunit-01b7a010bf53d74e"></ad> -->
        <!-- #endif -->
		
		
		<!-- 悬浮 -->
		<view>
			<uni-fab
				:pattern="pattern"
				:content="content"
				:horizontal="horizontal"
				:vertical="vertical"
				:direction="direction"
				@trigger="trigger"
			></uni-fab>
		</view>
		<!-- 悬浮 end -->
		
    </view>
</template>

<script>
	import *as http from "@/pages/diary/api.js"
	// 悬浮
	import  uniFab from '@/components/uni-fab/uni-fab.vue'
    export default {
        data() {
            return {
                banner: {
					title:'',
					author_name:'',
					published_at:''
				},
				pattern:{
					color:'#FFA500', //String	#3c3e49	文字默认颜色
					selectedColor:'', //String	#007AFF	文字选中时的颜色
					backgroundColor:'', //String	#ffffff	背景色
					buttonColor:'#FFA500', //	String	#3c3e49	按钮背景色
				},
				horizontal:'right', //水平对齐方式。left:左对齐，right：右对齐
				vertical:'bottom', //垂直对齐方式。bottom:下对齐，top：上对齐
				direction:'horizontal', //展开菜单显示方式。horizontal:水平显示，vertical：垂直显示
				popMenu:true, //是否使用弹出菜单
				content:[
					{
						iconPath:'/static/review/review1.png',
						selectedIconPath:'/pages/diary/del',
						text:'评论',
						active:false,
					}
				],
                htmlString: "",
				r_id:0
            }
        },
        onShareAppMessage() {
            return {
                title: this.banner.title,
                path: 'pages/diary/index?r_id=' + this.r_id
            }
        },
        onLoad(event) {
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
			this.r_id = event.r_id;
			this.getDetail()
        },
        methods: {
			trigger (env){
				uni.navigateTo({
					url:'../review/index/index'
				});
			},
            getDetail() {
                http.getDetail({
                	r_id:this.r_id
                }).then(res => {
                	console.log(res)
					this.banner = {
							title:res.title,
							author_name:res.username,
							published_at:res.created_at
						}
					this.htmlString = res.html
					
                }).catch(err => {
                	uni.showToast({
                		icon:"none",
                		title:'服务器开小差！'
                	})
                })
            }
        }
    }
</script>

<style>
    view {
        font-size: 28upx;
        line-height: 1.8;
    }

    .banner {
        height: 360upx;
        overflow: hidden;
        position: relative;
        background-color: #ccc;
    }

    .banner-img {
        width: 100%;
    }

    .banner-title {
        max-height: 84upx;
        overflow: hidden;
        position: absolute;
        left: 30upx;
        bottom: 30upx;
        width: 90%;
        font-size: 32upx;
        font-weight: 400;
        line-height: 42upx;
        color: white;
        z-index: 11;
    }

    .article-meta {
        padding: 20upx 40upx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: gray;
    }

    .article-text {
        font-size: 26upx;
        line-height: 50upx;
        margin: 0 20upx;
    }

    .article-author,
    .article-time {
        font-size: 30upx;
    }

    .article-content {
        padding: 0 30upx;
        overflow: hidden;
        font-size: 30upx;
        margin-bottom: 30upx;
    }
</style>

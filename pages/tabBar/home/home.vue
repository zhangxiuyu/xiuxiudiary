<template>
	<view>
		
		<!-- 写一些文字 -->
		
		<view class="text-box" scroll-y="true">
			<text class="flex flex-direction">
				在这里,
				您可以记录每一天的点滴琐事,
				沉淀每一刻的生活感悟,
				分享每一秒的喜怒哀乐。
			 </text>
		</view>
		
		<!-- 轮播图  start -->
		<!-- <view  class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(swiper, index) in swiperList"
						:class="[currentSwiper >= index ? 'on' : '']"
						:key="index"
					></view>
				</view>
			</view>
		</view> -->
		<!-- 轮播图 end -->
		
		<!-- 文字滚动 start-->
		<!-- <view>
			<uni-notice-bar scrollable="true" single="true" :text="notice_text"></uni-notice-bar>
		</view> -->
		<!-- 文字滚动 end-->
		
		<!-- 日志数量 start -->
		<!-- <view  class="hm-visits-card">
			<view class="cardClass">
				<rich-text :nodes="nodes" class="text"></rich-text>
				<uni-badge  type="warning"	 :text="public_num"></uni-badge>
			</view>
			
			<view class="cardClass">
				<rich-text :nodes="nodes_to" class="text"></rich-text>
				<uni-badge  type="warning"	 :text="protected_num"></uni-badge>
			</view>
		</view> -->
		<!-- 日志数量 end -->
		
	
		
		<!-- 日记列表 start -->
		<view class="goods-list">
			<view class="title" style="color: orange;">
				<image src="/static/img/hua.png"></image>
				秀秀最近分享
				<image src="/static/img/hua.png"></image>
			</view>
			<view class="product-list">
				<view
					class="product"
					v-for="product in productList"
					:key="product.r_id"
					@tap="toDiary(product)"
				>
			
					<!-- 标题卡片模式 -->
					<uni-card title="Dcloud" mode="title" :is-shadow="true" :thumbnail=product.img :extra=product.time :note=product.num>
					    {{ product.con }}
					</uni-card>
				</view>
			</view>
			<!-- <view class="loading-text">{{ loadingText }}</view> -->
		</view>
		<!-- 日记列表 end -->
		
   </view>
</template>

<script>
</script>

<style>
</style>


<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniBadge,
			uniNoticeBar,
			uniCard
		},
		data() {
			return {
				swiperList: [
					 { id: 1, src: 'url1', img: '/static/img/1.jpg' },
					 { id: 2, src: 'url2', img: '/static/img/2.jpg' },
					 { id: 3, src: 'url3', img: '/static/img/3.jpg' }
				],
			    nodes: [{
			                name: 'div',
			                attrs: {
			                    class: '',
			                    style: 'text-align: center;'
			                },
			                children: [{
			                    type: 'text',
			                    text: '公开日记'
			                }]
						}],
				nodes_to: [{
							name: 'div',
							attrs: {
								class: '',
								style: 'text-align: center;'
							},
							children: [{
								type: 'text',
								text: '私人日记'
							}]
						}],
				public_num:7,
				protected_num:8,
				notice_text:"[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏",
				productList:[
					{
						r_id:1,
						img:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
						time:"2020-09-15 14:12:12",
						con:"那是一个秋意盎然、金风送爽的日子,我和父母一起来到了位于上师大旁的康健园.一踏进公园,一股浓郁的桂香扑鼻而来,泌人心脾,让我心旷神怡,只见一朵朵开得正烈的金色桂花,迎风而立,仿佛在向我招手.我们追着这桂香,走进了清幽的公园.",
						num:"点击数：123",
					},
					{
						r_id:2,
						img:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
						time:"2020-09-15 14:12:12",
						con:"那是一个秋意盎.",
						num:"点击数：123",
					},
					{
						r_id:3,
						img:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
						time:"2020-09-15 14:12:12",
						con:"那是一个秋意盎.",
						num:"点击数：123",
					}
				]
			}
		},
		methods: {
			onClick: function(e) {
			  console.log('onClick');
			},
			// 轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			// 日记详情
			toDiary(e) {
				console.log(123);
				// uni.showToast({ title: '商品' + e.r_id, icon: 'none' });
				uni.navigateTo({
					url: '../../diary/index?cid=' + e.r_id
				});
			},
		},
	}
	
</script>

<style lang="scss" >
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 92%;
		height: 30.7vw;
		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
					height: 30.7vw;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}
.hm-visits-card {
	margin-left: 20upx;
	margin-top: 20upx;
	margin-right: 20upx;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	width: 750rpx;
	height: 165.9rpx;
	text-align: center;
}

.cardClass {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	border-radius: 10.96rpx;
	box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
	background-color: #ffffff;
	width: 720.78rpx;
	height: 160.97rpx;
  
}
.text {
	opacity: 1;
	width: 124.68rpx;
	height: 46.75rpx;
	line-height: 46.75rpx;
	white-space: nowrap;
	color: #858997;
	font-size: 31.17rpx;
	font-weight: 400;

}

.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
}

.text-box{
	    margin-bottom: 20px;
	    padding: 20px 0;
	    display: flex;
	    min-height: 150px;
	    background-color: #fff;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    align-items: center;
	    text-align: center;
	    font-size: 15px;
	    color: #353535;
	    line-height: 1.8;
}
</style>

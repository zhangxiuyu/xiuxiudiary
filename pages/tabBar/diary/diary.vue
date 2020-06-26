<template>
	
	<view >
		<!-- 时间线 start  -->
		<timeline>
			<view v-for="product in diaryList">
				<timelineItem :leftTime="product.diary_date">
					<view v-for="li_list in product.list" :key="li_list.id" @tap="toDiary(li_list)">
						<view class="tripItem">
							<view class="title">{{ li_list.title }}</view>
							<view class="tips">{{ li_list.created_at }}</view>
						</view>
					</view>
				</timelineItem>
			</view>
		</timeline>
		<!-- 时间线 end  -->


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
	// 时间线
	import timeline from '@/components/chenbin-timeline/timeLine.vue'
	import timelineItem from '@/components/chenbin-timeline/timelineItem.vue'
	
	import *as http from'@/pages/tabBar/diary/api.js'
	
	// 悬浮
	import  uniFab from '@/components/uni-fab/uni-fab.vue'
	
	export default {
	        components:{
	            timeline,
	            timelineItem,
				uniFab
	        },
			data() {
				return {
					pattern:{
						color:'#59c88d', //String	#3c3e49	文字默认颜色
						selectedColor:'', //String	#007AFF	文字选中时的颜色
						backgroundColor:'', //String	#ffffff	背景色
						buttonColor:'#59c88d', //	String	#3c3e49	按钮背景色
					},
					horizontal:'right', //水平对齐方式。left:左对齐，right：右对齐
					vertical:'bottom', //垂直对齐方式。bottom:下对齐，top：上对齐
					direction:'vertical', //展开菜单显示方式。horizontal:水平显示，vertical：垂直显示
					popMenu:false, //是否使用弹出菜单
					content:[
						{
							iconPath:'/static/img/diary/hua.png',
							selectedIconPath:'/pages/diary/index',
							text:'添加',
							active:false,
						}
					],
					diaryList:[]
				}
			},
			methods:{
				// 点击悬浮按钮之后访问处理  这里验证是否登录， 未登录 跳转到我的页面进行引导登录
				trigger (){
					uni.navigateTo({
						url: '../../diary/add'
					});
				}
			},
			onShow() {
				http.diaryList({
					page:1
				}).then(res => {
					diaryList
					// uni.showToast({
					// 	title:'添加成功！',
					// 	duration: 2000,
					// 	icon:"success",
					// })
					
					// // 添加成功之后跳转 显示一下之后，倒计时到列表查看 
					// setTimeout(function(){
					// 	uni.navigateBack()
					// },2000)
					
				}).catch(err => {
					uni.showToast({
						icon:"none",
						title:err+'，请登录后重试！'
					})
				})
				
			},
			onReady(){
				// 
			}
			
		
	    }
</script>

<style  lang="scss">
.tripItem {
		height:140rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 20px 0px rgba(0,0,0,0.08);
		border-radius:10px;
		margin-bottom: 30rpx;
		.title {
			font-size:35rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.tips {
			font-size:30rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			margin-top: 20rpx;

		}
}
</style>

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
					popMenu:true, //是否使用弹出菜单
					content:[
						{
							iconPath:'/static/img/diary/hua1.png',
							selectedIconPath:'/pages/diary/index',
							text:'添加',
							active:false,
						},
						{
							iconPath:'/static/img/diary/date.png',
							selectedIconPath:'/pages/tabBar/diary/calendar',
							text:'日历',
							active:false,
						}
					],
					diaryList:[],
					page_total:1, // 总页数
					page:1, 	  // 当前页
					loadingText:'加载中...', 	  
				}
			},
			methods:{
				// 点击悬浮按钮之后访问处理  这里验证是否登录， 未登录 跳转到我的页面进行引导登录
				trigger (env){
					if(env.index == 0){
						uni.navigateTo({
							url: '../../diary/add'
						});
					}else if(env.index == 1){
						uni.navigateTo({
							url: './date'
						});
					}
					
				},
				toDiary(e) {
					// uni.showToast({ title: '商品' + e.r_id, icon: 'none' });
					uni.navigateTo({
						url: '../../diary/mymi?r_id=' + e.id
					});
				},
			},
			onShow() {
				this.page = 1;
				http.diaryList({
					page:this.page
				}).then(res => {
					this.diaryList = res.lists.reverse(); // 翻转数组
					this.page_total = res.total
				}).catch(err => {
					uni.showToast({
						icon:"none",
						title:'请《我的》页面登录后重试！'
					})
				})
				
			},
			onPullDownRefresh() {
			    console.log('onPullDownRefresh'); 
				if(this.page >= this.page_total){
					this.loadingText = '没有了。';
					return false;
				}else{
					this.page++;
					http.diaryList({
						page:this.page
					}).then(res => {
						res.lists;
						res.lists.map(x=>{
							this.diaryList.unshift(x);
						})
					}).catch(err => {
						uni.showToast({
							icon:"none",
							title:'请《我的》页面登录后重试！'
						})
					})
				}
				
				setTimeout(function () {
				    uni.stopPullDownRefresh();	
				}, 500);
			},
			onReady(){
				console.log('onReady')
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

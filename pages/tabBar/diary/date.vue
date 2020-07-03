<template>
	<view>
		<model-calendar 
		:sendYear="toYear" :sendMonth="toMonth"
		:dataSource="signData" :totalNum="sumCount"
		 @dateChange="getData" @clickChange="clickSign"	 >
		 </model-calendar>
		<view class='count'>
			<text>截至目前，已坚持写日记</text>
			<view class='daynumber'>
				<text class='number'>{{sumCount}}</text>
				<text class='day'>天</text>
			</view>

			<view>本月累积写日记<text class="monthSum">{{signData.length}}</text>天</view>
			<text>请再接再厉，继续努力!</text>
		</view>
	</view>
</template>

<script>
	import modelCalendar from '@/components/calendar.vue';
	import *as http from "@/pages/tabBar/diary/api.js"
	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: []
			};
		},
		components: {
			modelCalendar
		},
		created() {
			//获取当前用户当前任务的签到状态  			
			this.getData(this.toYear+"-"+this.toMonth);
		},
		methods: {
			clickSign(day) {
				console.log("在模版页签到了", day);
				// this.signData.push(day);
				// this.sumCount++
				//this.$http.postHttp("Comment/UpdateRecord", day, (res) => {//可以通过后台接口添加当前用户当日打卡记录，
				// 		//console.log(res);
				// 		//if (res!= undefined) {
				// 			uni.showToast({
				// 				title: "打卡成功"+day,
				// 				icon: 'success',
				// 				duration: 2000
				// 			});
				// 		
				// 		//}
				//  })	
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getData(val) {
				let y=val.split('-')[0]; // 年
				let m=val.split('-')[1]; // 月
				console.log(val)
				console.log(y,m)
			
				http.getDate({
					y:y,
					m:m
				}).then(res => {
					this.sumCount = res.sumCount;
					let num=res.lists,newSign=[],today=new Date().getDate();
					for(let i=0;i<num.length;i++){
						
						// if(parseInt(num[i])>today){
						// 	break;
						// }
						newSign.push(y+"-"+m+"-"+num[i])
					}
					
					this.signData = newSign;
				
				}).catch(err => {
					uni.showToast({
						icon:"none",
						title:'请《我的》页面登录后重试！'
					})
				})
			},
		}
	}
</script>

<style lang='scss'>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 20rpx;
		padding: 30rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>

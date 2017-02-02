$(function(){
	(function(){
		// 以下获得今天的日期与星期
		function updatedate(){
			var now=new Date();
			var day=now.getDay();
			var year=now.getFullYear();
			var month=now.getMonth();
			var date=now.getDate();
			var time=now.toLocaleTimeString();

			var day2week="";
			switch(day) {
				case 0:
					day2week="日";
					break;
				case 1:
					day2week="一";
					break;
				case 2:
					day2week="二";
					break;
				case 3:
					day2week="三";
					break;
				case 4:
					day2week="四";
					break;
				case 5:
					day2week="五";
					break;
				case 6:
					day2week="六";
					break;
			}

			$(".today .day").text(day2week);
			$(".today .year").text(year);
			$(".today .month").text(month+1);
			$(".today .date").text(date);
		}
		updatedate();

		// 更新所有天气信息
		function update(){
			var city=$(".city").val()||"北京";
			// var url="http://wthrcdn.etouch.cn/weather_mini?city="+city;
			var url="https://free-api.heweather.com/v5/weather?key=4a520f7c897c4049b42e1c9c526e6468&city="+city;
			$.ajax({
				url: url,
				success:function(info){
					if(info.HeWeather5[0].status=="ok"){
						var today=info.HeWeather5[0].daily_forecast[0].tmp;
						var now=info.HeWeather5[0].now;

						$(".today .thiscity").text(city);
						$(".todayotherinfo .time").text("数据更新时间："+info.HeWeather5[0].basic.update.loc);

						$(".todayotherinfo .nowtemp").text(now.tmp);
						$(".todayotherinfo .coldinfo").text(info.HeWeather5[0].suggestion.flu.brf+" : "+info.HeWeather5[0].suggestion.flu.txt);
						$(".todayotherinfo .airinfo").text(info.HeWeather5[0].suggestion.air.brf+" : "+info.HeWeather5[0].suggestion.air.txt);
						$(".todayotherinfo .comfinfo").text(info.HeWeather5[0].suggestion.comf.brf+" : "+info.HeWeather5[0].suggestion.comf.txt);



						var temprange=today.min+"~"+today.max;
						$(".todayinfo .temprange").text(temprange);
						$(".todayinfo .type").text(now.cond.txt);
						$(".todayinfo .wind").text(now.wind.dir+now.wind.sc+"级");
						$(".todayinfo .aqi").text(info.HeWeather5[0].aqi.city.aqi+" "+info.HeWeather5[0].aqi.city.qlty);

						// 未来四天预报
						$(".future li").each(function(index) {
							var idx=index+1;
							var future=info.HeWeather5[0].daily_forecast[idx];

							var date=future.date;
							var temprange=future.tmp.min+"~"+future.tmp.max;
							var type=future.cond.txt_n;
							var wind=future.wind.dir+future.wind.sc+"级";

							$(this).find('.date').text(date);
							$(this).find('.temprange').text(temprange);
							$(this).find('.type').text(type);
							$(this).find('.wind').text(wind);
						});
					}else{
						// 无法取得城市的天气信息
						$(".today .thiscity").text("无效的城市");
					}
				}
			});
		}
		update();

		// 点击更新
		$(".today .update").click(function(event) {
			update();
		});

		// 每小时自动更新
		var updatetimer=setInterval(function(){
			update();
		},3600000);
	})();
});
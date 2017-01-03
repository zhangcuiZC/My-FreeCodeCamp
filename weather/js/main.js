$(function(){
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
		$(".todayotherinfo .time").text("更新时间："+time);
	}

	// 取出字符串中数字的方法
	String.prototype.str2num=function(){
		var reg=/[\d-]/g;
		return parseInt(this.match(reg).join(""));
	};

	// 更新所有天气信息
	function update(){
		var city=$(".city").val()||"北京";
		var url="http://wthrcdn.etouch.cn/weather_mini?city="+city;
		$.ajax({
			url: url,
			success:function(info){
				var tempinfo=JSON.parse(info);
				// 如果成功取得天气信息
				if(tempinfo.status==1000){
					// 更新时间
					updatedate();
					// 显示选择的城市
					$(".today .thiscity").text(city);

					// 实时温度和感冒指数
					$(".todayotherinfo .nowtemp").text(tempinfo.data.wendu);
					$(".todayotherinfo .coldinfo").text(tempinfo.data.ganmao);

					// 更新今日天气详细信息
					var today=tempinfo.data.forecast[0];
					var temprange=today.low.str2num()+"~"+today.high.str2num();
					$(".todayinfo .temprange").text(temprange);
					$(".todayinfo .type").text(today.type);
					var wind=today.fengli+today.fengxiang;
					$(".todayinfo .wind").text(wind);
					$(".todayinfo .aqi").text(tempinfo.data.aqi);

					// 未来四天预报
					$(".future li").each(function(index) {
						var idx=index+1;
						var future=tempinfo.data.forecast[idx];

						var date=future.date;
						var temprange=future.low.str2num()+"~"+future.high.str2num();
						var type=future.type;
						var wind=future.fengli+future.fengxiang;

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
	},36000000);
});
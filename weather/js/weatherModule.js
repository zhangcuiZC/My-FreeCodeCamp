var weatherModule = (function(){
	// ----------------------------------以下：声明变量----------------------------------
	var weather_html = ""
		+ '<div class="weather">'
			+ '<h5 class="weather-today">'
				+ '<span class="weather-thiscity">-</span>'
				+ '&nbsp;&nbsp;星期<span class="weather-day"></span>&nbsp;&nbsp;'
				+ '<span class="weather-year"></span>年'
				+ '<span class="weather-month"></span>月'
				+ '<span class="weather-date"></span>日'
				+ '<span class="weather-choosecity">选择城市：<input type="text" name="city" class="weather-city" value="北京" maxlength="8"></span>'
				+ '<span class="weather-update">更新</span></h5>'
			+ '<div class="weather-todayinfo">'
				+ '<h1 class="weather-todayinfo-temprange">~</h1>'
				+ '<p class="weather-todayinfo-type">-</p>'
				+ '<p class="weather-todayinfo-wind">-</p>'
				+ '<p>实时空气质量：<span class="weather-todayinfo-aqi">-</span></p>'
			+ '</div>'
			+ '<div class="weather-todayotherinfo">'
				+ '<p class="weather-todayotherinfo-time">更新中……</p>'
				+ '<p>实时：<span class="weather-todayotherinfo-nowtemp"></span>°C</p>'
				+ '<h5>空气指数：</h5>'
				+ '<p class="weather-todayotherinfo-airinfo"></p>'
				+ '<h5>舒适指数：</h5>'
				+ '<p class="weather-todayotherinfo-comfinfo"></p>'
				+ '<h5>感冒指数：</h5>'
				+ '<p class="weather-todayotherinfo-coldinfo"></p>'
			+ '</div>'
			+ '<div class="weather-future">'
				+ '<ul>'
					+ '<li class="weather-future-item1">'
						+ '<h6 class="date">-</h6>'
						+ '<h3 class="temprange">~</h3>'
						+ '<p class="type">-</p>'
						+ '<p class="wind">-</p>'
					+ '</li>'
					+ '<li class="weather-future-item2">'
						+ '<h6 class="date">-</h6>'
						+ '<h3 class="temprange">~</h3>'
						+ '<p class="type">-</p>'
						+ '<p class="wind">-</p>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
		+ '</div>',

		jqueryMap = {},
		setJqueryMap,
		updateDate, 
		updateWeather,
		initModule;
		// ----------------------------------以上：声明变量----------------------------------
		// ----------------------------------以下：私有方法----------------------------------
		setJqueryMap = function($container){
			jqueryMap.$today_day = $container.find('.weather-day');
			jqueryMap.$today_year = $container.find('.weather-year');
			jqueryMap.$today_month = $container.find('.weather-month');
			jqueryMap.$today_date = $container.find('.weather-date');
			jqueryMap.$city = $container.find('.weather-city');
			jqueryMap.$this_city = $container.find('.weather-thiscity');
			jqueryMap.$update_time = $container.find('.weather-todayotherinfo-time');
			jqueryMap.$now_temp = $container.find('.weather-todayotherinfo-nowtemp');
			jqueryMap.$cold_info = $container.find('.weather-todayotherinfo-coldinfo');
			jqueryMap.$air_info = $container.find('.weather-todayotherinfo-airinfo');
			jqueryMap.$comf_info = $container.find('.weather-todayotherinfo-comfinfo');
			jqueryMap.$temp_range = $container.find('.weather-todayinfo-temprange');
			jqueryMap.$temp_type = $container.find('.weather-todayinfo-type');
			jqueryMap.$temp_wind = $container.find('.weather-todayinfo-wind');
			jqueryMap.$temp_aqi = $container.find('.weather-todayinfo-aqi');
			jqueryMap.$future_list = $container.find('.weather-future li');
			jqueryMap.$update_weather = $container.find('.weather-update');
		};

		updateDate = function(){
			var now=new Date(),
				day=now.getDay(),
				year=now.getFullYear(),
				month=now.getMonth(),
				date=now.getDate(),
				time=now.toLocaleTimeString(),
				day2week="";

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

			jqueryMap.$today_day.text(day2week);
			jqueryMap.$today_year.text(year);
			jqueryMap.$today_month.text(month+1);
			jqueryMap.$today_date.text(date);
		};

		updateWeather = function(){
			var city = jqueryMap.$city.val() || "北京";
			var url = "https://free-api.heweather.com/v5/weather?key=4a520f7c897c4049b42e1c9c526e6468&city=" + city;
			$.ajax({
				url: url,
				success : function(info){
					if(info.HeWeather5[0].status === "ok"){
						var today = info.HeWeather5[0].daily_forecast[0].tmp,
							now = info.HeWeather5[0].now,
							temprange = today.min + "~" + today.max;

						jqueryMap.$this_city.text(city);
						jqueryMap.$update_time.text("数据更新时间："+info.HeWeather5[0].basic.update.loc);

						jqueryMap.$now_temp.text(now.tmp);
						jqueryMap.$cold_info.text(info.HeWeather5[0].suggestion.flu.brf+" : "+info.HeWeather5[0].suggestion.flu.txt);
						jqueryMap.$air_info.text(info.HeWeather5[0].suggestion.air.brf+" : "+info.HeWeather5[0].suggestion.air.txt);
						jqueryMap.$comf_info.text(info.HeWeather5[0].suggestion.comf.brf+" : "+info.HeWeather5[0].suggestion.comf.txt);
						
						jqueryMap.$temp_range.text(temprange);
						jqueryMap.$temp_type.text(now.cond.txt);
						jqueryMap.$temp_wind.text(now.wind.dir+now.wind.sc+"级");
						if(info.HeWeather5[0].aqi){
							jqueryMap.$temp_aqi.text(info.HeWeather5[0].aqi.city.aqi+" "+info.HeWeather5[0].aqi.city.qlty);
						}else{
							jqueryMap.$temp_aqi.text("暂无数据");
						}

						// 未来预报
						jqueryMap.$future_list.each(function(index) {
							var idx = index + 1,
								future = info.HeWeather5[0].daily_forecast[idx],

								date = future.date,
								temprange = future.tmp.min+"~"+future.tmp.max,
								type = future.cond.txt_n,
								wind = future.wind.dir+future.wind.sc+"级";

							$(this).find('.date').text(date);
							$(this).find('.temprange').text(temprange);
							$(this).find('.type').text(type);
							$(this).find('.wind').text(wind);
						});
					}else{
						// 无法取得城市的天气信息
						jqueryMap.$this_city.text("无效的城市");
					}
				}
			});
		};
		// ----------------------------------以上：私有方法----------------------------------
		// ----------------------------------以下：公有方法----------------------------------
		initModule = function($container){
			$container.append(weather_html);
			setJqueryMap($container);
			updateDate();
			updateWeather();

			jqueryMap.$update_weather.click(function() {
				updateWeather();
			});
			jqueryMap.$city.keyup(function(e) {
				if (e.keyCode === 13) {
					updateWeather();
				}
				return false;
			});

			setInterval(function(){
				updateWeather();
			},1800000);
		};
		// ----------------------------------以上：公有方法----------------------------------
		return {
			initModule : initModule
		};
}());
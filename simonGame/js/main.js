$(function(){
	(function(){
		var switchon=false,
			startbtnclickable=false,
			strictbtnclickable=false,
			strictmode=false,
			strictnum=2,
			randomarr=[],
			yourarr=[],
			count=0,
			$countnum=$(".countnum"),
			$item=$(".simon-item"),
			nextroundtimer=[],
			againtimer=null;

		// 电脑开始下一回合
		function nextRound(){
			// 是否使用严格模式
			strictnum=(function(){
				return strictmode?4:2;
			}());
			randomarr.push(Math.floor(Math.random()*strictnum));
			count=randomarr.length;
			// 顺序显示这一回合
			$(randomarr).each(function(index, el) {
				nextroundtimer.push(setTimeout(function(){
					$item.eq(el).addClass("active");
					setTimeout(function(){
						$item.eq(el).removeClass("active");
						// 电脑回合结束，轮到玩家的回合
						if(index===randomarr.length-1){
							yourRound();
						}
					},300);
				},1300*(index+1)));
			});	
			// 显示回合数
			$countnum.addClass('active').text(count<10?"0"+count:count);
		}

		// 玩家的回合
		function yourRound(){
			yourarr=[];
			
			$item.bind('click', function(event) {
				var self=$(this);
				self.addClass('active');
				setTimeout(function(){
					self.removeClass('active');
				},100);
				yourarr.push($(this).index());
				// 检查是否正确
				if(yourarr.length===randomarr.length){
					$item.unbind('click');
					checkSelect();
				}
			});
		}


		function checkSelect(){
			if(yourarr.toString()===randomarr.toString()){
				// 如果正确，开始下一回合
				nextRound();
			}else{
				// 否则，重新开始这一回合
				$countnum.text("!!").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
				againtimer=setTimeout(function(){
					randomarr.pop();
					nextRound();
				},1000);
			}
		}

		// 绑定点击事件
		$(".startbtn").bind({
			mousedown: function(){
				if(startbtnclickable){
					$(this).addClass('active');
				}
			},
			mouseup: function(){
				if(startbtnclickable){
					$(this).removeClass('active');
					nextRound();
					startbtnclickable=false;
					strictbtnclickable=false;
				}
			}
		});

		$(".strictbtn").bind({
			mousedown: function(){
				if(strictbtnclickable){
					$(this).addClass('active');
				}
			},
			mouseup: function(){
				if(strictbtnclickable){
					$(this).removeClass('active');
					$(".stricton").toggleClass('active');
					strictmode = strictmode ? false : true;
				}
			}
		});

		$(".switchbox").click(function(event) {
			$(this).find('.switch').toggleClass('active');
			switchon = switchon ? false : true;
			if(switchon){
				startbtnclickable=true;
				strictbtnclickable=true;
				$countnum.text("00").addClass('active');
			}else{
				startbtnclickable=false;
				strictbtnclickable=false;
				$(".stricton").removeClass('active');
				if(nextroundtimer.length>0){
					for(var i in nextroundtimer){
						clearTimeout(nextroundtimer[i]);
					}
				}
				if(againtimer){
					clearTimeout(againtimer);
				}
				randomarr=[];
				$countnum.text("--").removeClass('active');
			}
		});
	}());
});
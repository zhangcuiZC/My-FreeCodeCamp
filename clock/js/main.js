$(function(){
	var $box=$(".clockbox"),

		$breakminus=$(".break-minus"),
		$breakplus=$(".break-plus"),
		$breaknum=$(".break-num"),

		$sessionminus=$(".session-minus"),
		$sessionplus=$(".session-plus"),
		$sessionnum=$(".session-num"),

		$clock=$(".clock"),
		$clockname=$(".clock-name"),
		$clockminute=$(".clock-minute"),
		$clocksecond=$(".clock-second"),
		$clockdot=$(".clock-dot"),
		$clocklayer1=$(".clock-layer1"),
		$clocklayer2=$(".clock-layer2"),

		timer=null,
		breaktime=true,
		flag=true;
	//事件委托
	$box.on('click', '.click', function(event) {
		var $e=$(event.target);
		if(flag){//flag为true表示倒计时未开始，可以点击加减进行时间更改
			if($e.hasClass('break-minus')){
				if($breaknum.text()-0>1){
					$breaknum.text($breaknum.text()-1);
				}
			}

			if($e.hasClass('break-plus')){
				if($breaknum.text()-0<99){
					$breaknum.text($breaknum.text()-0+1);
				}
			}

			if($e.hasClass('session-minus')){
				if($sessionnum.text()-0>1){
					$sessionnum.text($sessionnum.text()-1);
					$clockminute.text($sessionnum.text());
					$clockdot.hide();
					$clocksecond.text('');
				}
			}

			if($e.hasClass('session-plus')){
				if($sessionnum.text()-0<99){
					$sessionnum.text($sessionnum.text()-0+1);
					$clockminute.text($sessionnum.text());
					$clockdot.hide();
					$clocksecond.text('');
				}
			}
		}

		if($e.hasClass('start')){
			if(flag){
				// 如果倒计时未开始或者已经结束，则重新开始
				if($clocksecond.text()===""||($clockminute.text()==="0"&&$clocksecond.text()==="00")){
					$clockminute.text($sessionnum.text()-1);
					$clockdot.show();
					$clocksecond.text('59');
				}
				timer=setInterval(function(){
					var second=String($clocksecond.text()-1).length===1?"0"+($clocksecond.text()-1):$clocksecond.text()-1;
					$clocksecond.text(second);
					if($clocksecond.text()==-1){
						$clocksecond.text('59');
						$clockminute.text($clockminute.text()-1);
						if($clockminute.text()==-1){
							if(breaktime){//进入break计时
								$clockminute.text($breaknum.text()-1);
								breaktime=false;
								$clock.addClass('active2');
							}else{//彻底结束
								clearInterval(timer);
								$clocksecond.text('00');
								$clockminute.text('0');
								breaktime=true;
								flag=true;
								$clock.removeClass('active');
								$clock.removeClass('active2');
							}
						}
					}
				},1000);
				greenbg($sessionnum.text());
				// flag为false表示倒计时正在进行中，不可点击加减按钮
				flag=false;
				$clock.addClass('active');
			}else{//暂停，暂停时可以点击加减按钮重新安排时间
				clearInterval(timer);
				flag=true;
				$clock.removeClass('active');
			}
		}

	});

	function greenbg(time){
		var greenbgtimer=setInterval(function(){
			$clocklayer1.css('height', "+=5.72px");
		},1200*time);
	}
});
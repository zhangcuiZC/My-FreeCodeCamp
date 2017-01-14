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

		timer=null,
		breaktime=true,
		flag=true;

	$box.on('click', '.click', function(event) {
		var $e=$(event.target);
		if(flag){
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
				flag=false;
				$clock.addClass('active');
			}else{//暂停
				clearInterval(timer);
				flag=true;
				$clock.removeClass('active');
			}
		}

	});
});
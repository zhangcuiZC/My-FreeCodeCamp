$(function(){
	function checkCashRegister(price, cash, cid) {
  		var c=[];
  		var needchange=cash-price;
  		var m=0;
  		var flag=1;
  
  		for(var i=0;i<8;i++){
    		var num;
    		switch(i){
      			case 0:
        			num=100;
        			break;
      			case 1:
        			num=50;
        			break;
      			case 2:
        			num=20;
        			break;
      			case 3:
        			num=10;
        			break;
      			case 4:
        			num=5;
        			break;
      			case 5:
        			num=1;
        			break;
      			case 6:
        			num=0.5;
        			break;
      			case 7:
        			num=0.1;
    		}

    		var h=Math.floor(needchange/num+0.0001);
    		var hm=Math.min(h,cid[i][1]);
    		needchange-=num*hm;
    		needchange=needchange.toFixed(1);
    		if(hm>0){
      			cid[i][1]-=hm;
      			c[m]=[];
      			c[m][0]=cid[i][0];
      			c[m].push(hm);
      			m++;
    		}
    		if(cid[i][1]!==0){
      			flag=-1;
    		}
    	}//for结束

  		if(needchange!=0){
    		return "Insufficient Funds";
  		}else if(needchange==0&&flag===1){
    		return "Closed";
  		}else return c;
	}

	$(".change-right input").click(function(event) {
		var cid=[];
		var haschanges=$(".change-repo input");
		haschanges.each(function(index, el) {
			var thisarr=[];
			var name=$(this).attr('name');
			var num=parseFloat($(this).val());
			thisarr.push(name,num);
			cid.push(thisarr);
		});

		var price=$(".change-need input").val();
		var cash=$(".change-actual input").val();

		var result=checkCashRegister(price, cash, cid);
		$(".change-right span").text("-");
		$(".change-total").text((cash-price).toFixed(1));

		if(Array.isArray(result)){
			$(result).each(function(index, el) {
				$("."+el[0]).text(el[1]);
			});
		}else if(result==="Closed"){
			$(".change-closed").fadeIn(400).delay(3000).fadeOut(400);
		}else if(result==="Insufficient Funds"){
			$(".change-insuff").fadeIn(400).delay(3000).fadeOut(400);
		}
	});
});
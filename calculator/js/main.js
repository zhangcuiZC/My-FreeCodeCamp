$(function(){
	var calprogress="";
	var calresult;
	var calprogressbox=$(".calprogress");
	var calresultbox=$(".calresult");
	var flag=true;
	function fact(num){
		var fact;
		if(parseInt(num)==num){
			if(num>0){
				fact=num;
				for(var i=num-1;i>0;i--){
					fact*=i;
				}
			}else if(num===0){
				fact=1;
			}else{
				fact="无效输入";
			}
		}else{
			fact="无效输入";
		}
		return fact;
	}
	$(".calkey").on('click', 'td', function(event) {
		// console.log(Number($(this).text()));
		var key=$(this).text();
		var key2num=Number(key);
		if(key2num==key2num||key=="+"||key=="-"||key=="×"||key=="÷"||key=="."||key=="("||key==")"||key=="π"){
			if(!flag){
				if(key=="+"||key=="-"||key=="×"||key=="÷"){
					calprogress=calresult;
				}else{
					calprogress="";
				}
				flag=!flag;
			}
			calprogress+=key;
			calprogressbox.text(calprogress);
		}
		if(key=="="){
			if(flag){
				flag=!flag;
				var calprogress2=calprogress.replace(/×/g,"*").replace(/÷/g,"/").replace(/π/g,Math.PI).replace(/[\+\-\*\/%]+$/,"");
				// console.log(calprogress2);
				calresult=eval(calprogress2);
				calprogressbox.text(calprogress+"=");
				calresultbox.text(calresult);
			}
		}
		if(key=="C"||key=="CE"){
			calprogress="";
			calresult=0;
			calprogressbox.text("");
			calresultbox.text("0");
			flag=true;
		}
		if(key=="±"){
			if(Number(calresult)==Number(calresult)){
				calresult=-calresult;
				calresultbox.text(calresult);
				if(flag){
					flag=!flag;
				}
			}
		}
		if(key=="n!"){
			var num1=Number(calprogress);
			var num2=Number(calresult);
			if(flag){
				if(num1==num1){
					calprogress="fact("+num1+")";
					calprogressbox.text(calprogress);
				}else{
					var lastestnum=calprogress.match(/\d+$/);
					var factlastestnum="fact("+lastestnum+")";
					calprogress=calprogress.replace(/\d+$/,factlastestnum);
					calprogressbox.text(calprogress);
				}
			}else{
				if(num2==num2){
					calprogress="fact("+num2+")";
					calprogressbox.text(calprogress);
					flag=true;
				}
			}
		}
		if(key=="←"){
			if(flag){
				calprogress=calprogress.slice(0, -1);
				calprogressbox.text(calprogress);
			}
		}
		
	});
});
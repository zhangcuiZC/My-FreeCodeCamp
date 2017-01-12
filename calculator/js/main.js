$(function(){
	var calprogress="",
		calresult,
		calprogressbox=$(".calprogress"),
		calresultbox=$(".calresult"),
		flag=true,
		fontsize;

	// 求阶乘的函数
	function fact(num){
		if(parseInt(num)==num&&num<170){
			return num<=1?1:num*fact(num-1);
		}else{
			return "无效输入";
		}
	}

	// 求平方根的函数
	function sqrt(num){
		return Math.sqrt(num);
	}

	// 自适应结果框的函数
	function adjustwidth(){
		if(calresultbox.width()>=292){
			fontsize-=2;
			calresultbox.css('fontSize', fontsize+"px");
			adjustwidth();
		}
	}

	// 按键委托
	$(".calkey").on('click', 'td', function(event) {
		fontsize=72;
		var key=$(this).text();
		var key2num=Number(key);
		if(key2num==key2num||key=="+"||key=="-"||key=="×"||key=="÷"||key=="."||key=="("||key==")"||key=="π"||key=="Mod"){
			if(!flag){
				// flag为false表示已经有一个运算结果
				if(key=="+"||key=="-"||key=="×"||key=="÷"||key=="Mod"){
					// 如果在有运算结果的情况下按下运算符号，那么将运算结果加入运算过程
					calprogress=calresult;
				}else{
					// 如果按下的不是运算符号，那么清空已有的运算过程
					calprogress="";
				}
				// 使flag为true，表示两种情况下都会开始一个新的运算过程
				flag=!flag;
			}
			calprogress+=key;
			calprogressbox.text(calprogress);
		}
		// 求值
		if(key=="="){
			if(flag){
				flag=!flag;
				// 变为合法运算符
				var calprogress2=calprogress.replace(/×/g,"*").replace(/÷/g,"/").replace(/π/g,Math.PI).replace(/[\+\-\*\/%]+$/,"").replace(/Mod/,"%");
				try{
					calresult=eval(calprogress2);
					calprogressbox.text(calprogress+"=");
					if(calresult!=calresult){
						// 如果计算结果为NaN，那么输出“无效输入”
						calresultbox.text('无效输入');
					}else{
						calresultbox.text(calresult).css('fontSize', '72px');
						if(calresultbox.width()>=292){
							adjustwidth();
						}
					}
				}catch(e){
					// 如果calprogress中有fact引入的“无效输入”或者有不合理的运算符号，那么会引发错误，捕获错误并输出“无效输入”
					calresult=0;
					calprogress="";
					calresultbox.text('无效输入');
				}
			}
		}
		// 清空
		if(key=="C"){
			calprogress="";
			calresult=0;
			calprogressbox.text("");
			calresultbox.text("0").css('fontSize', '72px');
			flag=true;
		}
		// 运算结果取反
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
				// 如果是一个新的运算过程
				if(num1==num1){
					// 且运算过程里的文本是数字
					calprogress="fact("+num1+")";
					calprogressbox.text(calprogress);
				}else{
					// 如果不是数字，那么对运算过程中最后一个数字应用阶乘
					var lastestnum=calprogress.match(/\d+$/);
					var factlastestnum="fact("+lastestnum+")";
					calprogress=calprogress.replace(/\d+$/,factlastestnum);
					calprogressbox.text(calprogress);
				}
			}else{
				// 如果已有运算结果
				if(num2==num2){
					// 对结果应用阶乘
					calprogress="fact("+num2+")";
					calprogressbox.text(calprogress);
					flag=true;
				}
			}
		}
		// 根号与阶乘同理
		if(key=="√"){
			var num1=Number(calprogress);
			var num2=Number(calresult);
			if(flag){
				if(num1==num1){
					calprogress="sqrt("+num1+")";
					calprogressbox.text(calprogress);
				}else{
					var lastestnum=calprogress.match(/\d+$/);
					var sqrtlastestnum="sqrt("+lastestnum+")";
					calprogress=calprogress.replace(/\d+$/,sqrtlastestnum);
					calprogressbox.text(calprogress);
				}
			}else{
				if(num2==num2){
					calprogress="sqrt("+num2+")";
					calprogressbox.text(calprogress);
					flag=true;
				}
			}
		}
		// 回退一个字符
		if(key=="←"){
			if(flag){
				calprogress=calprogress.slice(0, -1);
				calprogressbox.text(calprogress);
			}
		}
		
	});

	$(".caltitle span").click(function(event) {
		alert("这个按钮并没有什么用_(:з)∠)_");
	});
});
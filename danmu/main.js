window.onload=function(){
	var fire=document.getElementsByTagName('button')[0];
	var clear=document.querySelector(".clear");
	var contentbox=document.querySelector(".contentbox");
	var width=parseFloat(window.getComputedStyle(contentbox).width);
	var colorbox=["black","red","yellow","green","blue","gray","olive","silver","teal","lime"];
	//  colorbox----0-------1------2-------3--------4------5------6-------7--------8------9
	var positionbox=[];
	for(var i=0;i<10;i++){
		positionbox.push(i);
	}
	//  positionbox----0-9
	
	var random2=-1;

	// 发射
	fire.onclick=function(){
		// 随机颜色
		var random1=Math.floor(Math.random()*10);
		// 生成与上次不重复的随机高度
		function randomposition(){
			var randomtemp=Math.floor(Math.random()*10);
			if(random2===randomtemp){
				randomposition();
			}else{
				random2=randomtemp;
			}
		}
		randomposition();

		var right;
		var text=document.getElementById('saysomething').value;
		var para=document.createElement("p");
		para.innerText=text;
		contentbox.appendChild(para);
		para.style.left=width+"px";
		para.style.color=colorbox[random1];
		para.style.top=positionbox[random2]*30+"px";
		var movetimer=setInterval(function(){
			var left=parseFloat(para.style.left);
			right=parseFloat(window.getComputedStyle(para).right);
			para.style.left=left-10+"px";
			if(right>=width){
				clearInterval(movetimer);
				contentbox.removeChild(para);
			}
		},100);
		
	};

	// 清屏
	clear.onclick=function(){
		contentbox.innerText="";
	};

	// 更改窗口尺寸时动态更新width
	var resizetimer=null;
	window.onresize=function(){
		clearTimeout(resizetimer);
		resizetimer=setTimeout(function(){
			width=parseFloat(window.getComputedStyle(contentbox).width);
		},200);
	};
};
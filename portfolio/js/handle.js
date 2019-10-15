
//ジャイロセンサー予定

//マウスコントロール
$(function(){
	mouseMotion.init();
})

var mouseMotion = {
	wWidth:0,
	wHeight:0,
	top:50,
	left:50,
	boxPos:[],
	boxSize:[],
	boxCount:0,
	widthProp:[],
	init:function(){
		mouseMotion.windowSize();
		mouseMotion.addEvent();
		mouseMotion.initBoxSet();
	},
	addEvent:function(){
		//window リサイズ時
		$(window).resize(function(){
			mouseMotion.windowSize();
		});
		//マウスカーソルイベント
		document.body.addEventListener("mousemove", function(e){
			//座標を取得する
			var mX = e.pageX;  //X座標
			var mY = e.pageY;  //Y座標
			var counter = 0;
			//setTimeout( function(){ mouseMotion.mousePos(mX, mY, counter)}, 200);
			mouseMotion.mousePos(mX, mY, counter);
		});
		//スクロールイベント
		//mouseMotion.scrollPos();
	},
	uaJudgement:function(){
	 	var ua = navigator.userAgent;
	 	var device = false;
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
			// スマートフォン用コード
			device = false;
		} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
			// タブレット用コード
			device = false;
		} else {
			// PC用コード
			device = true;
		}
		return device;
	},
	//マウスの位置に応じて子要素のdiv位置を変動させる
	mousePos:function(mX, mY, counter){
		$('.scene div').each(function(){
			var posX = mouseMotion.boxPos[counter].randPosLeft;
			var posY = mouseMotion.boxPos[counter].randPosTop;
			var rand = mouseMotion.boxPos[counter].randNum;
			var rota = 0;

			posX = posX + rand * Math.sin( ( mouseMotion.wWidth / 2 - mX) * (Math.PI / mouseMotion.wWidth));
			posY = posY + rand * Math.sin( ( mouseMotion.wHeight / 2 - mY ) * (Math.PI / mouseMotion.wHeight));
			rota = 0 + rand * ( mouseMotion.wWidth / 4 - mX) * ( mouseMotion.wHeight / 4 - mY ) * (Math.PI / mouseMotion.wWidth /100);

			var top = posY +'%';
			var left = posX + '%';
			var rot = rota + 'deg';

			if(counter%2==0){
				rot = '-' + rot;
			}
				
			$(this).css('top', top);
			$(this).css('left', left);
			$(this).css('transform', 'rotate('+ rot + ')');

			counter++;

		});
	},
	//スクロール時
	scrollPos:function(){
		$(window).on('scroll', function(){
			var sY = $(this).scrollTop();
			var counter = 0;
			$('.scene div').each(function(){
				var posX = mouseMotion.boxPos[counter].randPosLeft;
				var posY = mouseMotion.boxPos[counter].randPosTop;
				var rand = mouseMotion.boxPos[counter].randNum;

				posX = posX + ( -1 ) * rand * Math.sin( ( mouseMotion.wWidth / 2 - sY) * (Math.PI / mouseMotion.wWidth));
				posY = posY + ( -1 ) * rand * Math.sin( ( mouseMotion.wHeight / 2 - sY ) * (Math.PI / mouseMotion.wHeight));
				var rota = 0 + rand * ( mouseMotion.wWidth / 4 - mX) * ( mouseMotion.wHeight / 4 - mY ) * (Math.PI / mouseMotion.wWidth /100);

				var top = posY +'%';
				var left = posX + '%';
				var rot = rota + 'deg';

				$(this).css('top', top);
				$(this).css('left', left);
				$(this).css('transform', 'rotate('+ rot + ')');

				counter++;
			});
		});
	},
	//WINDOWサイズ設定
	windowSize:function(){
		mouseMotion.wWidth = $(window).width();
		mouseMotion.wHeight = $(window).height();
	},
	//ランダム数生成
	boxRand:function(max, min){
		return Math.random() * ( max - min ) + min;
	},
	//divの大きさをランダム変化
	initBoxSet:function(){
		var counter = 0;
		$('.scene div').each(function(){
			var randWidth = mouseMotion.boxRand(10, 100);
			var randHeight = mouseMotion.boxRand(10, 100);
			var randPosTop = mouseMotion.boxRand(-100, 100);
			var randPosLeft = mouseMotion.boxRand(-50, 50);
			//サイズ
			$(this).css('width',randWidth + '%');
			$(this).css('height',randHeight + '%');
			//位置
			$(this).css('top', randPosTop + '%');
			$(this).css('left', randPosLeft + '%');
			//乱数生成
			var randNum = mouseMotion.boxRand(1,30);
			//回転
			var rot =  mouseMotion.boxRand(-180, 180);
			$(this).css('transform', 'rotate('+ rot + 'deg)');

			var pos = {randPosTop, randPosLeft, randNum};
			var bsize = {randWidth, randHeight};

			mouseMotion.boxPos.push(pos);
			mouseMotion.boxSize.push(bsize);

			counter++;
		});
		mouseMotion.boxCount = counter;
	}
	,heightResize:function(){
		var maxHeight = 0;
		$('.content div p.images').each(function(i, box) {
			if($(box).height() > maxHeight) maxHeight = $(box).height();
		});
		$('.content div').each(function(i, e){
			$(e).find('.images').height(maxHeight);
		})
	}
}

if(mouseMotion.uaJudgement()) {
	$(window).on('load',function(){
		mouseMotion.heightResize();
	});
}

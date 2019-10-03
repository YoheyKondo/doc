


//マウスカーソル
window.onload=function(){
  //マウス移動時のイベントをBODYタグに登録する
  document.body.addEventListener("mousemove", function(e){
 
    //座標を取得する
    var mX = e.pageX;  //X座標
    var mY = e.pageY;  //Y座標

    console.log(mX);
    console.log(mY);

  });
}

$(function(){
	//ジャイロセンサー
	// for ios13
	requestPermission = ()=> {
		DeviceOrientationEvent.requestPermission().then(response => {
			if (response === 'granted') {
				window.addEventListener("deviceorientation", alert('TEST'));
			}
		}).catch(console.error);
	};

	$(window).resize(function(){
		var width = $(window).width();
		var height = $(window).height();

		console.log('center X : ' + width / 2);
		console.log('center Y : ' + height / 2);
	});
	window.addEventListener('deviceorientation', function(e) {
    var str   = '',
        alpha = e.alpha,
        beta  = e.beta,
        gamma = e.gamma;
	 
	    str  = 'alpha = ' + alpha + '\n';
	    str += 'beta = '  + beta + '\n';
	    str += 'gamma = ' + gamma + '\n';
	 
	    alert(str);
	}, false);

})

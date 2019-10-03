
//ジャイロセンサー
window.addEventListener("deviceorientation", handleOrientation, true);
 
function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;

  console.log(absolute + ' : ' + alpha + ' : ' + beta + ' : ' + gamma + ' ; ');
  $('#jam').text(absolute + ' : ' + alpha + ' : ' + beta + ' : ' + gamma + ' ; ');
}

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

	$(window).resize(function(){
		var width = $(window).width();
		var height = $(window).height();

		console.log('center X : ' + width / 2);
		console.log('center Y : ' + height / 2);
	});
})

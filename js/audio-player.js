/**
 * Created by zh on 2017/12/8.
 */
 function Player(warpper) {

	this.attrs = {
		audio : document.querySelector('.audio-player .audio-instance'),
		playBtn : document.querySelector('.audio-player .player-control-btn'),
		progressBar : document.querySelector('.audio-player .player-progress-bar'),
		loadingBar : document.querySelector('.audio-player .player-loading-bar'),
		thumbBtn : document.querySelector('.audio-player .player-progress-btn'),
		nowTime : document.querySelector('.audio-player .player-now-time'),
		totalTime : document.querySelector('.audio-player .player-total-time'),
		barWarp : document.querySelector('.audio-player .player-bar-warp')
       };

	// utils functions for dom 
	function hasClass(ele,cls){
		return !!ele.className.match( new RegExp( "(\\s|^)" + cls + "(\\s|$)") );
	}

	function addClass(ele,cls) {
		if(!hasClass(ele,cls)){
			var ele_class = ele.className,
				blank = (ele_class != '') ? ' ' : '';
			var added = ele_class + blank + cls;
			ele.className = added;
		}
	}

	function removeClass(ele,cls) {
		if(hasClass(ele,cls)){
			var ele_class = ' '+ele.className+' ';
			ele_class = ele_class.replace(/(\s+)/gi, ' ');
			var	removed = ele_class.replace(' '+cls+' ', ' ');
			removed = removed.replace(/(^\s+)|(\s+$)/g, '');
			ele.className = removed;
        	}
	}

	function secToMin(s) {
		var MM = Math.floor(s / 60);
		var SS = s % 60;
		if (MM < 10)
			MM = "0" + MM;
		if (SS < 10)
			SS = "0" + SS;
		var min = MM + ":" + SS;
		return min.split('.')[0];
	}

	// create DOM

	// toggle play/pause status
	function togglePlay() {
		var btn = player.attrs.playBtn,
			audio = player.attrs.audio;
		if(hasClass(btn,'pause')    ){
			removeClass(btn,'pause');
			addClass(btn,'playing');
			audio.play();
		}else if(hasClass(btn,'playing')){
			removeClass(btn,'playing');
			addClass(btn,'pause');
			audio.pause();
		}
	}

   	// update uis when playing
	function updateUiByTime() {
		var audio = player.attrs.audio,
			buffered = audio.buffered,
			playPercent = parseFloat((audio.currentTime/audio.duration)*100),
			loadingPercent = parseFloat((buffered.end(buffered.length - 1 )/audio.duration)*100);
		player.attrs.nowTime.innerHTML = secToMin(audio.currentTime);
		player.attrs.progressBar.style.width = playPercent+'%';
		player.attrs.loadingBar.style.width = loadingPercent+'%';
	}

	var player = this;

   	// get audio total seconds when loadedmetadata
	player.attrs.audio.addEventListener('loadedmetadata',function (e) {
		player.attrs.totalTime.innerHTML = secToMin(player.attrs.audio.duration)
	});

	// update ui when playing
	player.attrs.audio.addEventListener('timeupdate',updateUiByTime);

	// event handlers
	// just for mobile now
    	player.attrs.playBtn.addEventListener('touchend',togglePlay);


    	// variables for recording the coordinate
	var totalLength = player.attrs.barWarp.offsetWidth,
	    thumbBtnStartX,thumbBtnStartY,
	playedTimePercent;

    	// add touchstart touchmove touchend handlers for thumbBtn drag
    	player.attrs.thumbBtn.addEventListener('touchstart',function (e) {

    		// remove update handler when drag
		player.attrs.audio.removeEventListener('timeupdate',updateUiByTime);

		var touchObj = e.touches[0];

		// record start coordinate
        	thumbBtnStartX = touchObj.clientX;
        	thumbBtnStartY = touchObj.clientY;

        	// compute the percent already played
        	playedTimePercent = player.attrs.audio.currentTime / player.attrs.audio.duration;
	});

    	player.attrs.thumbBtn.addEventListener('touchmove',function (e) {

<<<<<<< HEAD
    	var touchObj = e.touches[0],
            deviationX = touchObj.clientX - thumbBtnStartX,
            add =  deviationX/totalLength,
            percent = (add+playedTimePercent)*100,
            moveToTime;

    	// let the progressbar follow finger
    	// limit the edge of the progressbar
    	percent = percent > 100 ? 100 : percent;
		percent = percent < 0 ? 0 : percent;
		moveToTime =  player.attrs.audio.duration*percent/100

		// set percent
        player.attrs.progressBar.style.width = percent+'%';

        // set playing time
        player.attrs.nowTime.innerHTML = secToMin(moveToTime);
=======
    		var touchObj = e.touches[0],
           	    deviationX = touchObj.clientX - thumbBtnStartX,
           	    add =  deviationX/totalLength,
           	    percent = (add+playedTimePercent)*100,
            	    moveToTime =  player.attrs.audio.duration*percent/100;

		// let the progressbar follow finger
		player.attrs.progressBar.style.width = percent+'%';

		// let the playing time follow finger
		player.attrs.nowTime.innerHTML = secToMin(moveToTime);
>>>>>>> 60c49e64397717b24d644dead6b81481a39424b6

	});

    	player.attrs.thumbBtn.addEventListener('touchend',function (e) {

		//update to currentTime
		var percent = parseFloat(player.attrs.progressBar.style.width);
		player.attrs.audio.currentTime   = player.attrs.audio.duration*percent/100;

		// drag end show continue listen the timeupdate event
		player.attrs.audio.addEventListener('timeupdate',updateUiByTime);

     	 });

}

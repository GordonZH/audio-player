# audio-player
原生js写的音频播放器，主要用于学习一下的HTML5的媒体事件

### loadedmetadata 元数据已加载
```javascript
audio.addEventListener('loadedmetadata',function (e) {
    // 此时可以取得元数据（比如分辨率和时长），本列中用于初始化页面上的播放时长
	player.attrs.totalTime.innerHTML = secToMin(player.attrs.audio.duration)
});
```
### timeupdate 当播放位置改变时触发
这个事件会在播放的过程中不停的触发，可用于随播放进度改变页面呈现
```javascript
audio.removeEventListener('timeupdate',function(e){
    
    //更新dom的代码
})
```

`施工进行中...`

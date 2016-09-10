# Socket
对 html5 Websocket的简单封装
##功能
* 支持消息订阅
* 支持取消订阅

##使用方法
```js
var ws = new Socket({
	url: "ws://115.28.213.244:8181",//ws-url
	onmessage: function() {//接收后台消息回调
	
	},
	onopen: function() {//连接成功回调
		ws.emit({//向后台发消息
			path: "test",//向test频道发消息
			message: "aaa"//消息内容
		});
		ws.on('test', function(data) {//订阅test频道
			log(data)
		});
	},
	onclose:function(){//连接关闭订阅
	  ws.off('test')//关闭test频道
	},
	onerror:function(){//连接出错
	
	}
});
```

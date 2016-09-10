(function() {
	var Socket = function(option) {
		console.log(option, 1111)
		this.url = option.url;
		this.onopen = option.onopen || this.noop;
		this.onclose = option.onclose || this.noop;
		this.onerror = option.onerror || this.noop;
		this.onmessage=option.onmessage||this.noop;
		this.openStatus=false;
		this.closeStatus=false;
		this.connect();
	};
	Socket.prototype = {
		connect: function() {//连接
			console.log('连接中')
			this.ws = new WebSocket(this.url);
			this.ws.onopen = function() {
				console.log('连接成功')
				this.openStatus=true;
				this.closeStatus=false;
				this.onopen();
			}.bind(this);
			this.ws.onmessage=function(event){
				var data=JSON.parse(event.data);
				var handler=this[data.path];
				if(data.path&&this.isFunction(handler)){//给注册过的path发消息
					handler(event);
				};
				this.onmessage(event);
			}.bind(this);
			this.ws.onclose = function() {
				console.log('连接段开')
				this.closeStatus=true;
				this.onclose();
			}.bind(this);
			this.ws.onerror = function() {
				console.log('连接出错')
				this.closeStatus=true;
				this.connect();
				this.onerror();
			}.bind(this);
		},
		emit:function(option){//发送消息
			var postData={
				path:option.path,
				message:option.message
			};
			var successCallback=option.success||this.noop;
			var errorCallback=option.error||this.noop;
			if(this.openStatus&&!this.closeStatus){//连接成功，同时没有关闭
				this.ws.send(JSON.stringify(postData))
				successCallback(postData);
			}else{
				errorCallback(postData)
			};
		},
		on:function(path,callback){//订阅消息
			callback=callback||this.noop;
			if(path){
				this[path]=callback;
			}
		},
		off:function(path){//取消订阅
			console.log('off')
			if(path&&this.isFunction(this[path])){
				delete this[path]
			}
		},
		noop: function() {},
		isFunction(obj){
			return typeof obj==='function';
		}

	};
	window.Socket = Socket;
})();
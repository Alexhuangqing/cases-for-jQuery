jQuery.dialog = function(opts){
	//先提供默认配置
	var defalts={
		id:"mark",
		title:"这里是标题",
		width:400,
		height:400,
		content:"请在这里添加内容",
		enterText:"确认",
		cancelText:"取消",
		enterCall:function(){
			//alert("这是enterCall方法")

		},
		cancelCall:function(){
			//alert("这是cancelCall方法")

		}
	};
	//将用户传递的对象重置默认
	opts=$.extend({},defalts,opts);
	//对话框模板HTML代码
	var template= "<div class=\"screen\" id='screen"+opts.id+"'>"+
					"<div class=\"dialog\" id='dialog"+opts.id+"' >"+
						"<div class=\"header\" id='header"+opts.id+"'>"+opts.title+"</div>"+
						"<div class=\"content\" id='concent"+opts.id+"' >"+opts.content+"</div>"+
						"<div class=\"footer\">"+
							"<a href=\"javascript:void(0)\" class=\"btn enter\"  id='enter"+opts.id+"'>"+opts.enterText+"</a>"+
							"<a href=\"javascript:void(0)\" class=\"btn cancel\"  id='cancel"+opts.id+"'>"+opts.cancelText+"</a>"+
						"</div>"+
					"</div>"+
				"</div>";
	//将模板的代码加到body中
	$("body").append(template);
	//通过id属性动态给Html设定样式(拼串也是体力活 注意变量 放外面)
	$("#dialog"+opts.id).css("width",opts.width+"px");
	$("#content"+opts.id).css("height",opts.height+"px");
	//通过id属性动态给元素绑定事件(拼串也是体力活 注意变量 放外面)
	$("#enter"+opts.id).click(function(){
		opts.enterCall();
		$("#dialog"+opts.id).hide(1000,function(){
			$("#dialog"+opts.id).remove()
			});
		$("#screen"+opts.id).hide(2000,function(){
			$("#screen"+opts.id).remove()
			});
	//	clear();
	});
	$("#cancel"+opts.id).click(function(){
		opts.cancelCall();
		$("#dialog"+opts.id).hide(1000,function(){
			$("#dialog"+opts.id).remove()
			});
		$("#screen"+opts.id).hide(2000,function(){
			$("#screen"+opts.id).remove()
			});
	//	clear();
		
	});
	//隐藏并删除弹窗  删除遮盖
	/*function clear(){
		$("#dialog"+opts.id).hide(1000,function(){
			$("#dialog"+opts.id).remove()
			});
		$(".screen").hide(2000,function(){
			$("#screen"+opts.id).remove()
			});

	}*/
	//让窗体跟着鼠标移动
	var canMove = false;//维护移动事件
	var _x ,_y;
	$("#header"+opts.id).mousedown(function(event){
		canMove = true;
		_x = event.pageX-parseInt($("#dialog"+opts.id).css("left"));
		_y = event.pageY-parseInt($("#dialog"+opts.id).css("top"));
		
	});
	$("#header"+opts.id).mouseup(function(event){
		canMove = false;
	})
	$(document).mousemove(function(event){
		if(canMove){
			
			var x =	event.pageX-_x;
			var y =	event.pageY-_y;
			$("#dialog"+opts.id).css({left:x,top:y});
		}
	});

	
	//显示
	$(".screen").show(500);
	$(".dialog").show(1000);

	//测试 ，利用自己的插件弹框 重写窗体的alert方法
	window.alert = function(message){
			$.dialog({
				id:"alert",
				title:"最后一测",
				width:100,
				height:100,
				content:message,
				enterText:"试试",
				cancelText:"算了",
			})

	}

//写在最后，多多体悟opts.id的妙用，在给同一个页面不同部分改变css；在不同加载面之间加载时，相互区分


	
}
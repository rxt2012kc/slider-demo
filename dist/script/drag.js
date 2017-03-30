/* 
 * drag 1.0
 * create by rxt2012kc@126.com
 * date 2017-3-30
 * 拖动滑块
 */
(function($) {
    $.fn.drag = function(options) {
        var x, 
        	drag = this, 
        	isMove = false, 
            success = false,
        	defaults = {};
        var options = $.extend(defaults, options);
        // 添加背景，文字，滑块
        if (!isHtml) {
            var html = '<div class="drag_bg"></div>'+
                    '<div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>';
                    '<div class="handler handler_bg"></div>';
            this.append(html);
            isHtml = true;
        }
        var $handler = drag.find('#handler');
        var $matchArea = drag.find('#matchArea');
        var $slider = drag.find('＃slider');
        var $drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var $reset = drag.find('#reset');
        var sWidth = 500; // 获取整个滑动轨道宽度
        var hWidth = $handler.width(); // 获取滑块的宽度，即可放置匹配区域的下限
        var mWidth = $matchArea.width(); // 获取匹配区域的宽度
        var maxWidth = sWidth - hWidth;  // 能滑动的最大间距
        var eWide = Math.floor(Math.random() * (maxWidth - hWidth + 1) + hWidth); //获取可放置匹配区域的区域
        $matchArea.css("left", eWide);
        console.log("滑块初始时四个角的位置为:" + "左上角:" + "(" + 15 + ", 56" + "), " + "左下角:" + "(" + 15 + ", " + (56 + hWidth) + "), " +"右上角:" + "(" + (15 + hWidth) + ", 56" + "), " +
                "右下角:" + "(" + (15 + hWidth) + ", " + (56 + hWidth) + ")");     
        logs += "slider initial positon: " + "Left Top: " + "(" + 15 + ", 56" + "), " + "Left Bottom: " + "(" + 15 + ", " + (56 + hWidth) + "), " +"Right Top: " + "(" + (15 + hWidth) + ", 56" + "), " +
                "Right Bottom: " + "(" + (15 + hWidth) + ", " + (56 + hWidth) + ")\n";
        var iHLeft = $handler.position().left; // 滑块的初始位置
        var iMLeft = $matchArea.position().left; // 匹配区域的初始位置
        var allPath = iMLeft - iHLeft; // 总的轨迹长度
        // 获取鼠标点击前光标的x，y位置 
        $(document).mousemove(function(e) {
            var timestamp = (new Date()).valueOf(); 
            var _x = e.pageX;
            var _y = e.pageY;
            if (!click) {
            	if (_x >= 15 && _x <= 15 + hWidth && _y >= 56 && _y <= 56 + hWidth) {
            		console.log("进入滑块区域！！！");
            		logs += "enter into slider area! ";
            	}
            	console.log("鼠标点击前上下文移动时x，y的位置：" + _x + "," + _y + ", Id:" + Id);
            	logs += "x, y postion before sliding: " + "x: " + _x + ", y: " + _y + ", Id: " + Id + ", time: " + timestamp + "\n";            	
            }
        });

        // 获取鼠标按下时候的x轴的位置
        $handler.mousedown(function(e){
            isMove = true;
            click = true;
            console.log(e.pageX);
            // 相对于浏览器的位置减去滑块的初始位置
            x = e.pageX;
            var y = e.pageY;
            var timestamp = (new Date()).valueOf(); 
            console.log("鼠标按下时刻的x, y的位置：" + x + ", y:" + y + ", Id:" + Id + ", time:" + timestamp + "\n");
            logs += "x, y postion begin to slide: " + "x: " + x + ", y: " + y + ", Id: " + Id + ", time: " + timestamp + "\n";

        });
        
        // 鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e) {
            if (success) {
                isMove = false;
            } else {
                isMove = true; 
            };
            var e = event || window.event;
                eStart = e.pageX; //起始位置
                eLeft = $handler.position().left; // 滑块的位置
                mLeft = $matchArea.position().left; // 滑块的位置
            var _x = e.pageX - x;
            var x_ = e.pageX;
            var y = e.pageY;
            var timestamp = (new Date()).valueOf(); 
            
            if (click) {
            	if (eLeft + hWidth >= iHLeft + hWidth && eLeft + hWidth <= iHLeft + hWidth + 1 / 3 * allPath) {
            		console.log("0-1/3处-----------------------------\n");
            		logs += "zero to one third! ";
            	} else if (eLeft + hWidth > iHLeft + hWidth + 1 / 3 * allPath && eLeft + hWidth <= iHLeft + hWidth + 2 / 3 * allPath) {
            		console.log("1/3-2/3处-----------------------------");
                	logs += "one third to two thirds! ";            	
            	} else if (eLeft + hWidth > iHLeft + hWidth + 2 / 3 * allPath && eLeft + hWidth <= iHLeft + hWidth + allPath) {
            		console.log("2/3-1处-----------------------------")
            		logs += "two thirds to three thirds! ";
            	} else if (eLeft + hWidth > iHLeft + hWidth + allPath) {
            		console.log("超出-----------------------------")
            		logs += "overstep the boundary! ";
            	}
            	console.log("鼠标按下之后的x, y轴的位置：" + x_  + ", y:" + y + ", Id:" + Id + ", time:" + timestamp + "\n");
            	logs += "x, y postion after sliding: " + "x: " + x_ + ", y: " + y + ", Id: " + Id + ", time: " + timestamp + "\n";            	
            } 
            if (isMove) {
                if (_x > 0 && _x <= maxWidth) {
                    $handler.css({'left': _x});
                    $drag_bg.css({'width': _x});
                     //鼠标指针移动距离达到最大时清空事件
                } 
            }
        }).mouseup(function(e) {
            isMove = false;
            var e = event || window.event;
                eOffsetX = e.pageX - eStart,
                disX = eLeft + eOffsetX,
                ppLeft = parseInt($matchArea.css('left')),
                errorLeft = ppLeft - 5,
                errorRight = ppLeft + 5;
            if (disX <= 0) {
                disX = 0;
            } else if (disX >= maxWidth) {
                disX = maxWidth;
            } else if (disX >= errorLeft && disX <= errorRight) { //在可误差范围内
                disX = eWide;
                $handler.css("left", disX + "px");
                isMatch();
            } else {
                // 鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                $handler.css({'left': 0});
                $drag_bg.css({'width': 0});
                $handler.unbind('mousedown');
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');              
                back++;
                click = false;
                $('#temp').click();
                console.log("退回"); 
            }
        });

        function isMatch() {
            var tdisX = $handler.position().left;
            // console.log(tdisX)
            if(tdisX >= errorLeft && tdisX <= errorRight) {
            	console.log("滑块最后的位置:" + tdisX);
            	console.log("匹配区域的四个角的位置为:" + "左上角:" + "(" + (eWide + 15) + ", 56" + "), " + "左下角:" + "(" + (eWide + 15) + ", " + (56 + mWidth) + "), " +"右上角: " + "(" + (eWide + 15 + mWidth) + ", 56" + "), " +
            	        "右下角: " + "(" + (eWide + 15 + mWidth) + ", " + (56 + mWidth) + ")");   
            	logs += "matchArea positon: " + "Left Top: " + "(" + (eWide + 15) + ", 56" + "), " + "Left Bottom: " + "(" + (eWide + 15) + ", " + (56 + mWidth) + "), " +"Right Top: " + "(" + (eWide + 15 + mWidth) + ", 56" + "), " +
            	        "Right Bottom: " + "(" + (eWide + 15 + mWidth) + ", " + (56 + mWidth) + ")\n";
            	console.log("滑块结束时四个角的位置为: " + "左上角: " + "(" + (15 + tdisX) + ", 56" + "), " + "左下角: " + "(" + (15 + tdisX) + ", " + (56 + hWidth) + "), " +"右上角: " + "(" + (15 + tdisX + hWidth) + ", 56" + "), " +
                        "右下角: " + "(" + (15 + tdisX + hWidth) + ", " + (56 + hWidth) + ")");   
                logs += "slider final positon: " + "Left Top: " + "(" + (15 + tdisX) + ", 56" + "), " + "Left Bottom: " + "(" + (15 + tdisX) + ", " + (56 + hWidth) + "), " +"Right Top: " + "(" + (15 + tdisX + hWidth) + ", 56" + "), " +
                        "Right Bottom: " + "(" + (15 + tdisX + hWidth) + ", " + (56 + hWidth) + ")\n";
            	$handler.addClass("isMatched").css("left", eWide+"px");
                $(".isMatched").text("ok");
                success = true;
                logs += "------------------end------------------";
                $.ajax({
                	url : '/slider-demo/slider/list.action',	
                	data : {
                		"logs" : logs
                	},
                	type : 'POST',
                	dataType : 'json',
                	cache : false,
                	async : true,
                	success : function(data) {
                		if (data) {
                		} else {
                		}
                	}
                });
                text.text('验证通过');
                $handler.unbind('mousedown');
                $handler.unbind('mousemove');
                $handler.unbind('mouseup');
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');

            }
        }
    };
})(jQuery);



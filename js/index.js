$(function() {
    $(document).ready(function() {
        countdown();
        setInterval(countdown, 1000);
    });
    function countdown() {
        var nowtime = +new Date();
        var inputtime = +new Date('2023/6/24 24:00:00');
        var times = (inputtime - nowtime) / 1000;
        var h = parseInt(times / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h;
        $(".hour").html(h);
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        $(".minute").html(m);
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        $(".second").html(s);
    };

    $("#navi li").mouseover(function() {
        $(".content").show();
        var index = $(this).index();
        $(".content>div").eq(index).show().siblings().hide();
    })
    $("#navi li").mouseout(function() {
        $(".content").hide();
    })

    $(".news-t a").mouseover(function() {
        var index = $(this).index();
        $(".news-b ul").eq(index).show().siblings().hide();
        $(".redline").eq(index).show().siblings('.redline').hide();
    })
    $(".content").mouseover(function() {
        $(this).show();
    });
    $(".content").mouseout(function() {
        $(this).hide();
    });

    for(var i = 0; i < $(".t-img li").length; i++) {
        $(".circle").append("<li></li>");
    }
    $(".circle li").eq(3).addClass("current");

    var index=3;
    $(".circle li").mouseover(function() {
        var index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $(".t-img li").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
    });

    var time = setInterval(move,2000);
    function move() {
        index++;
        if (index==$(".t-img li").length){
            index=0
        }
        $(".circle li").eq(index).addClass("current").siblings().removeClass("current");
        $(".t-img li").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
    };
    $(".grid-col2-t").hover(function () {
        clearInterval(time);
    },
    function () {
        time=setInterval(move,2000);
    });
    $(".arrow-r").click(function () {
       move();
    });
    function moveL() {
        index--;
        if (index==-1){
            index=$(".t-img li").length-1;
        }
        $(".circle li").eq(index).addClass("current").siblings().removeClass("current");
        $(".t-img li").eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
    }
    $(".arrow-l").click(function () {
        moveL();
    });

    $(".fixedtool li").mouseover(function() {
        var index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
    });

});



$(function () {
  // 控制电梯导航的显示和隐藏
  var toolTop = $(".countdown").offset().top;
  toggleTool();
  function toggleTool() {
    if ($(document).scrollTop() >= toolTop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    };
  }
  $(window).scroll(function () {
    toggleTool();
  });
  // 互斥锁（在后面将会用到）
  var flag = true;
  // 单击电梯导航中的某一项，让页面滚动到相应的内容区域
  $(".fixedtool li").click(function () {
    flag = false;		// 将flag设为ture，表示页面自动滚动
    // 根据索引号，计算页面要去往的位置
    var current = $(".fixedtool li").eq($(this).index()).offset().top;
    // 利用动画效果实现页面滚动
    $("body, html").stop().animate({
      scrollTop: current
    }, function () {  // 动画完成后执行此方法
      flag = true; 	// 将flag设为true，表示滚动结束
    });
    // 单击之后，为当前的li元素添加current类名，兄弟元素移除current类名
    $(this).addClass("current").siblings().removeClass();
  });
  $(window).scroll(function () {
    toggleTool();
    // 当页面滚动到某个内容区域后，激活电梯导航中对应的选项
    if (flag) {
      $(".floor .w").each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
        }
      });
    }
  });
});
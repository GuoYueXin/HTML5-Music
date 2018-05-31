(function($, root){

    var $scope = $(document.body); 
    var curDuration;
    var frameId;
    var lastprecent = 0;
    var startTime;
    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration % 60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }

        return minute + ':' + second;
    }

    function updata(precent){
        var curTime = precent * curDuration;
        var precentage = (precent - 1) * 100 + '%';
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        $scope.find('.pro-top').css({
            transform : 'translate('+ precentage +')'
        })
    }
    function renderAllTime (duration){
        lastprecent = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }

    function start(precentage){
        lastprecent = precentage === undefined ? lastprecent : precentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var precent = lastprecent + (curTime - startTime) / (curDuration * 1000);
            if(precent < 1){
                updata(precent);
                frameId = requestAnimationFrame(frame);
            } else{
                cancelAnimationFrame(frameId);
            }
    
        }
        frame();
    }

    function stop(){
        var stopTime = new Date().getTime();
        lastprecent = lastprecent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.processor = {
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        updata : updata
    }
})(window.Zepto, window.player || (window.player = {}))
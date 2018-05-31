var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var controlmanager;
var audio = new root.audioManager();

function bindClick(){
    $scope.on('play:change',function(event,index,flag){
        root.render(songList[index]);
        audio.setAudioSource(songList[index].audio);
        root.processor.renderAllTime(songList[index].duration);
        root.processor.updata(0);
        if(audio.status == 'play' || flag){
            audio.play();
            root.processor.start();
        }
    })
    $scope.on('click','.prev-btn',function(){
        var index = controlmanager.prev();
        $scope.trigger('play:change', index);
    })
    $scope.on('click','.next-btn',function(){
        var index = controlmanager.next();
        $scope.trigger('play:change', index);
    })
    $scope.on('click','.play-btn',function(){
        if(audio.status == 'play'){
            audio.pause();
            root.processor.stop();
            // $scope.find('.play-btn').removeClass('pause');
        }else{
            audio.play();
            root.processor.start();
            // $scope.find('.play-btn').addClass('pause');
        }
        $(this).toggleClass('pause');
    })
    $scope.on('click','.list-btn',function(){
        // $scope.find('.play-list').toggleClass('show');
        root.playList.show(controlmanager);
    })
    $scope.on('click','.close-btn',function(){
        $scope.find('.play-list').toggleClass('show');
    })
    $scope.on('click','.like-btn',function(){
        $(this).toggleClass('liking');
        // root.render(songList[index]);
    })
}

function bindTouch(){
    var $sliderPoint = $scope.find('.slider-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    // console.log(offset);
    $sliderPoint.on('touchstart',function(){
        root.processor.stop();
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var precent = (x - left) / width;
        if(precent > 1 || precent < 0){
            precent = 0;
        }
        root.processor.updata(precent);
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var precent = (x - left) / width;
        if(precent > 1 || precent < 0){
            precent = 0;
        }
        var curDuration = songList[controlmanager.index].duration;
        var curTime = precent * curDuration;
        console.log(curDuration);
        audio.jumpToPlay(curTime);
        root.processor.start(precent);
        $scope.find('.play-btn').addClass('pause');
    });
}
function getData(url){
    $.ajax({
        type : 'GET',
        url : url,
        success : function(data){
            songList = data;
            controlmanager = new root.controlManager(data.length);
            root.playList.renderList(data);
            bindClick();
            bindTouch();
            audio.bindEvent();
            $scope.trigger('play:change', 0);
        },
        error : function(){
            console.log('error');
        }
    })
}

getData('../mock/data.json');
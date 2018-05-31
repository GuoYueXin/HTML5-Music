(function($, root){
    var $scope = $(document.body);
    var control;
    var $playList = $('<div class="play-list">\
    <div class="list-header">播放列表</div>\
    <ul class="list-wrapper"></ul>\
    <div class="close-btn">关闭</div>\
</div>');
    $('.wrapper').append($playList);
    function renderList(songList){
        var html = '';
        songList.forEach(function(ele, index){
            html += '<li><h3>'+ ele.song +'</h3>-<span>'+ ele.singer +'</span></li>'
        });
        $playList.find('ul').html(html);
        bindEvent();
    }
    function show(controlmanager){
        control = controlmanager;
        $playList.addClass('show');
        signSong(control.index);
    }
    function bindEvent(){
        $playList.find('li').on('click',function(){
            var index = $(this).index();
           signSong(index);
           control.index = index;
           $scope.trigger('play:change',[index,true]);
           $scope.find('.play-btn').addClass('pause');
           setTimeout(function(){
                $playList.removeClass('show');
           },200)
        })
    }
    function signSong(index){
        $playList.find('.sign').removeClass('sign');
        $playList.find('ul li').eq(index).addClass('sign');
    }
    root.playList = {
        renderList : renderList,
        show : show
    }
})(window.Zepto, window.player || (window.player = {}))
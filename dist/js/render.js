(function($, root){
    var $scope =   $(document.body);

    //获取当前歌曲的详细信息
    function renderInfo(info){
        var html = '<div class="song-name">'+info.song+'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>';
        $scope.find('.song-info').html(html);
    }

    //获取当前歌曲的图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            root.blurImg(img, $scope);
            $scope.find('.song-img img').attr('src', src);
        }
        img.src = src;
    }

    function renderLike(isLike){
        if(isLike){
            $scope.find('.like-btn').addClass('liking');
        }else{
            $scope.find('.like-btn').removeClass('liking');
        }
    }
    root.render = function (data){
        renderInfo(data);
        renderImg(data.image);
        renderLike(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))
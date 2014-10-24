/**
 * Created by bangbang93 on 14-8-20.
 */
$(document).ready(function (){
    $('#username').on('loginSuccess', function (result){
        if (result.isAdmin){

        }
        $.get('/Server/list',{}, function (data, status){
            if (status == 'success'){
                var $servers = $('#servers');
                data.forEach(function (server){
                    $servers.append('<li><a target="frame" href="/Server/status.html#' + server + '" >' + server + '</a></li>')
                })
            }
        })
    });
    $('#servers').on('click','a', function (){
        var that = $(this);
        that.parent().find('a').each(function (){
            var $a = $(this);
            $a.removeClass('aui-nav-selected');
        });
        that.addClass('aui-nav-selected');
    })
});
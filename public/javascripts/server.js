/**
 * Created by bangbang93 on 14-8-20.
 */
$(document).ready(function (){
    $('#username').on('loginSuccess', function (result){
        if (result.isAdmin){

        }
        $.get('/server/list',{}, function (data, status){
            if (status == 'success'){
                if (window.location.pathname.indexOf('/admin') != 0){
                    var $servers = $('#servers');
                    data.forEach(function (server){
                        $servers.append('<li><a target="frame" href="/server/status.html?' + server.serverName + '#' + server.serverName + '" >' + server.serverName + '</a></li>')
                    })
                } else {
                    var $serverList = $('#server-list');
                    data.forEach(function (server){
                        $serverList.prepend('<li><a href="/admin/edit.html?' + server.serverName + '#' + server.serverName + '" >' + server.serverName + '</a></li>')
                    })
                }
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
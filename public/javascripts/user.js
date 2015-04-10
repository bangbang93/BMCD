/**
 * Created by bangbang93 on 14-8-20.
 */
window.BMCD = {};
$(document).ready(function (){
    $.get('/user/status',{},function (data,status){
            if (status == 'success'){
                if (data.success){
                    BMCD.username = data.username;
                    $('#username').html('<p>' + data.username + '</p>').trigger('loginSuccess', data.isAdmin);
                } else {
                    if (!/\/user\/login\.html/.test(window.location.pathname)) {
                        window.location = '/user/login.html?from=' + encodeURIComponent(window.location.pathname);
                    }
                }
            }
    });
    $('#login').on('submit', function (){
        var pass = true;
        $('#message').empty();
        $('input').each(function (){
            var that = $(this);
            that.find('.error').remove();
            if (!that.val()){
                that.append('<div class="error"> 不可为空</div>');
                pass = false;
            }
        });
        if (pass){
            $.ajax('/user/login',{
              method: 'post',
              data: {
                username:$('#username').val(),
                password: $.md5($('#password').val())
              },
              statusCode:{
                200: function (){
                  function getQueryString(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return decodeURIComponent(r[2]); return null;
                  }
                  window.location = getQueryString('from') || '/';
                },
                403: function (){
                  AJS.messages.error('#message',{
                    title:"登陆失败",
                    body: '用户名或密码错误'
                  });
                }
              }
            });
        }
    });
    $('#logout').on('click', function (){
        $.get('/user/logout', function (data, status){
            if (status == 'success'){
                if (data.success){
                    window.location = '/user/login.html';
                }
            }
        })
    })
});

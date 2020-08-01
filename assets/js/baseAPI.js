// 设置路径(测试)
    var baseURL = 'http://ajax.frontend.itheima.net';

// 设置路径(生产)
    // var baseURL = 'http://www.itheima.cn';
// 每次调用$.get()或$.post()或$.ajax()时调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    options.url = baseURL + options.url
    // console.log(options.url);

    // 统一有权限的借口，社会headers请求头
    if(options.url.indexOf('/my/') !==-1){
        options.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }

    // 不论成功还是失败，最终都会调用comlete回调函数
    options.comlete = function(res){
        var data = responseJSON
        if(res.status === 1 && message == '身份认证失败')
        // 1.删除token
        localStorage.removeItem('token');
        // 2.页面跳转
        location.href = '/login.html'
    } 
})
// 设置路径(测试)
    var baseURL = 'http://ajax.frontend.itheima.net';

// 设置路径(生产)
    // var baseURL = 'http://www.itheima.cn';
// 每次调用$.get()或$.post()或$.ajax()时调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    options.url = baseURL + options.url
    // console.log(options.url);
})
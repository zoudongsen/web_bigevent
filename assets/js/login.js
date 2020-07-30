$(function(){
    // 点击去注册链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    
    // 通过form.verify()函数校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   校验两次密码是否一致
        repwd:function(value){
            if ($('#reg-pwd').val() !== value){
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type :'post',
            url: '/api/reguser',
            // data:$('#form_reg').serialize(),
            data:{
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
        },
        success: function(res){
            if(res.status !=0 ){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 模拟人的点击行为
            $('#link_login').click();
            // 清空表单
            $('#form_reg')[0].reset();
        }
        })
        
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login', 
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将登录成功得到的token字符串保存到本地存储
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})
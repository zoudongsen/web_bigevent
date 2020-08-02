$f(function(){
    var form = layui.form

    
    form.verify({
        pwd:[/^[\s]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samePwd:function(value){
            if(value === $('[name=oldPwd').val()){
                return'新密码不能与原密码相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd').val()){
                return'两次输入的密码不一致'
            }
        }
    })

    // 3.修改密码
    $('.layui-form').on('submit'),function(e){
        e.preventDeflut();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新密码成功');
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    }
})
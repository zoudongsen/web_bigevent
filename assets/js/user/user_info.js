$(function(){
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname:function(value) {
            if(value.trim().length>6){
                return"昵称应该输入1~6位之间"
            }
        }
        
    })

    // 2.初始化用户信息
    initUserIfon();

    // 初始化用户的基本信息
    function initUserIfon(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                console.log(res);
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click',function(e){
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserIfon();
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0 ) {
                    return layer.msg("用户信息修改失败")
                }else{
                    layer.msg("用户信息修改成功")

                     // 调用父页面中国的方法，渲染到子页面中
                window.parent.getUserInfo()
                }
                

               
            }
        })
    })
})
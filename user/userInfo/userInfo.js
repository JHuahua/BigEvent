// -----------------------------------------------获取用户信息
getInfo();
function getInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            layer.msg(res.message)
            if (res.status == 0) {
                // input赋值：
                // $("input[name=username]").val(res.data.username);
                // $("input[name=nickname]").val(res.data.nickname);
                // $("input[name=email]").val(res.data.email);
    
                // 快速赋值：layUI表单的快速赋值
                //      1.找到form表单，给form标签添加lay-fliter = ""属性；class="layui-form"
                //      2.调用JS模块，input name值必须和赋值的属性名对应；
                var form = layui.form;
                form.val('user', res.data);
            }
        }
    })
}

// ---------------------------------------------信息更新
$("form").on("submit", function (e) {
    e.preventDefault();

    var data = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                window.parent.getInfo();
            }
        }
    })
})

// -----------------------------------------------------重置
$('button:contains("重置")').click(function (e) {
    e.preventDefault();
    
    //  为表单重新赋值，请求原来的数据
    //  把获取用户数据重新获取；
    get_info(); 
});
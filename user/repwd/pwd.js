//  1.新密码 长度要求 6-12
//  2.新密码不能喝旧密码一样
//  3.两次输入 新密码 得一样
// -----------------------------------------表单验证
var form = layui.form;
form.verify({
    changdu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],
    // 使用函数
    same: function(val) {
        // 获取某个地方的值
        var pwd = $('.newPwd').val();
        // val:要验证的值
        if (pwd !== val) {
            return '两次密码不一致哟~';
        }
    },
    diff: function (val) {
        if ($('.oldPwd').val() == val) {
            return "新密码不能跟旧密码一致哦"
        }
    }
});

$("form").on("submit", function (e) {
    e.preventDefault();

    var data = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                $("form")[0].reset();
            }
        }
    })
})
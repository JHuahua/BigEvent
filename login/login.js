$("#goto-register").on("click", function () {
    $("#login").hide();
    $("#register").show();
})
$("#goto-login").on("click", function () {
    $("#login").show();
    $("#register").hide();
})


// -----------------------------------------------------------注册
// ---------------------------------------------------表单验证
// 需求：
//    1. 用户名、密码、重复密码不能为空
//    2. 密码、重复密码长度 6~12 位，且不能出现空格
//    3. 密码和重复密码必须一致
var form = layui.form;
form.verify({
    // 键（验证规则）: 值（验证的方法，可以使用数组/函数）
    // 我们既支持上述函数式的方式，也支持下述数组的形式
    // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    changdu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],
    // 使用函数
    same: function(val) {
        // 获取某个地方的值
        var pwd = $('.pwd').val();
        // val:要验证的值
        if (pwd !== val) {
            return '两次密码不一致哟~';
        }
    }
});


// ------------------------------------------------表单验证
$("#register form").on("submit", function (e) {
    e.preventDefault();

    var val = $(this).serialize();

    $.ajax({
        type: 'post',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: val,
        success: function (res) {
            layer.msg(res.message);
 
            if (res.status === 0) {
                // 注册成功，显示登录的盒子
                $('#login').show().next().hide();
                
                // 清空注册的表单(reset是dom方法，所以把jQuery对象转成DOM对象)
                $('#register form')[0].reset();
            }
            console.log(res);
        }
    })
})


// --------------------------------------------------------注册
$("#login form").on("submit", function (e) {
    e.preventDefault();

    var data = $(this).serialize();

    $.ajax({
        type: 'post',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function (res) {
            // 无论登录成功，还是失败，都给提示
            layer.msg(res.message);
            if (res.status === 0) {
                // 把token保存到本地存储
                localStorage.setItem('token', res.token);
                // 跳转到index.html
                location.href = '../index.html';
            }
        }
    })
})
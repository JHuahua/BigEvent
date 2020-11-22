// -------------------------------------------------------获取文章id
var str = window.location.search;
var id = str.slice(4);

// -------------------------------------------------------加载分类数据
var form = layui.form;
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        var str = `<option value="">全部分类</option>`;
        $.each(res.data, function (index, ele) {
            str += `<option value="${ele.Id}">${ele.name}</option>`;
        })
        $("select").html(str);
        // 重新渲染form
        form.render("select")

        getList()
    }
})

initEditor();
initCropper();
function initCropper() {
    // ---------------  创建剪裁区
    // - 调用cropper方法，创建剪裁区
    $('#image').cropper({
        // 纵横比(宽高比)
        aspectRatio: 400 / 280, // 正方形
        // 指定预览区域
        preview: '.img-preview' // 指定预览区的类名（选择器）
    });

    // --------------------------------------------选择图片；
    $(".select").on("click", function () {
        $("#file").click();
    })
    // 选择图片：
    //      1.change: 文件被选择时执行change事件
    //      2.选择某个图片后确实可以得到文件信息!需要图片src地址
    //      URL.createObjectURL（文件信息的对象）---->临时文件地址
    $("#file").change(function () {
        console.log(this);
        // 文件对象
        var obj = this.files[0]

        // 内置对象 临时创建地址
        var url = URL.createObjectURL(obj);
        // 替换：使用cropper，查文档
        $('#image').cropper("replace", url);
    })
}

// ------------------------------------------------获取文章详情 展示
function getList() {
    $.ajax({
        url: '/my/article/' + id,
        success: function (res) {
            // console.log(res);
            form.val("edit", res.data);

            // 图片需要单独设置
            $('#image').cropper("replace", 'http://ajax.frontend.itheima.net' + res.data.cover_img);
        }
    })  
}


// ------------------------------------------------确认修改
$("form").on("submit", function (e) {
    var index = layer.load(2, { shade: [0.8, '#393D49'] });

    e.preventDefault();

    var fd = new FormData(this);

    // 替换FormData对象里面的一项
    fd.set('content', tinyMCE.activeEditor.getContent());
    fd.append('Id', id);

    // 剪裁图片
    var canvas = $('#image').cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    // 
    //    canvas 用户获取文件对象,不是前面用户 base64字符串
    canvas.toBlob(function(file) { // 文件对象
        // 添加img 参数值：
        fd.append("cover_img", file);
    
        // 
        // 完成添加
        $.ajax({
        type: 'POST',
        url: '/my/article/edit',
        // fd:对象;
        data: fd,
        // 提交formdata数据，必须加下面两个选项
        processData: false,
        contentType: false,
        success: function(res) {
            layer.msg(res.message);
            // 设计：
            if (res.status == 0) {
                // 页面转跳到 文章列表 页面
                location.href = '/article/list/list.html';
    
                // 关闭层
                layer.close(index)
            }
        }
        });
    }); 
})
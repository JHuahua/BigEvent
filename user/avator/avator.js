// ---------------  创建剪裁区
// - 调用cropper方法，创建剪裁区
$('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
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

$(".sure").click(function () {
     // 4.1）调用插件方法，剪裁图片；剪裁之后得到一张canvas格式的图片
    var canvas = $('#image').cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    });
    // 4.2) 把canvas图片转成base64格式，得到超长字符串
    // 语法：canvas.toDataURL(type, encoderOptions);
    //      参数：type 可选，图片格式，默认为 image/png
    //           encoderOptions 可选，在指定图片格式为 image/jpeg 或 image/webp的情况下，
    //            可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
    var base64 = canvas.toDataURL('image/png');

    // 4.3) ajax提交字符串，完成更新
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: { avatar: base64 },
      success: function(res) {
        layer.msg(res.message);
        if (res.status == 0) {
          // 重新渲染父页面的头像
          window.parent.getInfo();
        }
      }
    });
})
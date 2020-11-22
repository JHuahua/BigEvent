// ----------------------------------------获取新闻类别列表
function getList() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            if (res.data.length !== 0) {
                var str = "";
                $("tbody").empty();
                $.each(res.data, function (index, ele) {
                    str += `<tr>
                                <td>${ele.name}</td>
                                <td>${ele.alias}</td>
                                <td>
                                    <button myid="${ele.Id}" data-name="${ele.name}" data-alias="${ele.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
    
                                    <button myid="${ele.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                                </td>
                            </tr>`;
                })
                $("tbody").html(str);
            }
        }
    })
}
getList();

// --------------------------------------添加类别
var add_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
  </form>`;
$(".add").on("click", function () {
    layer.open({
        type: 1,
        title: '添加类别',
        content: add_str,
        area: ['500px', '250px'],
        // 
        success: function(dom, index) {
          add_submit(index);
        }
      });
})

function add_submit(index) {
    $(".add-form").on("submit", function (e) {
        e.preventDefault();
    
        var data = $(this).serialize();
    
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    getList();
                    layer.close(index)
                }
            }
        })
    })
}

// ----------------------------------------------------删除
$("tbody").on("click", ".delete", function (e) {
  var id = $(e.target).attr("myid");
  $.ajax({
    url: '/my/article/deletecate/' + id,
    success: function (res) {
      layer.msg(res.message);
      if (res.status == 0) {
        getList();
      }
    }
  })
})


// ----------------------------------------------------------------编辑
// 
var edit_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="edit_form" lay-filter="edit">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <input type="hidden" name="Id">
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit >确认修改</button>
      </div>
    </div>
  </form>`;
// 事件委托，注册点击事件
$("tbody").on("click", ".edit", function () {
  var id = $(this).attr("myid");
  $.ajax({
    url: '/my/article/cates/' + id,
    success: function (res) {
      // console.log(res);
      layer.open({
        type: 1,
        title: '编辑分类',
        content: edit_str,
        area: ['500px', '250px'],
        // 
        success: function (dom, index) {
          var form = layui.form;
          form.val("edit", res.data);
          edit_submit(index);
        }
      });
    }
  })
})

function edit_submit(index) {
  $("#edit_form").on("submit", function (e) {
    e.preventDefault();

    var data = $(this).serialize();

    $.ajax({
      type: 'post',
      url: '/my/article/updatecate',
      data: data,
      success: function (res) {
        layer.msg(res.message);
        if (res.status == 0) {
          getList();
          layer.close(index)
        }
      }
    })
  })
}
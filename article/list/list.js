$.ajax({
    url: '/my/article/list',
    data: {
      pagenum: 1, // 获取第1页的数据
      pagesize: 2, // 每页显示2条数据
    },
    success: function(res) {
      if (res.status == 0) {
        var str = "";
        $.each(res.data, function(index, ele) {
          str += `<tr>
                    <td>${ele.title}</td>
                    <td>${ele.cate_name}</td>
                    <td>${ele.pub_date.slice(0, ele.pub_date.length-4)}</td>
                    <td>${ele.state}</td>
                    <th>
                      <!-- 编辑按钮 -->
                      <a href="/article/edit.html?id=${ele.Id}" class="layui-btn layui-btn-xs">编辑</a>
                      <!-- 删除按钮 -->
                      <button data-id="${ele.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger">删除</button>
                    </th>
                  </tr>`;
        });
        $('tbody').html(str)
      }
  
    }
});
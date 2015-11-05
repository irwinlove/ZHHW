/*$(document).ready(function ($) {
  InitvehicleTree();
});

function InitvehicleTree() {
  $('#MenuTree').on('changed.jstree',function (node,data){
    var id = data.instance.get_node(data.selected[0]).id;//获取ID
    ClickMenuTree(id);
    FromStateShow();
  })
  $('#MenuTree').on('loaded.jstree', function (e, data) {
    data.instance.open_all();//默认展开所有节点
  })
  GetMenuTreeData();
}
 
function GetMenuTreeData() {
  $('#MenuTree').data('jstree', false);
  $.ajax({
    url: '/transportion/ajax/',
    type: 'get',
    dataType: 'json',
  })
  .done(function(data) {
      $('#MenuTree').data('jstree', false).empty().jstree({
      'core': {
        'data': data
      }
    });
  });
}*/
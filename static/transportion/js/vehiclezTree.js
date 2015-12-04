var setting = {
    data: {
        key:{
            checked: "isChecked",
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: '#'
        }
    },
    key: {
        title: "fullName",
    },
    check: {
        chkStyle: "checkbox",
        enable: true,
    },
    view:{
        nameIsHTML: true,
        showIcon:false,
        showTitle: true,
    },
};
/*var treeNode=[{"pId":"#","id":1,"name":"深圳龙澄高科"},{"pId":1,"id":2,"name":"深圳总部"},{"pId":1,"id":3,"name":"大浪基地"},{"pId":1,"id":4,"name":"四会基地"},{"pId":1,"id":5,"name":"茶山基地"},{"pId":4,"id":"033e657b-2fd9-4a19-b0f8-04c42c9a3ee8","name":"粤HK3816"},{"pId":4,"id":"1837bd43-d104-46cf-95f2-68108e52851c","name":"粤BH8947"},{"pId":3,"id":"2ca97b5b-4b78-42fe-be84-991542e992eb","name":"粤BU7966"},{"pId":3,"id":"2d7d764b-fb4f-4bc1-bf1b-6683275be026","name":"粤B93275"},{"pId":5,"id":"2d8b40b9-542a-4761-bef6-d0779bba03d8","name":"粤S44653"},{"pId":3,"id":"3a3094f1-e81e-47c6-bd6a-6b937fde3f5d","name":"粤B3UB55"},{"pId":3,"id":"436fe004-d0a6-4896-8147-ff6c3b264e7d","name":"粤BU7887"},{"pId":5,"id":"57e2e9ef-4b9f-444e-a449-8e1f320a6f0f","name":"粤S44563"},{"pId":4,"id":"5ba4a300-290f-452a-a04a-a57a32df43fa","name":"粤HK3765"},{"pId":3,"id":"6029dddb-bb8e-4f77-8300-716c70d504af","name":"粤BU8110"},{"pId":4,"id":"6f9727e3-896a-4523-90fa-c0ac6d9e1b3d","name":"粤HK3537"},{"pId":4,"id":"88f7aa23-0d7a-4127-9a99-6d48f0f9a2ec","name":"粤HK3635"},{"pId":4,"id":"90cb54c8-4b0f-404a-a6be-c5232e4c474b","name":"豫BLC188"},{"pId":3,"id":"9ec849e3-2184-4858-9861-7ffec71f9cba","name":"粤BU0462"},{"pId":4,"id":"ad143116-9814-4542-85ad-bb7b286bb55b","name":"粤BJ4895"},{"pId":4,"id":"bcbbcd7e-2ce1-4220-810a-0f626bb52259","name":"粤BL2011"},{"pId":4,"id":"bcdf3b1c-0810-4459-8617-5eb0542ae3e9","name":"粤BX1490"},{"pId":2,"id":"c3d58e0c-de59-4a78-b0f4-166bfad21559","name":"粤B166PP"},{"pId":4,"id":"cdf4c04b-1cb9-4062-b9a1-f5a9a5049203","name":"粤HK2442"},{"pId":3,"id":"d127070e-560c-469a-9dbe-f872faa4a724","name":"粤B5UB18"},{"pId":5,"id":"d4674bb3-b6db-4781-b60d-f4e25421b9a2","name":"粤BK0340"},{"pId":4,"id":"da229a4a-0a4c-473c-b3b2-28ca214f3ff5","name":"粤BJ939ZE"},{"pId":3,"id":"dfb49089-24d5-4763-a6b4-eeea84384e5d","name":"粤B7QQ87"},{"pId":4,"id":"e58fd511-1304-4f78-a26b-5758dce8a147","name":"粤HK3803"}];
*/
$(document).ready(function() {
    $.getJSON('vehicleTree/', {}).done(function(data) {
        $.fn.zTree.init($("#MenuTree"), setting, data);
    });
    
});
/*$(document).ready(function() {
    zTreeObj = $.fn.zTree.init($("#MenuTree"), setting, treeNode);
});*/
$("#searchVehicleForm").click(function(e) {
    //e.preventDefault();
    var zTreeObj = $.fn.zTree.getZTreeObj("#MenuTree");
    zTreeObj.getNodesByParamFuzzy('name',$("#searchVehicle").val());
/*                                                                                                                                                                                                                                                                  $("#MenuTree").jstree(true).search($("#searchVehicle").val());*/
});
//左边树形菜单--车辆列表
$(document).ready(function() {
    $("#MenuTree")
        .jstree({
            "types": {
                "default": {
                    "icon": "uk-icon-truck"
                },
                "enterprise": {
                    "icon": "uk-icon-sitemap"
                },
                "areatruck": {
                    "icon": "uk-icon-institution"
                }
            },
            "core": {
                "check_callback": true,
                "multiple": true,
                "animation": 0,
                "themes": {
                    // "variant" : "large"
                    "dots": false,
                },
                "data": {
                    'url': 'vehicleTree/',
                    'dataType': 'json',
                    'data': function(node) {
                        return {
                            'id': node.id
                        };
                    }
                },
                "progressive_render" :  true
            },

            "conditionalselect": function(node, event) {
                return false;
            },
            "checkbox": {
                "keep_selected_style": false
            },
            "state": {
                "key": "demostate"
            },

            "plugins": ["checkbox", "changed", "themes",
                "conditionalselect",
                "sort", "types", "state", "unique", "search", "wholerow"
            ]
        });
    $("#searchVehicleForm").submit(function(e) {
        e.preventDefault();
        $("#MenuTree").jstree(true).search($("#searchVehicle").val());
    });
    $("#bt_commit").click(function() {
        var checked_vehicles = [];
        var vehicle;
        var selectedElms = $("#MenuTree").jstree("get_selected", true);
            $.each(selectedElms, function() {
                if (this.children.length == 0) {
                    checked_vehicles.push(this.text);
                    vehicle=this.text;
                };
            })
            console.log(checked_vehicles);
        if ($("#bt_commit").attr('name') == "realTimeLocator") {
            $.ajax({
                type: 'GET',
                url: 'getRealTimeGPSData/',
                dataType: 'json',
                contentType: "application/json",
                data: {
                    "vehicles": JSON.stringify(checked_vehicles)
                },
                success: function(ret) {
                    window.frames['realTimeLocator'].realTimeLocator(ret);
                    console.log(ret);
                },
                error: function(ret) {
                    // body...
                }
            });
        };
        if ($("#bt_commit").attr('name') == "tracks") {
            startTime=$("#starter").val();
            endTime=$("#ender").val();
            console.log(endTime);
            $.ajax({
                type:'GET',
                url:'getHistTracks/',
                dataType:'json',
                contentType:"application/json",
                data:{
                    "vehicle":vehicle,
                    "startTime":startTime,
                    "endTime":endTime,
                },
                success:function  (ret) {
                    // body...
                    console.log(ret);
                    window.frames['tracks'].tracks(ret);
                },
                error: function(ret) {
                    // body...
                }
            });
        };
    });


});

function resortVehicleList(sortBy) {
    // body...
    var instance = $("#MenuTree").jstree(true);
    $.getJSON('JSONvehicleTree/', {
        sortByName: sortBy
    }).done(function(data) {
        instance.settings.core.data = data;
        instance.refresh();
    });
}

function resortVehicle(e) {
    var e = e || event;
    resortVehicleList(e.target.value);
    //console.log(e.target.value);
}
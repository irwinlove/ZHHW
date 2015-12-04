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
    console.log(e.target.value);
}
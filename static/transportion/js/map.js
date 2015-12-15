var map;
var ruler1, ruler2;
var mousetool;
var marker = new Array();
var windowsArr = new Array();
var lnglatXY = new Array();
var markerTypes;

$(document).ready(function($) {
    map = new AMap.Map('mapContainer', {
        // 设置中心点
        //center: [116.397428, 39.90923],
        resizeEnable: true,
        rotateEnable: true
            //center: [114.06667, 22.61667],
            // 设置缩放级别
            //  zoom: 12
    });
    // 地图类型切换
    map.plugin(["AMap.MapType"], function() {
        var type = new AMap.MapType({
            defaultType: 0
        });
        map.addControl(type);
    });
    //获取用户所在城市信息
    (function showCityInfo() {
        //加载城市查询插件
        AMap.service(["AMap.CitySearch"], function() {
            //实例化城市查询类
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        var cityinfo = result.city;
                        var citybounds = result.bounds;
                        //document.getElementById('selectCity').innerHTML = "您当前所在城市：" + cityinfo + "";
                        //document.getElementById('selectCity').value = cityinfo;
                        //地图显示当前城市
                        map.setBounds(citybounds);
                    }
                } else {
                    //document.getElementById('selectCity').innerHTML = "您当前所在城市：" + result.info + "";
                    //document.getElementById('selectCity').value = result.info;
                }
            });
        });
    })();
    //设置城市
    /*AMap.event.addDomListener(document.getElementById('selectCity'), 'click', function() {
        var cityName = document.getElementById('selectCity').value;
        if (!cityName) {
            cityName = '深圳市';
        }

        map.setCity(cityName);
        map.setZoom(12);
    });*/
    // 加载鹰眼插件
    map.plugin(['AMap.OverView'], function() {
        overView = new AMap.OverView({
            isOpen: true
        });
        map.addControl(overView);
    });
    //在地图中添加ToolBar插件
    map.plugin(["AMap.ToolBar"], function() {
        toolBar = new AMap.ToolBar();
        map.addControl(toolBar);
    });
    // 加载比例尺插件
    map.plugin(["AMap.Scale"], function() {
        scale = new AMap.Scale();
        map.addControl(scale);
    });

    //标注
    map.plugin(["AMap.MouseTool"], function() {
        mouseTool = new AMap.MouseTool(map);
        //mousetool.marker(); //使用鼠标工具，在地图上画标记点
    });
    //距离测量
    map.plugin(["AMap.RangingTool"], function() {
        ruler1 = new AMap.RangingTool(map);
        AMap.event.addListener(ruler1, "end", function(e) {
            ruler1.turnOff();
        });

        var sMarker = {
            icon: new AMap.Icon({ //复杂图标
                size: new AMap.Size(28, 37), //图标大小
                image: "http://webapi.amap.com/images/custom_a_j.png", //大图地址
                imageOffset: new AMap.Pixel(0, 0) //相对于大图的取图位置
            })
        };
        var eMarker = {
            icon: new AMap.Icon({ //复杂图标
                size: new AMap.Size(28, 37), //图标大小
                image: "http://webapi.amap.com/images/custom_a_j.png", //大图地址
                imageOffset: new AMap.Pixel(-28, 0) //相对于大图的取图位置
            }),
            offset: new AMap.Pixel(-16, -35)
        };
        var lOptions = {
            strokeStyle: "solid",
            strokeColor: "#FF33FF",
            strokeOpacity: 1,
            strokeWeight: 2
        };
        var rulerOptions = {
            startMarkerOptions: sMarker,
            endMarkerOptions: eMarker,
            lineOptions: lOptions
        };
        ruler2 = new AMap.RangingTool(map, rulerOptions);
    });
    //在地图中添加MouseTool插件
    map.plugin(["AMap.MouseTool"], function() {
        mouseTool = new AMap.MouseTool(map);


    });
    $('#startMarker').click(function() {
        // body...添加标注监听
        makeMarker();
    })
});




//设置个性化模板
function refreshMapstyle(e) {
    var e = e || event;
    map.setMapStyle(e.target.value);
}
//自定义显示内容
function refreshFeatures() {
    var boxes = document.getElementById('mapFeatures').getElementsByTagName('input');
    var features = [];
    for (var i = 0; i < boxes.length; i += 1) {
        if (boxes[i].checked === true) {
            features.push(boxes[i].name);
        }
    }
    map.setFeatures(features);
}
//设置地图状态
function refreshmapStatus() {
    var boxes = document.getElementById('mapStatus').getElementsByTagName('input');
    var mapStatus = {};
    for (var i = 0; i < boxes.length; i += 1) {
        if (boxes[i].checked === true) {
            mapStatus[boxes[i].name] = true;
        } else
            mapStatus[boxes[i].name] = false;
    }
    map.setStatus(mapStatus);
}
//旋转地图
function rotateMap() {
    UIkit.modal.prompt('顺时旋转角度:', '0', function(val) {
        map.setRotation(val);
    });
}
//启用默认样式测距
function startRuler() {
    ruler2.turnOff();
    ruler1.turnOn();
}
//测量面积
function startMeasureArea() {
    //鼠标工具插件添加draw事件监听
    AMap.event.addListener(mouseTool, "draw", function callback(e) {
        var eObject = e.obj; //obj属性就是鼠标事件完成所绘制的覆盖物对象。
        AMap.event.addListenerOnce(eObject, "dblclick", function callback(ev) {
            // body..
            eObject.setMap(null);
            mouseTool.close(true);
        })
    });
    mouseTool.measureArea(); //调用鼠标工具的面积量测功能

}

//设置标注物类型
function refreshMarkerStyle(e) {
    var e = e || event;
    markerTypes = e.target.value;

}

function makeMarker() {
    //为地图注册click事件获取鼠标点击出的经纬度坐标
    console.log('可以在这里进行实时调试，输入代码后按Enter执行。');
    var clickcallbackfn = function(e) {
        lnglatXY.push([e.lnglat.getLng(), e.lnglat.getLat()]);
        geocoder(lnglatXY[lnglatXY.length - 1]);
    }
    map.on('click', clickcallbackfn);
    AMap.event.addListenerOnce(map, 'mouseout', function(e) {
        console.log('执行mouseout事件');
        map.off('click', clickcallbackfn);
    });
}

function geocoder(xy) {
    var MGeocoder;
    //加载地理编码插件
    AMap.service(["AMap.Geocoder"], function() {
        MGeocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        //逆地理编码
        MGeocoder.getAddress(xy, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                geocoder_CallBack(result);
            }
        });
    });
}
//回调函数
function geocoder_CallBack(data) {
    //返回地址描述
    addmarker(lnglatXY.length, lnglatXY[lnglatXY.length - 1], data.regeocode.formattedAddress);
}

//加点
function addmarker(i, d, address) {
    var lngX = d[0];
    var latY = d[1];
    var icons = "";
    if (markerTypes == "station") {
        icons = "<i class='uk-icon-map-marker uk-icon-large' style='color:green'></i>"
    };
    if (markerTypes == "trash") {
        icons = "<i class='uk-icon-trash uk-icon-large' style='color:green'></i>"
    };
    if (markerTypes == "key") {
        icons = "<i class='uk-icon-asterisk uk-icon-large' style='color:red'></i>"
    };
    var markerOption = {
        map: map,
        //icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b"+(i)+".png",
        // icon:"/static/common/images/icons/green-map-marker.png",
        content: icons,
        position: [lngX, latY]
    };
    var mar = new AMap.Marker(markerOption);
    marker.push([lngX, latY, markerTypes]);
    map.setFitView();

    var infoWindow = new AMap.InfoWindow({
        content: address,
        autoMove: true,
        size: new AMap.Size(150, 0),
        offset: {
            x: 0,
            y: -30
        }
    });
    windowsArr.push(infoWindow);

    var aa = function(e) {
        infoWindow.open(map, mar.getPosition());
    };
    mar.on("mouseover", aa);
}
//实时定位
var cluster;
// positionMarkers = [];

function realTimeLocator(data) {
    var positionMarkers = [];
    $.each(data, function(i, item) {
        // i 为索引，item为遍历值
        positionMarker = {
            position: [item.fields.lngX, item.fields.latY],
            icon: new AMap.Icon({
                /*size: new AMap.Size(48, 48), //图标大小
                image: "/static/image/truck48.png",*/
                size: new AMap.Size(57, 32), //图标大小
                image: "/static/image/car_01.png",
                imageOffset: new AMap.Pixel(0, 0)
            })
        };
        positionMarkers.push(positionMarker);
    });
    map.clearMap(); // 清除地图覆盖物
    var i = 0;
    console.log(positionMarkers);
    positionMarkers.forEach(function(marker) {
        new AMap.Marker({
            map: map,
            icon: marker.icon,
            //content: marker.contents,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
        });
        console.log("add marker " + i);
        i++;
    });
    map.setFitView();
    addCluster(positionMarkers);
}
//历史轨迹回放

function tracks(data) {
    // body...
    var tracksMarker,lineArr = [];
    $.each(data, function(i, item) {
        lineArr.push([item.fields.lngX, item.fields.latY]);
    });
    map.clearMap(); // 清除地图覆盖物
    tracksMarker = new AMap.Marker({
            map: map,
            position: lineArr[0],
            icon: new AMap.Icon({
                size: new AMap.Size(57, 32), //图标大小
                image: "/static/image/car_01.png",
                imageOffset: new AMap.Pixel(0, 0)
            }),
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true
        });
    // 绘制轨迹
    console.log("绘制轨迹");
    var polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        strokeColor: "#00A", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 4, //线宽
        strokeStyle: "solid" //线样式
    });
    map.setFitView();
    var trackSpeed=document.getElementById('trackSpeed').value;
    AMap.event.addDomListener(document.getElementById('trackSpeed'), 'change', function() {
        trackSpeed=document.getElementById('trackSpeed').value;
        tracksMarker.stopMove();
    }, false);
    AMap.event.addDomListener(document.getElementById('startTracks'), 'click', function() {
        tracksMarker.moveAlong(lineArr, trackSpeed);
    }, false);
    AMap.event.addDomListener(document.getElementById('stopTracks'), 'click', function() {
        tracksMarker.stopMove();
    }, false);
}
function addCluster(markers) {
    if (cluster) {
        console.log("add cluster xxxx");
        cluster.setMap(null);
    };
    map.plugin(["AMap.MarkerClusterer"], function() {
        cluster = new AMap.MarkerClusterer(map, markers);
    });
}
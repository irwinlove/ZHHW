var map;
var ruler1,ruler2;
var mousetool;

$(document).ready(function ($) {
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
    map.plugin(["AMap.MapType"], function () {
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
                    document.getElementById('selectCity').value = cityinfo;
                    //地图显示当前城市
                    map.setBounds(citybounds);
                }
            } else {
                //document.getElementById('selectCity').innerHTML = "您当前所在城市：" + result.info + "";
                document.getElementById('selectCity').value = result.info;
            }
        });
    });
})();
//设置城市
AMap.event.addDomListener(document.getElementById('selectCity'), 'click', function() {
    var cityName = document.getElementById('selectCity').value;
    if (!cityName) {
        cityName = '深圳市';
    }

    map.setCity(cityName);
    map.setZoom(12);
});
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
            icon: new AMap.Icon({    //复杂图标
                size: new AMap.Size(28, 37),//图标大小
                image: "http://webapi.amap.com/images/custom_a_j.png", //大图地址
                imageOffset: new AMap.Pixel(0, 0)//相对于大图的取图位置
            })
        };
        var eMarker = {
            icon: new AMap.Icon({    //复杂图标
                size: new AMap.Size(28, 37),//图标大小
                image: "http://webapi.amap.com/images/custom_a_j.png", //大图地址
                imageOffset: new AMap.Pixel(-28, 0)//相对于大图的取图位置
            }),
            offset: new AMap.Pixel(-16, -35)
        };
        var lOptions = {
            strokeStyle: "solid",
            strokeColor: "#FF33FF",
            strokeOpacity: 1,
            strokeWeight: 2
        };
        var rulerOptions = {startMarkerOptions: sMarker, endMarkerOptions: eMarker, lineOptions: lOptions};
        ruler2 = new AMap.RangingTool(map, rulerOptions);
    });
    //在地图中添加MouseTool插件
      map.plugin(["AMap.MouseTool"], function() {
        mouseTool = new AMap.MouseTool(map);


    });
    
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
      UIkit.modal.prompt('顺时旋转角度:', '0', function(val){ map.setRotation(val);});
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
            var eObject = e.obj;//obj属性就是鼠标事件完成所绘制的覆盖物对象。
            AMap.event.addListenerOnce(eObject,"dblclick",function callback (ev) {
                // body..
                eObject.setMap(null);
                    mouseTool.close(true);
            })
        });
        mouseTool.measureArea();  //调用鼠标工具的面积量测功能

    }

var lnglatMarker={
    // lngX: 0,
    // latY:0,
}
function startMarker () {
     //为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on( 'click', function(e) {
        lnglatMarker.lngX = e.lnglat.getLng();
        lnglatMarker.latY = e.lnglat.getLat();
        geocoder(lnglatMarker);
    });
}

function addmarker(d) {
        var lngX = d.getLng();
        var latY = d.getLat();
        var markerOption = {
            map: map,
            icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b"+(i+1)+".png",
            position: [lngX, latY]
        };
        var mar = new AMap.Marker(markerOption);
        marker.push([lngX, latY]);
        map.setFitView();
        var infoWindow = new AMap.InfoWindow({
            content: d.formattedAddress,
            autoMove: true,
            size: new AMap.Size(150, 0),
            offset: {x: 0, y: -30}
        });
        windowsArr.push(infoWindow);

        var aa = function(e) {
            infoWindow.open(map, mar.getPosition());
        };
        mar.on( "mouseover", aa);
    }

function geocoder(lnglatXY) {
        var MGeocoder;
        //加载地理编码插件
        AMap.service(["AMap.Geocoder"], function() {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });
        });
        //加点
        addmarker(lnglatXY);
    }

  //回调函数
    function geocoder_CallBack(data) {
        var resultStr = "";
        var poiinfo = "";
        var address;
        //返回地址描述
        address = data.regeocode.formattedAddress;
        //返回周边兴趣点信息
        poiinfo += "<table style='width:300px;cursor:pointer;'>";
        for (var j = 0; j < data.regeocode.pois.length; j++) {
            var color = j % 2 === 0 ? '#fff' : '#eee';
            poiinfo += "<tr onmouseover='onMouseOver(\"" + data.regeocode.pois[j].location.toString() + 
                       "\")' style='background-color:" + color + "; margin:0; padding:0;'><td>" + 
                        data.regeocode.pois[j].name + "</td><td>距离：" + data.regeocode.pois[j].distance + "米</td></tr>";
        }
        poiinfo += "</table>";
        //返回结果拼接输出
        resultStr = "<div style=\"padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" + "<b>地址</b>：" + address + "<hr/><b>周边兴趣点信息</b>：<br/>" + poiinfo + "</div>";
        document.getElementById("result").innerHTML = resultStr;
    }
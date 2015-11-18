$(document).ready(function($) {
    map = new AMap.Map('mapContainer', {
        // 设置中心点
        //center: [116.397428, 39.90923],
        //resizeEnable: true,
        //rotateEnable: true
            //center: [114.06667, 22.61667],
            // 设置缩放级别
              zoom: 12
    });
    // 地图类型切换
    map.plugin(["AMap.MapType"], function() {
        var type = new AMap.MapType({
            defaultType: 0
        });
        map.addControl(type);
    });
   
});
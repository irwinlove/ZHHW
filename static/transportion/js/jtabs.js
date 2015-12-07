$(document).ready(function() {
    $("a").filter('[target=tabs]').click(function() {
        if (addTab($(this))) {
            if ($(this).attr("rel") == "trackHistory" || $(this).attr("rel") == "tracks") {
                $("#starter").attr('disabled', false);
                $("#ender").attr('disabled', false);
                $("#bt_commit").text('历史/轨迹查询');
            };
            if ($(this).attr("rel") == "realTimeLocator" || $(this).attr("rel") == "allTimeLocator") {
                $("#starter").attr('disabled', true);
                $("#ender").attr('disabled', true);
                $("#bt_commit").text('实时/连续定位');
            };
        };
    });
    $('[data-uk-tab]').on('change.uk.tab', function(event, item) {
        if (item.attr('id') == 'tab_trackHistory' || item.attr('id') == 'tab_tracks') {
            $("#starter").attr('disabled', false);
            $("#ender").attr('disabled', false);
            $("#bt_commit").text('历史/轨迹查询');
        };
        if (item.attr('id') == 'tab_realTimeLocator' || item.attr('id') == 'tab_allTimeLocator') {
            $("#starter").attr('disabled', true);
            $("#ender").attr('disabled', true);
            $("#bt_commit").text('实时/连续定位');
        };
    });
});

function addTab(link) {
    // If tab already exist in the list, return
    if ($("#tab_" + $(link).attr("rel")).length != 0) {
        $("#tabs li").removeClass("uk-active");
        $("#tab_" + $(link).attr("rel")).addClass("uk-active");
        $("#content div").removeClass("uk-active");
        $("#content div").attr('aria-hidden', 'true');
        $("#" + $(link).attr("rel")).addClass("uk-active");
        $("#" + $(link).attr("rel")).attr('aria-hidden', 'false');
        return false;
    };
    // hide other tabs
    $("#tabs li").removeClass("uk-active");
    $("#content div").removeClass("uk-active");
    $("#content div").attr('aria-hidden', 'true');

    // add new tab and related content
    $("#tabs").append("<li id='tab_" + $(link).attr("rel") + "' class='uk-active'><a " + " href='#" + $(link).attr("rel") + "'>" + $(link).html() +
        "<i class='uk-close'></i></a></li>");
    $("#tab_" + $(link).attr("rel") + " .uk-close").click(function() {
            removeTab($(this));
        })
        //request new tab html
    var urlName = $(link).attr("rel");
    $.get(urlName, function(data) {
        var div = document.createElement('div');
        div.id = $(link).attr("rel");
        $(div).addClass('uk-active');
        $(div).attr('aria-hidden', false);
        $(div).html(data);
        $("#content").append($(div));
    });
    return true;
}

function removeTab(link) {
    //console.log(link);
    var currentTab = $(link).parent().parent();
    var currentTabContentid = $(link).parent().attr('href');
    var prevTab = currentTab.prev();
    var prevTabContentid = prevTab.find('a').attr('href');
    var nextTab = currentTab.next();
    var nextTabContentid = nextTab.find('a').attr('href');
    if (currentTab.hasClass('uk-active')) {
        if (nextTab.length != 0) {
            currentTab.remove();
            $(currentTabContentid).remove();
            nextTab.addClass('uk-active');
            $(nextTabContentid).addClass('uk-active');
            $(nextTabContentid).attr('aria-hidden', false);
        } else {
            currentTab.remove();
            $(currentTabContentid).remove();
            prevTab.addClass('uk-active');
            $(prevTabContentid).addClass('uk-active');
            $(prevTabContentid).attr('aria-hidden', false);
        }
    } else {
        currentTab.remove();
        $(currentTabContentid).remove();
    };
}
$(document).ready(function() {
    $("a").filter('[target=tabs]').click(function() {
        addTab($(this));
        console.log($(this));
    });

    /*$('#tabs a.tab').live('click', function() {
        // Get the tab name
        var contentname = $(this).attr("id") + "_content";

        // hide all other tabs
        $("#content p").hide();
        $("#tabs li").removeClass("current");

        // show current tab
        $("#" + contentname).show();
        $(this).parent().addClass("current");
    });

    $('#tabs a.remove').live('click', function() {
        // Get the tab name
        var tabid = $(this).parent().find(".tab").attr("id");

        // remove tab and related content
        var contentname = tabid + "_content";
        $("#" + contentname).remove();
        $(this).parent().remove();

        // if there is no current tab and if there are still tabs left, show the first one
        if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {

            // find the first tab    
            var firsttab = $("#tabs li:first-child");
            firsttab.addClass("current");

            // get its link name and show related content
            var firsttabid = $(firsttab).find("a.tab").attr("id");
            $("#" + firsttabid + "_content").show();
        }
    });*/
});

function addTab(link) {
    // If tab already exist in the list, return
    if ($("#" + $(link).attr("rel")).length != 0) {
        $("#tabs li").removeClass("uk-active");
        $("#" + $(link).attr("rel")).addClass("uk-active");
        $("#content div").removeClass("uk-active");
        $("#" + $(link).attr("rel") + "_content'").addClass("uk-active");
        $("#" + $(link).attr("rel") + "_content'").attr('aria-hidden', 'false');
        return;
    };


    // hide other tabs
    $("#tabs li").removeClass("uk-active");
    $("#content div").removeClass("uk-active");
    $("#content div").attr('aria-hidden', 'true');

    // add new tab and related content
    $("#tabs").append("<li class='uk-active'><a "+ " href='" + $(link).attr("rel") + "'>" + $(link).html() +
        "<i class='uk-icon-close'></i></a></li>");
    //request new tab html
    var urlName=$(link).attr("rel");
    var ajaxhtml = $.ajax(urlName, {
        dataType: 'html'
    });
    $("#content").append("<div id='#" + $(link).attr("rel") + " class='uk-active' aria-hidden='false'" + ">" +
        ajaxhtml.innerHTML+ "</div>");

    // set the newly added tab as current
    //$("#" + $(link).attr("rel") + "_content").show();
}
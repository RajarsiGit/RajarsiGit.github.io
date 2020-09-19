$(document).ready(function(){
    $("#sidebar-wrapper .sidebar-nav .culture").hover(function(){
        $("#page-content-wrapper .container-fluid .culture").css("display", "block");
        $("#page-content-wrapper .container-fluid .network").css("display", "none");
        $("#page-content-wrapper .container-fluid .blog").css("display", "none");
    }, function(){
        //$("#page-content-wrapper .container-fluid .culture").css("display", "none");
    });
    $("#sidebar-wrapper .sidebar-nav .network").hover(function(){
        $("#page-content-wrapper .container-fluid .culture").css("display", "none");
        $("#page-content-wrapper .container-fluid .network").css("display", "block");
        $("#page-content-wrapper .container-fluid .blog").css("display", "none");
    }, function(){
        //$("#page-content-wrapper .container-fluid .network").css("display", "none");
    });
    $("#sidebar-wrapper .sidebar-nav .blog").hover(function(){
        $("#page-content-wrapper .container-fluid .culture").css("display", "none");
        $("#page-content-wrapper .container-fluid .network").css("display", "none");
        $("#page-content-wrapper .container-fluid .blog").css("display", "block");
    }, function(){
        //$("#page-content-wrapper .container-fluid .blog").css("display", "none");
    });
});
var works;
var body = $(body);

$.getJSON( "js/works.json", function(data){
	works = data;
	workLoaded();
});

function workLoaded(){
	$("#index").on( "mouseenter", "li[data-work]", function() {
		var dataspace = $(this).attr('data-work');
		if (dataspace in works) {
			console.log('Entry found')
			var entry = works[dataspace];
			$('body').css("background-image", "url('/img/works/" + dataspace + "/" + entry.thumb + "')");
		} else {
			console.log('Error: entry not found')
		}
	});
	$("#index").on( "mouseleave", "li[data-work]", function() {
		$('body').css("background-image", "");
	});
	$("#index").on( "click", "li[data-work]", function() {
		var dataspace = $(this).attr('data-work');
		loadEntry(dataspace);
	});
}
function loadEntry(dataspace){
	var entry = works[dataspace];
	var html = '<section id="entry">';
    html += '<header><h2>' + entry.title + '</h2><p>' + entry.summary + '</p></header>';
    html += '<main></main>';
    html += "</section>";
    $('main').append(html);
   	$('#entry header').css("background-image", "url('/img/works/" + dataspace + "/" + entry.thumb + "')");
	$("section:not(#entry)").fadeOut('fast', function(){
		$("#entry").fadeIn('fast');
	});
	history.pushState(dataspace, null, dataspace);
}
function closeEntry(){
	$("#entry").fadeOut('fast', function(){
		$("section:not(#entry)").fadeIn('fast');
	});
	$('#entry').remove();
}



window.addEventListener('popstate', function(e) {
	console.log("POPPOP" + e.state);
	if(e.state == null) {
		closeEntry();
	} else {
		closeEntry();
		loadEntry(e.state);
	}
});
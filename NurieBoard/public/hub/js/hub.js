$(document).ready(function(){
	panelFrameInit();
	loadPanel();
})

function panelFrameInit() {
	$(".sortable").sortable({
		handle: ".handle",
		placeholder : 'col-sm-4 app app-placeholder',
		scroll: false
	});
	$(".handle").disableSelection();
}

function loadPanel() {
	
}
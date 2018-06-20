var pesApiUrl1;
var pesApiPort1;

$(function() {
	
		$('.ui.accordion').accordion({
			exclusive : true
		});
		$('.ui.dropdown').dropdown();

		$.getScript(getContextPath()+"/res/js/team.jqr.js", function(){
			readConfig(loadConfig1,false);
			readPlayers(null, loadPlayerList, false);
		});
		
		
});

function loadConfig1(data){
	pesApiUrl1= data.pesApiUrl;
	pesApiPort1 = data.pesApiPort;
}
function getContextPath() {
	return window.location.pathname.substring(0, window.location.pathname
			.indexOf("/", 2));
}
function errorHandler(er, st, msg){
	console.log("ERROR: ", msg);
	console.log("ER: ", er);
}
function leagueData(data){
	console.log(data);
}

function readPlayers(playerId, callBack, async){
	var url = pesApiUrl1 + ":" + pesApiPort1 + "/papi/player";
	if (playerId != null) {
		url += "/" + playerId;
	}
	$.ajax({
		url : url,
		type : 'GET',
		dataType : 'json',
		async : async,
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			callBack(data);
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}

	});
}
function loadPlayerList(players){
	result = '';
	for (i = 0; i < players.length; i++) {
		result += "<div class='item'><img class='ui tiny avatar image' id='player"
				+ players[i].id + "Image' src='" + players[i].image
				+ "'><div class='content'><div class='header' id='player"+players[i].id+"Name'><a onclick='editPlayer("+players[i].id+")'>" + players[i].name
				+ "</a></div></div></div>";
	}
	result += "<div class='item'><div class='content'><button class='ui positive button' onclick='newPlayer()'><i class='add icon small'></i></button></div></div>";
	onclick='editPlayer("+players[i].id+")'
	$('#players').html(result);
}
function editPlayer(playerId){
	readPlayers(playerId, loadPlayerEdit, false);
}
function loadPlayerEdit(player){
	$('#playerName').val(player.name);
	$('#playerImageUrl').val(player.image);
	$('#playerImage').attr('src',player.image);
	$('#savePlayer').attr('onclick', 'updatePlayer(' + player.id + ')');
	$('#playerForm').modal('show');
}
function updatePlayer(playerId){
	
	var player={};
	player['name']=$('#playerName').val();
	player['image']=$('#playerImageUrl').val();
	
	$.ajax({
		url : pesApiUrl1 + ":" + pesApiPort1 + "/papi/player/" + playerId,
		type : 'PATCH',
		dataType : 'json',
		data : JSON.stringify(player),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			readPlayers(playerId, updatePlayerList, false);
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function updatePlayerList(player){
	$('#player' + player.id + 'Name').html(player.name);
	$('#player' + player.id + 'Image').attr('src', player.image);
}

function newPlayer(){
   clearPlayerForm();
   $('#playerForm').modal('show');
}
function clearPlayerForm(){
	$('#playerName').val(null);
	$('#playerImageUrl').val(null);
	$('#playerImage').attr('src',null);
	$('#savePlayer').attr('onclick', 'createPlayer()');
}
function createPlayer(){
	var player={};
	player['name']=$('#playerName').val();
	player['image']=$('#playerImageUrl').val();
	
	$.ajax({
		url : pesApiUrl1 + ":" + pesApiPort1 + "/papi/player",
		type : 'POST',
		data : JSON.stringify(player),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			readPlayers(null, loadPlayerList, false);
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function readExhibitions(playerId, callBack, async){
	var url = pesApiUrl1 + ":" + pesApiPort1 + "/papi/exhibition";
	if (playerId != null) {
		url += "/" + playerId;
	}
	$.ajax({
		url : url,
		type : 'GET',
		dataType : 'json',
		async : async,
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			callBack(data);
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}

	});
}
function stats(playerId){
	
	readExhibitions(playerId ,printStats,true);
}
function printStats(exhibitions){
	console.log(exhibitions.length);
}
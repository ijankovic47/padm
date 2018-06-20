var pesApiUrl;
var pesApiPort;

$(function() {

	readConfig(loadConfig, false);
	
	$('.ui.accordion').accordion({
		exclusive : true
	});
	$('.ui.dropdown').dropdown();
	
	readLeagues(null, loadLeagueList);
	readContinents(null, loadContinentList);
});
function readConfig(callBack, async){
	
	$.ajax({
		url : getContextPath() + "/configuration",
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
function loadConfig(data){
	pesApiUrl = data.pesApiUrl;
	pesApiPort = data.pesApiPort;
}
function getContextPath() {
	return window.location.pathname.substring(0, window.location.pathname
			.indexOf("/", 2));
}
function readLeagues(leagueId, callBack, async) {

	var url = pesApiUrl + ":" + pesApiPort + "/papi/league";
	if (leagueId != null) {
		url += "/" + leagueId;
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
function readContinents(continentId, callBack, async) {

	var url = pesApiUrl + ":" + pesApiPort + "/papi/continent";
	if (continentId != null) {
		url += "/" + continentId;
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
function readClubs(id, leagueId, callBack, async) {
	var url = pesApiUrl + ":" + pesApiPort + "/papi/club";
	if (id != null) {
		url += "/" + id;
	} else if (leagueId != null) {
		url += "?leagueId=" + leagueId;
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
function readNations(id, continentId, callBack, async) {

	var url = pesApiUrl + ":" + pesApiPort + "/papi/nation";
	if(id!=null){
		url+="/"+id;
	}
	else if(continentId!=null){
		url+="?continentId="+continentId;
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

function editLeague(leagueId) {
	readLeagues(leagueId, loadLeagueEdit, true);
}
function testEmblem(img, field) {
	$(img).attr("src", $(field).val());
}
function updateLeague(leagueId) {

	var leagueData = {};
	leagueData['name'] = $('#leagueName').val();
	leagueData['emblem'] = $('#leagueEmblem').val();
	leagueData['nation'] = $('.ui.dropdown').dropdown('get value');

	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/league/" + leagueId,
		type : 'PATCH',
		dataType : 'json',
		data : JSON.stringify(leagueData),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			readLeagues(leagueId, updateLeagueList, true);

		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function loadContinentList(continents) {
	result = '';
	for (i = 0; i < continents.length; i++) {
		result += "<div class='item'><img class='ui avatar image' id='continent"
				+ continents[i].id
				+ "Emblem' src='"
				+ continents[i].emblem
				+ "'><div class='content'><div class='header'><a onclick='initTeamView("
				+ continents[i].id
				+ ", \"nation\")' id='continent"
				+ continents[i].id
				+ "Name'>"
				+ continents[i].name
				+ "</a></div>"
				+ "<a style='float:right' onclick='editContinent("
				+ continents[i].id
				+ ")'><i class='edit icon large'></i></a></div></div>";
	}
	result += "<div class='item'><div class='content'><button class='ui positive button' onclick='newContinent()'><i class='add icon small'></i></button></div></div>";
	$('#continents').html(result);

}

function loadLeagueList(leagues) {
	result = '';
	for (i = 0; i < leagues.length; i++) {
		result += "<div class='item'><img class='ui avatar image' id='league"
				+ leagues[i].id + "Emblem' src='" + leagues[i].emblem
				+ "'><div class='content'><div class='header'><a id='league"
				+ leagues[i].id + "Name' onclick='initTeamView("
				+ leagues[i].id + ", \"club\")'>" + leagues[i].name
				+ "</a></div>" + "<a style='float:right' onclick='editLeague("
				+ leagues[i].id
				+ ")'><i class='edit icon large'></i></a></div></div>";
	}
	result += "<div class='item'><div class='content'><button class='ui positive button' onclick='newLeague()'><i class='add icon small'></i></button></div></div>";

	$('#leagues').html(result);
}

function loadTeamGrid(teams) {
	var result = "<div class='column'><div class='content' id='newTeam'><button class='ui positive button'><i class='add icon small'></i></button></div></div>";
	for (i = 0; i < teams.length; i++) {
		result += "<div class='column'><a onclick='editTeam(this)' class='team' data-id='"
				+ teams[i].id
				+ "'><div class='ui card'><div class='image'><img src='"
				+ teams[i].emblem
				+ "'></div><div class='content'><div class='header'>"
				+ teams[i].name + "</div></div></div></div>";
	}
	$('#teams').html(result);
	$('.ui.card').transition({
		animation : 'drop in',
		duration : '1`s'
	});
	$('.card').hover(function() {
		$(this).transition('pulse');
	}, function() {
	});
}
function loadNationList(nations) {
	leagueNationSelect = "";
	for (i = 0; i < nations.length; i++) {
		leagueNationSelect += "<div class='item' data-value='" + nations[i].id
				+ "'><img class='ui mini avatar image' src='"
				+ nations[i].emblem + "'>" + nations[i].name + "</div>";
	}
	$('#leagueNationSelect').html(leagueNationSelect);
}

function loadLeagueEdit(league) {

	$('#leagueEmblemImg').attr("src", league.emblem);
	$('#leagueName').val(league.name);
	$('#leagueEmblem').val(league.emblem);
	$('#saveLeague').attr('onclick', 'updateLeague(' + league.id + ')');
	readNations(null,null, loadNationList, false);
	$('.ui.dropdown').dropdown('set value', league.nation);
	$('.ui.dropdown').dropdown();
	$('#leagueForm').modal('show');
}
function updateLeagueList(league) {
	$('#league' + league.id + 'Name').text(league.name);
	$('#league' + league.id + 'Emblem').attr('src', league.emblem);
}

function editContinent(continentId) {
	readContinents(continentId, loadContinentEdit);
}
function loadContinentEdit(continent) {

	$('#continentEmblemImg').attr("src", continent.emblem);
	$('#continentName').val(continent.name);
	$('#continentEmblem').val(continent.emblem);
	$('#saveContinent')
			.attr('onclick', 'updateContinent(' + continent.id + ')');
	$('#continentForm').modal('show');
}

function updateContinent(continentId) {
	var continentData = {};
	continentData['name'] = $('#continentName').val();
	continentData['emblem'] = $('#continentEmblem').val();

	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/continent/" + continentId,
		type : 'PATCH',
		dataType : 'json',
		data : JSON.stringify(continentData),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			readContinents(continentId, updateContinentList);

		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function updateContinentList(continent) {
	$('#continent' + continent.id + 'Name').text(continent.name);
	$('#continent' + continent.id + 'Emblem').attr('src', continent.emblem);
}

function newLeague() {
	$('#leagueEmblemImg').attr("src", '');
	$('#leagueName').val('');
	$('#leagueEmblem').val('');
	$('#saveLeague').attr('onclick', 'createLeague()');
	$('.ui.dropdown').dropdown('clear');
	readNations(null,null, loadNationList, false);
	$('.ui.dropdown').dropdown();
	$('#leagueForm').modal('show');
}

function createLeague() {

	var league = {};
	league['name'] = $('#leagueName').val();
	league['emblem'] = $('#leagueEmblem').val();
	league['nation'] = $('.ui.dropdown').dropdown('get value');
	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/league",
		type : 'POST',
		data : JSON.stringify(league),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			readLeagues(null, loadLeagueList, true);
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function newContinent() {
	$('#continentEmblemImg').attr("src", '');
	$('#continentName').val('');
	$('#continentEmblem').val('');
	$('#saveContinent').attr('onclick', 'createContinent()');
	$('#continentForm').modal('show');
}

function createContinent() {

	var continent = {};
	continent['name'] = $('#continentName').val();
	continent['emblem'] = $('#continentEmblem').val();
	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/continent",
		type : 'POST',
		data : JSON.stringify(continent),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			readContinents(null, loadContinentList);
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function initTeamView(leagueOrContinentId, clubOrNation) {

	if (clubOrNation == 'club') {
		readClubs(null, leagueOrContinentId, loadTeamGrid, false);
		$('#clubLeagueId').val(leagueOrContinentId);
		$('#newTeam').attr('onclick', 'newClub()');
	} else {
		readNations(null, leagueOrContinentId, loadTeamGrid, false);
		$('#nationContinentId').val(leagueOrContinentId);
		$('#newTeam').attr('onclick', 'newNation()');
	}
	$('.team').attr('data-clubOrNation', clubOrNation);
}
function newNation() {
	clearNationForm()
	$('#saveNation').attr('onclick', 'createNation()');
	$('#nationForm').modal('show');
}
function createNation() {

	var nation = {};
	var continentId = $('#nationContinentId').val();
	nation['name'] = $('#nationName').val();
	nation['emblem'] = $('#nationEmblem').val();
	nation['continent'] = continentId
	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/nation",
		type : 'POST',
		data : JSON.stringify(nation),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			initTeamView(continentId, 'nation');
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function newClub() {
	clearClubForm()
	$('#saveClub').attr('onclick', 'createClub()');
	$('#clubForm').modal('show');
}
function createClub() {
	var club = {};
	var leagueId = $('#clubLeagueId').val();
	club['name'] = $('#clubName').val();
	club['emblem'] = $('#clubEmblem').val();
	club['league'] = leagueId;
	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/club",
		type : 'POST',
		data : JSON.stringify(club),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			initTeamView(leagueId, 'club');
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function editTeam(info) {

	var teamId = $(info).attr('data-id');
	var clubOrNation = $(info).attr('data-clubornation');

	if (clubOrNation == 'club') {
		readClubs(teamId, null, loadClubEdit, true);
	} else {
		readNations(teamId,null, loadNationEdit, true);
	}

}
function loadClubEdit(club) {

	$('#clubName').val(club.name);
	$('#clubEmblem').val(club.emblem);
	$('#clubEmblemImg').attr('src', club.emblem);
	readLeagues(null, loadClubLeagueDropdown, false);
	$('.ui.dropdown.leagues').dropdown('set value', club.league);
	$('.ui.dropdown').dropdown();
	$('#saveClub').attr('onclick', 'updateClub(' + club.id + ')');
	$('#clubForm').modal('show');
}
function loadNationEdit(nation) {
	$('#nationName').val(nation.name);
	$('#nationEmblem').val(nation.emblem);
	$('#nationEmblemImg').attr('src', nation.emblem);
	readContinents(null, loadNationContinentDropdown, false);
	$('.ui.dropdown.continents').dropdown('set value', nation.continent);
	$('.ui.dropdown').dropdown();
	$('#saveNation').attr('onclick', 'updateNation(' + nation.id + ')');
	$('#nationForm').modal('show');
}
function loadClubLeagueDropdown(leagues) {
	clubLeagueSelect = "<div class=\"ui fluid selection leagues dropdown\"><input type=\"hidden\" name=\"clubLeague\" id=\"clubLeague\"><i class=\"dropdown icon\"></i>"
			+ "<div class=\"default text\">Select League</div><div class='menu'>";
	for (i = 0; i < leagues.length; i++) {
		clubLeagueSelect += "<div class='item' data-value='" + leagues[i].id
				+ "'><img class='ui mini avatar image' src='"
				+ leagues[i].emblem + "'>" + leagues[i].name + "</div>";
	}
	clubLeagueSelect += '</div>';
	$('#cdropdown').html(clubLeagueSelect);
}

function updateClub(clubId) {
	var club = {};
	club['name'] = $('#clubName').val();
	club['emblem'] = $('#clubEmblem').val();
	club['league'] = $('.ui.dropdown.leagues').dropdown('get value');

	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/club/" + clubId,
		type : 'PATCH',
		dataType : 'json',
		data : JSON.stringify(club),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			initTeamView(club.league, 'club');
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}

function loadNationContinentDropdown(continents) {
	nationContinentSelect = "<div class=\"ui fluid selection continents dropdown\"><input type=\"hidden\" name=\"nationContinent\" id=\"nationContinent\"><i class=\"dropdown icon\"></i>"
			+ "<div class=\"default text\">Select Continent</div><div class='menu'>";
	for (i = 0; i < continents.length; i++) {
		nationContinentSelect += "<div class='item' data-value='"
				+ continents[i].id
				+ "'><img class='ui mini avatar image' src='"
				+ continents[i].emblem + "'>" + continents[i].name + "</div>";
	}
	nationContinentSelect += '</div>';
	$('#ndropdown').html(nationContinentSelect);
}
function updateNation(nationId){
	var nation = {};
	nation['name'] = $('#nationName').val();
	nation['emblem'] = $('#nationEmblem').val();
	nation['continent'] = $('.ui.dropdown.continents').dropdown('get value');

	$.ajax({
		url : pesApiUrl + ":" + pesApiPort + "/papi/nation/" + nationId,
		type : 'PATCH',
		dataType : 'json',
		data : JSON.stringify(nation),
		contentType : 'application/json; charset=utf-8',
		success : function(data) {
			initTeamView(nation.continent, 'nation');
		},
		error : function(er, st, msg) {
			errorHandler(er, st, msg);
		}
	});
}
function clearClubForm(){
	
	$('#clubName').val(null);
	$('#clubEmblem').val(null);
	$('#clubEmblemImg').attr('src', null);
	$('#cdropdown').html('');
}
function clearNationForm(){
	$('#nationName').val(null);
	$('#nationEmblem').val(null);
	$('#nationEmblemImg').attr('src', null);
	$('#ndropdown').html('');
}
function errorHandler(er, st, msg){
	console.log("ERROR: ", msg);
	console.log("ER: ", er);
}
function test(){
	console.log("Je li radi ovo ?");
}

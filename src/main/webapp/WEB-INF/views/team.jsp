<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Teams</title>
<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="res/js/team.jqr.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.js"></script>
</head>


<body>
	<div class="ui raised very padded container segment">
		<div class="ui grid">

			<div class="four wide column">
				<div class="ui styled fluid accordion item">
					<div class="title">
						<i class="dropdown icon"></i> Leagues
					</div>
					<div class="ui middle aligned animated celled list content"
						id="leagues"></div>
					<div class="title">
						<i class="dropdown icon"></i> Continents
					</div>
					<div class="ui middle aligned animated celled list content"
						id="continents"></div>

				</div>
			</div>
			<div class="twelve wide column">
				<div class="ui six column grid" id="teams"></div>
			</div>
		</div>
	</div>

	<div class="ui modal" id="leagueForm">
		<i class="close icon"></i>
		<div class="header">League</div>
		<div class="image content">
			<div class="ui medium image">
				<img src="" id="leagueEmblemImg">
			</div>
			<div class="description">
				<div class="ui input">
					<input type="text" placeholder="Name" id="leagueName">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Emblem" id=leagueEmblem
						oninput="testEmblem('#leagueEmblemImg', this)">
				</div>

				<div class="ui fluid selection dropdown">
					<input type="hidden" name="leagueNation" id="leagueNation">
					<i class="dropdown icon"></i>
					<div class="default text">Select Nation</div>

					<div class="menu" id="leagueNationSelect"></div>

				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui positive button" id="saveLeague">
				<i class="save icon large"></i>
			</div>
		</div>
	</div>

	<div class="ui modal" id="continentForm">
		<i class="close icon"></i>
		<div class="header">Continent</div>
		<div class="image content">
			<div class="ui medium image">
				<img src="" id="continentEmblemImg">
			</div>
			<div class="description">
				<div class="ui input">
					<input type="text" placeholder="Name" id="continentName">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Emblem" id=continentEmblem
						oninput="testEmblem('#continentEmblemImg',this)">
				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui positive button" id="saveContinent">
				<i class="save icon large"></i>
			</div>
		</div>
	</div>

	<div class="ui modal" id="clubForm">
		<i class="close icon"></i>
		<div class="header">Club</div>
		<div class="image content">
			<div class="ui medium image">
				<img src="" id="clubEmblemImg">
			</div>
			<div class="description">
				<div class="ui input">
					<input type="hidden" id="clubLeagueId">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Name" id="clubName">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Emblem" id=clubEmblem
						oninput="testEmblem('#clubEmblemImg',this)">
				</div>
				<div id='cdropdown'>
				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui positive button" id="saveClub">
				<i class="save icon large"></i>
			</div>
		</div>
	</div>

	<div class="ui modal" id="nationForm">
		<i class="close icon"></i>
		<div class="header">Nation</div>
		<div class="image content">
			<div class="ui medium image">
				<img src="" id="nationEmblemImg">
			</div>
			<div class="description">
				<div class="ui input">
					<input type="hidden" id="nationContinentId">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Name" id="nationName">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Emblem" id=nationEmblem
						oninput="testEmblem('#nationEmblemImg',this)">
				</div>
				<div id='ndropdown'>
				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui positive button" id="saveNation">
				<i class="save icon large"></i>
			</div>
		</div>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Players</title>
<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="res/js/player.jqr.js"></script>
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
				<div class="ui middle aligned animated divided list" id="players"></div>
			</div>

			<div class="twelve wide column">
				<div class="ui six column grid" id="teams">
					<div class="column">R</div>
				</div>
			</div>
		</div>
	</div>

	<div class="ui modal" id="playerForm">
		<i class="close icon"></i>
		<div class="header">Player</div>
		<div class="image content">
			<div class="ui medium image">
				<img src="" id="playerImage">
			</div>
			<div class="description">
				<div class="ui input">
					<input type="text" placeholder="Name" id="playerName">
				</div>
				<div class="ui input">
					<input type="text" placeholder="Image" id=playerImageUrl
						oninput="testEmblem('#playerImage', this)">
				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui positive button" id="savePlayer">
				<i class="save icon large"></i>
			</div>
		</div>
	</div>

</body>
</html>
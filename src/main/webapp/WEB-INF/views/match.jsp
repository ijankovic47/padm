<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Match</title>
<script type="text/javascript"
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="res/js/match.jqr.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.js"></script>
</head>
<body>

<div class="ui grid">
  <div class="two column centered row">
    <div class="five wide column"><div class="ui fluid selection dropdown">
  <input type="hidden" name="user">
  <i class="dropdown icon"></i>
  <div class="default text">Select Friend</div>
  <div class="menu">
    <div class="item" data-value="jenny">
      <img class="ui massive avatar image" src="http://www.swaindestinations.com/asia/images/activities/background/great-wall-at-mutianyu-and-summer-palace.jpg">
      Jenny Hess
    </div>
    <div class="item" data-value="elliot">
      <img class="ui mini avatar image" src="/images/avatar/small/elliot.jpg">
      Elliot Fu
    </div>
    <div class="item" data-value="stevie">
      <img class="ui mini avatar image" src="/images/avatar/small/stevie.jpg">
      Stevie Feliciano
    </div>
    <div class="item" data-value="christian">
      <img class="ui mini avatar image" src="/images/avatar/small/christian.jpg">
      Christian
    </div>
    <div class="item" data-value="matt">
      <img class="ui mini avatar image" src="/images/avatar/small/matt.jpg">
      Matt
    </div>
    <div class="item" data-value="justen">
      <img class="ui mini avatar image" src="/images/avatar/small/justen.jpg">
      Justen Kitsune
    </div>
  </div>
  <script type="text/javascript">$('.ui.dropdown').dropdown()</script>
</div></div>
    <div class="five wide column">R</div>
  </div>
</div>

</body>
</html>
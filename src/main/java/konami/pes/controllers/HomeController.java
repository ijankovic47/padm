package konami.pes.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {

	@RequestMapping()
	public String showIndex() {
		
		return "index";
	}
	@RequestMapping("/team")
	public String team(){
		
		return "team";
	}
	@RequestMapping("/match")
	public String match(){
		
		return "match";
	}
	@RequestMapping("/player")
	public String player(){
		
		return "player";
	}
	
}

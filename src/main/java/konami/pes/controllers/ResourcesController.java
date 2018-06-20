package konami.pes.controllers;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/configuration")
public class ResourcesController {

	@RequestMapping()
	public ResponseEntity<?> getConfiguration(){
		
		JSONParser parser=new JSONParser();
		try {
			Object obj=parser.parse(new FileReader(ResourceUtils.getFile("classpath:connections.json")));
			JSONObject json=(JSONObject) obj;
			return ResponseEntity.ok(json.toJSONString());
		} catch (FileNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (IOException e) {
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (ParseException e) {
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

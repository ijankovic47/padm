package konami.pes.configuration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class WebInitializer implements WebApplicationInitializer{

	public void onStartup(ServletContext context) throws ServletException {
		
		AnnotationConfigWebApplicationContext webContext=new AnnotationConfigWebApplicationContext();
		webContext.register(WebMvcConfiguration.class);
		context.addListener(new ContextLoaderListener(webContext));
		
		Dynamic dispatcher=context.addServlet("dispatcher", new DispatcherServlet(webContext));
		dispatcher.addMapping("/");
		dispatcher.setLoadOnStartup(1);
		
	}

}

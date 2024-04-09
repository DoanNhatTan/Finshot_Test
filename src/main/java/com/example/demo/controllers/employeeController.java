package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class employeeController {
	@GetMapping("/ctl/employee")
	public String hi () {
		return "employee";
	}

}

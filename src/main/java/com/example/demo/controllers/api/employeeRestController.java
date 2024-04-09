package com.example.demo.controllers.api;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.employee;
import com.example.demo.repository.employeeRepository;
import com.example.demo.service.employeeService;

import jakarta.websocket.server.PathParam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class employeeRestController {
	
	@Autowired
	employeeService employeeSv;
	
	@GetMapping("/api/employee")
	public ResponseEntity<List<employee>> getEmployee() {
		
		return ResponseEntity.ok(employeeSv.findAll());
	}
	
	@PostMapping("/api/employee")
	public ResponseEntity<employee> addEmployee(@RequestBody employee employee) {
		
		return ResponseEntity.ok(employeeSv.add(employee));
	}
	
	@DeleteMapping("/api/employee/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Integer employee_number) {
		
		employeeSv.delete(employee_number);
		return ResponseEntity.ok().build();
	}
	
}

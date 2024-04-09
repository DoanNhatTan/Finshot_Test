package com.example.demo.service;

import java.util.List;

import com.example.demo.model.employee;

public interface employeeService {
	List<employee> findAll();
	employee findById(int employee_number);
	employee add(employee employee);
	void delete(int employee_number);

}

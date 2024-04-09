package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.example.demo.model.employee;
import com.example.demo.repository.employeeRepository;
import com.example.demo.service.employeeService;

@Service
public class employeeServiceImpl implements employeeService{
	@Autowired
	employeeRepository employeeRt;
	
	@Override
	public List<employee> findAll() {
		// TODO Auto-generated method stub
		return employeeRt.findAll();
	}

	@Override
	public employee findById(int employee_number) {
		// TODO Auto-generated method stub
		return employeeRt.findById(employee_number).get();
	}

	@Override
	public employee add(employee employee) {
		// TODO Auto-generated method stub
		return employeeRt.save(employee);
	}

	@Override
	public void delete(int employee_number) {
		// TODO Auto-generated method stub
		employeeRt.deleteById(employee_number);
	}
	
}

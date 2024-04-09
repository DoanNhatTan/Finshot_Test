package com.example.demo.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "employee")
public class employee {
	
	@Id
	@NotNull
	private int employee_number;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String phone_number;
	
	@NotBlank
	private String position;
	
	@NotBlank
	@Email
	private String email;
}

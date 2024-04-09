
let app = angular.module("appEmployee", [])
app.controller("ctrlEmployee", function ($scope, $http, $window) {

	$scope.items = [];
	$scope.cates = [];
	$scope.form = {};

	$scope.initDataTable = function (data) {
		let dataTable = $('#tableEmployee').DataTable({
			 /*"dom": 'Bfrtip',
        	"buttons": ['copy', 'csv', 'excel', 'pdf', 'print'],*/
			"paging": true,
			"data": data,
			"columns": [
				{ "data": "employee_number", "title": "Employee Number" },
				{ "data": "name", "title": "Name" },
				{ "data": "phone_number", "title": "Phone Number" },
				{ "data": "position", "title": "Position" },
				{ "data": "email", "title": "Email" },
				{
					"data": null, "title": "Edit", "render": function (data, type, full, meta) {
						return '<a class="text-white bg-info edit-link">Sửa</a>';
					}
				},
				{
					"data": null, "title": "Delete", "render": function (data, type, full, meta) {
						return '<a class="text-white bg-danger delete-link">Xóa</a>';
					}
				}
			],
			"drawCallback": function (settings) {
				$('.delete-link').on('click', function () {
					let rowData = dataTable.row($(this).closest('tr')).data();
					$scope.delete(rowData);
				});
				$('.edit-link').on('click', function () {
					let rowData = dataTable.row($(this).closest('tr')).data();
					$scope.edit(rowData);

				});
			}
		});
	};

	$scope.initialize = function () {
		$http.get("/api/employee").then(resp => {
			$scope.items = resp.data;
			let updatedData = $scope.checkNumber(resp.data);
			$scope.initDataTable(updatedData);
		});
	}
	$scope.initialize();

	$scope.checkNumber = function (data) {
		data.forEach(function (item) {
			let employeeNumber = item.employee_number;
			if (typeof employeeNumber === 'number') {
				let employeeNumberString = employeeNumber.toString();
				let length = employeeNumberString.length;
				if (length === 1) {
					item.employee_number = '00' + employeeNumberString;
				} else if (length === 2) {
					item.employee_number = '0' + employeeNumberString;
				}
			}
		});
		return data;
	}

	$scope.edit = function (item) {
		$scope.$apply(function () {
			$scope.form = angular.copy(item);
		});
	}

	$scope.refresh = function () {
		$scope.form = {
			employee_number: '',
			name: '',
			phone_number: '',
			position: '',
			email: ''
		};
		$scope.errorEmployeeNumber = '';
		$scope.errorName = '';
		$scope.errorPhone = '';
		$scope.errorPosition = '';
		$scope.errorEmail = '';
	};

	$scope.delete = function (item) {
		Swal.fire({
			title: 'Confirm deletion',
			text: 'Are you sure you want to delete ?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cannel'
		}).then((result) => {
			if (result.isConfirmed) {
				$http.delete(`/api/employee/${item.employee_number}`).then(resp => {

					let index = $scope.items.findIndex(p => p.employee_number == item.employee_number);
					$scope.items.splice(index, 1);
					let dataTable = $('#tableEmployee').DataTable();
					dataTable.clear().rows.add($scope.items).draw();
					Swal.fire({
						icon: 'success',
						title: 'Success',
						text: 'Deleted successfully!',
						showConfirmButton: false
					});

				}).catch(error => {
					if (error.status === 500 && error.data && error.data.message) {
						Swal.fire({
							icon: 'error',
							title: 'error',
							text: error.data.message
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'error',
							text: 'Deletion error'
						});
					}
					console.log("Error", error);
				});
			}
		});
	};

	$scope.create = function () {
		let item = angular.copy($scope.form);
		console.log(item)
		let check = $scope.validation(item)
		if (check) {
			$http.post(`/api/employee`, item).then(resp => {
				Swal.fire({
					icon: 'success',
					title: 'Success!',
					text: 'Added successfully',
				});
				updateTable();
				$scope.refresh();
			}).catch(error => {
				Swal.fire({
					icon: 'error',
					title: 'Error!',
					text: 'Error adding new product!',
				});
			});

		}
	};

	$scope.validation = function (data) {
		let employee_number = data.employee_number;
		let name = data.name;
		let phone_number = data.phone_number;
		let position = data.position;
		let email = data.email;

		if (!employee_number) {
			$scope.errorEmployeeNumber = "Please enter employee number";
			return false;
		} else if (!/^\d{3}$/.test(employee_number)) {
			$scope.errorEmployeeNumber = "Employee number must be exactly 3 digits";
			return false;
		}

		if (!name) {
			$scope.errorName = "Please enter a name";
			return false;
		}

		if (!phone_number) {
			$scope.errorPhone = "Please enter phone number";
			return false;
		}

		if (!position) {
			$scope.errorPosition = "Please enter position";
			return false;
		}

		if (!email) {
			$scope.errorEmail = "Please enter email";
			return false;
		}

		if (!isValidPhoneNumber(phone_number)) {
			$scope.errorPhone = "Phone number format is incorrect";
			return false;
		}

		if (!isValidEmail(email)) {
			$scope.errorEmail = "Invalid email";
			return false;
		}
		return true;
	};

	function isValidPhoneNumber(phoneNumber) {
		let phoneRegex = /^[0-9]{10}$/;
		return phoneRegex.test(phoneNumber);
	}

	// Hàm kiểm tra email (tương tự như trước)
	function isValidEmail(email) {
		let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	function updateTable() {
		$http.get("/api/employee").then(resp => {
			$scope.items = resp.data;
			let dataTable = $('#tableEmployee').DataTable();
			dataTable.clear();
			dataTable.rows.add($scope.items);
			dataTable.draw();
		}).catch(error => {
			// Xử lý lỗi nếu có
			console.log("Error:", error);
		});
	}

});
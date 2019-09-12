$(document).ready(function() {
	$(".add-btn").on("click", function() {
		$("#add-input").click();
	});

	$("#add-input").on("change", function() {
		var addInput = $("#add-input");

		if (addInput.val() != "") {
			var formData = new FormData();

			formData.append("upload", addInput[0].files[0]);
			$("#completed").html("File Uploaded Successfully");

			$.ajax({
				url: "/userupload",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function() {
					addInput.val("");
				}
			});
		}

		ShowImage(this);
	});

	$("#form").submit(function(e) {
		e.preventDefault();
		var _id = $("#user_id").val();
		var username = $("#username").val();
		var fullname = $("#fullname").val();
		var country = $("#country").val();
		var gender = document.querySelector('input[name="gender"]:checked').value;
		var mantra = $("#mantra").val();
		var upload = $("#add-input").val();
		var image = $("#user-image").val();

		var valid = true;
		if (upload === "") {
			// $("#add-input").val(image);
			upload = image;
		}

		if (username == "" || fullname == "" || country == "" || gender == "" || mantra == "") {
			valid = false;
			$("#error").html('<div class="alert alert-danger">You cannot submit an empty field</div>');
		} else {
			// upload = $("#add-input").val();
			$("#error").html("");
		}

		if (valid == true) {
			$.ajax({
				url: "http://localhost:8080/settings/profile",
				type: "POST",
				dataType: "JSON",
				data: {
					_id: _id,
					username: username,
					fullname: fullname,
					gender: gender,
					country: country,
					mantra: mantra,
					upload: upload
				},
				success: function(result) {
					// window.location.reload();
					$("#error").html('<div class="alert alert-danger">Your profile saved successfully</div>');
				}
			});
		} else {
			return false;
		}
	});

	// $("#profile").on("click", function() {
	// 	// console.log("dsdf");
	// 	var _id = $("user_id").val();
	// 	var username = $("#username").val();
	// 	var fullname = $("#fullname").val();
	// 	var country = $("#country").val();
	// 	var gender = document.querySelector('input[name="gender"]:checked').value;
	// 	var mantra = $("#mantra").val();
	// 	var upload = $("#add-input").val();
	// 	var image = $("#user-image").val();

	// 	var valid = true;
	// 	if (upload === "") {
	// 		// $("#add-input").val(image);
	// 		upload = image;
	// 	}

	// 	if (username == "" || fullname == "" || country == "" || gender == "" || mantra == "") {
	// 		valid = false;
	// 		$("#error").html('<div class="alert alert-danger">You cannot submit an empty field</div>');
	// 	} else {
	// 		// upload = $("#add-input").val();
	// 		$("#error").html("");
	// 	}

	// 	if (valid == true) {
	// 		$.ajax({
	// 			url: "http://localhost:8080/settings/profile",
	// 			type: "POST",
	// 			data: {
	// 				_id: _id,
	// 				username: username,
	// 				fullname: fullname,
	// 				gender: gender,
	// 				country: country,
	// 				mantra: mantra,
	// 				upload: upload
	// 			},
	// 			success: function() {
	// 				setTimeout(function() {
	// 					window.location.reload();
	// 				}, 200);
	// 			}
	// 		});
	// 	} else {
	// 		return false;
	// 	}
	// });
});

function ShowImage(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$("#show_img").attr("src", e.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}

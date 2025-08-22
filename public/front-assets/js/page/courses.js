/*
Author       : Dreamstechnologies
Template Name: SmartHR - Bootstrap Admin Template
Version      : 4.0
*/

$(document).ready(function() {
	let previewContainer = $('#preview-container');
    let selectedFiles = [];
	
	$('#lo_file').on('change', function (e) {
		let files = Array.from(e.target.files);
		//alert(files);
		selectedFiles = [...selectedFiles, ...files];

		files.forEach((file, index) => {
			let reader = new FileReader();
			reader.onload = function (e) {
				let previewHtml = '';

				if (file.type.startsWith('image/')) {
					previewHtml = '<div class="preview-image-wrapper" data-index="' 
						+ (selectedFiles.length - files.length + index) 
						+ '"><img src="' + e.target.result 
						+ '" class="preview-image" /><button type="button" class="remove-image" data-index="' 
						+ (selectedFiles.length - files.length + index) 
						+ '">&times;</button></div>';
				} else if (file.type.startsWith('video/')) {
					previewHtml = '<div class="preview-image-wrapper" data-index="' 
						+ (selectedFiles.length - files.length + index) 
						+ '"><video src="' + e.target.result 
						+ '" class="preview-image" controls style="max-width: 120px; max-height: 120px;"></video><button type="button" class="remove-image" data-index="' 
						+ (selectedFiles.length - files.length + index) 
						+ '">&times;</button></div>';
				}
				previewContainer.append(previewHtml);
			};
			reader.readAsDataURL(file);
		});

		$(this).val('');
	});
	
	// Remove file from preview & array
	previewContainer.on('click', '.remove-image', function () {
		const indexToRemove = $(this).data('index');
		$(this).parent().remove();
		selectedFiles[indexToRemove] = null;
		selectedFiles = selectedFiles.filter(file => file !== null);
	});
	
	
	
	$(document).on('click','.save-courses', function(){
		let course_name = $('#course_name').val().trim();
		let short_desc = $('#short_desc').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (course_name === '')
		{
			$('#course_name').addClass('is-invalid');
			$('#course_name').next('.invalid-feedback').show();
			isValid = false;
		}
		if (short_desc === '')
		{
			$('#short_desc').addClass('is-invalid');
			$('#short_desc').next('.invalid-feedback').show();
			isValid = false;
		}
		if (long_desc === '')
		{
			$('#long_desc').addClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		}
		
		let files = $('#lo_file')[0].files;
		let formData = new FormData();
		
		selectedFiles.forEach(file => {
			formData.append('lo_file[]', file);
		});
		
		formData.append('course_name', course_name);
		formData.append('short_desc', short_desc);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmAddCourse').attr('action');
			//alert(URL);
			$.ajax({
				url: URL,
				type: "POST",
				data: formData,
				dataType: 'json',
				contentType: false,
				processData: false, 
				success: function(response) {
					//$('#success_msg').modal('show');
					setTimeout(() => {
						window.location.reload();
					}, "2000");
				},
			});
		}
	});
	
	$(document).on('click','.update-courses', function(){
		let id = $('#id').val();
		let course_name = $('#course_name').val().trim();
		let short_desc = $('#short_desc').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (course_name === '')
		{
			$('#course_name').addClass('is-invalid');
			$('#course_name').next('.invalid-feedback').show();
			isValid = false;
		}
		if (short_desc === '')
		{
			$('#short_desc').addClass('is-invalid');
			$('#short_desc').next('.invalid-feedback').show();
			isValid = false;
		}
		if (long_desc === '')
		{
			$('#long_desc').addClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		}
		
		let files = $('#lo_file')[0].files;
		let formData = new FormData();
		
		selectedFiles.forEach(file => {
			formData.append('lo_file[]', file);
		});
		
		formData.append('id', id);
		formData.append('course_name', course_name);
		formData.append('short_desc', short_desc);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmEditCourse').attr('action');
			//alert(URL);
			$.ajax({
				url: URL,
				type: "POST",
				data: formData,
				dataType: 'json',
				contentType: false,
				processData: false, 
				success: function(response) {
					//$('#success_msg').modal('show');
					let course_list = $('#course-list').val();
					window.location.href= course_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});

	$(document).on('click','.update-product-code-form', function()
	{
		let isValid = true;
		if (isValid) {
			var form = $("#frmeditproductcode");
			var URL = $('#frmeditproductcode').attr('action');
			$.ajax({
				url: URL,
				type: "POST",
				data: form.serialize() + '&_token=' + csrfToken,
				//dataType: 'json',
				success: function(response) {
					$('#updt_success_msg').modal('show');
					setTimeout(() => {
						window.location.reload();
					}, "2000");
				},
				error: function(xhr) {
					// Handle validation errors
					if (xhr.status === 422) {
						const errors = xhr.responseJSON.errors;
						let errorMessage = '';

						$('.invalid-feedback').hide();
						$('.form-control').removeClass('is-invalid');
						// Loop through errors and format them
						$.each(errors, function(key, value) {
							errorMessage += value[0] + '\n'; // Assuming you want the first error message for each field
							if ($('#'+key).length) { // Which have id
								$('#'+key).addClass('is-invalid');
								$('#'+key).next('.invalid-feedback').show().text(value[0]);
							}else{ // Which have not any id
								var fieldName = key.split('.')[0]; // Get the base field name (e.g., product_sale_price)
								var index = key.split('.').pop();
								var inputField = $('input[name="' + fieldName + '[]"]').eq(index);
								inputField.addClass('is-invalid');
								inputField.next('.invalid-feedback').show().text(value[0]);
							}
						});
						// Display the errors
						//alert('Validation errors:\n' + errorMessage);
					} else {
						alert('An unexpected error occurred.');
					}
				}
			});
		}
	});
	
	$(document).on('click', '.delete-course', function(e) {
		e.preventDefault();
		let id = $(this).data('id');
		let URL = $(this).data('url');

		Swal.fire({
			title: 'Are you sure?',
			text: "This record will be permanently deleted!",
			//icon: 'warning',
			width: '350px',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				popup: 'small-swal',
				title: 'small-swal-title',
				htmlContainer: 'small-swal-text',
				icon: 'small-swal-icon'
			}
		}).then((result) => {
			if (result.isConfirmed) {
				$.ajax({
					url: URL,
					type: "POST",
					data: {id:id, _token: csrfToken},
					dataType: 'json',
					success: function(response) {
						if(response.success){
							Swal.fire(
								'Deleted!',
								'Record has been deleted.',
								'success'
							).then(() => location.reload());
						} else {
							Swal.fire('Error!', 'Something went wrong.', 'error');
						}
					},
					error: function() {
						Swal.fire('Error!', 'Error while deleting record.', 'error');
					}
				});
			}
		});
	});
	
	$(document).on('click', '.remove-image-edit', function(e) {
		let id = $(this).data('file-id');
		$(this).closest('.preview-item').remove();
		let URL = $(this).data('url');
		$.ajax({
			url: URL,
			type: "POST",
			data: {id:id, _token: csrfToken},
			dataType: 'json',
			success: function(response) {
				//$('#success_msg').modal('show');
				/*setTimeout(() => {
					window.location.reload();
				}, "2000");*/
			},
		});
	});

});

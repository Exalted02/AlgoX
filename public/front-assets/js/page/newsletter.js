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
	
	$(document).on('click','.save-articles', function(){
		let title = $('#title').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (title === '')
		{
			$('#title').addClass('is-invalid');
			$('#title').next('.invalid-feedback').show();
			isValid = false;
		}
		
		if (long_desc === '' || long_desc === '<p><br></p>') {
			$('#long_desc').addClass('is-invalid');
			if ($('#long_desc').next('.invalid-feedback').length === 0) {
				$('#long_desc').after('<div class="invalid-feedback">This field is required.</div>');
			}
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		} else {
			$('#long_desc').removeClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').hide();
		}
		
		let formData = new FormData();
		formData.append('title', title);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmAddArticle').attr('action');
			//alert(URL);
			$.ajax({
				url: URL,
				type: "POST",
				data: formData,
				dataType: 'json',
				contentType: false,
				processData: false, 
				success: function(response) {
					let articles_list =$('#articles-list').val();
					window.location.href = articles_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});
	
	$(document).on('click','.update-article', function(){
		let id = $('#id').val();
		let title = $('#title').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (title === '')
		{
			$('#title').addClass('is-invalid');
			$('#title').next('.invalid-feedback').show();
			isValid = false;
		}
		
		if (long_desc === '' || long_desc === '<p><br></p>') {
			$('#long_desc').addClass('is-invalid');
			if ($('#long_desc').next('.invalid-feedback').length === 0) {
				$('#long_desc').after('<div class="invalid-feedback">This field is required.</div>');
			}
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		} else {
			$('#long_desc').removeClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').hide();
		}
		
		
		let formData = new FormData();
		
		formData.append('id', id);
		formData.append('title', title);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmEditArticle').attr('action');
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
					let articles_list =$('#articles-list').val();
					window.location.href = articles_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});

	$(document).on('click', '.delete-article', function(e) {
		e.preventDefault();
		let id = $(this).data('id');
		let URL = $(this).data('url');

		Swal.fire({
			title: 'Are you sure?',
			text: "This record will be permanently deleted!",
			icon: 'warning',
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
	
	//----------- case studies -------
	$(document).on('click','.save-case-studies', function(){
		let title = $('#title').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (title === '')
		{
			$('#title').addClass('is-invalid');
			$('#title').next('.invalid-feedback').show();
			isValid = false;
		}
		
		if (long_desc === '' || long_desc === '<p><br></p>') {
			$('#long_desc').addClass('is-invalid');
			if ($('#long_desc').next('.invalid-feedback').length === 0) {
				$('#long_desc').after('<div class="invalid-feedback">This field is required.</div>');
			}
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		} else {
			$('#long_desc').removeClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').hide();
		}
		
		let formData = new FormData();
		formData.append('title', title);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmAddCaseStudies').attr('action');
			//alert(URL);
			$.ajax({
				url: URL,
				type: "POST",
				data: formData,
				dataType: 'json',
				contentType: false,
				processData: false, 
				success: function(response) {
					let case_studies_list =$('#case-studies-list').val();
					window.location.href = case_studies_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});
	
	$(document).on('click','.update-case-studies', function(){
		let id = $('#id').val();
		let title = $('#title').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (title === '')
		{
			$('#title').addClass('is-invalid');
			$('#title').next('.invalid-feedback').show();
			isValid = false;
		}
		
		if (long_desc === '' || long_desc === '<p><br></p>') {
			$('#long_desc').addClass('is-invalid');
			if ($('#long_desc').next('.invalid-feedback').length === 0) {
				$('#long_desc').after('<div class="invalid-feedback">This field is required.</div>');
			}
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		} else {
			$('#long_desc').removeClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').hide();
		}
		
		
		let formData = new FormData();
		
		formData.append('id', id);
		formData.append('title', title);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmEditCaseStudies').attr('action');
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
					let case_studies_list =$('#case-studies-list').val();
					window.location.href = case_studies_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});

	
	$(document).on('click', '.delete-case-studies', function(e) {
		e.preventDefault();
		let id = $(this).data('id');
		let URL = $(this).data('url');

		Swal.fire({
			title: 'Are you sure?',
			text: "This record will be permanently deleted!",
			icon: 'warning',
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
	
	//----------- MARKET TIPS -------
	$(document).on('click','.save-market_tips', function(){
		let title = $('#title').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (title === '')
		{
			$('#title').addClass('is-invalid');
			$('#title').next('.invalid-feedback').show();
			isValid = false;
		}
		
		if (long_desc === '' || long_desc === '<p><br></p>') {
			$('#long_desc').addClass('is-invalid');
			if ($('#long_desc').next('.invalid-feedback').length === 0) {
				$('#long_desc').after('<div class="invalid-feedback">This field is required.</div>');
			}
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		} else {
			$('#long_desc').removeClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').hide();
		}
		
		let formData = new FormData();
		formData.append('title', title);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmAddMarketTips').attr('action');
			//alert(URL);
			$.ajax({
				url: URL,
				type: "POST",
				data: formData,
				dataType: 'json',
				contentType: false,
				processData: false, 
				success: function(response) {
					let market_tips_list =$('#market_tips_list').val();
					window.location.href = market_tips_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});
	
	$(document).on('click','.update-market-tips', function(){
		let id = $('#id').val();
		let title = $('#title').val().trim();
		let long_desc = $('#long_desc').summernote('code').trim();
		//let createdDate = $('#created_date').val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.form-control').removeClass('is-invalid');
		if (title === '')
		{
			$('#title').addClass('is-invalid');
			$('#title').next('.invalid-feedback').show();
			isValid = false;
		}
		
		if (long_desc === '' || long_desc === '<p><br></p>') {
			$('#long_desc').addClass('is-invalid');
			if ($('#long_desc').next('.invalid-feedback').length === 0) {
				$('#long_desc').after('<div class="invalid-feedback">This field is required.</div>');
			}
			$('#long_desc').next('.invalid-feedback').show();
			isValid = false;
		} else {
			$('#long_desc').removeClass('is-invalid');
			$('#long_desc').next('.invalid-feedback').hide();
		}
		
		
		let formData = new FormData();
		
		formData.append('id', id);
		formData.append('title', title);
		formData.append('long_desc', long_desc);
		formData.append('_token', csrfToken);
		
		if (isValid) {
			//var form = $("#frmAddCourse");
			var URL = $('#frmEditMarketTips').attr('action');
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
					let market_tips_list =$('#market-tips-list').val();
					window.location.href = market_tips_list;
					/*setTimeout(() => {
						window.location.reload();
					}, "2000");*/
				},
			});
		}
	});

	
	$(document).on('click', '.delete-market_tips', function(e) {
		e.preventDefault();
		let id = $(this).data('id');
		let URL = $(this).data('url');

		Swal.fire({
			title: 'Are you sure?',
			text: "This record will be permanently deleted!",
			icon: 'warning',
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

});

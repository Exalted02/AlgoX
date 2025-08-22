@extends('layouts.app')

@section('styles')
<link rel="stylesheet" href="{{ url('front-assets/plugins/summernote/summernote-bs4.min.css') }}">
@endsection 
@section('content')

<!-- Page Wrapper -->
<div class="page-wrapper">
	<!-- Page Content -->
	<div class="content container-fluid">
	
		<!-- Page Header -->
		<div class="page-header">
			<div class="row align-items-center">
				<div class="col-md-4">
					<h3 class="page-title">{{ __('Courses') }}</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item"><a href="#">{{ __('dashboard') }}</a></li>
						<li class="breadcrumb-item active">{{ __('Courses') }}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- /Page Header -->
		<hr>
		@php 
		//echo "<pre>";print_r($data->course_files);die;
		@endphp
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">{{ __('Edit') }}</h5>
					</div>
					<div class="card-body">
						<form id="frmEditCourse" action="{{ route('learning-hub-course-update') }}">
						<input type="hidden" id="id" name="id" value="{{ $data->id ?? ''}}">
							<div class="row">
								<div class="col-sm-12">
									<div class="input-block mb-3">
										<label class="col-form-label">{{ __('Course name') }}<span class="text-danger">*</span></label>
										<input class="form-control" type="text" name="course_name" id="course_name" value="{{ $data->course_name ?? ''}}">
										<div class="invalid-feedback">Enter course name</div>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="input-block mb-3">
										<label class="col-form-label">{{ __('Short description') }}<span class="text-danger">*</span></label>
										<textarea class="form-control" name="short_desc" id="short_desc">{{ $data->short_desc ?? ''}}</textarea>
										<div class="invalid-feedback">Enter short description</div>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="input-block mb-3">
										<label class="col-form-label">{{ __('Long description') }}<span class="text-danger">*</span></label>
										<textarea class="form-control summernote" name="long_desc" id="long_desc" >{{ $data->long_desc ?? ''}}</textarea>
										<div class="invalid-feedback">Enter long description</div>
									</div>
								</div>
								<div class="row align-items-center">
									<div class="col-md-4">
										<label for="lo_file"></label>
										<div class="upload-wrapper">
										  <input type="file" name="lo_file[]" id="lo_file" multiple style="display: none;">
										  <label for="lo_file" class="custom-upload-label">
											<span class="upload-text">Upload image</span>
											<i class="fa fa-upload upload-icon"></i>
										  </label>
										</div>
									</div>
									@if($data->course_files->isNotEmpty())
										@foreach($data->course_files as $file)
											
												<video src="{{ url('uploads/courses/' . $file->files) }}" controls style="max-width:120px; max-height:120px;" class="preview-image"></video>
												<button type="button" class="remove-image" data-file-id="{{ $file->id }}">&times;</button>
											
										@endforeach
									@endif
									<div class="col-md-8 d-flex flex-wrap gap-2" id="preview-container">
									</div>
								</div>
							</div>
							<div class="submit-section">
								<button class="btn btn-primary submit-btn update-courses" type="button">Update</button>
							</div>
						</form>
						<input type="hidden" id="course-list" value="{{ route('learning-hub-course') }}">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
	<!-- /Page Content -->
@include('modal.email-management-modal')
@include('modal.common')
@endsection 
@section('scripts')
<script src="{{ url('front-assets/js/page/courses.js') }}"></script>
<!--<script src="{{ url('front-assets/plugins/summernote/summernote-bs4.min.js') }}"></script>-->
<link href="{{ url('front-assets/summernote/summernote-lite.min.css') }}" rel="stylesheet">
    <script src="{{ url('front-assets/summernote/summernote-lite.min.js') }}"></script>
	<script>
		$('.summernote').summernote({
			toolbar: [
				['style', ['style']],
				['font', ['bold', 'italic', 'underline']],
				['fontsize', ['fontsize']],
				['style', ['fontname', 'color']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['insert', ['link', 'picture', 'video']],
				['view', ['codeview']],
			]
		});
	$(document).ready(function(){
		
		
	});
	</script>
@endsection

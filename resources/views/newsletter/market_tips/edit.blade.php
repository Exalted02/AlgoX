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
					<h3 class="page-title">{{ __('Newsletter') }}</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item"><a href="#">{{ __('dashboard') }}</a></li>
						<li class="breadcrumb-item active">{{ __('Market tips') }}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- /Page Header -->
		<hr>
		
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">{{ __('Edit') }}</h5>
					</div>
					<div class="card-body">
						<form id="frmEditMarketTips" action="{{ route('market-tips-update') }}">
						<input type="hidden" id="id" name="id" value="{{ $data->id ?? ''}}">
							<div class="row">
								<div class="col-sm-12">
									<div class="input-block mb-3">
										<label class="col-form-label">{{ __('Title') }}<span class="text-danger">*</span></label>
										<input class="form-control" type="text" name="title" id="title" value="{{ $data->title ?? ''}}">
										<div class="invalid-feedback">Enter title name</div>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="input-block mb-3">
										<label class="col-form-label">{{ __('Long description') }}<span class="text-danger">*</span></label>
										<textarea class="form-control summernote" name="long_desc" id="long_desc" >{{ $data->long_desc ?? ''}}</textarea>
										<div class="invalid-feedback">Enter long description</div>
									</div>
								</div>
							</div>
							<div class="submit-section">
								<button class="btn btn-primary submit-btn update-market-tips" type="button">Update</button>
							</div>
						</form>
						<input type="hidden" id="market-tips-list" value="{{ route('market-tips') }}">
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
<script src="{{ url('front-assets/js/page/newsletter.js') }}"></script>
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

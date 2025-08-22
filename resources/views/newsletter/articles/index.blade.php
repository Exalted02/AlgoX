@extends('layouts.app')

@section('styles')
<link rel="stylesheet" href="{{ url('front-assets/plugins/summernote/summernote-bs4.min.css') }}">
@endsection 
@php 
//echo "<pre>";print_r($records);die;
@endphp
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
						<li class="breadcrumb-item active">{{ __('Articles') }}</li>
					</ul>
				</div>
				<div class="col-md-8 float-end ms-auto">
					<div class="d-flex title-head">
						<a href="{{ route('article-add') }}" class="btn add-btn"><i class="la la-plus-circle"></i> Add</a>
					</div>
				</div>
			</div>
		</div>
		<!-- /Page Header -->
		<hr>
		
		<div class="row">
			<div class="col-md-12">
				<div class="table-responsive">
					<table class="table table-striped custom-table datatable">
						<thead>
							<tr>
								<th>{{ __('Title') }}</th>
								<th>{{ __('Long desc.') }}</th>
								<th class="text-end">{{ __('action') }}</th>
							</tr>
						</thead>
						<tbody>
						@if($records->isNotEmpty())
							@foreach($records as $record)
							<tr>
								<td>{{ $record->title ?? '' }}</td>
								<td>{{ \Illuminate\Support\Str::words($record->long_desc ?? '', 10, '...') }}</td>
								<td class="text-end">
								<div class="dropdown dropdown-action">
										<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
										<div class="dropdown-menu dropdown-menu-right">
											<a class="dropdown-item" href="{{ route('article-edit', $record->id) }}"><i class="fa-solid fa-pencil m-r-5"></i> {{ __('edit') }}</a>
											<a class="dropdown-item delete-article text-danger" href="javascript:void(0);" data-id="{{ $record->id ?? '' }}" data-url="{{ route('article-delete') }}"><i class="fa-regular fa-trash-can m-r-5"></i> {{ __('delete') }}</a>
										</div>
									</div>
								</td>
							</tr>
							@endforeach
						@endif	
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
	<!-- /Page Content -->

@include('modal.common')
@endsection 
@section('scripts')
section('scripts')
<script src="{{ url('front-assets/js/page/newsletter.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="{{ url('front-assets/plugins/summernote/summernote-bs4.min.js') }}"></script>
<script>
//var csrfToken = "{{ csrf_token() }}";
$( document ).ready(function() {
	if ($.fn.DataTable.isDataTable('.datatable')) {
		$('.datatable').DataTable().destroy(); // Destroy existing instance
	}

	$('.datatable').DataTable({
		//searching: false,
		language: {
			"lengthMenu": "{{ __('Show _MENU_ entries') }}",
			"zeroRecords": "{{ __('No records found') }}",
			"info": "{{ __('Showing _START_ to _END_ of _TOTAL_ entries') }}",
			"infoEmpty": "{{ __('No entries available') }}",
			"infoFiltered": "{{ __('(filtered from _MAX_ total entries)') }}",
			"search": "{{ __('search') }}",
			"paginate": {
				"first": "{{ __('First') }}",
				"last": "{{ __('Last') }}",
				"next": "{{ __('Next') }}",
				"previous": "{{ __('Previous') }}"
			},
		}
	});
	
});
</script>
@endsection

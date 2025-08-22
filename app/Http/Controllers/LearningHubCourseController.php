<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LearningHubCourse;
use App\Models\LearningHubCourseFile;

class LearningHubCourseController extends Controller
{
    public function index(Request $request)
    {
		$data = [];
		$data['records'] = LearningHubCourse::with('course_files')->where('status', '!=', 2)->get();
		//echo "<pre>";print_r($request->all());die;
        return view('course.index', $data);
    }
	public function add()
	{
		$data = [];
		return view('course.add');
	}
	public function create(Request $request)
	{
		//echo "<pre>";print_r($request->all());die;
		$course_name = $request->course_name;
		$short_desc = $request->short_desc;
		$long_desc = $request->long_desc;
		
		$model = new LearningHubCourse();
		$model->course_name = $request->course_name ?? null;
		$model->short_desc = $request->short_desc ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		$id = $model->id;
		
		
		$lo_files = $request->file('lo_file');
		if ($lo_files && is_array($lo_files)) {
			
			// save new files
			foreach ($lo_files as $file) {
				
				$destinationPath = public_path('uploads/courses');
				if (!file_exists($destinationPath)) {
					mkdir($destinationPath, 0777, true);
				}
				
				$filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
				$file->move($destinationPath, $filename);

				$fileModel = new LearningHubCourseFile();
				$fileModel->course_id = $id;
				$fileModel->files = $filename;
				$fileModel->save();
			}
		}
		return response()->json(['message'=>'success']);
	}
	
	public function edit($id='')
	{
		$data = [];
		$result['data']= LearningHubCourse::with('course_files')->where('id', $id)->first();
		//echo "<pre>";print_r($data);die;
		return view('course.edit', $result);
	}
	public function update_course(Request $request)
	{
		$id = $request->id;
		$model = LearningHubCourse::find($id);
		$model->course_name = $request->course_name ?? null;
		$model->short_desc = $request->short_desc ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		
		$lo_files = $request->file('lo_file');
		if ($lo_files && is_array($lo_files)) {
			foreach ($lo_files as $file) {
				
				$destinationPath = public_path('uploads/courses');
				if (!file_exists($destinationPath)) {
					mkdir($destinationPath, 0777, true);
				}
				
				$filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
				$file->move($destinationPath, $filename);

				$fileModel = new LearningHubCourseFile();
				$fileModel->course_id = $id;
				$fileModel->files = $filename;
				$fileModel->save();
			}
		}
		return response()->json(['message'=>'success']);
	}
	public function delete_course(Request $request)
	{
		LearningHubCourse::where('id', $request->id)->update(['status'=>2]);
		LearningHubCourseFile::where('course_id', $request->id)->delete();
		// unlink files 
		
		$courseFiles = LearningHubCourseFile::where('course_id', $request->id)->get();
		if($courseFiles->isNotEmpty()){
			
			foreach($courseFiles as $filemn)
			{
				$f_name = $filemn->files;
				$filePath = public_path('uploads/courses/' . $f_name);
				if (file_exists($filePath)) {
					unlink($filePath);
				}
			}
		}
		
		return response()->json(['success'=>true]);
	}
	public function delete_course_file(Request $request)
	{
		$id = $request->id;
		$fileData = LearningHubCourseFile::where('id', $id)->first();
		$f_name = $fileData ? $fileData->files : '';
		$filePath = public_path('uploads/courses/' . $f_name);
		if (file_exists($filePath)) {
			unlink($filePath);
		}
		
		LearningHubCourseFile::where('id', $id)->delete();
		
		return response()->json(['message'=>'success']);
	}
}

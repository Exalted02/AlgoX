<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;

class NewsletterController extends Controller
{
    public function articles(Request $request)
    {
		$data = [];
		$data['records'] = Newsletter::where('newsletter_type', 1)->where('status', '!=', 2)->get();
        return view('newsletter.articles.index', $data);
    }
	public function article_add()
	{
		return view('newsletter.articles.add');
	}
	public function article_create(Request $request)
	{
		$model = new Newsletter();
		$model->newsletter_type = 1;
		$model->title = $request->title ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		$id = $model->id;
		return response()->json(['message'=>'success']);
	}
	public function article_edit($id)
	{
		$data = [];
		$result['data']= Newsletter::where('newsletter_type', 1)->where('id', $id)->first();
		//echo "<pre>";print_r($data);die;
		return view('newsletter.articles.edit', $result);
	} 
	public function article_update(Request $request)
	{
		$model = Newsletter::find($request->id);
		$model->newsletter_type = 1;
		$model->title = $request->title ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		return response()->json(['message'=>'success']);
	}
	public function article_delete(Request $request)
	{
		Newsletter::where('newsletter_type', 1)->where('id', $request->id)->update(['status'=>2]);
		return response()->json(['success'=>true]);
	}
	
	public function case_studies(Request $request)
    {
		$data = [];
		$data['records'] = Newsletter::where('newsletter_type', 2)->where('status', '!=', 2)->get();
        return view('newsletter.case-studies.index', $data);
    }
	public function case_studies_add()
	{
		return view('newsletter.case-studies.add');
	}
	public function case_studies_create(Request $request)
	{
		$model = new Newsletter();
		$model->newsletter_type = 2;
		$model->title = $request->title ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		$id = $model->id;
		return response()->json(['message'=>'success']);
	}
	public function case_studies_edit($id)
	{
		$data = [];
		$result['data']= Newsletter::where('newsletter_type', 2)->where('id', $id)->first();
		//echo "<pre>";print_r($data);die;
		return view('newsletter.case-studies.edit', $result);
	} 
	public function case_studies_update(Request $request)
	{
		$model = Newsletter::find($request->id);
		$model->newsletter_type = 2;
		$model->title = $request->title ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		return response()->json(['message'=>'success']);
	}
	public function case_studies_delete(Request $request)
	{
		Newsletter::where('newsletter_type', 2)->where('id', $request->id)->update(['status'=>2]);
		return response()->json(['success'=>true]);
	}
	
	public function market_tips(Request $request)
    {
		$data = [];
		$data['records'] = Newsletter::where('newsletter_type', 3)->where('status', '!=', 2)->get();
        return view('newsletter.market_tips.index', $data);
    }
	public function market_tips_add()
	{
		return view('newsletter.market_tips.add');
	}
	public function market_tips_create(Request $request)
	{
		$model = new Newsletter();
		$model->newsletter_type = 3;
		$model->title = $request->title ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		$id = $model->id;
		return response()->json(['message'=>'success']);
	}
	public function market_tips_edit($id)
	{
		$data = [];
		$result['data']= Newsletter::where('newsletter_type', 3)->where('id', $id)->first();
		//echo "<pre>";print_r($data);die;
		return view('newsletter.market_tips.edit', $result);
	} 
	public function market_tips_update(Request $request)
	{
		$model = Newsletter::find($request->id);
		$model->newsletter_type = 3;
		$model->title = $request->title ?? null;
		$model->long_desc = $request->long_desc ?? null;
		$model->save();
		return response()->json(['message'=>'success']);
	}
	public function market_tips_delete(Request $request)
	{
		Newsletter::where('newsletter_type', 3)->where('id', $request->id)->update(['status'=>2]);
		return response()->json(['success'=>true]);
	}
}

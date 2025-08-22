<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningHubCourse extends Model
{
    use HasFactory;
	protected $table = "learning_hub_courses";
	protected $fillable = [
        'course_name',
        'short_desc',
        'long_desc',
        'files',
        'status',
    ];
	
	public function course_files()
	{
		return $this->hasMany(LearningHubCourseFile::class, 'course_id', 'id');
	}
}

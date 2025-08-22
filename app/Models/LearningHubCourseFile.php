<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningHubCourseFile extends Model
{
    use HasFactory;
	protected $table = "learning_hub_course_files";
	protected $fillable = [
        'course_id',
        'files',
    ];
}

 /**
  * CMI Data model of scorm
  */
 export type ScormCmiParam = 
 'scorm.score'|'scorm.lms.init'|'cmi.exit'
 |'cmi.completion_status'|''|
 'cmi._version'|'cmi._children'|'cmi.suspend_data'|'cmi.lunch_data'|
 // CMI core
 'cmi.core.exit'|'cmi.core.lesson_status'|'cmi.core.__children'|
 'cmi.core.student_id'|'cmi.core.student_name'|'cmi.core.lesson_staus'|
 'cmi.core.entry'|'cmi.core.score_children'|'cmi.core.score.raw'|'cmi.core.score.min'|
 'cmi.core.score.max'|'cmi.core.total_time'|'cmi.core.session_time'|'cmi'
 // CMI studen data
 |'cmi.student_data_children'|'cmi.student_data.mastry_score';
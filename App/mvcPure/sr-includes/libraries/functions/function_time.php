<?php
 


/*/
date_dayformat(_
/*/
function date_dayformat($time) {
   $time= strtotime($time);
    if ($time >= strtotime("today 00:00")) {
        return "Today  at ".date("h:i a", $time) ;
    } elseif ($time >= strtotime("yesterday 00:00")) {
        return "Yesterday at ".date("h:i a", $time);
    } elseif ($time >= strtotime("-6 day 00:00")) {
        return date("l ", $time).' at '.date("h:i a", $time);
    } else {
        return date("d-M-Y", $time);
    }
}
/*/
zonedate($zone="UTC")
/*/
 function zonedate($zone="UTC"){
   
    date_default_timezone_set($zone);
    
$in_lo_time = date("Y-m-d H:i:s  ", strtotime("now")); 
return $in_lo_time;
}
/*/

/*/
 function date_in_timezone($zone="UTC",$date_time='',$timestamp=''){
   if($timestamp!=''){
        $date= date("Y-m-d H:i:s e",$timestamp);
   }else if($date_time!=''){
        $date= $date_time;
   }else{
     $date= date("Y-m-d H:i:s e");

   }
   $zone=($zone=='')?"UTC":$zone;
 
  
   //getting date in time zone
   //getting difference to current time zone
$TimeUTC=zonedate("UTC");
$TimeZone=zonedate($zone);

$TimeDiff= strtotime($TimeUTC)-strtotime($TimeZone);
$GivenTime=strtotime($date);

$TimeInTimeZone=($GivenTime-$TimeDiff);



   
$in_lo_time = date("Y-m-d H:i:s  ",$TimeInTimeZone); 

return $in_lo_time;
}
/**
* convert to ago
*/
function convert_to_ago($str) {
	
   	
    	$timestamp =   strtotime($str);

    	$difference = time() - $timestamp;
   		$periods = array("sec", "min", "hr", "day", "week", "month", "year", "decade");
   		$lengths = array("60","60","24","7","4.35","12","10");
   		for($j = 0; $difference >= $lengths[$j]; $j++)
   			$difference /= $lengths[$j];
   			$difference = round($difference);
   		if($difference != 1) $periods[$j].= "s";
   			$text = $difference.' '. $periods[$j]. ' ago';
   			return $text;
    }
/*
Score = (P-1) / (T+2)^G

where,
P = points of an item (and -1 is to negate submitters vote)
T = time since submission (in hours)
G = Gravity, defaults to 1.8 in news.arc
http://amix.dk/blog/post/19574
//------------------
http://www.boyter.org/2010/12/mysql-popularity-ranking-algorithm/

*/
function hackerHot($baseScore,$date_time,$gravity = 1.8){
    
     $upload_time=strtotime($date_time);
 $time_diff=(strtotime('now')-$upload_time);
 $hourPassed=round(($time_diff/(60 * 60)));
 if($hourPassed<0){
     $hourPassed=0;
 }
  
  return round((($baseScore-1)/pow($hourPassed+2,$gravity))*1000);
 }
?>
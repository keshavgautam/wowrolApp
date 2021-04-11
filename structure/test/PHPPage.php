   //--TIME Calulation
  $row_type=0; 
  $Today=strtotime(time()); 
  $Yesterday=strtotime(time() - ( 24 * 60 * 60));
  $message_time_gmt=strtotime($Fields[$j]['time_gmt']);
  if($message_time_gmt<$Yesterday){
    $message_date=date("d-M-Y",strtotime($Fields[$j]['time_gmt']));   
  }else{
   $message_date=date("d-M-Y h:i A",strtotime($Fields[$j]['time_gmt']));;
  }
 
            if( $group_date!=$message_date){
                $row_type=1;
                $group_date=$message_date;
            }
                //--row_type ==1 for date grouped message
    if($row_type==1){
       

      $ret[$i]['type']=3;
      $ret[$i]['message']=date("d-M-Y h:i A",strtotime($Fields[$j]['time_gmt']));;
      $ret[$i]['facet']=$group_date;
        $i++;
    }
    
       //-->>TIME Calulation
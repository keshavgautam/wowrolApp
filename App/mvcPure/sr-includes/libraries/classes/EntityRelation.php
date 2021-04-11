<?php
    
 abstract  class EntityRelation{
      public $frontuser;//frontuser / profile_owner_actoruser of owner whos profile is viewed.

      public $actoruser;//actoruser /actoruser of visiter who is viewing profile.

      function __construct($frontuser,$actoruser) {
               $this->frontuser=$frontuser;
               $this->actoruser=$actoruser;
             }  
/**
* @description=>update the relation
* @param  => 
* @return => 
*/

public function updateRelation($args){

    if($args['r']=="twr"){
        
 $two_wr= $this->relation_twr_status();
     
     $relation_type =$this->twrtype();
    $next_two_re=$this->next_two_wr($two_wr,$args['action'],$relation_type);
     return   $this->ragister_two_wr( $next_two_re);
    }
 if($args['r']=="owr"){
        

     $one_wr= $this->relation_owr_status();
     $relation_type =$this->owrtype();
    $next=$this->next_one_wr($one_wr,$args['action'],$relation_type);

     return   $this->ragister_one_wr( $next);
    }

}
  /**
 * .create_term()
 * @param 1=>'required data name' 2=>'entity id'
 *             
 * @return array()
 */
 public function ragister_two_wr($twr_staus){
  
             /*
             a_f=> actor user to front user
             f_a=> front user to actor user
             */
             $current_status=2;
               $isa_f=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
  $isf_a=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser,$this->actoruser));
  if($isa_f==1||$isf_a==1){
      // updateing
      if($isa_f==1){
          $a_f_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
            $id=$a_f_row['two_wr_id'];$current_status=$a_f_row['current_status'];
            if(($a_f_row['current_status']==3&&$twr_staus==2)||($a_f_row['current_status']==7&&$twr_staus==6)){
                 $a_f_delete=$GLOBALS['Var_DBMysqli']->delete(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
                 //delete_friendship_spread
                // $this->delete_friendship_spread($id);
            }else{
                $a_f_set=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'relation_two_way',array("current_status","from_action"),array($twr_staus,$twr_staus),array("two_wr_id"),array($id)); 
            }
         

      }//o_v
      if($isf_a==1){
             $f_a_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser,$this->actoruser));
             $id=$f_a_row['two_wr_id'];$current_status=$f_a_row['current_status'];
              if(($f_a_row['current_status']==3&&$twr_staus==2)||($f_a_row['current_status']==7&&$twr_staus==6)){
                 $f_a_delete=$GLOBALS['Var_DBMysqli']->delete(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser,$this->actoruser));
                     //delete_friendship_spread
                // $this->delete_friendship_spread($id);
            }else{
                $f_a_set=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'relation_two_way',array("current_status","to_action"),array($twr_staus,$twr_staus),array("two_wr_id"),array( $id));
            }
   

      }//v_o


  }else{
      // new insearting
          
              
                $id= $set=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'relation_two_way',array("from_id","to_id","current_status","from_action"),array($this->actoruser,$this->frontuser,$twr_staus,$twr_staus));
  


  }




  if($twr_staus==7||$twr_staus==3){
      $one_wr=$this->ragister_one_wr(3);
  }


  if($current_status==7&&$twr_staus==3){
      // making friendship spread
  
      $date=zonedate($GLOBALS['Var_Timezone']); $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
      $gmt_date=zonedate('GMT');
     //setting spread id
     $spread_id=0;
      $Friend_Ship_id=$id;
        
   


     // making friendship actiity
     //confirm firend activity id =102
    
     

    // making friendship notification to friendship sender
   


     //-- sending email or text message
   

       //-- sending final response

   

  }

  return $id;
 }
 /**
* @description=>getentity relation_status
* @param  => 
* @return => 
*/

 public function ragister_one_wr($twr_staus){
    
         /*
         * unfollow/default/notfollowing =>2
         * follow                        =>3
         * block                         =>0
         * account owner                 =>1
         */

            $isa_f=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_one_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
  if($isa_f==1){
      // updaateing
       $a_f_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_one_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
            $id=$a_f_row['one_wr_id'];
            if($twr_staus==3||$twr_staus==0){
               $a_f_set=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'relation_one_way',array("current_status"),array($twr_staus),array("one_wr_id"),array($id));  
            }else{
                 $a_f_set=$GLOBALS['Var_DBMysqli']->delete(DB_NAME,'relation_one_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
            }
         


  }else{
      // new insearting
            
              $wr_type=$this->owrtype();
                 $id= $set=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'relation_one_way',array("from_id","to_id","current_status","wr_type"),array($this->actoruser,$this->frontuser,$twr_staus,$wr_type));

  }

  return $id;
 }
/**
* @description=>getentity relation_status
* @param  => 
* @return => 
*/

 public function next_two_wr($current,$do_task_action,$relation_type){
    
         $next=2;
         switch($relation_type){
             
      case 1:// user to user
         switch($current){
            case 2:
             $next=($do_task_action==1)? 7:6; // [ friend request send | cancel ]
            break; 
            case 7:
            if($this->relation_responder()=='ae'){
                 $next=($do_task_action==0)? 6:6;  // [ cancel| cancel ] 
            }else{
                   $next=($do_task_action==1)? 3:5;  // [ friends | rejected ] 
            }
          
            break;
            case 5:
              $next=($do_task_action==1)? 3:2;  // [ friends | public  ]
  
            break;
            case 6:
              $next=($do_task_action==1)? 7:6;  // [ friend request send | cancel ]
           
            break;   
            case 3:
             $next=($do_task_action==0)? 2:2; // [ public | public  ]
            break; 
             
         }// End current switch
      break;
      case 2:
        switch($current){
            case 2:
             $next=($do_task_action==1)? 4:2; // [ Favrate store | public ]
            break; 
              case 4:
             $next=($do_task_action==1)? 2:2; // [ public| public]
            break;
             
         }// End current switch
      break;
       case 3:
        switch($current){
            case 2:
             $next=($do_task_action==1)? 4:2; // [ Favrate store | public ]
            break; 
              case 4:
             $next=($do_task_action==1)? 2:2; // [ public| public]
            break;
             
         }// End current switch
      break;
         }// End relation_type switch
      


             

  return $next;
 }
 /**
* @description=>getentity relation_status
* @param  => 
* @return => 
*/

  public function next_one_wr($current,$do_task_action,$relation_type){
    
         $next=2;
         switch($relation_type){
             
      case 1:// user to user
         switch($current){
            case 3:
             $next=($do_task_action==0)? 2:2; // [ public | public  ]
            break; 
            case 2:
             $next=($do_task_action==1)? 3:2; // [ public | public  ]
            break; 
             
         }// End current switch
      break;
      case 2:
        switch($current){
          case 2:
             $next=($do_task_action==1)? 4:2; // [ Favrate store | public ]
            break; 
             
         }// End current switch
      break;
       case 3:
        switch($current){
            case 2:
             $next=($do_task_action==1)? 4:2; // [ Favrate store | public ]
            break; 
             
         }// End current switch
      break;
         }// End relation_type switch
      


             

  return $next;
 }
/**
* @description=>getentity relation_status
* @param  => 
* @return => 
*/

public function relation_twr_status(){

$ActorEntityData=$GLOBALS['Var_ActorEntityData']; 
$frontuser_EntityRow=$this->frontuser_EntityRow;
$Actoruser_EntityRow=$ActorEntityData['EntityData'];

         $status=2; // no relation

           if($this->is_block()){
                $status=0;   

           }else{
// check for account owner
if($this->frontuser!=$this->actoruser){

 $iso_v=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser, $this->actoruser));
  $isv_o=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser,$this->frontuser));

   if($iso_v==1){
    $conection_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser, $this->actoruser));
                   $status=  intval($conection_row['current_status']);   
              }
 if($isv_o==1){
    $conection_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser,$this->frontuser));
                  $status=  intval($conection_row['current_status']);   
              }
   



}else{
     $status=1; // account owner
}
  

}


return $status;

}
public function relation_owr_status(){
         
                   $relation_status=2;//not following

                     if($this->is_block()){
                   $relation_status=0;   

                     }else{
                         
                    
                   // check for account owner
if($this->frontuser!=$this->actoruser){
       $isv_o=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_one_way',array("from_id","to_id"),array($this->actoruser,$this->frontuser));
if($isv_o==1){
               $conection_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_one_way',array("from_id","to_id"),array($this->actoruser,$this->frontuser));
                   $relation_status=  intval($conection_row['current_status']);   
              }
             
                 

}else{
     $relation_status=1;   
}
        }          
       return    $relation_status; 
           }
 /**
* @description=>check for blocked by page account owner
* @param  => 
* @return => 
*/
public function is_blocked(){
     
               $a=array("from_id","to_id","current_status");
               $b=array($this->frontuser, $this->actoruser,0);
 $isblocked=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_one_way',$a,$b);

              if( $isblocked>0){
                  
                  return TRUE;
              }else{
                 return FALSE; 
              }


         }
  /**
* @description=>check for blocked by page account owner
* @param  => 
* @return => 
*/
public function is_blockowner(){
         
               $a=array("from_id","to_id","current_status");
               $b=array($this->actoruser,$this->frontuser ,0);
 $isblocked=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_one_way',$a,$b);

              if( $isblocked>0){
                  
                  return TRUE;
              }else{
                 return FALSE; 
              }


         }
 /**
* @description=>check for blocked by page account owner
* @param  => 
* @return => 
*/
public function is_block(){
             
     if($this->is_blocked()||$this->is_blockowner()){
                 return TRUE;
              }else{
                 return FALSE; 
              }


         }
 /**
* @description=>check for blocked by page account owner
* @param  => 
* @return => 
*/

 public function RelationData($type){
    $data=array();
 $af=$this->afHash();
    switch($type){
      case 'twr':
      $data['status']=$this->relation_twr_status();
      $data['rpdr']=$this->relation_responder();
      $data['rtype']=$this->twrtype();
      $data['aeid']=$this->actoruser;
      $data['feid']=$this->frontuser;
      $data['af']=$af;
      break;  
      case 'owr':
      $data['status']=$this->relation_owr_status();
      $data['rpdr']=$this->relation_responder();
     $relation_type=$this->owrtype();
      $data['rtype']=($relation_type==1||$relation_type==2||$relation_type==3)?1:0;
      $data['aeid']=$this->actoruser;
      $data['feid']=$this->frontuser;
      $data['feid']=$this->frontuser;
       $data['af']=$af;

      break; 

    }
    
     
return $data;

 }
    //check relation_responder
   public function relation_responder(){
        $relation_responder='ae';
      $to_id=$this->frontuser;
        $isa_f=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
  $isf_a=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser,$this->actoruser));
   if($isa_f==1){
          $a_f_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->actoruser, $this->frontuser));
            $to_id=$a_f_row['to_id'];
       

      }//o_v
      if($isf_a==1){
             $f_a_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'relation_two_way',array("from_id","to_id"),array($this->frontuser,$this->actoruser));
           $to_id=$f_a_row['to_id'];

      }//v_o
      //----------------
      if($to_id==$this->actoruser){
         $relation_responder='fe';  

      }

      return $relation_responder;
     
   }
     //check twr type

   public function twrtype(){
        return ( $this->frontuser_EntityRow['type']==0&&$this->actoruser_EntityRow['type']==0)?1:0;;
    }
      //check owr type
   public function owrtype(){
     $from_type=$this->actoruser_EntityRow['type'];
     $to_type=$this->frontuser_EntityRow['type'];
     $type=0; // not allowed
     if($from_type==0&&$to_type==0){
       $type=1;  // user to user
     }
      if($from_type==0&&$to_type==1){
       $type=2;   // user to store
     }
      if($from_type==1&&$to_type==1){
       $type=3;   // store to store
     }
     return  $type;
   }

 /**
* @description=>calculate the actor &front user   hash
* @param  => 
* @return => 
*/
public function afHash(){
   // check_response($this->actoruser_EntityRow); 
 // check_response($this->frontuser_EntityRow);
     $af=intval($this->frontuser)+intval($this->actoruser)+intval($this->frontuser_EntityRow['account_id'])+intval($this->actoruser_EntityRow['account_id']);

   return  hash('sha256',$af);
}
/**
* @description=>calculate the actor &front user   hash from entity Row
* @param  => 
* @return => 
*/
public function afHashFormEntityRow($EntityRow){
      $af=intval($EntityRow['entity_id'])+intval($this->actoruser)+intval($EntityRow['account_id'])+intval($this->actoruser_EntityRow['account_id']);

   return  hash('sha256',$af);
}

 /**
* @description=>To get Friend List of Front User
* @param  => array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'])
* @return => 
*/


public  function  FrontUserRelatives($args=array()){
    //--
 $freindsSql='(p.entity_id IN(SELECT a.to_id
                           FROM '.DB_NAME.'.relation_two_way a
                           WHERE a.current_status=3
                           AND (a.from_id='.$this->frontuser.'))
                           ||
             p.entity_id IN(SELECT c.from_id
                           FROM '.DB_NAME.'.relation_two_way c
                           WHERE c.current_status=3
                           AND (c.to_id='.$this->frontuser.'))
                         
                 )';
//--
 $followersSql='(p.entity_id IN(SELECT a.from_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE current_status=3
                           AND 	wr_type= 1
                           AND to_id='.$this->frontuser.'))';
//--
 $followingsSql='(p.entity_id IN(SELECT a.to_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE current_status=3
                            AND 	wr_type= 1
                           AND from_id='.$this->frontuser.'))';
//--
 $favrateStoreSql='(p.entity_id IN(SELECT a.to_id 
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE a.current_status=4
                            AND (a.wr_type= 2|| a.wr_type= 3)
                           AND a.from_id='.$this->frontuser.'))';
//--
 $favoritersSql='(p.entity_id IN(SELECT a.from_id 
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE a.current_status=4
                            AND (a.wr_type= 2|| a.wr_type= 3)
                           AND a.to_id='.$this->frontuser.'))';
//--
$ORDERBY='';
    switch($args['type']){
    case 'Freinds':
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$freindsSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$freindsSql.'
 AND  p.entity_id <>'.$this->frontuser.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';

    
    break;    
    case 'Followers':
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$followersSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$followersSql.'
 AND  p.entity_id <>'.$this->frontuser.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';

    
    break;  
    case 'Followings':
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '. $followingsSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '. $followingsSql.'
 AND  p.entity_id <>'.$this->frontuser.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';

    
    break;
    case 'Favoritestores':
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$favrateStoreSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$favrateStoreSql.'
 AND  p.entity_id <>'.$this->frontuser.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';

    
    break;
    case 'Favoriters':
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$favoritersSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$favoritersSql.'
 AND  p.entity_id <>'.$this->frontuser.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';

    
    break;           
    }
 //--search sqls
  if($args['search_str']!=''){
 $args['search_str'] =validateSearchWord($args['search_str']);
    $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| p.public_data LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    
$serachquery='AND (p.public_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';

$numsql.=$serachquery;
$selectsql.=$serachquery;
 }  
  //--search sqls
$selectsql.=$ORDERBY;
//--ORDERBY

 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//LIMIT sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
//--

 $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

 
  for($i=0;$i<count($result);$i++){
     $result[$i]=$this->ParseEntityRow($result[$i]);
 }

    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             );

}
/**
* @description=>calculate the actor &front user   hash from entity Row
* @param  => 
* @return => 
*/
public function ProfileBannerData($args=array()){
   $data=array();    $total_sql=array();
   



  //frontuser_friends
 //--[Reference] =a
$total_sql[]='(SELECT COUNT(*) as total
       FROM '.DB_NAME.'.relation_two_way a
       WHERE a.current_status="3"
       AND (a.from_id="'.$this->frontuser.'"||a.to_id="'.$this->frontuser.'")
       )';
  //frontuser_followers
  //--[Reference] =b
$total_sql[]='(SELECT COUNT(*) as total
       FROM '.DB_NAME.'.relation_one_way b
       WHERE b.current_status=3
       AND 	b.wr_type= 1
       AND b.to_id="'.$this->frontuser.'"
       )';
  //frontuser_followings
$total_sql[]='(SELECT COUNT(*) as total
        FROM '.DB_NAME.'.relation_one_way c
       WHERE c.current_status=3
       AND 	c.wr_type= 1
       AND c.from_id="'.$this->frontuser.'"
       )';
  //frontuser_favorites_store
$total_sql[]='(SELECT COUNT(*) as total
        FROM '.DB_NAME.'.relation_one_way d
       WHERE d.current_status=4
       AND  (d.wr_type= 2|| d.wr_type= 3)
       AND d.from_id="'.$this->frontuser.'"
       )'; 
  //frontuser_storefavoriters
$total_sql[]='(SELECT COUNT(*) as total
      FROM '.DB_NAME.'.relation_one_way e
       WHERE e.current_status= 4
       AND (e.wr_type= 2|| e.wr_type= 3)
       AND e.to_id="'.$this->frontuser.'"
       )';
   //frontuser_spreads
$total_sql[]='(SELECT COUNT(*) as  total
       FROM '.DB_NAME.'.spread f
       WHERE f.entity_id= "'.$this->frontuser.'"
       )';   
       
   //-- total  sql
 

  $search_sql= implode('UNION ALL ',$total_sql);
  //--==     
       
   $result=$GLOBALS['Var_DBMysqli']->query($search_sql);  
               
   return    $result;
}

 }


?>
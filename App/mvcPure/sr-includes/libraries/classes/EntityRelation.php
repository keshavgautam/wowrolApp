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

      $date=zonedate($GLOBALS['Var_Timezone']);
      $gmt_date=zonedate('GMT');
     //setting spread id
     $spread_id=0;
     $Friend_Ship_id=$id;
     $taged_entity=array($this->frontuser);
     $attached_object_Str='"'.implode(",",array( $Friend_Ship_id)).'"';
     $taged_entity_Str='"'.implode(",",$taged_entity).'"';

     $spreadargs = array(
	    'spread_id' => 0,
		'entity_id' =>$this->actoruser,
		'owner_entity_id' => $this->actoruser,
		'spread_content' => '',
		'quick_action_type'=>1,
        'spread_perpose'=>  13,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500,  $gmt_date),
		'spread_score' => hackerHot(500,  $gmt_date),
		'spread_date_gmt' => $gmt_date,
        'taged_entity' =>$taged_entity,
		'taged_entity_Str' => $taged_entity_Str,
		'attached_object_Str' => $attached_object_Str
	);
     //  check_response($args);
$spread_id= $GLOBALS['Var_Spread']->register_spread($spreadargs);

     // making friendship actiity
     //actiity code 110  for  freind ship accepted with some one
    $GLOBALS['Var_Activity']->CreateSpreadActivity(array('creater_id' =>$this->actoruser,'spread_id' =>$spread_id,'object_id' => $Friend_Ship_id,'activity_code' => '110'));


    // making friendship notification to friendship sender



     //-- sending email or text message
    $LoginData=$this->GetLoginData($this->frontuser);
     $frontuser_EntityStripdata=$GLOBALS['Var_ViewParse']->EntityStripdata( $this->frontuser_EntityRow);
     $actoruser_EntityStripdata=$GLOBALS['Var_ViewParse']->EntityStripdata( $this->actoruser_EntityRow);
   $email_data=array(
 'identity_type'=>$LoginData['identity_type'],
 'login_identity'=>validate_word('reverse_HTML_entities',$LoginData['login_identity']),
 'frontuser_name'=>$frontuser_EntityStripdata['entityName'],
 'actoruser_name'=>$actoruser_EntityStripdata['entityName'],
 'actoruser_slug'=>$actoruser_EntityStripdata['slug'],
 'actoruser_url'=>SITEURL.$actoruser_EntityStripdata['slug'],
 'understand_social_shopping_more_link'=>SITEURL.'',
'More_Information_link'=>'',
 );


    $GLOBALS['Var_ExternalNotification']->FreindShipAccepted($email_data);

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
public function Ragister_Blocking(){
     $this->ragister_two_wr(0);
     $this->ragister_one_wr(0);

$this->DeleteBlockedUserFollowing();


  return   TRUE;
}
 /**
* @description=>check for blocked by page account owner
* @param  =>
* @return =>
*/
public function Ragister_Unblocking(){
        $this->ragister_two_wr(2);
     $this->ragister_one_wr(2);
  return   TRUE;
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
      $data['a']=$this->IsAllowFriendship();

      break;
      case 'owr':
      $data['status']=$this->relation_owr_status();
      $data['rpdr']=$this->relation_responder();
      $relation_type=$this->owrtype();
      $data['rtype']=($relation_type==1||$relation_type==2||$relation_type==3)?1:0;
      $data['aeid']=$this->actoruser;
      $data['feid']=$this->frontuser;
      $data['af']=$af;
      $data['a']=$this->IsAllowFollow();

      break;
      case 'message':
      $data['allow']=$this->IsAllowConversation();
      $data['aeid']=$this->actoruser;
      $data['feid']=$this->frontuser;
      break;
      case 'shopping':
      $data['allow']=$this->IsAllowGoonShopping();
      $data['aeid']=$this->actoruser;
      $data['feid']=$this->frontuser;
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
    //   $af=$this->frontuser.''.$this->actoruser.''.$this->frontuser_EntityRow['account_id'].''.$this->actoruser_EntityRow['account_id'];
   return   hash('sha256',$af);
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
 $IsAllowViewList=  $this->IsAllowViewList();
    if( $IsAllowViewList['friend']){
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
    }else{
      $freindsSql=' 1=2';
    }

//--
 $followersSql='(p.entity_id IN(SELECT a.from_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE current_status=3
                           AND 	wr_type= 1
                           AND to_id='.$this->frontuser.'))';
//--
  if( $IsAllowViewList['following']){
 $followingsSql='(p.entity_id IN(SELECT a.to_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE current_status=3
                            AND 	wr_type= 1
                           AND from_id='.$this->frontuser.'))';

}else{
      $followingsSql=' 1=2';
}
//--
  if( $IsAllowViewList['favrateStore']){
 $favrateStoreSql='(p.entity_id IN(SELECT a.to_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE a.current_status=4
                            AND (a.wr_type= 2|| a.wr_type= 3)
                           AND a.from_id='.$this->frontuser.'))';
}else{
     $favrateStoreSql=' 1=2';

}

//--
 $favoritersSql='(p.entity_id IN(SELECT a.from_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE a.current_status=4
                            AND (a.wr_type= 2|| a.wr_type= 3)
                           AND a.to_id='.$this->frontuser.'))';
//--
 $getblockeduserSql='(p.entity_id IN(SELECT a.to_id
                           FROM '.DB_NAME.'.relation_one_way a
                           WHERE a.current_status=0
                           AND a.from_id='.$this->actoruser.'))';

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
  case 'ConversationMember':

   $args['search_str'] =validateSearchWord($args['search_str']);
    $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| q.content_slug LIKE "%'.$word.'%" ';
                  }


              }


          }


     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE (q.content_slug LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE (q.content_slug LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')
 AND  p.entity_id <>'.$this->frontuser.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';
 $args['search_str']='';

    break;

    case 'blockedfrontUser':

     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$getblockeduserSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$getblockeduserSql.'
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
           $pieces_sql.='|| p.search_data LIKE "%'.$word.'%" ';
                  }


              }


          }
$serachquery='AND (p.search_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';

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
//check_response($selectsql);
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

/**
* @description=>get Profile page data
* @param  =>
* @return =>
*/
public function GetProfileInfoData(){
    $InfoData=array();
 $frontuser_EntityRow = $this->frontuser_EntityRow;

 $relation=($this->frontuser==$this->actoruser)?1:0;


 switch( $frontuser_EntityRow['type']){
    case 0;
  $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('basicbuyer',$frontuser_EntityRow,$relation);
  $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('aboutbuyer',$frontuser_EntityRow,$relation);


    break;
    case 1;
      $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('basicstore',$frontuser_EntityRow,$relation);
  $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('minimum_order',$frontuser_EntityRow,$relation);
    $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('price_range',$frontuser_EntityRow,$relation);
  $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('storeaddress',$frontuser_EntityRow,$relation);
  $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('aboutstore',$frontuser_EntityRow,$relation);
  $InfoData[]=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('Storepolicy',$frontuser_EntityRow,$relation);

    break;
}

    return $InfoData;
}
/**
* @description=>
* @param  =>
* @return =>
*/
public function IsAllowFriendship(){
      $allow=FALSE;

$frontuser_EntityRow= $this->frontuser_EntityRow;



 $privacy_setting = GetPropertyInArray('privacy_setting',$frontuser_EntityRow['private_data'],array());
 if(is_array( $privacy_setting)){
     $cp1 =GetPropertyInArray('cp1',$privacy_setting,'0');//[0,5] // r

    if($cp1==0 ){     $allow=TRUE; }

 }

 return  $allow;
}
/**
* @description=>
* @param  =>
* @return =>
*/
public function IsAllowFollow(){
        $allow=FALSE;

$frontuser_EntityRow= $this->frontuser_EntityRow;



 $privacy_setting = GetPropertyInArray('privacy_setting',$frontuser_EntityRow['private_data'],array());
 if(is_array( $privacy_setting)){
     $cp6 =GetPropertyInArray('cp6',$privacy_setting,'0');//[0,5] // r

      if($cp6==0 ){     $allow=TRUE; }

 }
 return  $allow;
}

/**
* @description=> work as ['is_disabled']
* @param  =>
* @return =>
*/
public function IsDisabledViewOnInternet(){
         $allow=FALSE;

$frontuser_EntityRow= $this->frontuser_EntityRow;



 $privacy_setting = GetPropertyInArray('privacy_setting',$frontuser_EntityRow['private_data']);
 if(is_array( $privacy_setting)){
     $cp5 =GetPropertyInArray('cp5',$privacy_setting);//[0,5] // r

      if($cp5==5 ){      $allow=TRUE; }
     // if($frontuser_EntityRow['private_data']['deactivate']==1 ){     $allow=TRUE; }
 }
 return  $allow;
}

/**
* @description=>check is frount user is allow to chat with actoruser.
* @param  =>
* @return =>
*/

public function  IsAllowConversation(){
       $allow=FALSE;
   $twr_status =  $this->relation_twr_status();
$frontuser_EntityRow= $this->frontuser_EntityRow;



 $privacy_setting = GetPropertyInArray('privacy_setting',$frontuser_EntityRow['private_data']);
 if(is_array( $privacy_setting)){
   $cp0 =GetPropertyInArray('cp0',$privacy_setting);//[0,1,2,5] // r

    if( $twr_status==2){
     if($cp0==0 ){     $allow=TRUE; }
    }
   if( $twr_status==3){
     if($cp0==0 || $cp0==1||$cp0==2){     $allow=TRUE; }
    }
     if($cp0==2){
            if($this->IsFriend_oF_Friend()){
     $allow=TRUE;
       }
    }

 }
      if( $this->frontuser== $this->actoruser){
           $allow=FALSE;
      }

      if($this->IsDisabledViewOnInternet()){
           $allow=FALSE;
      }
    return  $allow;
}
/**
* @description=>check is frount user is allow go on shopping with actoruser.
* @param  =>
* @return =>
*/

public function  IsAllowGoonShopping(){
  $allow=FALSE;
   $twr_status =  $this->relation_twr_status();
      if(  $twr_status==3){
         $allow=TRUE;
      }

    return  $allow;
}
/**
* @description=>check is frount user is allow to chat with actoruser.
* @param  =>
* @return =>
*/

public function IsAllowTagging(){
     return TRUE;
}


/*
* @description=>check is frount user is allow to chat with actoruser.
* @param  =>
* @return =>
*/
public function IsAllowViewList(){
 $ret =array('friend'=>FALSE,'following'=>FALSE,'favrateStore'=>FALSE,
 'spread_comment_write'=>0,'spread_comment_read'=>0);

 $twr_status =  $this->relation_twr_status();
$frontuser_EntityRow= $this->frontuser_EntityRow;
 $privacy_setting =$frontuser_EntityRow['private_data']['privacy_setting'];
 $ip5 =GetPropertyInArray('ip5',$privacy_setting);//[0,1,2,5] //

  if( $twr_status==2){
          if(  $ip5==0){  $ret =array('friend'=>TRUE,'following'=>TRUE,'favrateStore'=>TRUE); }
       else if(  $ip5==1){  $ret =array('friend'=>FALSE,'following'=>FALSE,'favrateStore'=>FALSE); }
       else if(  $ip5==2){  $ret =array('friend'=>FALSE,'following'=>FALSE,'favrateStore'=>FALSE); }
  }

  if( $twr_status==3){
         if($ip5==0 || $ip5==1||$ip5==2){   $ret =array('friend'=>TRUE,'following'=>TRUE,'favrateStore'=>TRUE); }

  }

  if($ip5==2){
      if($this->IsFriend_oF_Friend()){ $ret =array('friend'=>TRUE,'following'=>TRUE,'favrateStore'=>TRUE); }
  }


   if( $twr_status==0){  $ret =array('friend'=>FALSE,'following'=>FALSE,'favrateStore'=>FALSE); }
   if( $ip5==5){  $ret =array('friend'=>FALSE,'following'=>FALSE,'favrateStore'=>FALSE); }
   if( $twr_status==1){  $ret =array('friend'=>TRUE,'following'=>TRUE,'favrateStore'=>TRUE); }


    return $ret ;
}
/*
* @description=>
* @param  =>
* @return =>
*/
public function IsAllowSpreadOpration(){
     $ret =array('spread_comment_write'=>0,'spread_comment_read'=>0);
      $twr_status =  $this->relation_twr_status();
$frontuser_EntityRow= $this->frontuser_EntityRow;



 $privacy_setting = GetPropertyInArray('privacy_setting',$frontuser_EntityRow['private_data']);
 if(is_array( $privacy_setting)){
 $ip8 =GetPropertyInArray('ip8',$privacy_setting);//[0,1,2,5] // r
 $ip9 =GetPropertyInArray('ip9',$privacy_setting);//[0,1,2,5] //w

   if( $twr_status==2){
          if(  $ip8==0){  $ret['spread_comment_read']=1;  }
       else if(  $ip8==1){ $ret['spread_comment_read']=0;   }
       else if(  $ip8==2){  $ret['spread_comment_read']=0;  }

           if(  $ip9==0){  $ret['spread_comment_write']=1;  }
       else if(  $ip9==1){ $ret['spread_comment_write']=0;   }
       else if(  $ip9==2){  $ret['spread_comment_write']=0;  }
  }
    if( $twr_status==3){
         if($ip8==0 || $ip8==1||$ip8==2){   $ret['spread_comment_read']=1; }
         if($ip9==0 || $ip9==1||$ip9==2){   $ret['spread_comment_write']=1; }
  }

    if($ip8==2||$ip9==2){
      if($this->IsFriend_oF_Friend()){
         if($ip8==2){  $ret['spread_comment_read']=1;}
         if($ip9==2){  $ret['spread_comment_write']=1;}
       }
     }

   if( $twr_status==0){  $ret['spread_comment_read']=0; $ret['spread_comment_write']=0; }
     if($ip8==5){  $ret['spread_comment_read']=0;}
     if($ip9==5){  $ret['spread_comment_write']=0;}
   if( $twr_status==1){  $ret['spread_comment_read']=1; $ret['spread_comment_write']=1;  }
   }
 return  $ret;
}
/*
* @description=>check is frount user is allow to chat with actoruser.
* @param  => $this-> IsFriend_oF_Friend();
* @return =>
*/
public function  IsFriend_oF_Friend(){
    return  $GLOBALS['Var_UtilityCheck']->IsFriend_oF_Friend( $this->actoruser,$this->frontuser);
}


/**
* @description=>When actor user block someone we need to remove  blocked user following
* @call  =>$this->DeleteBlockedUserFollowing();
* @param  =>
* @return =>
*/

private function DeleteBlockedUserFollowing(){


      $GLOBALS['Var_DBMysqli']->delete(DB_NAME,'relation_one_way',array('wr_type','from_id','to_id'),array(1,$this->frontuser,$this->actoruser));
}

 }



 /*
 // sql query for relation

 $freindsSql='SELECT   DISTINCT entity_id
 FROM
    ( (SELECT twrFa.to_id as entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFa
                           WHERE twrFa.current_status=3
                           AND (twrFa.from_id='.$spreadOwner.'))
           UNION ALL
     (SELECT twrFb.from_id as entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFb
                           WHERE twrFb.current_status=3
                           AND (twrFb.to_id='.$spreadOwner.')) ) as entity_id
              ';
//-- relation sql
 $TwrRelationSql='
 SELECT  twr.current_status as TWR
 FROM '.DB_NAME.'.relation_two_way twr
 WHERE
 ((twr.from_id='.$spreadOwner.' && twr.to_id='.$spreadViwer.')||(twr.from_id='.$spreadViwer.' && twr.to_id='.$spreadOwner.'))
 ';
$FreindOfFreindRelationSql='SELECT COUNT(twrFOF.two_wr_id) as FriendOfFriend
                           FROM '.DB_NAME.'.relation_two_way twrFOF
                           WHERE twrFOF.current_status=3
                           AND   ((twrFOF.from_id IN ('.$freindsSql.') && twrFOF.to_id='.$spreadViwer.')||(twrFOF.from_id='.$spreadViwer.' && twrFOF.to_id IN ('.$freindsSql.')))';

$relationSql='SELECT
(IF(TWR = 3 ,1,0)) as Friend,
(IF(FriendOfFriend >0 ,1,0)) as FriendOfFriend,
(IF(TWR = 0 ,1,0)) as Block,
(IF(TWR = 2 ,1,0)) as Public,
(IF('.$spreadOwner.'='.$spreadViwer.',1,0)) as accountOwner
FROM ('. $TwrRelationSql.') as TWR,
('.$FreindOfFreindRelationSql.') as FriendOfFriend


';
//-----------------
$relationSql='SELECT
IF(Block = 1,("NULL"),(IF(Public = 1 ,("0"),(IF(FriendOfFriend = 1 ,("4","0"),(IF(Friend = 1,("1","4","0"),(IF(accountOwner =1, ("1","4","0","5"),("NULL")
)
                                                                                                            )
                                                                                  )
                                                                               )
                                              )
                                           )
                       )
                     )
  ) as Privacy_id

  FROM ('.$relationSql0.') as relation


';
 */
?>

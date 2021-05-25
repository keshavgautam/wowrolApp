<?php
    

class Google_Login {
    
/*
@call $GLOBALS['Var_Google'] ->check()

*/
public function check($args=array()){
  

    $arr=$GLOBALS['Var_BundlePrototype']->DefaultValue('ajax_output');

    if(!$GLOBALS['Var_LoginStatus']){
        
            $curl = new Curl\Curl();
  if(SSL_USE==FALSE){
       $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);    
       }
$curlresponse = $curl->post('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='.$args['id_token'], array());
$curlresponse=json_decode(json_encode($curlresponse),TRUE); 
/*
{"response":{"azp":"554278223037-utpchdr9bghsev87q0jcdvkmkdo8fm70.apps.googleusercontent.com","aud":"554278223037-utpchdr9bghsev87q0jcdvkmkdo8fm70.apps.googleusercontent.com","sub":"104141801246056417886","email":"keshav.gautam05@gmail.com","email_verified":"true","at_hash":"1E_Kv5WuXkocn7wsaDAp-A","iss":"accounts.google.com","iat":"1490143278","exp":"1490146878","name":"keshav gautam","picture":"https:\/\/lh6.googleusercontent.com\/-Oj2SafjQAh4\/AAAAAAAAAAI\/AAAAAAAAAAA\/AAomvV0ZRID2aQNBIOoSiZlL65KHYgZnEw\/s96-c\/photo.jpg","given_name":"keshav","family_name":"gautam","locale":"en","alg":"RS256","kid":"3f57ef4ec76291bb6c082ed2a7978de14fd9412f"}}
*/
 $login_identity_HTML_entities=GetPropertyInArray('email',$curlresponse,'','HTML_entities');
 

  $email_verified=GetPropertyInArray('email_verified',$curlresponse,'','');

if($email_verified==TRUE){
   

     //check for is it first time ?

       $is_unique= is_unique('account_login_identity','login_identity',$login_identity_HTML_entities);


        if($is_unique){
            $this->SignUp(array('login_identity'=>$login_identity_HTML_entities));
         
         $arr = $this->Login(array('login_identity'=>$login_identity_HTML_entities));

        }else{
            
         $arr = $this->Login(array('login_identity'=>$login_identity_HTML_entities));


        }








}else{
   $arr['response']= $curlresponse; 
}   

 

    




 }
  




 



    return $arr;


}

/*
@call $GLOBALS['Var_Google'] ->SignUp()

*/

public function SignUp($args=array()){
     $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
   $args['password']=generate_random_string( 4,true ,false ,false, false, false );
   $login_identity_HTML_entities=$args['login_identity'];
      //--inserting account table
  $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 
   $hash_password=md5($args['password']); 
   $ajax_password=$ActorEntityData['visit_data']['wd'];

      //--setting account options
 $activation_key=generate_random_string( 6,true ,false ,false, false, false );
  $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');

   $private_data=True_array_merge($defaultPrivate,array(
   'activation_key' => $activation_key,
	'visitId' =>$ActorEntityData['visit_data']['wd'],
	'verification_attempt' =>5 
    ));
    $accounts_DATA=array(
    'entity_id'=>  0
    );
   
     $account_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'accounts',array_keys($accounts_DATA) , array_values($accounts_DATA) );

        $account_login_identity_data=array(
'login_identity'=>$login_identity_HTML_entities,
"identity_type"=>'email',
"authentication_provider"=>'google',
'verified'=>1,
'account_id'=>$account_id,
"ip_address"=>$ip,
"registration_time"=>$date,
'private_data'=>Makejson($private_data)

    );


    $login_identity_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'account_login_identity',array_keys($account_login_identity_data) , array_values($account_login_identity_data) );


     //--inserting login table
    $actual_input_length=strlen($args['login_identity'].$args['password']);


   $login_DATA=array(
    'account_id'=>  $account_id,
    'password'=> $hash_password,
    'actual_input_length'=> $actual_input_length
    );

     $login_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'login',array_keys($login_DATA) , array_values($login_DATA) );

     // updateing login id in accounts


$update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('login_id'),array($login_id),array('account_id'),array($account_id));
  


    
    



     //-->>
     //--sending account activation code
    $GLOBALS['Var_ExternalNotification']-> SendPassword(array('identity_type'=>'email',
 'login_identity'=>$args['login_identity'],
 'password'=>$args['password'],
 'Authenticater'=>'google'
 ));

     //-->>


}

/*
@call $GLOBALS['Var_Google'] ->SignUp()

*/
public function Login($args=array()){
     // check post 2 => login_identity -check validatation
       $identity_type='email';
       //--converting emial in htmlentities
       $login_identity_HTML_entities=$args['login_identity'];
          //checking is $identity_name available or not
  $is_unique= is_unique('account_login_identity','login_identity',$login_identity_HTML_entities);

     if($is_unique==FALSE){
       //--bussiness code
       $sql='SELECT DISTINCT *
FROM  '.DB_NAME.'.account_login_identity a ,'.DB_NAME.'.accounts b,'.DB_NAME.'.login c
WHERE a.login_identity ="'.$login_identity_HTML_entities.'" 
AND a.account_id=b.account_id
AND b.login_id=c.login_id
LIMIT 1
';

  //-- result query
  $LoginData=$GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');
 
$Login_row=   $GLOBALS['Var_DBMysqli']->query($sql);
if(count($Login_row)>0){  $LoginData=$Login_row[0];   }


        //-->>result query
 

   $Session_DATA =$GLOBALS['Var_Enter']->CreateLoginSession($LoginData);



 $arr['response']=array('wb'=>$LoginData['account_id'],
                        'wc'=> $Session_DATA['password'],
                        'wd'=>  $Session_DATA['session_id']
                  );

   $arr['state']=200;

     //-->>result query
   }else{
       $arr['mistake']['message'][]='<li>Email or phone or password are not valid.</li>'; 
      $arr['response']='check post 3';  
      
   }

   return $arr;
}



 
}






 $GLOBALS['Var_Google_Login'] =new Google_Login();


?>
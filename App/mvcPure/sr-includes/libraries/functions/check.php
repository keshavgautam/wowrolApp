<?php

/**
* @description=>check_response.
* @param  => 
* @return => 
*/
function check_response($arg){
    
     $dir = ROOT.'/';
     $txt=date("F j, Y, g:i a").' '.json_encode($arg, JSON_UNESCAPED_UNICODE)."\r\n";
       file_put_contents($dir."response.txt",$txt, FILE_APPEND);
    
}
function check_responseHTML($args){
    
     $dir = ROOT.'/';
     $txt=date("F j, Y, g:i a").' '.json_encode($args, JSON_UNESCAPED_UNICODE)."\r\n";
       file_put_contents($dir."response.txt",$txt);
    
}
/**
* @description=>Is is_email.
* @param  => 
* @return => 
*/
function is_email( $email ){
    $r=TRUE;
    	$email=trim($email );
    // Test for the minimum length the email can be
    $email_lenght=strlen( $email );
   
    if (  $email_lenght < 3  ) {
		
		return  FALSE;
	}
     // Test for an @ character after the first position
   
    $at_postion=strpos( $email, '@', 1 );
    if ( $at_postion === false ) {
		
		return  FALSE;
	}

    // Split out the local and domain parts
    list( $local, $domain ) = explode( '@', $email, 2 );
  
// LOCAL PART
	// Test for invalid characters
	if ( !preg_match( '/^[a-zA-Z0-9!#$%&\*+\/=?^_{|}~\.-]+$/', $local ) ) {
	
			return  FALSE;
	} 
    
    // DOMAIN PART
	// Test for sequences of periods
	if ( preg_match( '/\.{2,}/', $domain ) ) {
		
		return  FALSE;
	}
    // Test for leading and trailing periods and whitespace
	$domain=trim( $domain );

    // Split the domain into subs
	$subs = explode( '.', $domain );
    // Assume the domain will have at least two subs
	if ( 2 > count($subs) ) {
	 return  FALSE;
	}
	  // Loop through each sub
	foreach ( $subs as $sub ) {
		// Test for leading and trailing hyphens and whitespace
		if ( trim( $sub, " \t\n\r\0\x0B-" ) !== $sub ) {
			 return  FALSE;
		}

		// Test for invalid characters
		if ( !preg_match('/^[a-z0-9-]+$/i', $sub ) ) {
			 return  FALSE;
		}
	}
    // Congratulations your email made it!
    return  $r;
}
/**
* @description=>Is is_phonenumber.
* @param  => 
* @return => 
*/
function is_phone($phonenumber){
     $r=TRUE;
     	$phonenumber=trim($phonenumber );
        // Test for the minimum length the phonenumber can be
          if ( strlen( $phonenumber ) < 10  ) {
		
		return  FALSE;
	        }
         
         // Test for invalid characters
     if ( !preg_match( '/(7|8|9)\d{9}/', $phonenumber ) ) {
		
	return  FALSE;
	}

    return $r;
 }
   /**
 * Verifies that an inputtext is email or phone number valid.
 * @param string $input inputtext to verify.
 * @return int '0'-invald input,'1'-email address,'2'-phone number  .
 */ 
 function email_or_phone($input){
     
     // check for email address
     $is_email=is_email( $input );
     // check for phone number
     $is_phone=is_phone($input);

     if( $is_email==TRUE){
         
         return 'email';
     }
      if( $is_phone==TRUE){
         
        return 'phone';
     }
      return '';
 }
/**
* @description=>Is material page.
* @param  => 
* @return => 
*/
function IsMaterial(){
    $IsMaterial=TRUE;
   
    $ismaterial=stripos($_SERVER['SCRIPT_FILENAME'], "/material/");
    
if(($ismaterial===FALSE)){
      $IsMaterial=FALSE;
}
if((SERVER_MODE!='DEVELOPMENT')){
      //$IsMaterial=FALSE;
}
    return $IsMaterial;

}









?>
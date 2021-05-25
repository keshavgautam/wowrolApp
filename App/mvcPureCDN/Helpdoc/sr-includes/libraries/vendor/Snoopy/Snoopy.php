<?php
    

class Snoopy
{

  /**
     * Get a web file (HTML, XHTML, XML, image, etc.) from a URL.  Return an
     * array containing the HTTP server response header fields and content.


@ retrun  Array ( [url] => https://www.flipkart.com/ [content_type] => text/html [http_code] => 301 [header_size] => 169 [request_size] => 164 [filetime] => -1 [ssl_verify_result] => 0 [redirect_count] => 1 [total_time] => 1.981 [namelookup_time] => 0 [connect_time] => 0.312 [pretransfer_time] => 0 [size_upload] => 0 [size_download] => 0 [speed_download] => 0 [speed_upload] => 0 [download_content_length] => 0 [upload_content_length] => 0 [starttransfer_time] => 0 [redirect_time] => 1.201 [certinfo] => Array ( ) [redirect_url] => [errno] => 60 [errmsg] => SSL certificate problem: self signed certificate in certificate chain [content] => )
     */
    function get_web_page( $url ) {
        $user_agent='Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

        $options = array(

            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        $err     = curl_errno( $ch );
        $errmsg  = curl_error( $ch );
        $header  = curl_getinfo( $ch );
        curl_close( $ch );

        $header['errno']   = $err;
        $header['errmsg']  = $errmsg;
        $header['content'] = $content;
        return $header;
    }
/**

get_meta_tags

(PHP 4, PHP 5, PHP 7)
get_meta_tags — Extracts all meta tag content attributes from a file and returns an array
*/

    function  get_tags($url){
$ret=array('description'=>'','keywords'=>'','title'=>'','url'=>'','image'=>'');
       // Assuming the above tags are at www.example.com
$tags = get_meta_tags($url); 

if($tags){
  if(isset($tags['description'])){
    $ret['description'] = $tags['description'];
  }  
   if(isset($tags['keywords'])){
    $ret['keywords'] = $tags['keywords'];
  }  
   if(isset($tags['title'])){
    $ret['title'] = $tags['title'];
  }  
 if(isset($tags['url'])){
    $ret['url'] = $tags['url'];
  }  
   if(isset($tags['image'])){
    $ret['image'] = $tags['image'];
  }  




}


return $ret;
    }
/*======================================================================*\
	Function:	fetch
	Purpose:	fetch the contents of a web page
				(and possibly other protocols in the
				future like ftp, nntp, gopher, etc.)
	Input:		$URI	the location of the page to fetch
	Output:		$this->results	the output text from the fetch
\*======================================================================*/

	public	function fetch($URI,$args=array()){
  $result=  array( 'text'=>'','html'=>'','imags'=> array() ,'title'=>$URI,'errmsg'=>'','errno'=>0,'size_download'=>'') ; 
    $URI = strtolower($URI);

        
    
  $web_page=  $this->get_web_page( $URI );
    $html=  $web_page['content'];


    if($html!=''){
    $ogTags=$this->ogTags($html);


   $result=  array( 
    'imags'=>($ogTags['image']!='')? array($ogTags['image']):$this->getImages($html,$URI),
  
   'title'=>($ogTags['title']!='')?$ogTags['title']:$this->getTitle($html),
   'text'=>($ogTags['description']!='')?$ogTags['description']:$this->_striptext($html),
   'html'=>$html,//htmlentities($html)
    );


    }else{
    $html='';  
    }

     $result['errmsg']=$web_page['errmsg'];
     $result['size_download']=$web_page['size_download'];
     $result['errno']=$web_page['errno'];



return  $result;
	}


/*======================================================================*\
	Function:	_striptext
	Purpose:	strip the text from an html document
	Input:		$document	document to strip.
	Output:		$text		the resulting text
\*======================================================================*/

public	function _striptext($document){
		
		// I didn't use preg eval (//e) since that is only available in PHP 4.0.
		// so, list your entities one by one here. I included some of the
		// more common ones.
								
		$search = array("'<script[^>]*?>.*?</script>'si",	// strip out javascript
                        "'<style[^>]*?>.*?</style>'si",
						"'<[\/\!]*?[^<>]*?>'si",			// strip out html tags
						"'([\r\n])[\s]+'",					// strip out white space
						"'&(quot|#34|#034|#x22);'i",		// replace html entities
						"'&(amp|#38|#038|#x26);'i",			// added hexadecimal values
						"'&(lt|#60|#060|#x3c);'i",
						"'&(gt|#62|#062|#x3e);'i",
						"'&(nbsp|#160|#xa0);'i",
						"'&(iexcl|#161);'i",
						"'&(cent|#162);'i",
						"'&(pound|#163);'i",
						"'&(copy|#169);'i",
						"'&(reg|#174);'i",
						"'&(deg|#176);'i",
						"'&(#39|#039|#x27);'",
						"'&(euro|#8364);'i",				// europe
						"'&a(uml|UML);'",					// german
						"'&o(uml|UML);'",
						"'&u(uml|UML);'",
						"'&A(uml|UML);'",
						"'&O(uml|UML);'",
						"'&U(uml|UML);'",
						"'&szlig;'i",
						);
		$replace = array(	"",
							"",
                            "",
							"\\1",
							"\"",
							"&",
							"<",
							">",
							" ",
							chr(161),
							chr(162),
							chr(163),
							chr(169),
							chr(174),
							chr(176),
							chr(39),
							chr(128),
							"ä",
							"ö",
							"ü",
							"Ä",
							"Ö",
							"Ü",
							"ß",
						);
/*	$search = array("'<script[^>]*?>.*?</script>'si",	// strip out javascript
                    "'<style[^>]*?>.*?</style>'si",
					"'([\r\n])[\s]+'",					// strip out white space
						);
		$replace = array(	"",
        "",
        ""
						);		*/
		$text = preg_replace($search,$replace,$document);
		$text = preg_replace($search,$replace,$document);
		$text=  preg_replace('/\<\!\-\-/i','', $text); 
        $text=  preg_replace('/\-\-\>/i','', $text); 
        
        if(strlen($text)>250){
            $text=substr($text,0,250);
        }						
		return $text;
	}

 /*
 */
public	function getImages($html,$URI){
    /* preg_match_all match the regexp in all the $html string and output everything as 
an array in $result. "i" option is used to make it case insensitive */
$ret=array();

preg_match_all('/<img[^>]+>/i',$html, $img_tag_all); 


if(count($img_tag_all[0])){
  $img = array();
  foreach( $img_tag_all as $img_tag_leaf){
       
foreach( $img_tag_leaf as $img_tag){

    preg_match_all('/(alt|title|src)=("[^"]*")/i',$img_tag, $images);
    if(is_array($images)){

        foreach( $images as $one_img){
          
                       foreach($one_img as $attr){
                          if($attr!=''){
                     preg_match('/src=("[^"]*")/i',$attr, $Is_Src);
                     if(count($Is_Src)==2){
                        /*  var_dump($attr);   
                     var_dump( $Is_Src);
                    var_dump('====<br>');   */
                   preg_replace('/"/i','', $Is_Src[1]);    
                   if(strlen($Is_Src[1])>5){
                         $img[]= $Is_Src[1]; 
                   }
                     }
                        
                          } 
                       }
         if(isset($one_img['src'])){
      $img[] =$one_img['src']; 
    }     
        }
    }
 
  
    
}
}

$ret= $img;
}



//---
if(count($ret)>0){
    foreach($ret as $q=>$v){
      $ret[$q]=  preg_replace('/"/i','', $ret[$q]); 
    preg_match('/(^https?)/i',  $ret[$q], $matches_http);
        preg_match('/^\//i',  $ret[$q], $matches_slash);
     
    if(count($matches_http)==0||count($matches_slash)>0){
        if(count($matches_http)==0){
             $ret[$q]='http://'.$URI.$ret[$q];   
        }else{
               $ret[$q]=$URI.$ret[$q]; 
        }
 
    } 

    }
}


return $ret;


}


/*

*/
public function getTitle($html){
  $ret='';
  preg_match('/\<title\>[^>]+<\/title\>/i',$html, $title_all); 
  
  if(is_array($title_all)){
      if(isset($title_all[0])){
  if(is_string($title_all[0])){
     
 $ret=    preg_replace('/(\<title\>)|(<\/title\>)/i','',$title_all[0]);  
      
  }
   }
      
  }
 
  
  
  return    $ret;
}

/*

*/
public function ogTags($html){
    $ret=array('description'=>'','keywords'=>'','title'=>'','url'=>'','image'=>''); 
    $index=array('description','keywords','title','url','image','og:description','og:keywords','og:title','og:url','og:image');
    $index_pic=array('description','keywords','title','url','image','description','keywords','title','url','image');
    $mid_tags=array();$last_tags=array();

preg_match_all('/<meta[^>]+>/i',$html, $meta_tag_all); 
if(isset($meta_tag_all[0])){
if(is_array($meta_tag_all[0])){

foreach($meta_tag_all[0] as $meta_tag_leaf){
    $item=array('name'=>'','property'=>'','content'=>'');

       preg_match('/name=("[^"]*")/i',$meta_tag_leaf, $Is_name);
       preg_match('/property=("[^"]*")/i',$meta_tag_leaf, $Is_property);
       preg_match('/content=("[^"]*")/i',$meta_tag_leaf, $Is_content);
        if(count($Is_name)==2){
          
                $Is_name[1]=   preg_replace('/"/i','', $Is_name[1]); 
              //     str_replace('"','',$Is_name[1]);      
                   if(strlen($Is_name[1])>5){
                          $item['name']= $Is_name[1]; 
                   }
                     }
        if(count($Is_property)==2){
           
              $Is_property[1]=   preg_replace('/\"/i','', $Is_property[1]);
                //   str_replace('"','',$Is_property[1]);    
                   if(strlen($Is_property[1])>2){
                          $item['property']= $Is_property[1]; 
                   }
                     }
        if(count($Is_content)==2){
           
                 $Is_content[1]=   preg_replace('/\"/i','', $Is_content[1]);  
                  // str_replace('"','',$Is_content[1]);
                   if(strlen($Is_content[1])>2){
                          $item['content']= $Is_content[1]; 
                   }
                     }


$mid_tags[]=$item;
}

}
}



if(count($mid_tags)>0){
 foreach($mid_tags as $m_tag){
    $pos0 = array_search( $m_tag['name'],$index);   $pos1 = array_search( $m_tag['property'],$index); 
//   var_dump($pos0);    var_dump($pos1);  var_dump($m_tag['name']);var_dump($m_tag['property']);
    if(($pos0!=FALSE)||($pos1!=FALSE)){
        if($pos0!=FALSE){
        $last_tags[$index_pic[$pos0]]=$m_tag['content'];
            }
            if($pos1!=FALSE){
        $last_tags[$index_pic[$pos1]]=$m_tag['content'];
            }
    }
 }   
}

if(count($last_tags)>0){
    foreach($ret as $q => $v){
        if(isset($last_tags[$q])){
          $ret[$q]=  $last_tags[$q];
        }
    }
}

return $ret;
}

}






$GLOBALS['Var_Snoopy']= new Snoopy();

















?>
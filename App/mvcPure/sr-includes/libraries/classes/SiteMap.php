<?php
    






class Sitemap {
    

  // function defination to convert array to xml
private function array_to_xml( $data, &$xml_data ) {
    foreach( $data as $key => $value ) {
      
        if( is_array($value) ) {
       
                if( is_numeric($key) ){
              $subnode = $xml_data;
              }else{
                      $subnode = $xml_data->addChild($key);
                
              }

                $this-> array_to_xml($value, $subnode);
       
        } else {
          
            $xml_data->addChild("$key",htmlspecialchars("$value")); 
        }
     }
}

/*

*/
public  function GetSiteMap($isHTML=TRUE){
$map=array();
$TIME=date("Y-m-d",TIME_assetedit);

$what=GET_QueryVars('what','url_chars');
$query=GET_QueryVars('q','url_chars');
if($query==''){$query='aaaa';}
$URL_To=($isHTML)?'directory':'directoryxml';
if(strlen($query)<5){
    

switch ($what){
  case 'store':
 
$result=  $GLOBALS['Var_DBMysqli']->query(' SELECT a.content_slug as slug FROM '.DB_NAME.'.page_slug a  
  WHERE  a.object_type ="store" 
  AND a.content_slug LIKE "%'.$query.'%"  ');

  $query++;

  if(count($result)>0){
    
    
    foreach( $result as $value){
       $map[]=array('url'=>array('loc'=>SITEURL.$value['slug'],'lastmod'=>TIME_assetedit,'changefreq'=>'monthly','priority'=>'0.1'));     
    }
      
  }


if( $query!='zzzz'){
$map[]=array('url'=>array('loc'=>SITEURL,'lastmod'=>$TIME,'changefreq'=>'monthly','priority'=>'0.8'));
$map[]=array('url'=>array('loc'=>SITEURL.$URL_To."?what=store&q=".$query,'lastmod'=>$TIME,'changefreq'=>'monthly','priority'=>'0.8'));
  
 
}

  break;// store
  default:
$map[]=array('url'=>array('loc'=>SITEURL,'lastmod'=>$TIME,'changefreq'=>'monthly','priority'=>'0.8'));
$map[]=array('url'=>array('loc'=>SITEURL.$URL_To."?what=store&q=".$query,'lastmod'=>$TIME,'changefreq'=>'monthly','priority'=>'0.8'));
$map[]=array('url'=>array('loc'=>SITEURL.$URL_To."?what=store&q=".$query,'lastmod'=>$TIME,'changefreq'=>'monthly','priority'=>'0.8'));

}
}

return $map;

}


/*

*/
public function CreateSiteMap(){
  

// initializing or creating array
$data =  $this->GetSiteMap();

// creating object of SimpleXMLElement
$xml_data = new SimpleXMLElement('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ></urlset>');

// function call to convert array to xml
$this->array_to_xml($data,$xml_data);

//saving generated xml file; 
$result = $xml_data->asXML(DOCUMENT_ROOT.'/sitemap.xml');



}

/*
@call    $GLOBALS['Var_Sitemap']->convert_array_to_xml($data, $xml_root);
@des 
@return XML DATA
*/

public function  convert_array_to_xml($data, $xml_root){
    
    $xml_data = new SimpleXMLElement('<?xml version="1.0"?><'.$xml_root.' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ></'.$xml_root.'>');

// function call to convert array to xml
$this->array_to_xml($data,$xml_data);

return  $xml_data;

}


}




  $GLOBALS['Var_Sitemap'] =new Sitemap();
$GLOBALS['Var_Sitemap']->CreateSiteMap();

?>
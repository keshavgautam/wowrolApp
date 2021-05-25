<?php     
     
 $SiteMap=$AppData['AppView'];    
     
     
 $xml=  $GLOBALS['Var_Sitemap']->convert_array_to_xml($SiteMap, 'urlset');  
     
     
     
     
     
  header('content-type: application/xml');   
  echo  $xml->asXML();   
     
     
     
        ?>
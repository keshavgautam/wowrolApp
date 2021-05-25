  <?php  
  switch ($AppData['AppId']){
  case 'orderdetails':
  $tab= GET_QueryVars('action','url_chars');
  switch($tab){

 case 'pdfOrderDetails':
   require(TEMPLATE. '/staticHtml/page/orderdetails.php' );
  
  break;
    default:
   require(TEMPLATE. '/staticHtml/page/main.php' );   
  }

  
  break;
  case 'ordertracking':
 require(TEMPLATE. '/staticHtml/page/main.php' ); 
  
  break; 

   case 'directory':
 require(TEMPLATE. '/staticHtml/page/main.php' ); 
  
  break;
  
    
       
  }
  
  
   ?>
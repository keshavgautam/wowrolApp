<!DOCTYPE html>
<html lang="en">
   <?php   require(TEMPLATE. '/head.php' );?>
<body>
    <div id="page" class="block po-re " >
      <?php  
  switch ($AppData['AppId']){
  case 'orderdetails':
   require(TEMPLATE. '/staticHtml/page/orderdetails.php' );
  
  break;
  case 'ordertracking':
 require(TEMPLATE. '/staticHtml/page/ordertracking.php' ); 
  
  break;  
   case 'directory':
 require(TEMPLATE. '/staticHtml/page/directory.php' ); 
  
  break;  

      
  }
  
  
   ?>
        </div> 
   <?php  echo ' 
 <script>
  
   wowrol.A.page='.Makejson($AppData).';
   wowrol.C.loader.init(wowrol.A.page);
  console.log(wowrol);
    </script>
    <div id="newdom" style="display: none;"></div>
'; ?>  
</body>
</html>
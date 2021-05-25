<?php

$AppData=$GLOBALS['Var_AppProtoType']->appData();
$AppData['IsPage']=TRUE;
if(!$AppData['IsstaticXML']):
if(!isset($_GET['a'])):
 if(!$AppData['IsstaticHtml']):
 if(!isset($_GET['g'])):?>
<!DOCTYPE html>
<html lang="en"> <?php   require(TEMPLATE. '/head.php' );?>
<body> 
 <?php echo $AppData['AppSEOData']['body'];  unset($AppData['AppSEOData']);
 
 if(isset($AppData['AppView']['SEOData'])){
      unset($AppData['AppView']['SEOData']);
 }
 
   ?>

<div id="page" class="block po-re "   ></div><div id="newdom" style="display: none;"></div> 
   <?php  echo '  
 <script>wowrol.A.page='.Makejson($AppData).'; wowrol.C.loader.init();  wowrol.U.console(wowrol);</script>

'; ?>
 <?php if(SERVER_MODE=="PRODUCTION") :?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-91087868-1', 'auto');
  ga('send', 'pageview');

</script>
    <?php endif;?>

<div id="fb-root"></div>

<?php echo '<a class="hide" href="'.SITEURL.'directory" ></a>'; ?>
</body>
</html>
<?php else:?>
<?php  unset($AppData['AppMetaData']); ?>
<!DOCTYPE html><html lang="en"> <head> <meta charset="utf-8"/> <title></title> </head> <body> <script>var data=<?php echo OutPutJSONencodeAjax(array('state' =>200,'response' => $AppData,'mistake' =>array('heading'=>'','message'=>''))); ?> ;</script> </body></html>
<?php endif;//isset g ?>
<?php else: //else IsstaticHtml ?>
<?php require(TEMPLATE. '/staticHtml.php' ); ?>
<?php endif;//IsstaticHtml  ?>
<?php else: //else a 
 unset($AppData['AppMetaData']);  unset($AppData['AppSEOData']); unset($AppData['AppView']['SEOData']); ?>
<?php echo OutPutJSONencodeAjax(array('state' =>200,'response' => $AppData,'mistake' =>array('heading'=>'','message'=>''))); ?> ;
<?php endif;//isset a ?>
<?php else: //else IsstaticXML ?>
<?php require(TEMPLATE. '/staticXML.php' ); ?>
<?php endif;//isset IsstaticXML ?>

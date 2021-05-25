
<?php




 if($isUniqueName||$args['pid']!=0){
      //--
   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 


$keyfeature=array($args['keyfeature_0'],$args['keyfeature_1'],$args['keyfeature_2'],$args['keyfeature_3']);
$SearchWord=$args['searchword'];
$VarientName=array($args['varient_1'],$args['varient_2'],$args['varient_3']);

$product_public_data=Makejson(SafeArrayEncode(array('keyfeature'=>$keyfeature)));
$product_private_data=Makejson(array('has_varient'=>$args['has_varient'],
                                     'varient_name'=>$VarientName));;

$search_data=create_search_data(array($args['name'],$keyfeature,$SearchWord));

   $productargs=array(
    'product_id' => $args['pid'],
	'product_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
    'brand_id' => 0,
    'description' => $args['description'],
    'has_varient' => $args['has_varient'],
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'search_data' => '"'.implode('","',$search_data).'"',
    'category' =>'"'.implode('","',$args['category']).'"',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );

   
   $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);


  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$product_id)));



  $arr['state']=200;
 }else{
     
      $arr['mistake']['message'][]='This Product name  is used . Try another.'; 
 }


?>
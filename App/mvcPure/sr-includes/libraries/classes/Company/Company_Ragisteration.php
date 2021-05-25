<?php
    



/**
* @description=>process the given data .
* @param  => 
* @return => 
*/
class Company_Ragisteration{
    


/*


*/

public function addNewCategory($args){
       $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));  
 //- num query
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('company_categories',array('category_name','entity_id','parent_id'),array($args['name'],$args['ActorEntityData']['EntityData']['entity_id'],$args['parent']));

 if($isUniqueName||$args['cid']!=0){
      //--

   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 
   $categoryargs=array(
    'category_id' => $args['cid'],
	'category_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
	'parent_id' => $args['parent'],
    'description' => $args['description'],
    'date_gmt' =>$date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );

   
$category_id= $GLOBALS['Var_Company_Dashboard']->RagisterCategory($categoryargs);


  $arr['response']=$GLOBALS['Var_Company_Dashboard']->ParseCategory($GLOBALS['Var_Company_Dashboard']->RetriveById(array('table'=>'company_categories','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'category_id'=>$category_id)),array('store_EntityData'=>$args['ActorEntityData']));



  $arr['state']=200;
 }else{
     
      $arr['mistake']['message'][]='ajax_27'; 
 }







 return  $arr;
}


/**/


public function AddNewBrand($args){
     $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));  
 //- num query
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('company_brand',array('product_name','entity_id'),array($args['name'],$args['ActorEntityData']['EntityData']['entity_id']));

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
    'brand_id' => $args['pid'],
	'product_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
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

   
   $brand_id	= $GLOBALS['Var_Company_Dashboard']->RagisterBrand($productargs);


  $arr['response']=$GLOBALS['Var_Company_Dashboard']->ParseBrand($GLOBALS['Var_Company_Dashboard']->RetriveById(array('table'=>'company_brand','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'brand_id'=> $brand_id)));



  $arr['state']=200;
 }else{
     
      $arr['mistake']['message'][]='This Product name  is used . Try another.'; 
 }







 return  $arr;
}


/**/

public function BrandInventory($args){
 $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'asdsa','message'=>array()));  

 $private_data=Makejson(array('varient_value'=>array( $args['variant_0'], $args['variant_1'], $args['variant_2']),
  'mainimages'=> $args['mainimages'],
  'webimages'=> $args['webimages'],
  'featureimage'=> $args['featureimage'],
  'Backorders'=>0,
  'isShippable'=> $args['shippable'],
  'Shipping_method'=>$args['shipping_method'],
  'weight'=>$args['weight'],
  'weightunit'=>$args['weightunit'],
  'currency'=>  $args['currency'],
  'unitsystem'=> $args['unitsystem']));

    $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'brand_id' => $args['pid'],
        'brand_varient_id' => $args['vid'],
        'act' => $args['act'],
        'sellingPrice' => $args['sellingPrice'],
        'compairePrice' => $args['compairePrice'],
        'Stock' => $args['Stock'],
        'unique_identity' => $args['unique_identity'],
        'private_data'=>$private_data,
        'ActorEntityData' => $args['ActorEntityData']
     );
  if( $args['act']=="new"|| $args['act']=="edit"){
    $varient_id= $GLOBALS['Var_Company_Dashboard']->RagisterBrandVarient($ragisterArgs);
  
 $arr['response']=$GLOBALS['Var_Company_Dashboard']->ParseBrandVarients($GLOBALS['Var_Company_Dashboard']->RetriveById(array('table'=>'brand_varients','brand_varient_id'=> $varient_id)),array('varient_name'=>$args['varient_name'],'has_varient'=>$args['has_varient']));   
   $arr['state']=200;
  }
    if( $args['act']=="delete"){
  $ragisterArgs['AppId']='company_brand_varient';
  $arr=$GLOBALS['Var_Company_Dashboard']->Deleting( $ragisterArgs);

   
    }








  return  $arr;
}



 /**
* @description=> Ragister edit  productspecification
* @param  => 
* @return => 
*/

public function Brandspecification($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));  
 

     $ragisterArgs= array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'brand_id' => $args['pid'],
        'spf'=> $args['spf'],
        'ActorEntityData' => $args['ActorEntityData']
     );
 
    

  $ret=
$GLOBALS['Var_Company_Dashboard']->RagisterBrandSpecification($ragisterArgs);
  
  if($ret){
        $arr['state']=200;
  }else{
      $arr['mistake']['message'][]='Invalid Specification';
  }


 return  $arr;
}
/*

*/
public function  BrandFilter($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));  

 $FilterAttributes=$GLOBALS['Var_Utility']->GetFilterAttributesId( $args['fiatr']);
  $FilterAttributesId= $FilterAttributes['id'];
     $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'brand_id' => $args['pid'],
        'FilterAttributesId'=> $FilterAttributesId,
        'productRow' => $args['productRow'],
        'ActorEntityData' => $args['ActorEntityData']
     );
 
  $ret=$GLOBALS['Var_Company_Dashboard']->RagisterBrandFilter($ragisterArgs);
  
  if($ret){
        $arr['state']=200;
        $arr['response']=$FilterAttributes['Filters'];
  }else{
      $arr['mistake']['message'][]='Invalid Specification';
  }


 return  $arr;
}





}




$GLOBALS['Var_Company_Ragisteration'] =new Company_Ragisteration();









?>
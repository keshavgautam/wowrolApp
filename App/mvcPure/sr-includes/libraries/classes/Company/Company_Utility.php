<?php
    

/**
* @description=>process the given data .
* @param  => 
* @return => 
*/
class Company_Utility{
    



/**$GLOBALS['Var_Utility']->SQL_CompanyBrandTable();
* @description=>
* @param  => 
* @return => 
* @reference => {a=> '',b=> '',c=> '',d=> '',p=> '',q=> '',}
*/

public function SQL_CompanyBrandTable($args){


 $FilterSql='';  



 //filter 1
 
   //---------

$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.company_brand a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.DB_NAME.'.company_brand a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id= '.$args['entity_id'].'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.brand_id 
  AND  b.object_type ="brand"
  AND c.spread_id=a.spread_id ';

 
  if($args['search_str']!=''){
$skuSQL='SELECT p.product_id as product_id  FROM  '.DB_NAME.'.company_brand_varient p 
WHERE p.product_id = a.product_id
 AND p.unique_identity = "'.$args['search_str'].'" ';

$serachquery=' AND (a.product_name	 LIKE "%'.$args['search_str'].'%"||a.product_name	 LIKE "%'.$args['search_str'].'"||a.search_data	 LIKE "%'.$args['search_str'].'%" ||  a.product_id IN ('.$skuSQL.') )';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 if($FilterSql!=''){
 $numsql.=$FilterSql;
  $selectsql.=$FilterSql; 
 }


$selectsql.=' ORDER BY c.spread_date_gmt	 DESC ';

    return array('numsql'=>$numsql,'selectsql'=>$selectsql);
}








}










$GLOBALS['Var_Company_Utility'] =new Company_Utility();




?>
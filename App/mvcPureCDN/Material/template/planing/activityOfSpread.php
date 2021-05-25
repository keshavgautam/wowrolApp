<?php
   
   $Activity=array();  $object=array();
           
    $Activity[]=array('code'=>100,'des'=>'reaction on spread(wow/agree/sad)');
    $Activity[]=array('code'=>101,'des'=>'commenting on spread'); 
    $Activity[]=array('code'=>102,'des'=>'reviewing on spread'); 
    $Activity[]=array('code'=>103,'des'=>'reaction on [comment|review](wow/agree/sad)'); 
    $Activity[]=array('code'=>104,'des'=>'Tag in spread'); 
    $Activity[]=array('code'=>130,'des'=>'ragistering spread'); 
    $Activity[]=array('code'=>150,'des'=>'view_ Entity Profile _activity [store|buyer|brand]'); 
    $Activity[]=array('code'=>151,'des'=>'view_product_activity'); 
    $Activity[]=array('code'=>152,'des'=>'view_category_activity'); 
    $Activity[]=array('code'=>700,'des'=>'price_update activity'); 
    $Activity[]=array('code'=>701,'des'=>'price_update activity'); 
    $Activity[]=array('code'=>702,'des'=>'product added in cart(Any varient)'); 
    $Activity[]=array('code'=>703,'des'=>'product ordered(Any varient)'); 
    $Activity[]=array('code'=>704,'des'=>'product viewd(Any varient)'); 
    $Activity[]=array('code'=>720,'des'=>'checkIn store of buyer '); 
    $Activity[]=array('code'=>200,'des'=>'Report Entity'); 
    $Activity[]=array('code'=>201,'des'=>'Block Entity'); 
    $Activity[]=array('code'=>202,'des'=>'Report Product copyright infrigment'); 
    $Activity[]=array('code'=>203,'des'=>'Report a fake Product');
    $Activity[]=array('code'=>800,'des'=>'Ragistering order to store fotm buyer [Main activity]');
    $Activity[]=array('code'=>801,'des'=>'OrderStatusUpdateBy store [Main activity]');
    $Activity[]=array('code'=>110,'des'=>'freind ship accepted with some one ');
    $Activity[]=array('code'=>110,'des'=>'start following some one'); 
    $Activity[]=array('code'=>100,'des'=>''); 
    $Activity[]=array('code'=>100,'des'=>''); 
    $Activity[]=array('code'=>100,'des'=>''); 
    $Activity[]=array('code'=>100,'des'=>'');  



     $object[]=array('code'=>0,'des'=>'spread');  
     $object[]=array('code'=>1,'des'=>'comment'); 
     $object[]=array('code'=>2,'des'=>'reaction on spread '); 
     $object[]=array('code'=>3,'des'=>'reaction on spread '); 
     $object[]=array('code'=>4,'des'=>'reaction on spread '); 


?>


<div class="block _bdy bg_0 fg_5 ff_3 _B-gray">
 <div class="block  bg_6"><div class="w12 _bdy al-c">activity Of Spread</div></div>
    <div class="block  bg_7"><div class="w2 _bdy">Code</div><div class="w10 _bdy">description</div></div>
    <?php
foreach($Activity as $value){
    echo ' <div class="block  bg_0 b_gbl "><div class="w2 _bdy">'.$value['code'].'</div><div class="w10 _bdy">'.$value['des'].'</div></div>';

}       


    ?>

</div>


<div class="block _bdy bg_0 fg_5 ff_3 _B-gray">
 <div class="block  bg_6"><div class="w12 _bdy al-c">object Of activity</div></div>
    <div class="block  bg_7"><div class="w2 _bdy">Code</div><div class="w10 _bdy">description</div></div>
    <?php
foreach($object as $value){
    echo ' <div class="block  bg_0 b_gbl "><div class="w2 _bdy">'.$value['code'].'</div><div class="w10 _bdy">'.$value['des'].'</div></div>';

}       


    ?>

</div>
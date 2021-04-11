
<div class="block m0_auto  col12 ">

<div class="block _bdy fw-b">
screen 1
</div>
    <div class="block  m30_0">

 <div class="block">
     <!--heading-->
 <div class=" block b_gbl m_b10"> <div class=" block _bdy al-c tt-u"><h2> Colene </h2></div><div class=" block _bdy al-c Fw-b"><p>Showing About 47 Product(s)</p></div></div>
 

<!--Link to sorting-->
<div class="block td-n fw-b m_b10" role="group" aria-label="..."> 
 <a href="javascript:void(0);" class="w5 block _bdy bg_0" role="button">Sort</a>
         <a href="javascript:void(0);" class="w5 block _bdy bg_0" role="button">Filter</a>
         <div   class="w2 block _bdy bg_0 hide" role="button"></div >
    
    </div>
<!--Link to sorting-->
<!--Grid-->
 
<div class="block G2  m_b10">
  

   <?php
    $limit=5;   
for($i=0;$i<$limit;$i++){
    echo '  <div class="block grid_gap bg_0" >';
 require( MATERIAL_TEMPLATE.'/part/product_card.php' );
    echo '</div>';
}
   ?>

</div>

<div class="block G3  m_b10">
  

   <?php
       
for($i=0;$i<$limit;$i++){
    echo '  <div class="block grid_gap bg_0" >';
 require( MATERIAL_TEMPLATE.'/part/product_card.php' );
    echo '</div>';
}
   ?>

</div>

<div class="block G4  m_b10">
  

   <?php
       
for($i=0;$i<$limit;$i++){
    echo '  <div class="block grid_gap bg_0" >';
 require( MATERIAL_TEMPLATE.'/part/product_card.php' );
    echo '</div>';
}
   ?>

</div>

<div class="block G1 m_b10">
  

   <?php
       
for($i=0;$i<$limit;$i++){
    echo '  <div class="block grid_gap bg_0" >';
 require( MATERIAL_TEMPLATE.'/part/product_card.php' );
    echo '</div>';
}
   ?>

</div>
<!--Grid-->

 </div>



</div>


</div>
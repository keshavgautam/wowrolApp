<div class="block po-re top_fix">
    <?php  require( MATERIAL_TEMPLATE.'/part/welcomeheader.php' );?>
</div>

 <!--Median: Start-->
<div id="median" class="block bg_13">

 <!--MedianContent: Start-->

<div class="content">
     <!--Start-->
<div class="block bs-0 bg_0  m_b10">


<div class="block ">
   <div class="block _bdy">
      <h3 class="m_b5">STEP-1:Varify your '.$identity_name.'</h3>
      <p class="m_b5">Varify your '.$identity_name.' to explore your wowrol account. </p>
      <p class="m_b5">We have sended a 6 digit varification code to your '.$identity_name.' <span class=" fw-b">'.$entity_data['login_identity'].'</span>. </p>
   </div>
   <div class="block _bdy ">
      <form id="varify_code" onsubmit="return false;">
    <div class="block form-piece"> <div class="input-group"> <label class="control-label">Verification Code</label> <input type="password" class="form-mold" name="verification_code" autocomplete="off"  placeholder="######" data-required="true"> <span class="input-group-btn"> <button class="btn btn-success" type="button">Varify</button> </span> </div><div data-help="verification_code"> </div></div>
<div data-help="varify_code"></div>
   </form>
   </div>
     <div class="block _bdy ">
      <span class="m_b5">Get another code if any trouble. </span >
          <button class="btn  right" type="button">Resend</button>
   </div>
   
</div>

</div>



    


    
    
   

<!--End-->
</div>


 <!--MedianContent:Ends-->
 <!--MedianFooter: Start-->
     <?php  require( MATERIAL_TEMPLATE.'/part/footer.php' );?>
 <!--MedianFooter:Ends-->
           </div>
 <!--Median:Ends-->
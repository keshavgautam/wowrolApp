<div class="block po-re top_fix">
    <?php  require( MATERIAL_TEMPLATE.'/part/welcomeheader.php' );?>
</div>

 <!--Median: Start-->
<div id="median" class="block bg_13">

 <!--MedianContent: Start-->

<div class="content">
     <!--Start-->
<div class="block bs-0 bg_0 _bdy m_b10">
<div class="block al-c "><span class=" fw-b">To get started,ragister as buyer user here. </span> </div>
<div class="block al-c "><span  class="fw-b">Sign up <small>Get started for free today</small></span></div>

<div class="block ">

    <form name="signup_form" id="signup_form" onsubmit="return false">
         
                             
                      <div class="block"><p class=" fw-b info_text success">Registration is currently available with Email address only.<br>Do not use phone number.</p></div>         
                         <div class="form-piece">
       <label class="control-label">Email address</label>
        <input type="text" name="email_or_phone" class="form-mold" placeholder="Email address" autocomplete="off" data-required="true">
                             <div data-help="email_or_phone"></div>
      </div>
        <div class="block form-piece">
                 <div class="input-group">
      <label class="control-label">Password</label>
     <input type="password" name="password" class="form-mold" placeholder="Password " data-required="true">
          <span class="input-group-btn">
        <button class="btn " type="button" onclick="wowrol.Controllers.Utility.TogglePassword.bind(this)();">Show</button>
      </span>
    </div>
      <!-- /input-group -->
              <div data-help="login_password">
          
            </div>

  </div>
           <div class="block form-piece">
                 <div class="input-group">
      <label class="control-label">Confirm Password</label>
 <input type="password" name="confirm_password" class="form-mold" placeholder="Confirm Password" data-required="true">  <div data-help="confirm_password"></div>
          <span class="input-group-btn">
        <button class="btn " type="button" onclick="wowrol.Controllers.Utility.TogglePassword.bind(this)();">Show</button>
      </span>
    </div>
      <!-- /input-group -->
              <div data-help="login_password">
          
            </div>

  </div>              
       
                             <div class="form-piece">
            <div data-help="terms">
          <div class="fs11">By clicking sign up, you agree to our <a href="http://localhost:1234/terms" class="signter" target="_blank" tabindex="">Terms </a> and that you have read our <a href="http://localhost:1234/privacy" class="signter" target="_blank" tabindex="">Privacy Policy.</a> </div>
            
            </div>
      </div>
      <div class="block">
        <div data-help="signup_form"></div>
      </div>
      <div class="form-piece clearfix">
     

          <button type="submit"  class="block btn _dbtn  right">Signup</button>
      </div>


          </form>

</div>

</div>



    <div class="block bs-0 bg_0  _bdy m_b10">

          <?php  require( MATERIAL_TEMPLATE.'/part/login_form.php' );?>

</div>


<!--End-->
</div>


 <!--MedianContent:Ends-->
 <!--MedianFooter: Start-->
     <?php  require( MATERIAL_TEMPLATE.'/part/footer.php' );?>
 <!--MedianFooter:Ends-->
           </div>
 <!--Median:Ends-->
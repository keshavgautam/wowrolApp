<div class="block " style="z-index:2;">
     <div class="block m_b10 al-c"><span class=" fw-b">Login <small> to your Wowrol account</small></span> </div> 
    <div class="block">
        
         <form id="login_form" onsubmit="return false">
         <div class="form-piece ">
            <label class="control-label">Email or Phone</label> <input type="text" class="form-mold" name="login_email_or_phone" autocomplete="off" value="" placeholder="Email or Phone " data-required="true">
            <div data-help="login_email_or_phone">
         
            </div>
         </div>
          <div class="block form-piece">
                 <div class="input-group">
      <label class="control-label">Password</label>
      <input type="password" class="form-mold" name="login_password" value="" placeholder="Password " data-required="true">
          <span class="input-group-btn">
        <button class="btn " type="button" onclick="wowrol.Controllers.Utility.TogglePassword.bind(this)();">Show</button>
      </span>
    </div>
      <!-- /input-group -->
              <div data-help="login_password">
          
            </div>

  </div>
         
         <div class="form-piece"> <label class="checkbox-inline _bdy "> <input type="checkbox" name="remember_me" value="1"><span></span> Remember me</label>
              <input type="hidden" name="redirect_to" value="http://localhost:1234/">
              </div>


         <div class="form-piece clearfix">    <span class="left" data-help="login_loading"></span> <button type="submit" id="login_form_btn" class="block btn _dbtn  right">Login</button> </div>
         <div class="form-piece clearfix"><a href="http://localhost:1234/forget_password" class="btn btn-link left">Forget Password ?</a> <a href="http://localhost:1234//enter" class="btn btn-link  right">Sign Up</a></div>
         <div data-help="login_form"></div>
      </form>
         </div>
     </div>

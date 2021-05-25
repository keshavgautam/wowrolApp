<div class="block  _bdy bg_0"><div data-help="addstorecategory"></div>

<div class="form-piece"> <label>Name<i >*</i></label> <input type="text" name="category_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value=""> <div data-help="category_name"><p  class="di-in  fg_4 fs-italic fs11" >Shipping Name</p></div></div>
    <!--weigth range-->
    <div class="form-piece">
    <div class="block  ">
     <a href="javascript:void(0);" class="btn btn-block">  <span class="vl-sp"> Weight Range</span> <span class="vl-sp right"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="18" height="18" fill="#1274c0"> <path d="M 9.21875 2.28125 L 7.78125 3.71875 L 16.0625 12 L 7.78125 20.28125 L 9.21875 21.71875 L 18.21875 12.71875 L 18.90625 12 L 18.21875 11.28125 L 9.21875 2.28125 z"></path></svg></span></a> 
        </div>
        
    <span class="di-in  fg_4 fs-italic fs11">Set shipping charge for different weight range</span>
    
    </div>


    <!--weigth range-->
      <!--locations-->
    <div class="form-piece">
    <div class="block  ">
     <a href="javascript:void(0);" class="btn btn-block">  <span class="vl-sp">Locations </span> <span class="vl-sp right"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="18" height="18" fill="#1274c0"> <path d="M 9.21875 2.28125 L 7.78125 3.71875 L 16.0625 12 L 7.78125 20.28125 L 9.21875 21.71875 L 18.21875 12.71875 L 18.90625 12 L 18.21875 11.28125 L 9.21875 2.28125 z"></path></svg></span></a> 
        </div>
        
    <span class="di-in  fg_4 fs-italic fs11">Chose locations for shipping</span>
    
    </div>

<div class="form-piece"> <label>Processing time </label>
    <select  class="form-mold ">
                <option selected="" disabled="" value="{&quot;type&quot;:&quot;unassigned&quot;}">
                    Select your processing time...
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:1,&quot;max_processing_days&quot;:1}}">
                    1 business day
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:1,&quot;max_processing_days&quot;:2}}">
                    1-2 business days
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:1,&quot;max_processing_days&quot;:3}}">
                    1-3 business days
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:3,&quot;max_processing_days&quot;:5}}">
                    3-5 business days
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:5,&quot;max_processing_days&quot;:10}}">
                    1-2 weeks
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:10,&quot;max_processing_days&quot;:15}}">
                    2-3 weeks
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:15,&quot;max_processing_days&quot;:20}}">
                    3-4 weeks
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:20,&quot;max_processing_days&quot;:30}}">
                    4-6 weeks
                </option>
                <option value="{&quot;type&quot;:&quot;standard&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:30,&quot;max_processing_days&quot;:40}}">
                    6-8 weeks
                </option>
                <option value="{&quot;type&quot;:&quot;custom&quot;}">
                    Custom range
                </option>
                <option value="{&quot;type&quot;:&quot;unknown&quot;,&quot;attributes&quot;:{&quot;min_processing_days&quot;:null,&quot;max_processing_days&quot;:null}}">
                    Unknown
                </option>
        </select>
    <div data-help="processingtime">Once purchased, how long does it take you to ship an item?</div></div>

    <!--locations-->
<div class="form-piece"> <label>Description</label> <textarea name="description" class="form-mold" rows="3" ></textarea> <input type="hidden" name="spgid" value=""><div data-help="description"></div></div>


</div>

<hr class="m30_0">

<div class="block  _bdy bg_0">
<div class="form-piece"> <label>Shipping Rate Type</label><input type="hidden" name="shipping_type" value="0"><div class="block"><div class="w6"> <div class="radio"> <label> <input type="radio" name="shipping_class_type" checked="checked" value="0" onclick="addon_8.b1(this)"><span></span>Based on cart total weight </label> </div> </div> <div class="w6"> <div class="radio"> <label> <input type="radio" name="shipping_class_type" value="1" onclick="addon_8.b1(this)"><span></span> Based on cart total price </label> </div> </div></div> </div>





</div>
<hr class="m30_0">

<div class=" block  bg_0 _bdy  bs-1 ">

    <div class="form-piece"> <label>Shipping Zone Type</label><input type="hidden" name="shipping_type" value="0"><div class="block"><div class="w6"> <div class="radio"> <label> <input type="radio" name="shipping_class_type" checked="checked" value="0" onclick="addon_8.b1(this)"><span></span>Local </label> </div> </div> <div class="w6"> <div class="radio"> <label> <input type="radio" name="shipping_class_type" value="1" onclick="addon_8.b1(this)"><span></span>National </label> </div> </div></div> </div>


    <div class="form-piece"> <label>Shipping Country</label>
        
     <?php  require( MATERIAL_TEMPLATE.'/part/countryList.php' );  ?>
         </div>

</div>




<hr class="m30_0">
<div class="block  ">

<div class="block td-n bs-1 fw-b  al-c  bg_0" role="group" aria-label="..."> 
    <a href="javascript:void(0);" class="w5 block _bdy bg_0" role="button">Sort</a>
     <a href="javascript:void(0);" class="w5 block _bdy bg_0" role="button">Filter</a> 
    <a href="javascript:void(0);" class="w2 block _bdy bg_0 tt-c" role="button">List</a>
     </div>

</div>


<hr class="m30_0">
<div class="block  _bdy bg_0">



</div>

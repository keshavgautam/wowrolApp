/*
* 
*/
; (function(W){
   "use strict";

  function Images(x){
  
   
 /*  x.mainimages=[
  { url:'https://s3-ap-south-1.amazonaws.com/wowrol/0_65.jpg',  key:'0_65', hash:'7wj9j0ppmv', name:'0_65.jpg'},
  { url:'https://s3-ap-south-1.amazonaws.com/wowrol/0_66.jpg',  key:'0_66', hash:'k5vdc6ity8', name:'0_66.jpg'},
     ];
     x.webimages=[
     { url:'https://ae01.alicdn.com/kf/HTB1zERDIXXXXXcXXFXXq6xXFXXXZ/Fashion-water-wash-whisker-denim-short-jacket-denim-coat-plus-size-women-s-clothing-Free-shipping.jpg_350x350.jpg',  key:'', hash:'', name:''},
  { url:'https://ae01.alicdn.com/wsphoto/v1/32319046637_1/Free-Shipping-new-European-Female-denim-Shirt-lapel-plaid-long-sleeved-casual-Blusa-Jeans-Women-Wholesale.jpg_220x220.jpg',  key:'', hash:'', name:''},
     ];
   */
      var Jid=W.U.J(function(){
  
 W.U.fileUpload.set({Node:this.Node,data:this.data,usetype:1,name:'varientimages'+this.data.vid,backblock: 'QuickaddProduct',imagecount:4});

  },x);  

      var ch='<div class="block" data-junction="'+Jid+'" ></div>';

  


      return ch;
  }

   function QuickaddProduct(x){
     var URL =W.U.URL;
     

       var titleText='text_32'; var sublitText='add';
    if(x.pid!=0){
        titleText='text_33';  sublitText='update';
    }

   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
         var ch='';
         ch += '<div class="block ">';
        ch += '<div class="block   bg_0 "><div class="block  _bdy" data-help="QuickaddProduct"></div><input type="hidden" name="pid" value="' + x.pid + '"><input type="hidden" name="sid" value="' + x.sid + '"> <input type="hidden" name="weightunit" value="'+x.Wu+'"> <input type="hidden" name="vid" value="'+x.vid+'">';

       ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label class="control-label" >text_31<i>*</i></label> <input type="text" name="product_name" class="form-mold" placeholder="Name" autocomplete="off" value="'+x.pN+'"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_45</p></div></div></div>';

   
          ch+='<div class="block b_gbl _bdy"> <div class="block m_b5"> <h3>text_37</h3> </div><div class="block "> <div class="w4 col4"> <div class="form-piece"> <label class="control-label">text_38<i>*</i></label><input type="number" name="sell_price" class="form-mold" placeholder="0.00" autocomplete="off" value="'+x.sP+'" > <div data-help="sell_price"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label class="control-label">text_39<i>*</i> </label><input type="number" name="compare_price" class="form-mold" autocomplete="off" placeholder="0.00" value="'+x.cP+'" > <div data-help="compare_price"></div></div></div></div></div>';

          ch+='<div class="block b_gbl _bdy"> <div class="block m_b5"> <h3>text_40</h3> </div><div class="block "> <div class="w4 col4"> <div class="form-piece"> <label class="control-label">text_41<i>*</i></label><input type="text" name="sku" class="form-mold" placeholder="0.00" autocomplete="off" value="'+x.sku+'" > <div data-help="sell_price"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label class="control-label">text_42<i>*</i></label><input type="number" name="stock" class="form-mold" autocomplete="off" placeholder="0.00" value="'+x.stk+'" > <div data-help="stock"></div></div></div></div></div>';

  var checked=(x.Issh)?'checked':'';
   var shippingboxdisplay=(x.Issh)?'':'display:none;';
  ch+='<div class="block b_gbl _bdy"> <div class="block m_b5"> <h3>text_43</h3> </div><div class="block "> <div class="w4 col4"> <div class="block"  ><label class="checkbox " data-toggle="checkbox"> <input type="checkbox" name="shippable" value="1" '+checked+'  onclick="if(this.checked==true){$(\'#shippingbox\').show();}else{$(\'#shippingbox\').hide();}"><span class="checkbox__label"> help_66</span> </label></div></div> </div>';
  var Wu='';var WuUnit=["kg","g"];var Wunames=["kilogram","gram"];
  for(var o in WuUnit){
      if(x.Wu==WuUnit[o]){
        Wu+='<option selected="selected" value="'+WuUnit[o]+'">'+Wunames[o]+'</option>';  
      }else{
          Wu+='<option  value="'+WuUnit[o]+'">'+Wunames[o]+'</option>';   
      }
  }

  ch+='<div class="block" id="shippingbox" style="'+shippingboxdisplay+'"  > <div class="w4 col4"><div class="form-piece"> <label class=" control-label">text_44</label> <select name="shipping_method" class="form-mold"> <option value="0" selected="selected">Home Delivery [HD]</option> <option value="1">Self Collect [SC]</option> </select> <div data-help="shipping_method"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label class=" control-label">text_45</label> <div class="input-group"  > <input class="form-mold" style="width: 100px;" name="weight" type="number" value="'+x.W+'" ><select class="input-group-addon" name="weightunit" style="width: 100px;"  >'+Wu+'</select> </div><div data-help="weight"></div></div></div></div>';
   ch+='</div>';
         ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label  class="control-label" >text_27</label> <textarea name="description" class="form-mold" rows="3" cols="30" placeholder="description" >'+x.des+'</textarea> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_63</p></div></div></div>';


                 
     var selected={};    
      for(var q in x.pC){
     if(x.pC[q].cid!=0){
         selected[x.pC[q].cid]={id:x.pC[q].cid,name:x.pC[q].cN};   
     }


  }
           
  var dataselectbox={id:'selectcategory_1',
                                                 name:'category',
                                                           fireAfter:1,
                                                           pager:W.I.dp,
                                                           backblock:"QuickaddProduct",
                                                          TranseData:{},
                                                          selected: selected,
                                                          initSearchText:'most used ',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:'Select Category',
                                                             onselectCallback:function(){
                                                           },
                                                      onselectRemoveCallback:function(){
                                                      }
                                                                   };                

                 
 
    ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label  class="control-label"  >text_34<i>*</i></label> '+W.U.selectbox.set(dataselectbox)+' <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_64</p></div></div></div>';
    ch += '<div class="block b_gbl _bdy"><a  class="btn btn-xs" href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':QuickaddCategory:dc_a:'+x.id+':QuickaddProduct"  >text_340</a></div>';


      ch+= '<div class="block b_gbl _bdy "> <div class="block m_b5"> <h3>text_46</h3> </div>'+Images(x)+'</div>';

   
        ch += '</div>';
    // ch += '<div class="block m_bTouch"></div>';
        ch += '</div>';
        return  W.T.DashbordFormWrap(Header, ch); 

   }

   function QuickaddCategory(x){
         var ch='';




       var titleText='text_340'; var sublitText='text_171';
    if(x.cid!=0){
        titleText='text_341';  sublitText='text_241';
    }


   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
 var ch='<div class="block ">';
  ch += '<div class="block  _bdy bg_0 bs-1"><div data-help="addstorecategory"></div>';

                    ch += '<div class="form-piece"> <label class="control-label" >Name<i >*</i></label> <input type="text" name="category_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.cN + '"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The name is how it appears on your Store Menu.</p></div></div>';
                    var token='';
                    var suggestion = {
                        name: 'category',
                        fireAfter: 4,
                        type: 2,
                        token: 'chips',
                        placeholder: 'Parent'
                    }; 
                    if(x.pa.cid!=''){
              token='<div class="li"><div class="token"> <span>' + x.pa.cN + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.pa.cid})  + '\' > </div></div>';
  token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>';
                    }else{
                  token='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';    
                    }
                 

   ch += '<div class="form-piece"> <label class="control-label">Parent</label> <div class="form-token block" data-junction="categorysuggestion0"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
                    W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestion0', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  
   ch+='<div class="form-piece"> <label class="checkbox" data-toggle="checkbox"> <input type="checkbox" name="is_default" value="0"><span class="checkbox__label">text_403</span> </label>  </div><div  data-help="login_form"></div>';

   ch += '<div class="form-piece"> <label class="control-label" >Description</label> <textarea name="description" class="form-mold" rows="3"  placeholder="Description"  >' + x.description + '</textarea> <input type="hidden" name="cid" value="' + x.cid + '"><input type="hidden" name="sid" value="' + x.sid + '"> <div data-help="description"></div></div>';

                        ch += '</div>';

      ch += '</div>';

         return   W.T.DashbordFormWrap(Header, ch);

     }
 

         W.T.QuickAdd={
           QuickaddProduct:QuickaddProduct,
           QuickaddCategory:QuickaddCategory


           };

   })(wowrol);
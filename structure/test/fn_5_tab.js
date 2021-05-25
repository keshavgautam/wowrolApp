W.T.C.C2_Prductcard=function(x,setting){
    var URL=W.U.URL, menuRol='',
     Prductcardsetting={addButtonbuyer:false,addButtonstore:false,hasShortListed:false,imagelink:true,forceNormalLoad:false},
      setting = W.U.extend(Prductcardsetting, setting);

  if(W.A.page.AppId=="checkins"&&(!setting.forceNormalLoad)){
      menuRol='checkinmenu';
 }


var Jid=W.U.KKJ({
       name:x.id+'kkproduct',
       controller:function(){    
       var _this=this;
       this.menuRol=menuRol; 
       this.x=x;
       this.varient_index=0;
       this.InventoryErrorCode=0;
       this.SBData=W.U.StoreBrowsing.hi_SBdata();
if(W.U.isOK( this.SBData)){
  if(this.SBData.mode!=3){
    if(this.SBData.role==0){
    this.InventoryErrorCode=1;//self store browsering
}
}else{
     this.InventoryErrorCode=3;//log out browsering
}
}else{
    if(W.I.AppId!='checkins'&&W.I.AppId!='messages'){
         this.InventoryErrorCode=5;//Sb data not defined
    }else{
         this.InventoryErrorCode=3;//log out browsering
    }
}

       this.showPlanlink=function(){ var e=(W.U.intval(x.pvL[0].stk) < 0)?true:false;  return e;   }
       this.showbuttonlink=function(){  
        return ((!setting.addButtonstore&&(setting.hasShortListed))&&(!setting.addButtonbuyer&&(setting.hasShortListed)));
         }
       this.showcartbuttonlink=function(){   return true; }
       this.showkeyfeature=function(){   return true; }
       this.showvarient=function(){   return true; }
       this.showvarientchooser=false;
       this.varientchooserStyle={'display':'none'};
       this.closeVarientChosser=function(){
         _this.showvarientchooser=true;
         _this.varientchooserStyle={'display':'none'};
  };
       this.getAllVarientId=function(){ 
   var id=[];
    for(var q in _this.x.pvL){
              
       id.push(_this.x.pvL[q].vid);


                }

   
     return id;
      }

        this.hasInCart=function(vid){ 
        
           var SBData=W.U.StoreBrowsing.hi_SBdata(),i={has:false,quantity:0};
          
   if(W.U.isOK(SBData)){
        var cvD=SBData.cvD; 

    for(var q  in cvD){
        if(cvD[q]==vid){
            i.has=true;

            if(W.U.isOK(SBData.cvPD[vid])){
                   i.quantity=SBData.cvPD[vid][0]; 
            }

            break;
        }
    } 
   }
 

return i;
        
        
        }

        this.has_varient=function(){ return ((_this.x.Hvrt=='')?false:true); };

       function off_price(sp,cp){
    var off=0;
    sp=parseFloat(sp);
    cp=parseFloat(cp);
    if(sp!=0&&cp!=0){
    off=-(100*((sp/cp-1))); 
    if( off<0){
        off=0; 
    }
      
    }
    return  Math.ceil10(off);
}
       function get_price(){
           var prices={sp:_this.x.pvL[_this.varient_index].sP,
           cP:x.pvL[_this.varient_index].cP,
           cPShow:1,
           off:0,
           offShow:0,
           currency:W.I.Currency[x.pvL[_this.varient_index].currency].symbol,
           stocktext:'text_406',
           stockClass_success:false,
           stockClass_error:true
           };

           if((x.pvL[0].stk > 0)){
             prices.stocktext='text_405';
             prices.stockClass_success=true; 
             prices.stockClass_error=false; 
           }

        prices.off=off_price(prices.sp,prices.cP);

        prices.cPShow=(W.U.intval(prices.cP)>0)?1:0;
        prices.offShow=(W.U.intval(prices.off)>0)?1:0;
        prices.off+='% off';

           return prices;
       }




       function get_image(){

 var TheImage=(W.U.isOK(_this.x.pvL[_this.varient_index].featureimage.url))?_this.x.pvL[_this.varient_index].featureimage.url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(_this.x.pvL[_this.varient_index].mainimages[0]))?_this.x.pvL[_this.varient_index].mainimages[0].url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(_this.x.pvL[_this.varient_index].webimages[0]))?_this.x.pvL[_this.varient_index].webimages[0].url: W.I.PRODUCT_PLACEHOLDER;
   
 }
  if(!W.U.isOK(TheImage)){
     TheImage=W.I.PRODUCT_PLACEHOLDER;
   
 }

 }

 
  var image = W.U.loadImage({ file: TheImage,
                    width: 250,
                    height: 250,
                    type: 'slider'
                });


           var i={palceholder:W.I.PRODUCT_PLACEHOLDER,src:image};

           return i;
       }

       function get_ratting(){
         var i={show:0};
if(W.U.isOK(x.rf.Total)){
 var r=x.rf.Total;
        var Total_rating = r['5star'] + r['4star'] + r['3star'] + r['2star'] + r['1star'];
        var Total_rating_wet = (r['5star'] * 5) + (r['4star'] * 4) + (r['3star'] * 3) + (r['2star'] * 2) + (r['1star'] * 1);
        var Avg_rating = W.U.positive((Total_rating_wet / Total_rating));
        Avg_rating=((Avg_rating==0)?0.0:Avg_rating).toFixed(1);


        i.Avg_rating=Avg_rating;
        i.show=1;
}

           return i;
       }

       function get_button(){
           var i= [];

  i.push({text:'text_408',click:function(){ //Suggest
          var __this=this,pid=__this.x.pid,Node=e.srcElement||e.target;
       W.U.Browsing.AddInShortList(pid,1,Node,function(){});   
       },show:setting.addButtonstore&&(setting.hasShortListed==false)});  

   i.push({text:'text_409',click:function(e){ //shortlist
             var __this=this,pid=__this.x.pid,Node=e.srcElement||e.target;

 W.U.Browsing.AddInShortList(pid,1,Node,function(){});   
              },show:setting.addButtonbuyer&&(setting.hasShortListed==false)});   



          // i.push({text:'text_410',click:function(){  }});  

           return i;
       }

       function get_keyfeature(){
       var kfparse= W.U.arraybase64_decode(x.kf),i=[] ;
        for (var k in kfparse) {
                    if(kfparse[k]!=''){
                  i.push({text:kfparse[k]})    ; 
                   
                 
                    }
                    
                }

       return i;
       }

       function get_varient(){
           var i=[],names=_this.x.pvN,values=[],p={};
             for(var q in _this.x.pvL){
                 values[q]='';  
                   for(var o in _this.x.pvL[q].pvV){
                 values[q]+=_this.x.pvL[q].pvV[o];  
                }
                }


 for(var q in names){
        if(names[q]!=''&&W.U.isOK(values[q])){
       i.push({name:names[q],value:values[q]});     

        }
        }
           return i;


       }

       function get_cartbutton(){
            var i= {};
//cart
   var v=_this.x.pvL[_this.varient_index],
    hasInCart= _this.hasInCart(v.vid);
    debugger;

if(_this.InventoryErrorCode==0){
    if(_this.x.Hvrt==''){
   if(! hasInCart.has){
     //------button on
    


   }else{
      //------button off
   }  

       i={text:'text_407',cartAdd:function(e){
  var __this =this.cartbutton,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity++;
      W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'add to cart','+',false);
        
         }
         ,cartRemove:function(e){ 
   var __this =this.cartbutton,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity--;
             W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'-','-',false);
     
   
        },quantity:hasInCart.quantity,pid:_this.x.pid,i:_this.x.pvL[0]
         
         
         };

    }else{// multi varient
        
   i={text:'text_407',cartAdd:function(e){
        
            var intent_name=W.U.uId();
                 W.U.intentdata.add(intent_name+'.0',_this.x);
                 W.U.Pager.ParseForGoToBlock([W.I.dp,'selectVarient',intent_name,0]);
        
         }};

    }
  
 }         




    return i;
       }



      this.url=URL('')+x.slug;
      this.price=get_price();
      this.image=get_image();
      this.ratting=get_ratting();
      this.button=get_button();
      this.cartbutton=get_cartbutton();

      this.keyfeature=get_keyfeature();
      this.varient=get_varient();
     
      debugger;

       },
       listenccbk:[['cartremove',function(data){ return true; }]]


 });

 var ch='<div class="block ul _bdy_5-0 ov-hi s-img" data-role="product-card" data-kkcomponent="'+Jid+'" >'
  //-- name and image
 +'<div kk-show="(this.showPlanlink())" >'
 
 +'</div>'
 //--
 +'<div kk-show="(this.showPlanlink()==false)" >'


 +'<div class=" block m_b10"><div class="img-media "><img class="img-responsive m0_auto"  background:'+W.U.RandomBGColor() +';"  src="{{this.image.palceholder}}" data-src="{{this.image.src}}" alt="{{this.x.pN}}" ></div></div>'

 +'<div class="li _bdy_0-5"> <h3 class="fw-b truncate tt-c al-c"><a class="wbk" href="{{this.url}}" role="{{this.menuRol}}" title="{{this.x.pN}}">{{this.x.pN}}</a></h3> </div>'


 +'</div>'

 //-- name and image

  //--PRice
 +'<div class="li _bdy_0-5 "> <div class="block "> <span class="bg-price m0"><i class="tt-c">{{this.price.currency}}</i><i>&nbsp;</i><i>{{this.price.sp}}</i></span> <span class="sm-price" kk-show="(this.price.cPShow==1)"><i class="tt-c">{{this.price.currency}} </i><i>&nbsp;</i><i>{{this.price.cP}}</i></span><span class="of-tag " kk-show="(this.price.offShow==1)">{{this.price.off}}</span><span class=" di-ib _bdy_0-5 fw-b info_text error tt-c" kk-class="{success: this.price.stockClass_success, error: this.price.stockClass_error}"  >{{this.price.stocktext}}</span><span class="di-ib _bdy_0-5  fg_10 " style="background-color: rgb(55, 190, 95);"><span class="span vl-m">{{this.ratting.Avg_rating}}</span> <span class="di-ib   vl-m" style="fill :#fff;"> '+W.T.SVG('star',14,'#fff','')+'</span> </span>  </div></div>'


  // cart button
 +'<div kk-show="(this.showcartbuttonlink())" >'
 +'<div class="block _Bdy"> <a class="btn _fbtn tt-c" href="javascript:void(0);" kk-show="(cartbutton.quantity==0||this.has_varient())"  kk-click="cartbutton.cartAdd" >add to cart</a>'
 +'<div class="block" kk-show="(cartbutton.quantity>0)" ><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b ad-4" kk-click="cartbutton.cartRemove" >-</a></span> <span class=" span fw-b">{{cartbutton.quantity}}</span><span class="span"><a class="btn btn-xs  fs14 fw-b ad-4" href="javascript:void(0);" kk-click="cartbutton.cartAdd" >+</a></span></div> </div>'
 +'</div>'


 //button
 +'<div  kk-show="(this.showbuttonlink()==true)" >'
 +'<div class="block _Bdy"> <div class="btn-group " role="group" >  <a  href="javascript:void(0);" class="btn _fbtn tt-c" kk-repeat="button in this.button" kk-show="(button.show)"     kk-click="button.click" >{{button.text}}</a></div></div>'
 +'</div>'
  //keyfeature
 +'<div class="li _bdy ct fs11" kk-show="(this.showkeyfeature()==true)" >'
 +'<ul ><li class="" kk-repeat="feature in this.keyfeature"  >{{feature.text}}</li></ul>'
 +'</div>'
   //varient
 +'<div class="li _bdy ct fs11" kk-show="(this.showvarient()==true)" >'
 +'<div class="block ov-hi" kk-repeat="varientrow in this.varient" ><span class="fw-b">{{varientrow.name}}</span><span >:</span><span class="span">{{varientrow.value}}</span></div>'
 +'</div>'

    //varient
 +'<div class="po-ab bg_0 " kk-show="(this.showvarientchooser==true)" kk-style="this.varientchooserStyle" >'

  +'<div class="block "> <div class="di-td "> <a href="javascript:void(0);" class="block  header-cell hov" kk-click="this.closeVarientChosser()" > </a></div><div class="di-td w-100-010 "><a href="javascript:void(0);" class="block header-cell fg_6 fs14 ov-hi">chose varient</a> </div></div>'

  +'<div class="block ov-hi" kk-repeat="varientrow in this.varient" ><span class="fw-b">{{varientrow.name}}</span><span >:</span><span class="span">{{varientrow.value}}</span></div>'
 +'</div>'
 //--

 +'</div>';

 return ch;h


}
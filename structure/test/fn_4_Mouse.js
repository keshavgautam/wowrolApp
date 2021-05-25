{
 
 var ch ='';var URL=W.U.URL;var menuRol='';
 var Prductcardsetting={addButtonbuyer:false,addButtonstore:false,hasShortListed:false,imagelink:true,forceNormalLoad:false};

 
 setting = W.U.extend(Prductcardsetting, setting);
   if(W.A.page.AppId=="checkins"&&(!setting.forceNormalLoad)){
      menuRol='checkinmenu';
 }
 if(W.U.isOK(x.pvL)){
    if(W.U.isOK(x.pvL[0])){
        
  
 ch += '<div class="block ul _bdy_5-0 ov-hi s-img" data-role="product-card"> ';

 var TheImage=(W.U.isOK(x.pvL[0].featureimage.url))?x.pvL[0].featureimage.url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(x.pvL[0].mainimages[0]))?x.pvL[0].mainimages[0].url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(x.pvL[0].webimages[0]))?x.pvL[0].webimages[0].url: W.I.PRODUCT_PLACEHOLDER;
   
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
var prices=[x.pvL[0].sP,x.pvL[0].cP];
prices[2]=off_price(prices[0],prices[1]);
var stock = (x.pvL[0].stk > 0) ? '<span class=" di-ib _bdy_0-5 fw-b info_text success">In Stock</span>' : '<span class=" di-ib _bdy_0-5 fw-b info_text error">Out of Stock</span>';
 x.kfparse= W.U.arraybase64_decode(x.kf);
 var  keyfeatureLink=[];
  var keyfeature = '';
   
                for (var k in x.kfparse) {
                    if(x.kfparse[k]!=''){
                       
                   
                     keyfeatureLink.push('<li class="">' + x.kfparse[k] + '</li>');
                    }
                    
                }

if(W.U.count(keyfeatureLink)>0){
    keyfeature='<div class="li _bdy ct fs11"><ul >'+keyfeatureLink.join('')+'</ul></div>';
}



var img_str='<div class="li m_b5"> <div class="img-media "> <a href="'+ grofers.com+'" role="'+menuRol+'" ><img class="img-responsive m0_auto" style="  background:'+W.U.RandomBGColor() +';"  src="' + W.I.PRODUCT_PLACEHOLDER+ '" data-src="'+image+'" alt="'+x.pN+'" ></a> </div></div>';


var name_str ='<div class="li _bdy_0-5"> <h3 class="fw-b truncate tt-c al-c"><a class="wbk" href="'+ URL('')+x.slug+'" role="'+menuRol+'" title="'+x.pN+'">'+x.pN+'</a></h3> </div>';
     if (prices[0] == '' || x.pvL[0].stk < 0) {

   var img_str = '<div class=" block m_b10"><div class="img-media "><img class="img-responsive m0_auto"  background:'+W.U.RandomBGColor() +';"  src="' + URL('')+ '/assets/imgs/pic/placeholder_loading.png" data-src="'+image+'" alt="'+x.pN+'" ></div></div>';

    var name_str = '<div class="block _bdy al-c m_b10"> <h3 class="fw-b">' + x.pN+ '</h3> </div>';

                }
if(!setting.imagelink){
    var img_str='<div class="li m_b5"> <div class="img-media "> <img class="img-responsive m0_auto" background:'+W.U.RandomBGColor() +';"  src="' + URL('')+ '/assets/imgs/pic/placeholder_loading.png" data-src="'+image+'" alt="'+x.pN+'" ></div></div>';
}
var rating_str=''; 
if(W.U.isOK(x.rf.Total)){
 var r=x.rf.Total;
        var Total_rating = r['5star'] + r['4star'] + r['3star'] + r['2star'] + r['1star'];
        var Total_rating_wet = (r['5star'] * 5) + (r['4star'] * 4) + (r['3star'] * 3) + (r['2star'] * 2) + (r['1star'] * 1);
        var Avg_rating = W.U.positive((Total_rating_wet / Total_rating));
        Avg_rating=((Avg_rating==0)?0.0:Avg_rating).toFixed(1);


  rating_str ='<span class="di-ib _bdy_0-5  fg_10 " style="background-color: rgb(55, 190, 95);"><span class="span vl-m">'+Avg_rating+'</span> <span class="di-ib   vl-m" style="fill :#fff;"> '+W.T.SVG('star',14,'#fff','')+'</span> </span>';

}


var price_str ='<div class="li _bdy_0-5 "> <div class="block "> <span class="bg-price m0">Rs.' + prices[0] + '</span> <span class="sm-price">Rs.' + prices[1] + '</span><span class="of-tag ">'+prices[2]+'% off</span> '+stock+rating_str+' </div></div>';

var varient_con_str=(x.Hvrt)?varient_con(x):'';
var addButton='';
if(setting.addButtonbuyer&&(setting.hasShortListed==false)){
   addButton='<div class="li _bdy_0-5 "><div class="btn-group" role="group" aria-label="...">  <button type="button" class="btn _fbtn" data-addsortlist="'+x.pid+'"; >SortList</button></div></div>'; 
}
if(setting.addButtonstore&&(setting.hasShortListed==false)){
   addButton='<div class="li _bdy_0-5 "><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn _fbtn"  data-addsuggest="'+x.pid+'"; >Suggest</button></div></div>'; 
}

ch+=img_str+name_str+price_str+addButton+keyfeature+varient_con_str;

ch+='</div>';
  }else{
       W.U.console(x);  
  }
  }else{
      debugger;
  }

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
 function varient_con (x) {
      var names=x.pvN;
     var values=[];
                for(var q in x.pvL){
                 values[q]=x.pvL[q].pvV;  
                }

     var varient_con ='<div class="li _bdy tt-c">', varientlist0 = '';
    for(var q in names){
        if(names[q]!=''){
           varient_con +='<div class="block ov-hi"><span class="fw-b">'+names[q]+' :</span>'; 
   
     for(var e in  values){
   varient_con +=(values.length!=e&&e!=0)?',':'';       
  varient_con +='<span class="span">'+values[e][q]+'</span>';   
          }
          varient_con +='</div>';   
        }
 
    }

       varient_con +='</div>';



                return varient_con;
            }

  return ch;
}
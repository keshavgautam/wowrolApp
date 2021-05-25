/*
* 
*/
; (function(W){
   "use strict";
      var ORDER_STATUS= ['Processing', 'Dispatched', 'Pending', 'Ready to Collect','Cancelled by buyer','Cancelled by store','Delivered','Failed','To be return','To be replace','Cancelled return/replacement',' returned',' replaced','Completed with Good shopping experience','Completed with Bad shopping experience'];
        var ORDER_TYPE= ['home delivery', 'self collect', 'inquiry', 'booking'];

function defaultData(){
    var data={pager:W.I.dp,
             backblock:W.I.dpbf,
             name:'',
             LoadData:W.U.noop,
             TranseData:{}
             };

    return data;
}
///
function Handler(Node,data){
 this.Node=Node;
  this.data= W.U.extend(defaultData(), data);
 this.TranseData=  this.data.TranseData  ; 
 this.LoadData=  this.data.LoadData  ; 
 this.name=  this.data.name  ; 

   this.flever='web';
  if(W.I.wf=='mob'){
      if( ! W.U.browser.height_free){
          this.flever='mob'; 
      }
    
  }

 this.TemplateNode=this.initTemplate();

    W.U.console(this);

 this.init();
}

Handler.prototype.init=function(){
    this.FilterList=this.GetFilterList();
     this.ActiveTabListIndex=0;

       this.setcomponent('header');
       this.setcomponent('activefilter');

       if(W.U.count(this.FilterList)>0){
             if(this.flever=='mob'){
        this.setcomponent('filtername');
       this.setcomponent('filtervalue');   
      }else{
        this.setcomponent('filter');
      }
        
       }
     
    
}




Handler.prototype.initTemplate=function(){
      var ch;
      if(this.flever=='mob'){
        ch='<div class="block ">';
         ch+='<div  data-block="header" ></div>';
          ch+='<div  class="block ov-aux"  ><div  class="block _Bdy" data-block="activefilter" ></div></div>';

          ch+='<div  class="block " ><div class="w4 ov-au" data-block="filtername" ></div><div class="w8 ov-au"  data-block="filtervalue" ></div></div>';

          ch+='</div>';
             var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
     header:W.U('[data-block="header"]',mainBlock[0])[0],
     activefilter:W.U('[data-block="activefilter"]',mainBlock[0])[0],
      filter:null,
     filtername:W.U('[data-block="filtername"]',mainBlock[0])[0],
     filtervalue:W.U('[data-block="filtervalue"]',mainBlock[0])[0]           
    }

       }else{
            ch='<div class="block ">';
         ch+='<div  data-block="header" ></div>';
          ch+='<div  class="block ov-aux"  ><div  class="block _Bdy" data-block="activefilter" ></div></div>';

          ch+='<div  class="block _bdy" data-block="filter" > </div>';

          ch+='</div>';  
             var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
     header:W.U('[data-block="header"]',mainBlock[0])[0],
     activefilter:W.U('[data-block="activefilter"]',mainBlock[0])[0],
    filter:W.U('[data-block="filter"]',mainBlock[0])[0],
     filtername:null  ,
     filtervalue:null           
    } 
       }
    


       W.U.Setview(this.Node,mainBlock,'html');

       return TemplateNode;

}



Handler.prototype.GetFilterList=function(){
    var FilterList=[];   var RawList=[];
var Cfiatr= this.TranseData.ifo.Cfiatr;
var Mfiatr= this.TranseData.ifo.Mfiatr;



  
 
    FilterList= this.ListGrouping(Mfiatr,'M').concat(this.ListGrouping(Cfiatr,'C'));
    
    return FilterList;
}

Handler.prototype.ListGrouping=function(x,type){
    var k=0,p=0,Filter=[];
    for(var i in x){
        x[i]['type']=type;
            
        if(i==0){
      Filter[k]=[];
          Filter[k][p]=x[i];
         
          p++;  
        }else{
       if(x[i]['name']==x[(i-1)]['name']){
       
       Filter[k][p]=x[i];
            p++;

     }else{
        k++;p=0;
        Filter[k]=[];
       Filter[k][p]=x[i];
            p++;

     }   
        }

    }

    return Filter;

}


Handler.prototype.GetFilterValueData=function(){
var ret={
    html:'<div></div>',
    callback:W.U.noop
}

var p=this.ActiveTabListIndex;
var FilterValueArr=( this.FilterList.length>=p&&p>=0&&this.FilterList.length>0)?this.FilterList[p]:[];

//Knowing which type deta we are going to 
var type="C";var  filterName='';

if(FilterValueArr.length>0){
    type=FilterValueArr[0].type;
    filterName=FilterValueArr[0].name;
}
if(type=='M'){
  ret=this.GethtmlStrOfMainFilter(FilterValueArr,filterName);
}
if(type=='C'){
     ret=this.GethtmlStrOfCustomFilter(FilterValueArr,filterName); 
}


return ret;

}


Handler.prototype.GethtmlStrOfCustomFilter=function(x,filterName){
var ch='<div></div>';
var callback=W.U.noop;
   ch='<div class="block _bdy bg_0 bs-1"><div class="block ul cl_f-l ">';

      for(var q in x){
var   filterliStr=    JSON.stringify(x[q]);  
var lable='';  
var Is_Checked=this.IsFilterActive(x[q]);
   


 
     ch+='<div class="li ov-hi"> <label class="checkbox " data-toggle="checkbox" ><input type="checkbox" name="filterli "  data-filterli=\''+filterliStr+'\' value="' + x[q].value + '"  '+Is_Checked+' ><span class="checkbox__label fs11 tt-c truncate">' +  x[q].value + '</span> <i class="badge ">' + x[q].count + '</i></label> </div>';  
  }
    ch+='</div></div>';

  

  
return {
    html:ch,
    callback:callback
} ;

}

Handler.prototype.GethtmlStrOfMainFilter=function(x,filterName){
var ch='<div></div>';
var callback=W.U.noop
var _this=this;
   ch='<div class="block _bdy bg_0 bs-1"><div class="block ul cl_f-l ">';

      for(var q in x){
var   filterliStr=    JSON.stringify(x[q]);  
var lable='';  
var Is_Checked=this.IsFilterActive(x[q]);
var IsCheckboxhtml=true;

   

    switch(this.name){
     case 'dashboard_orders':
     //--
      switch(filterName){
        case 'type':
       lable =ORDER_TYPE[x[q].value];
      
        
        break; 
        case 'status':
    
       lable =ORDER_STATUS[x[q].value];
        
        break; 
        case 'fromDate':
         ch+=W.U.Datepicker.dateinput({ presentation:'popup', date:W.U.Datepicker.dategive("today"),
     minDate: W.U.Datepicker.dategive("last",60),
     maxDate:W.U.Datepicker.dategive("today")}
     ); 
           IsCheckboxhtml=false;  
        break; 
        case 'toDate':
           ch+=W.U.Datepicker.dateinput({presentation:'popup',  date:W.U.Datepicker.dategive("today"),
     minDate: W.U.Datepicker.dategive("last",60),
     maxDate:W.U.Datepicker.dategive("today")}
     );  
           IsCheckboxhtml=false;  
        break;          
   
      }
         

     //--dashboard_orders
     break;

     //-- category listing
     case 'categorylistingfilter':
      switch(filterName){
    
          case 'price':
     ch+= '<div class="block "><div class="block _bdy"> <span class="block _bdy" data-nodeid="categorylistingamount"  style="border:0; color:#f6931f; font-weight:bold;"></span><input type="hidden"  data-nodeid="categorylistingprice" name="price" value="" ></div><div class="block _Bdy"><div  data-nodeid="categorylistingsliderrange" class="block"></div></div>';

        IsCheckboxhtml=false;
        var sbData=W.U.StoreBrowsing.hi_SBdata();
        var price=x[q].value;
          W.U.ccbk.Add(this.Node,'setafterfiltercomponetcallbackrun',function(){
               ////W.U.console('callback runing');
               var y=price,
               sliderNode=W.U.id('categorylistingsliderrange'),
               priceNode=W.U.id('categorylistingprice'),
               amountNode=W.U.id('categorylistingamount'),
               currency=sbData.currencydata.symbol;
               ;
              
                $(sliderNode).slider({
            range: true,
            min: y.min,
            max: y.max,
            values: [y.min, y.max],
            slide: function (event, ui) {
                var rng = {};
                rng.min = ui.values[0]; rng.max = ui.values[1];
                $(priceNode).val(JSON.stringify(rng));
                $(amountNode).html(currency+' ' + y.min +' - ' +  currency+' ' + y.max);


            },
            change: function( event, ui ) {
        _this.TranseData.ifo.Afiatr.price=[{v:{min:ui.values[0],max:ui.values[1]},t:'M'}];
   _this.setcomponent('activefilter');
            }
        });
          $(amountNode).html(currency+' ' + y.min +' - ' +  currency+' ' + y.max);
           });
         
        break; 
          case 'discount':
   x[q].value=Math.round10(x[q].value);
     x[q].value= W.U.intval(x[q].value);
       lable = 'Less than '+x[q].value+'%';
      ch+='<div class="li ov-hi"> <label class="radio" data-toggle="radio" ><input type="radio" name="filterli"  data-filterli=\''+filterliStr+'\' value="' + x[q].value + '"  '+Is_Checked+' ><span class="radio__label fs11 tt-c ">' +  lable + '</span> <i class="badge ">' + x[q].count + '</i></label> </div>'; 
        IsCheckboxhtml=false;  
        break; 
         
              
   
      }
     break;
     case 'marketstorefilter':
       switch(filterName){
           


 case 'collection':
   ch+='<div class="li ov-hi"> <label class="checkbox " data-toggle="checkbox" ><input type="checkbox" name="filterli"  data-filterli=\''+filterliStr+'\' value="' + x[q].value + '"  '+Is_Checked+' ><span class="checkbox__label fs11 tt-c ">' + x[q].lable  + '</span> <i class="badge ">' + x[q].count + '</i></label> </div>'; 
     IsCheckboxhtml=false;
  break;
 case 'pricerange':
  ch+= '<div class="block "><div class="block _bdy"> <span class="block _bdy" data-nodeid="categorylistingamount"  style="border:0; color:#f6931f; font-weight:bold;"></span><input type="hidden"  data-nodeid="categorylistingprice" name="price" value="" ></div><div class="block _Bdy"><div  data-nodeid="categorylistingsliderrange" class="block"></div></div>';

        IsCheckboxhtml=false;
       
        var price=x[q].value;
          W.U.ccbk.Add(this.Node,'setafterfiltercomponetcallbackrun',function(){
               ////W.U.console('callback runing');
               var y=price,
               sliderNode=W.U.id('categorylistingsliderrange'),
               priceNode=W.U.id('categorylistingprice'),
               amountNode=W.U.id('categorylistingamount'),
               currency='Rs.';
               ;
              
                $(sliderNode).slider({
            range: true,
            min: y.min,
            max: y.max,
            values: [y.min, y.max],
            slide: function (event, ui) {
                var rng = {};
                rng.min = ui.values[0]; rng.max = ui.values[1];
                $(priceNode).val(JSON.stringify(rng));
                $(amountNode).html(currency+' ' + y.min +' - ' +  currency+' ' + y.max);


            },
            change: function( event, ui ) {
   _this.TranseData.ifo.Afiatr.pricerange=[{v:{min:ui.values[0],max:ui.values[1]},t:'M'}];
   _this.setcomponent('activefilter');
            }
        });
          $(amountNode).html(currency+' ' + y.min +' - ' +  currency+' ' + y.max);
           });
  break;





       }
     break;

     case 'dashboardproduct':
     switch(filterName){
         case 'stock':
         var TH=['All','In Stock','Out of Stock'];
         lable=TH[x[q].value];
         break;
         case 'status':
        var TH=['Not Live','Live'];
         lable=TH[x[q].value];
         break;
     }

     break;


    }

    if(IsCheckboxhtml){
   ch+='<div class="li ov-hi"> <label class="checkbox " data-toggle="checkbox" ><input type="checkbox" name="filterli"  data-filterli=\''+filterliStr+'\' value="' + x[q].value + '"  '+Is_Checked+' ><span class="checkbox__label fs11 tt-c ">' +  lable + '</span> <i class="badge ">' + x[q].count + '</i></label> </div>'; 
   }
  }
    ch+='</div></div>';

    

  
return {
    html:ch,
    callback:callback
} ;
}


Handler.prototype.onfilterliclick=function(attrValue,checkbox){
     var obn=attrValue.name;var _this=this;
   var obv=attrValue.value; 
     var type=attrValue.type; 
   if(typeof (obn)!='undefined'&&typeof (obv)!='undefined'&&checkbox.checked == true){
       


   var Isdefault=true;
//W.U.console(Af[q][p]);
           
 switch(_this.name){
     case 'dashboard_orders':
     //--
      switch(obn){
    
        case 'fromDate':
        
        
        break; 
        case 'toDate':
        
        
        break;          
      
      }


     //--dashboard_orders
     break;
    case 'categorylistingfilter':
 switch(obn){
    
   
      case 'discount':
   
              var newValue={};
        newValue[obn]=[{v:obv,t:type}];
        W.U.extend(this.TranseData.ifo.Afiatr,newValue); 
        Isdefault=false;
        break;      
   
      }
       break;
  case 'marketstorefilter':

     switch(obn){
    
        case 'collection':
        
           if(W.U.isOK(this.TranseData.ifo.Afiatr[obn])){
          this.TranseData.ifo.Afiatr[obn].push({v:obv,t:type,lable:attrValue.lable});      
           }else{
          this.TranseData.ifo.Afiatr[obn]=[{v:obv,t:type,lable:attrValue.lable}]; 
           }
  
      
        Isdefault=false;
        break; 
               
      
      }

    break;


    }




//--
if(Isdefault){
      //defalue
         if(!this.TranseData.ifo.Afiatr.hasOwnProperty(obn)){
                 var newValue={};
        newValue[obn]=[{v:obv,t:type}];
        W.U.extend(this.TranseData.ifo.Afiatr,newValue); 
         }else{
      
      innerUpdate(obn,obv,type);
   } 
}


 }else{
         innerUpdate(obn,obv,type);
 }

   _this.setcomponent('activefilter');

    function innerUpdate(obn,obv,type){
      var has=0,Value=  _this.TranseData.ifo.Afiatr[obn],index=0;

       for(var q in Value){
        if(Value[q].v==obv){
            has=1;index=q;
            break;   
           }
    
       }
     
       if(has==0){
       Value.push({v:obv,t:type});    
       }else{
           Value.splice(index,1); 
       }


       if(Value.length==0){
          delete(_this.TranseData.ifo.Afiatr[obn]);
       }
 }
}


Handler.prototype.SetActiveTab=function(){
   var p=this.ActiveTabListIndex;
  var Pa= $(this.TemplateNode.filtername).children();
      Pa.children().addClass('bg_5').removeClass('bg_0');
   
    Pa.children().eq( p ).addClass('bg_0').removeClass('bg_5');
}


Handler.prototype.GethtmlStrOfActiveFilterValue=function(x,name){
  var ch='';
 
var defaultstr=false;

  for(var p in x){
 var removefilter = JSON.stringify({name:name,value:x[p].v,type:x[p].t});
  var lable=(typeof ( x[p].v)=='string')?x[p].v:'';
var Isdefault=true;
//--
 switch(this.name){
     case 'dashboard_orders':
     //--
      switch(name){
        case 'type':
        lable =ORDER_TYPE[x[p].v];
        break; 
        case 'status':
        lable =ORDER_STATUS[x[p].v];
        break; 
        case 'fromDate':
        
        
        break; 
        case 'toDate':
        
        
        break;          
      
      }


     //--dashboard_orders
     break;
    case 'categorylistingfilter':
 switch(name){
    
        case 'price':
        var sbData=W.U.StoreBrowsing.hi_SBdata(),  currency=sbData.currencydata.symbol;
  ch+=' <span class="span fg_7">' +currency+' '+ x[p].v.min + ' to  '+currency+' '+ x[p].v.max + '<i class="sclose ad-12"  data-removefilter=\'' + removefilter + '\' ></i></span>';   
        Isdefault=false;
        break; 
      case 'discount':
       lable = 'Less than '+Math.floor10(x[p].v)+'%';
      
        
        break;      
   
      }
       break;
  case 'marketstorefilter':

     switch(name){
    
        case 'collection':
          lable =x[p].lable;
      
        break; 
           case 'pricerange':
        var currency='Rs';
  ch+=' <span class="span fg_7">' +currency+' '+ x[p].v.min + ' to  '+currency+' '+ x[p].v.max + '<i class="sclose ad-12"  data-removefilter=\'' + removefilter + '\' ></i></span>';   
        Isdefault=false;
        break;         
      
      }

    break;
 case 'dashboardproduct':
     switch(name){
         case 'stock':
         var TH=['All','In Stock','Out of Stock'];
         lable=TH[x[p].v];
         break;
         case 'status':
        var TH=['Not Live','Live'];
         lable=TH[x[p].v];
         break;
     }

     break;



    }




//--
if(Isdefault){
    ch+=' <span class=" span fg_7">'+lable+'<i class="sclose ad-12"  data-removefilter=\'' + removefilter + '\' ></i></span>';    
}
 
   }
 


return ch;  
}


Handler.prototype.IsFilterActive=function(x){
  var IsChecked='',Afiatr=  this.TranseData.ifo.Afiatr;

   for(var q in Afiatr){
    
   for(var p in Afiatr[q]){
          if(Afiatr[q][p].v==x.value&&q==x.name){
         IsChecked=' checked';
            break;   
           }  
       }

       
    
       }
  return IsChecked;
}

Handler.prototype.onRemoveActivefilter=function(attrValue){
  
      var Af=this.TranseData.ifo.Afiatr;
        var index_q=0,index_p=0,match=0;
       for(var q in Af){
       for(var p in Af[q]){
var Isdefault=true;

           
 switch(this.name){
     case 'dashboard_orders':
     //--
      switch(q){
    
        case 'fromDate':
        
        
        break; 
        case 'toDate':
        
        
        break;          
      
      }


     //--dashboard_orders
     break;
    case 'categorylistingfilter':
 switch(q){
    
        case 'price':
            if(q==attrValue.name){
            
           index_q=q; index_p=p;match++;
  Isdefault=false;
             
          }  
 
        break; 
      case 'discount':
   
      
        
        break;      
   
      }
       break;

       case 'marketstorefilter':
       switch(q){
           
         case 'pricerange':
   if(q==attrValue.name){
            
           index_q=q; index_p=p;match++;
  Isdefault=false;
             
          }  
    
        break;
       }
        break;



    }




//--
if(Isdefault){
      //defalue
        if((q==attrValue.name)&&(Af[q][p].v==attrValue.value)){
            
             index_q=q; index_p=p;match++;
             
          }  
}


        

           }}

 ////W.U.console('match'+match);
    if(match>0){
 this.TranseData.ifo.Afiatr[index_q].splice(index_p,1); 
          if( Af[index_q].length==0){
           delete(this.TranseData.ifo.Afiatr[index_q]);
          }

 
     ////W.U.console( Af[index_q]);    ////W.U.console( Af);
    ////W.U.console( index_q); ////W.U.console(index_p);
     ////W.U.console(this.TranseData.ifo.Afiatr[index_q]);

      }
   if(  W.U.ObjectLength(this.TranseData.ifo.Afiatr)>0){
        this.setcomponent('activefilter');
          if(W.I.wf=='mob'){
      this.setcomponent('filtervalue');
      }else{
       this.setcomponent('filter');   
      }
   }else{
       this.ApplyFilter();
   }
     


}

Handler.prototype.ApplyFilter=function(){

     this.LoadData(this.TranseData);
}

Handler.prototype.clearAllFilter=function(){
    this.TranseData.ifo.Afiatr={};
 
     this.LoadData(this.TranseData);
}

Handler.prototype.SetactivefilterWidth=function(){
  var width=(W.I.wf=='mob')?window.innerWidth:230;
  $(this.TemplateNode.activefilter).css({'width':width});
}

Handler.prototype.setcomponent=function(name){
    var _this=this;

    var ch='<div></div>';
 switch(name){
     case 'header':
     this.smartsetcomponent(name);

       break;

       case 'activefilter':
       if(this.flever=='mob'){
            this.smartsetcomponent(name); 
       }
 
  if(this.flever=='web'){
      var activefilterNode=W.U.id('categoryactivefilter');
      if(activefilterNode!=null){
       this.TemplateNode.activefilter= activefilterNode;    
      }
    
           this.smartsetcomponent(name); 
       }

       if( W.U.ObjectLength(this.TranseData.ifo.Afiatr)>0){
             _this.Notify();
       }
      
   
       break;
      case 'filtername':

     if(this.flever=='mob'){
            this.smartsetcomponent(name); 
       }



       break;


      case 'filtervalue':
 if(this.flever=='mob'){
            this.smartsetcomponent(name); 
       }




       break;
  case 'filter':
       if(this.flever=='web'){
            this.websetcomponent(name); 
       }
 




       break;
   }

 W.U.ccbk.Run(this.Node,'setafterfiltercomponetcallbackrun'); 
 W.U.ccbk.Clear(this.Node,'setafterfiltercomponetcallbackrun'); 
}

Handler.prototype.smartsetcomponent=function(name){
    var _this=this;
 
    var ch='<div></div>';

 switch(name){
     case 'header':




  var  mainBlock=W.U.Rander(W.T.filter.header(_this.name, _this.data));
   W.U.attrclick('[data-btn="ApplyFilter"]',mainBlock[0],function(){  _this.ApplyFilter();
});
   W.U.attrclick('[data-btn="clearAllFilter"]',mainBlock[0],function(){  _this.clearAllFilter();
});
  W.U.Setview(this.TemplateNode.header,mainBlock,'html');
       break;


       case 'activefilter':
    
      var x=this.TranseData.ifo.Afiatr,width=0;
      
   
       ch='<div class="di-t  td-n  w212 _bdy"><div class="di-td ul ul-menu cl_tagsort">';

 x= W.U.IMObject(x);
     
       for(var q in x){
 
   ch+='<div class="li "><span class="label "><span class="span fg_1 truncate">'+q+'</span>';
   ch+=this.GethtmlStrOfActiveFilterValue(x[q],q);
   ch+='</span> </div>'; 
   width+=150;;
}
       ch+='</div ></div>';
this.TranseData.ifo.Afiatr=x;

       var  mainBlock=W.U.Rander(ch);

W.U.attrclick('[data-removefilter]',mainBlock[0],function(){
      var attrValue=JSON.parse(this['data-removefilter']);
   
      _this.onRemoveActivefilter(attrValue);
});
  W.U.Setview(this.TemplateNode.activefilter,mainBlock,'html');

if(this.flever=='mob'){
  var width=(window.innerWidth+width);
  var Pawidth=window.innerWidth;
  $(this.TemplateNode.activefilter).css({'width':width});
  $(this.TemplateNode.activefilter).parent().css({'width':Pawidth});
  }


       break;







      case 'filtername':

    ch='<div class="block">';
      for(var q in this.FilterList){
     ch+='<a href="javascript:void(0);" data-filtername="'+q+'" class="block header-cell  bg_5  fg_4 ff_5 bs-1 tt-c truncate">'+this.FilterList[q][0]['name']+'</a>';    
      }

      ch+='</div>';

   var  mainBlock=W.U.Rander(ch);
W.U.attrclick('[data-filtername]',mainBlock[0],function(){
    var index=this['data-filtername'];
    _this.ActiveTabListIndex=index;
   _this.setcomponent('filtervalue');

});

  W.U.Setview(this.TemplateNode.filtername,mainBlock,'html');
    $(this.TemplateNode.filtername).css({'height':window.innerHeight-96});
       break;








      case 'filtervalue':
      this.SetActiveTab();
      var FilterValueData=this.GetFilterValueData();
      ch=FilterValueData.html;

   var  mainBlock=W.U.Rander(ch);

W.U.attrclick('[data-filterli]',mainBlock[0],function(){
   var attrValue=JSON.parse(this['data-filterli']);
   var checkbox=this;

  _this.onfilterliclick(attrValue,checkbox);
});

  W.U.Setview(this.TemplateNode.filtervalue,mainBlock,'html');
      $(this.TemplateNode.filtervalue).css({'height':window.innerHeight-96});
       break;

   }

     

}
Handler.prototype.websetcomponent=function(name){
    var _this=this;
 
    var ch='<div></div>';

   switch(name){
   

       case 'activefilter':





       break;
  


      case 'filter':
   var FilterList=this.FilterList;
  ch='<div class="block">';
  ////W.U.console(FilterList);
for(var q in FilterList){

    ch += '<div  class="block bs-1 "  >';
 
       ch += '<div class="block  "   data-collapse="demo" >';
        ch += '<div class="block _bdy bg_7"><span class=" block w10 fw-b tt-c truncate _bdy">'+FilterList[q][0].name+'</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="demo"  ></a></span></div></div>'; 
        var filtervalues={html:''};
        if(FilterList[q][0].type=='M'){
           filtervalues=this.GethtmlStrOfMainFilter(FilterList[q],FilterList[q][0].name); 
        }
        if(FilterList[q][0].type=='C'){
           filtervalues=this.GethtmlStrOfCustomFilter(FilterList[q],FilterList[q][0].name); 
        }
       ch += '<div class="block  bg_0" data-collapseblock="demo"  >'+ filtervalues.html+'</div>'; 
       ch += '</div>';


     ch += '</div>';

 
   //
    //ret[q].type=FilterList[q].type;
   // ret[q].name=FilterList[q].name;

}
  ch+='</div>';
      var  mainBlock=W.U.Rander(ch);  

W.U.attrclick('[data-filterli]',mainBlock[0],function(){
   var attrValue=JSON.parse(this['data-filterli']);
   var checkbox=this;

   _this.onfilterliclick(attrValue,checkbox);
});
  W.U.Setview(this.TemplateNode.filter,mainBlock,'html');

       break;

   }

     

}
Handler.prototype.Notify=function(){
    if(this.flever=='web'){
       if( ! W.U.browser.height_free){
     W.F.Toast({msg: W.U.GetText('click apply to load new results'),theme:'',duration:2000});
      }  
    }
  
}



//----------------
var filter={};
function init(Node,data){
   filter=new  Handler(Node,data);

}


   W.U.filter={init:init};

})(wowrol);
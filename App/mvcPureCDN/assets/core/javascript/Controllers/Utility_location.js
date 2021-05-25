/*
* 
*/
;(function(W){
   "use strict";

/**
@task_id
  0 - billing adress /store address
  1 - delivery address/buyer adderss
  2 - only country
  3 - add new location city
  4 - add new location Town
  5 -  store shipping class search form for state 
  6 -store shipping class search form for local location
*/
function Handler(Node,DataKey){
    this.Node=Node;
    this.Name=DataKey;
    var Data= W.U.intentdata.get(DataKey);
    if( Data!=null){

 
    this.Task=Data.Task;
    this.pager=Data.Data.pager;
    this.backblock=Data.Data.backblock;
    this.Data=Data.Data;
   //--Selected
    if(W.U.isOK(Data.Selected)){
 
 this.Selected={};
  for(var q in Handler.defaultSelected){
       this.Selected[q]=W.U.extend(Data.Selected[q],Handler.defaultSelected[q]);
  }
  

    }else{
      this.Selected=Handler.defaultSelected;    
    }
    //--HiddenSelected
 if(W.U.isOK(Data.HiddenSelected)){
    
 this.HiddenSelected={};
  for(var q in Handler.defaultSelected){
   this.HiddenSelected[q]=W.U.extend(Data.HiddenSelected[q],Handler.defaultSelected[q]);
  }
  

    }else{
    this.HiddenSelected=Handler.defaultSelected;    
    }
   //--Option
  if(W.U.isOK(Data.Option)){
 
 this.Selected={};
     this.Option= W.U.extend(Handler.defaults(),  Data.Option);
  

    }else{
       this.Option= Handler.defaults();
    }
 
//--



//--
  this.Task=  W.U.positive(this.Task);
  

    switch( this.Task){
        
        case 0:
   this.TemplateNode=  W.T.location.TemplateTask0(this.Node,this.Data);
   this.setcomponent('mainaddress');
   this.setcomponent('town');
   this.setcomponent('city');
   this.setcomponent('state');
  this.setcomponent('country');
  //   this.setcomponent('addlocationbutton');
   this.setcomponent('phone');
        break;
      case 1:
   this.TemplateNode=  W.T.location.TemplateTask1(this.Node,this.Data);
  this.setcomponent('mainaddress');
//  this.setcomponent('otheraddress');
   this.setcomponent('town');
   this.setcomponent('city');
   this.setcomponent('state');
   this.setcomponent('country');
  //   this.setcomponent('addlocationbutton');
   this.setcomponent('phone');
        break;

        case 3:

    this.TemplateNode=  W.T.location.TemplateTask3(this.Node,this.Data);

   this.setcomponent('state');
   this.setcomponent('country');

       break;
    case 4:

    this.TemplateNode=  W.T.location.TemplateTask4(this.Node,this.Data);
    this.setcomponent('city');
    this.setcomponent('state');
    this.setcomponent('country');

       break;
    case 5:
    this.TemplateNode=  W.T.location.TemplateTask5(this.Node,this.Data);
W.U.console( this.TemplateNode);
  this.setcomponent('statelocationbycountry');
      break;
     case 6:
 this.TemplateNode=  W.T.location.TemplateTask6(this.Node,this.Data);

 this.setcomponent('locallocationbycountry');
  this.setcomponent('addlocationbutton');
      break;
        case 7://market search
 this.TemplateNode=  W.T.location.TemplateTask7(this.Node,this.Data);
  this.setcomponent('town');
 this.setcomponent('city');
    this.setcomponent('state');
    this.setcomponent('country');
      break;
      case 8 :// only postalCodebycountry select
 this.TemplateNode=  W.T.location.TemplateTask8(this.Node,this.Data);
   this.setcomponent('postalCodebycountry');
  this.setcomponent('country');

      break;
      case 9:
 this.TemplateNode=  W.T.location.TemplateTask9(this.Node,this.Data);
   this.setcomponent('multypostalCodebycountry');
    this.setcomponent('country');
      break;
      case 10:
 this.TemplateNode=  W.T.location.TemplateTask10(this.Node,this.Data);
   this.setcomponent('town');
 this.setcomponent('city');
    this.setcomponent('state');
    this.setcomponent('country');
      break;
      default:
    this.TemplateNode=  this.Option.onsetNode.bind(this)(this.Node,this.Data);
    this.Option.ontaskset.bind(this)();
    }
    
     //W.U.console(this);
        
    }else{
     console.info('Null data  fount in W.U.location');
    }
   

}
Handler.defaultSelected={
multypostalCodebycountry:[],
postalCodebycountry:[] ,
statelocationbycountry:[],
  locallocation:[] ,
   town:[] ,
    city:[] ,
    state:[] ,
    country:[] 

};

Handler.defaults=function(){
    var i={
onsetNode:W.U.noop,
ontaskset:W.U.noop,
onsetcomponent:W.U.noop,
onCountrySelect:W.U.noop,
onSateSelect:W.U.noop,
oncitySelec:W.U.noop,
ontownSelect:W.U.noop,
onlocallocationbycountrySelect:W.U.noop,
onpostalCodebycountrySelect:W.U.noop,
onmultypostalCodebycountrySelect:W.U.noop
};


    return i;

};

Handler.prototype.init=function(){
    


}
Handler.prototype.setcomponent=function(name){
    
     switch(name){
     case 'mainaddress':
  var  mainBlock=W.U.Rander(W.T.location.fields.mainaddress(this.Data));
  W.U.Setview(this.TemplateNode.mainaddress,mainBlock,'html');
     break;
  case 'otheraddress':
  var  mainBlock=W.U.Rander(W.T.location.fields.otheraddress(this.Data));
  
  W.U.Setview(this.TemplateNode.otheraddress,mainBlock,'html');  
     break;
   case 'town':
  var  mainBlock=W.U.Rander(W.T.location.fields.town(this));
  W.U.Setview(this.TemplateNode.town,mainBlock,'html');
     break;
     case 'city':
  var  mainBlock=W.U.Rander(W.T.location.fields.city(this));
  W.U.Setview(this.TemplateNode.city,mainBlock,'html');
     break;
   case 'state':
  var  mainBlock=W.U.Rander(W.T.location.fields.state(this));
 W.U.Setview(this.TemplateNode.state,mainBlock,'html');
     break;
   case 'country':
  var  mainBlock=W.U.Rander(W.T.location.fields.country(this));
  W.U.Setview(this.TemplateNode.country,mainBlock,'html');
     break;
   case 'phone':
  var  mainBlock=W.U.Rander(W.T.location.fields.phone(this));
  W.U.Setview(this.TemplateNode.phone,mainBlock,'html');
     break;
   case 'locallocationbycountry':
  var  mainBlock=W.U.Rander(W.T.location.fields.locallocationbycountry(this));
  W.U.Setview(this.TemplateNode.locallocationbycountry,mainBlock,'html');
     break;
   case 'statelocationbycountry':
  var  mainBlock=W.U.Rander(W.T.location.fields.statelocationbycountry(this));
  W.U.Setview(this.TemplateNode.statelocationbycountry,mainBlock,'html');
     break;
     case 'addlocationbutton':
var addLocation=W.T.location.addLocation;
 addLocation.presention=(W.I.wf=='mob')?'page':'model';

 W.U.Pager.addblockdata(W.T.location.addLocation);
 var  mainBlock=W.U.Rander(W.T.location.fields.addlocationbutton(this));
  W.U.Setview(this.TemplateNode.addlocationbutton,mainBlock,'html');
 
     break;

   case 'postalCodebycountry':
  var  mainBlock=W.U.Rander(W.T.location.fields.postalCodebycountry(this));
  W.U.Setview(this.TemplateNode.postalCodebycountry,mainBlock,'html');
     break;
   case 'multypostalCodebycountry':
  var  mainBlock=W.U.Rander(W.T.location.fields.multypostalCodebycountry(this));
  W.U.Setview(this.TemplateNode.multypostalCodebycountry,mainBlock,'html');
     break;
    default:
  var  mainBlock=W.U.Rander(this.onsetcomponent(this));
  W.U.Setview(this.TemplateNode.mainaddress,mainBlock,'html');
     }

}

Handler.prototype.onCountrySelect=function(id,name){
    
     switch(this.Task){
        case 0:
 this.Data.city={id:0,name:''};
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
  this.setcomponent('state');
  this.setcomponent('city');
  this.setcomponent('town');
this.setcomponent('addlocationbutton');
        break;
        case 1:
 this.Data.city={id:0,name:''};
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
  this.setcomponent('state');
  this.setcomponent('city');
  this.setcomponent('town');
   this.setcomponent('addlocationbutton');
        break;
  
    case 3:
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
  this.setcomponent('state');

        break;
    case 4:
 this.Data.city={id:0,name:''};
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
  this.setcomponent('state');
  this.setcomponent('city');
        break;
            case 7:
 this.Data.city={id:0,name:''};
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
this.setcomponent('state');
this.setcomponent('city');
this.setcomponent('town');
this.setcomponent('addlocationbutton');
        break;
        case 8 :
 this.Data.country={id:id,name:name};
 this.setcomponent('postalCodebycountry');
        break;
   case 9 :
 this.Data.country={id:id,name:name};
 this.setcomponent('multypostalCodebycountry');
        break;
   case 10:
 this.Data.city={id:0,name:''};
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
this.setcomponent('state');
this.setcomponent('city');
this.setcomponent('town');
this.setcomponent('addlocationbutton');
 W.I.location_info['country']={id:id,name:name};
        break;

        default :
       this.Option.onCountrySelect.bind(this)(id,name);

    }

}
Handler.prototype.onSateSelect=function(id,name){
    
     switch(this.Task){
        case 0:
 this.Data.city={id:0,name:''};

 this.Data.state={id:id,name:name};
   this.setcomponent('addlocationbutton');
  this.setcomponent('city');
   this.setcomponent('town');
        break;
        case 1:
 this.Data.city={id:0,name:''};

 this.Data.state={id:id,name:name};
   this.setcomponent('addlocationbutton');
  this.setcomponent('city');
     this.setcomponent('town');
        break;
    case 3:
 this.Data.city={id:0,name:''};

 this.Data.state={id:id,name:name};



        break;
   case 4:
 this.Data.city={id:0,name:''};
 this.Data.state={id:id,name:name};


  this.setcomponent('city');
        break;
   case 5:
    W.U.ccbk.Run(W.U.Page,'locallocationbycountrySelect',{id:id,name:name}); 
   
        break;
     case 7:
 this.Data.city={id:0,name:''};

 this.Data.state={id:id,name:name};
   this.setcomponent('addlocationbutton');
  this.setcomponent('city');
   this.setcomponent('town');
        break;
     case 10:
 this.Data.city={id:0,name:''};

 this.Data.state={id:id,name:name};
   this.setcomponent('addlocationbutton');
  this.setcomponent('city');
   this.setcomponent('town');
    W.I.location_info['state']={id:id,name:name};
        break;
   default :
       this.Option.onSateSelect.bind(this)(id,name);
    }

}
Handler.prototype.oncitySelect=function(id,name){
    
     switch(this.Task){
        case 0:
 this.Data.city={id:id,name:name};
   this.setcomponent('town');
 
        break;
        case 1:
 this.Data.city={id:id,name:name};
   this.setcomponent('town');
 
        break;
    case 7:
 this.Data.city={id:id,name:name};
   this.setcomponent('town');
 
        break;
case 10:
 this.Data.city={id:id,name:name};
   this.setcomponent('town');
    W.I.location_info['city']={id:id,name:name};
        break;
           default :
        this.Option.oncitySelect.bind(this)(id,name);
    }

}
Handler.prototype.ontownSelect=function(id,name){
    
     switch(this.Task){
        case 0:
 this.Data.town={id:id,name:name};

 
        break;
       case 1:
 this.Data.town={id:id,name:name};

 
        break;
     case 7:
 this.Data.town={id:id,name:name};

 
        break;
      case 10:
 this.Data.town={id:id,name:name};
    W.I.location_info['town']={id:id,name:name};
 
        break;
    default :
        this.Option.ontownSelect.bind(this)(id,name);
    }

}
Handler.prototype.onlocallocationbycountrySelect=function(id,name){
    

 W.U.ccbk.Run(W.U.Page,'locallocationbycountrySelect',{id:id,name:name}); 


}
 
Handler.prototype.onpostalCodebycountrySelect=function(id,name){
    

 W.U.ccbk.Run(W.U.Page,'postalCodebycountrySelect',{id:id,name:name}); 
}   

Handler.prototype.onmultypostalCodebycountrySelect=function(id,name){
    
   W.U.ccbk.Run(W.U.Page,'multypostalCodebycountrySelect',{id:id,name:name}); 
}   
////////////////////////
var location={};
function init(Node,DataKey){
    location= new Handler(Node,DataKey);
}


function set(datalocation){

   var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);


return '<div class="block" data-location="'+dataKey+'" ></div>';
}


   W.U.location={init:init,
     set:set 
   
   };

})(wowrol);

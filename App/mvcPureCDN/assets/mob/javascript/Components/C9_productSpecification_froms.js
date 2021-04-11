 ;(function (W) {
     "use strict";

 function FromWrap() {
            var ch = '';

            ch += '<div class="block "  data-nodeid="spflBblock" >Form not found</div>';

            var Wrap =W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="specifications12" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" data-nodeid="spflBtitle">Form Title</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="spflBsubmit"    ><span>Form Submit</span><i class="badge _gbtn"></i> </a></div>'
            }), ch);

            return Wrap;
        }

function CreateForm(){
var action=this.action;
 
        console.log('--==[CreateForm]==--');
      
       W.U.SetIdText('spflBtitle','Specifications','html');
       W.U.SetIdText('spflBsubmit','Save','text');
      $(W.U.id('spflBsubmit')).show();
        var data = this.data; 
        if(action == 'edit'){
   var id=(action == 'edit')?this.id:'';
   var spf=data.spfl[id];
   spf['pid']=data.pid;  
   spf['id']=id;   spf['act']=1; //edit
     W.U.SetIdText('spflBsubmit','Update','text');
    $(W.U.id('spflBsubmit')).show();
        }
 if(action == 'new'){
          
 var spf={"heading":"","specifications":[["",""]],'pid':data.pid,'id':'','act':1};
   
  
        }
     if(action == 'delete'){
   var id=this.id;
   var spf=data.spfl[id];
   spf['pid']=data.pid;  
   spf['id']=id;   spf['act']=0; //delete
        W.U.SetIdText('spflBsubmit','Delete','text');
       $(W.U.id('spflBsubmit')).show();
        }
 
      

  console.log(spf);
  console.log(data);

//--spflBspflBHandler


function spflBHandler (wrap,data){
      this.wrap=wrap;
      this.data=data;
      this.init();
  }

spflBHandler.prototype.init=function(){
      this.createMarkup(); 
  var tableMarkup = '<div class="block  bg_0" ><div class="block " data-help="sp_row"></div><div class="block spfc  m_b10 " >'+ this.Header+this.Body+this.DeleteBody +'</div></div>';
//console.log(this);
    W.U.AddDom(this.wrap, tableMarkup, 'html');

 W.U.id('spflBsubmit').onclick=this.submit.bind(this);
}
spflBHandler.prototype.createMarkup=function(){
     this.Header = '';
      this.Body = '';
    this.DeleteBody='';

     if(action == 'edit'||action == 'new'){
      this.Header = createHeader.bind(this)();
      this.Body = createBody.bind(this)();
     }
    if(action == 'delete'){
      this.DeleteBody = createDeleteBody.bind(this)();
     }

    //draw
     function createHeader() {
         var ch='<div class="block _bdy h "><div class="w8"><div class="block   po-re"><h3><input type="text" name="sp_heading" class="form-mold no-border " placeholder="Heading Name" data-Junction="sp_heading"  autocomplete="off" value="'+this.data.heading+'"></h3></div></div><div class="w4"><div class="right _bdy"><button type="submit" class="btn btn-xs t_t" data-Junction="addnewspfRow" >Add new row</button></div></div></div>';

 var _this=this;
   W.U.JunctionAdd(W.A.page.AppId,'addnewspfRow',function(){
    this.Node.onclick= AddRow.bind(_this);
   },{});  
      W.U.JunctionAdd(W.A.page.AppId,'sp_heading',function(){
    this.Node.onchange= function(){
        var value=this.value;
       _this.data.heading=value;

    }
   },{});


         return ch;


     }
     function createBody(){
         var ch='';
         var specification=this.data.specifications;
      for(var i in specification){
          ch+='<div class="block  po-re rl"><div class="w4 rl0"><input type="text" name="sp_name" class="form-mold" placeholder="Specifications Name" data-Junction="sp_name'+i+'"  autocomplete="off" value="'+specification[i][0]+'" ></div><div class="w8 rl1 ad-7"><textarea name="sp_value" class="form-mold" placeholder="Specifications Value" data-Junction="sp_value'+i+'"  rows="1" cols="30" autocomplete="off"   >'+specification[i][1]+'</textarea></div><button type="button" class="close po-ab ad-6" data-Junction="sp_close'+i+'" >×</button></div>';   
 var _this=this;
   W.U.JunctionAdd(W.A.page.AppId,'sp_value'+i,function(){
        var __this=this;
    this.Node.onchange= function(){
        var i=__this.data.id;
        console.log(__this);
         console.log(specification);
         console.log(i);
        var value=this.value;

       _this.data.specifications[i][1]=value;

    }
   },{id:i});
    W.U.JunctionAdd(W.A.page.AppId,'sp_name'+i,function(){
        var __this=this;
    this.Node.onchange= function(){
         var i=__this.data.id;
     
        var value=this.value;

        _this.data.specifications[i][0]=value;

    }
   },{id:i});
     W.U.JunctionAdd(W.A.page.AppId,'sp_close'+i,function(){
        var __this=this;
    this.Node.onclick= function(){
         var i=__this.data.id;
     
      
     _this.data.specifications.splice(i, 1);
    
      _this.init.bind(_this)();
    }
   },{id:i});
         }

         return ch;
     }
      function createDeleteBody(){
         var ch='<div class="block _bdy fw-b  "><span class="bg_0 fg_2 ff_3">Do you want to delete it?</span></div> <div class="block _bdy fw-b al-c tt-c">'+this.data.heading+'</div> ';
      

         return ch;
     }



     //
     function AddRow(){
      var empty=this.emptyCheck();

      if(this.data.heading==''){
          empty=1;
      }
       var specification=this.data.specifications;
         for(var i in specification){
        if(specification[i][1]==''||specification[i][0]==''){
               empty=1;   
             }

         }


    if(empty==0){
   this.data.specifications.push(['','']);
   this.init.bind(this)();   
         }else{
        var AlertError =  W.T.AlertError({message:['Fill the empty fields.']});
        $('[data-help="sp_row"]').html(AlertError);
         W.F.alert(); 
         }
  

         }
  


}

spflBHandler.prototype.submit=function(){
   var empty=this.emptyCheck();
       if(empty==0){
  var spf=this.data;
  var ProductData= data;
  var  formData={
      form:'AddSpecifications',
      spf:JSON.stringify(spf),
      pid:data.pid
      };

    W.U.ajax({
           url: W.U.URL('') + 'ajax/f0/p0',
                data: formData,
                context: this,
                type: 'POST',  
                beforeSend:function(){
                W.U.madianLoading('show');
                },
                success: function(data){
               var  ret = JSON.parse(data);
                      if (ret.state == 200) {
           W.U.madianLoading('hide'); 
          //ret.response 

          if(action=='new'){
        ProductData.spfl.push(spf);    
          }
        if(action=='edit'){
        ProductData.spfl[id]=spf;
          }
       if(action=='delete'){
    ProductData.spfl.splice(id, 1);
          }

     var newFrom=W.F.Forms["productSpecification"].bind({ data: ProductData, action: 'edit' })();
           W.U.AddDom(W.U.id('spfblock'),newFrom,'html');

                      }
        if (ret.state == 500) {
        W.U.madianLoading('hide'); 
         //ret.mistake

                      }


         
                }
                
                
                
                


       });

       }else{
        var AlertError =  W.T.AlertError({message:['Fill the empty fields.']});
        $('[data-help="sp_row"]').html(AlertError);
         W.F.alert(); 
         }
}
spflBHandler.prototype.emptyCheck=function(){
    var empty=0;

      if(this.data.heading==''){
          empty=1;
      }
       var specification=this.data.specifications;
         for(var i in specification){
        if(specification[i][1]==''||specification[i][0]==''){
               empty=1;   
             }

         }
         return empty;
} 


//-->>
  
new spflBHandler(W.U.id('spflBblock'),spf);


}
      




W.F.Forms["productSpecification"]=function(){
  //     console.log('--==productSpecification==--'); console.log(this);
    
 var ch = '<div class="block ">';
   var data = (typeof (this.data) == 'undefined') ? {} : this.data;  

       if (W.U.id('spfsubmit') != null) {
           
       if (this.action == 'edit') {
             W.U.SetIdText('spftitle','Specifications','html');
           
               $(W.U.id('spfsubmit')).hide();
                       
 
 console.log(data);
 
                


var productinfoCard=function(){
    var ch='';




    return ch;   
}

var newAddBtn='<div class="block m_b10 m_t10 _bdy"><a href="javascript:void(0);" class="btn btn-block" data-openbtn="specifications12" data-btnid="spflB" data-junction="specificationsNew"  ><span class="vl-sp fw-b">Add New Specifications</span><span class="vl-sp right">'+W.T.SVG('nextarrow',24,'#1d8ec0')+'</span></a></div>';

  W.U.JunctionAdd(W.A.page.AppId, 'specificationsNew', function () {
                    this.Node.onclick = function () {
                     
   
         CreateForm.bind({data:data,  action: 'new',id:0 })();


                    }

                }, {});


var List=function(data){
    var spfl=data.spfl;
    var pid=data.pid;
    var ch='';console.log(spfl);
    if(spfl.length>0){
     for(var i in spfl){
        ch+='<div class="block bg_0 "><div class="block spfc m_b10">';
        var header ='<div class="block _bdy h po-re"> <div class="block ov-hi">'+spfl[i].heading+'</div><div class="block ov-hi"> <a href="javascript:void(0);" class="span t_t" data-junction="onspecificationedit'+i+'" style="margin:0px 20px;">Edit&nbsp;&nbsp;</a><a href="javascript:void(0);" data-junction="onspecificationdelete'+i+'"  class="span t_t" >&nbsp;&nbsp;delete</a></div> </div>';

        var sbody='';


        ch+=header+sbody+'</div></div>';

  W.U.JunctionAdd(W.A.page.AppId,'onspecificationedit'+i,function(){
     var _this=this;
this.Node.onclick=  function(){
     CreateForm.bind({data:data,  action: 'edit',id:_this.data.id })();
   var event = jQuery.Event("show");
    event.id = 'spflB';
    $(W.U.id('block.' + 'spflB')).parent().triggerHandler(event);

}
  },{id:i});
   W.U.JunctionAdd(W.A.page.AppId,'onspecificationdelete'+i,function(){
     
     var _this=this;
this.Node.onclick=  function(){
     CreateForm.bind({data:data,  action: 'delete',id:_this.data.id })();
   var event = jQuery.Event("show");
    event.id = 'spflB';
    $(W.U.id('block.' + 'spflB')).parent().triggerHandler(event);

}
  },{id:i});  

    }    
    }
   
    return ch;
};



var SpecificationsFront=newAddBtn +List(data);

var SpecificationsBack=FromWrap();

             

var blockList=[SpecificationsFront,SpecificationsBack];
var blockName=["spflF","spflB"];
var setting ={
    name:'specifications12',
    target:'spflF',
    page:true,
    minheight:'auto'
};
   ch+=   W.T.ToggleBlock(blockList, blockName,setting);

   }else{//action ==new

   }

       }
ch+='</div>';

return ch;
}




 } )(wowrol);

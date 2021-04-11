/*
* 
*/
; (function(W){
   "use strict";

var S={
Wrap:function(x){
    var ch='';

 var ch='';

 var front='<div class="block"><div class="hide"><a class="hide" data-openbtn="frontpage" data-btnid="back"  ></a></div><div class="block" data-nodeid="frontpagefront" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';

 var back=W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="frontpage" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><span class="fw-b al-c tt-c"><span class="vl-sp" data-jqid="frontpagebackTitle" >View frontpage</span></<span></span>',
                done: '<div class="li b_gll tt-c" ><a href="javascript:void(0);"  data-jqid="frontpagebacksubmit" style="display:none;"  ><span>frontpage</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="frontpageback" ></div>');
   
var blockList=[front,back];
var blockName=["frontpagefront","frontpageback"];
var setting ={
    name:'frontpage',
    target:'frontpagefront',
    page:true,
    minheight:'auto'
};
   
   return W.T.ToggleBlock(blockList, blockName,setting);
   

},
CboxHeader:function(){
    var btn='<a href="javascript:void(0);" class="btn btn-xs btn-primary " data-btn="addCbox" >Add New</a>';
    if(this.data.length>=5){
       btn=''; 
    }

    var ch='<div class="block b_gtl b_grl b_gll _bdy "> <div class="block "> <div class="left"> <h3 style="margin-top: 3px;">Category boxes</h3> </div><div class="right">'+btn+'</div></div><div class="block "> <p class="block _bdy fg_4 fs-italic fs11">It helps visiters to view products of category quickly.</p></div></div>';


    return ch;

},
CboxBox:function(){
    var ch='<div class="block  bg_0   ">';
 
    if(this.data.length>0){
 ch+='<div class="block ul ">'; 
        for(var q in this.data){

          ch+='<div class="li _B-gray " > <div class="block _bdy"> <span class="fw-b tt-c">'+this.data[q].cN+'</span><br><div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);" data-btneditcbox="'+q+'" >Edit</a></span> <span> <a href="javascript:void(0);" data-btndeletecbox="'+q+'" >Delete</a></span></div></div></div>';      
        }
     ch+='</div>'; 
    }else{
       ch+='<div class="block m_b5 bg_0 _bdy"><div class="block"><div class="block al-c"><h3> Category boxes not added yet.</h3> </div></div></div>'; 
    }
     ch+='</div>'; 
    return ch;

},
CboxForm:function(x){
     var ch='<div class="block _bdy bg_0 _B-gray  ">';  var URL =W.U.URL;
    ch += '<div class="block  _bdy bg_0"><div data-help="addcategorybox"></div>'; 
    console.log(x);
          var token='';
                    var suggestion = {
                        name: 'category',
                        fireAfter: 4,
                        type: 2,
                        token: 'chips',
                        placeholder: 'Search Category'
                    }; 
                    if(x.cid!=''){
              token='<div class="li"><div class="token"> <span>' + x.cN + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.cid})  + '\' > </div></div>';
  token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';
                    }else{
                  token='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';    
                    }
                 

   ch += '<div class="form-piece"> <label class="control-label">Category</label> <div class="form-token block" data-junction="categorysuggestion0"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
                    W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestion0', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  



        ch += '<div class="block b_gtl  bg_0" ><div class="ul  block"><div class="li  _bdy fw-b">Product Type</div><div class="li " data-junction="cboxProductType" ></div></div></div>';

    //--
      W.U.JunctionAdd(W.A.page.AppId,'cboxProductType',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name: "sort", values: [0, 1, 2], valuesname: ["FRESH ARRIVALS","HIGH PRICE","LOW PRICE"], Selected: x.sort, Class: '', Listid: '0',callback:function(){
this.ListCheckBox.loadingOn();

//out business area
    

//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
 
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }});  





     ch+='</div>'; 
    return ch;

},
CboxDelete:function(x){
    var ch='<div class="block _bdy bg_0 _B-gray  ">'; 
    ch += '<div class="block  _bdy bg_0"><div data-help="addcategorybox"></div>'; 
    ch+='<div class="block spfc  m_b10 "><div class="block _bdy fw-b  "><span class="bg_0 fg_2 ff_3">Do you want to delete it?</span></div> <div class="block _bdy fw-b al-c tt-c">' + x.cN + '</div> </div>';
 ch+='</div>'; 
    return ch;
}
};



 W.T.DashboardFrontPage=S;
})(wowrol);
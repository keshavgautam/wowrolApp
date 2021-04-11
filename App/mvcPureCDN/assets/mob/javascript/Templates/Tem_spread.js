/*
* 
*/
; (function (W) {
    "use strict";
     var AppId=W.A.page.AppId;
    var spreadFormBody=function(x){

    var t=x.ctt;
     var text = t[(t.length - 1)].content;
      var ch='<form name="spreadform" id="spreadform" onsubmit="return false;"> <div class="block _B-gray  po-re"><div class="block " data-help="spreadform"></div><input type="hidden" name="sid" value="'+x.sid+'"><div class="block "> <textarea class="form-mold textarea no-border " name="spread_text" placeholder="Whats new with you?" rows="3">'+text+'</textarea> </div>';

   




    //-->>
      var form_row={reaction:true,tagfriend:false,tagproduct:false,privacy:false};
      switch(W.A.page.AppId){
       case 'HomePageBuyer':
      form_row.tagfriend=true;
        form_row.privacy=true;
       break;
          case 'HomePageStore':
    
        form_row.tagproduct=true;
       break;  



      }

      if(x.sid!=0){
         form_row.reaction=false;
          form_row.tagfriend=false;
      }

   if(form_row.reaction){
           ch += '<div class="block b_gtl  bg_0" ><div class="ul  block"><div class="li al-c _bdy fw-b">Reaction</div><div class="li " data-junction="spreadfromreaction" ></div></div></div>';

    //--
      W.U.JunctionAdd(W.A.page.AppId,'spreadfromreaction',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name: "fromreaction", values: [0, 1, 2,3], valuesname: ["Wow","Like", "Agree", "FeelSad"], Selected: 0, Class: '', Listid: '0',callback:function(){
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

        }else{
            ch+='<input type="hidden" name="fromreaction:0" value="0">';
        }

      if(form_row.tagfriend){
 var token = ''; var suggestion = {
                    name: 'buyerfriend',
                    fireAfter: 4,
                    type: '1',
                    token: 'chips',
                    dropdownModule:'cardentity',
                    placeholder: 'Friend Name',
                    hover: false
                };

    ch += '<div class="block b_gtl  bg_0" ><div class="form-piece"> <label class="block al-c _bdy fw-b">Tag Your friend</label> <div class="form-token block" data-junction="spreadfrombuyerfriend" > <div class="block bd"><div class="block ul ul-menu">' + token + '<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div></div> '; 
    
  W.U.JunctionAdd(W.A.page.AppId,'spreadfrombuyerfriend',function(){
      W.U.suggestion.bind({Node:this.Node,Value:this.data})();  
  },suggestion); 
      }

      if(form_row.privacy){
 ch += '<div class="block b_gtl  bg_0" ><div class="ul  block"><div class="li al-c _bdy fw-b">Privacy</div><div class="li " data-junction="spreadfromprivacy" ></div></div></div>'; 

      W.U.JunctionAdd(W.A.page.AppId,'spreadfromprivacy',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name: "spreadfromprivacy", values: [0,1,2,5], valuesname: ['Public','Friends','Friends Of Friends','Onlyme'], Selected: x.pyi, Class: '', Listid: '0', callback:function(){
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

      }else{
          ch+='<input type="hidden" name="spreadfromprivacy:0" value="0">';
      }
      
      if(form_row.tagproduct){

     var token = ''; var suggestion = {
                    name: 'productsuggestion',
                    fireAfter: 6,
                    type: '1',
                    token: 'chips',
                    placeholder: 'Product Name',
                    hover: false
                };
            if(x.prpo=='01'){
              for(var q in x.aoj){
        token += '<div class="li"><div class="token"> <span>' +  x.aoj[q].pN + '</span> <span class="sclose s_tclose"></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id: x.aoj[q].pid}) + '\' > </div></div>';
  }       
                }

     ch += '<div class="block b_gtl  bg_0" ><div class="form-piece"> <label class="block al-c _bdy fw-b">Promote Your Product</label> <div class="form-token block" data-junction="spreadfrompromoteProduct" > <div class="block bd"><div class="block ul ul-menu">' + token + '<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div></div>';
    
  W.U.JunctionAdd(W.A.page.AppId,'spreadfrompromoteProduct',function(){
      W.U.suggestion.bind({Node:this.Node,Value:this.data})();  
  },suggestion); 


     
         
      } 



      ch+='</div></form>';
      return ch;  
    }


    var S = {
        t0: function (x) {
            var ch = '';
            for(var q in x){
               ch += S.t00(x[q]);   
            }
         
    
            return ch;

        },
        t00: function (x) {
            var ch = '';
         
            ch += '<div class="block bg_0 _B-gray m_b10" data-spreadcard="'+x.sid+'" >';
            ch += S.header(x);
            ch += S.lagecy(x);
            ch += S.text(x);
            ch += S.action(x);
            ch += '</div>';
    
            return ch;

        },
        c0:function(x){
          var ch='';
           ch += '<div class="block bg_0 _B-gray m_b10"  >';
            ch += S.header1(x);
            ch += S.lagecy(x);
            ch += S.text(x);
            
            ch += S.commentwrap(x);
            ch += '</div>';


         return ch;
        },
        header: function (x) {
            var ch = '';
            var p=['public','friends','friends of friends',"","",'onlyme'];
       var moredata=[];
         moredata.push('<span class="span fg_4 ff_2 fs11">  '+x.hdg+'</span>');
              moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');
 moredata.push('<span class="span fg_4 ff_2 fs10">'+x.sdes+' </span>');
   moredata.push('<span class="span fg_4 ff_2 fs10">To '+p[x.pyi]+' </span>');

            ch += ' <div class="block _Bdy"><div class="w10"> '+W.T.C.C2_EntityStrip(x.ESd,{moredata:moredata})+'</div><div class="w2"><div class="right"><a href="javascript:void(0);" class="btn btn-link"  data-spreadeditlinkbtn="'+x.sid+'" >' + W.T.SVG('menuHori', 18, '#1274c0') + '</a></div></div></div>';
           ch+='<div class="block" data-spreadnodeid="EditLink:'+x.sid+'" >'+S.EditLink(x)+'</div>';  
          
            return ch;
        },
        header1: function (x) {
            var ch = '';
            var p=['public','friends','friends of friends',"","",'onlyme'];
       var moredata=[];
         moredata.push('<span class="span fg_4 ff_2 fs11">  '+x.hdg+'</span>');
              moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');
 moredata.push('<span class="span fg_4 ff_2 fs10">'+x.sdes+' </span>');
   moredata.push('<span class="span fg_4 ff_2 fs10">To '+p[x.pyi]+' </span>');
       ch += ' <div class="block _Bdy"><div class="w10"> '+W.T.C.C2_EntityStrip(x.ESd,{moredata:moredata})+'</div><div class="w2"></div></div>';
      
          
            return ch;
        },
        EditLink:function(x){
            var ch='';
                if(x.eid===x.veid){
               ch += '<div class="block bg_7" data-spreadeditlink ="'+x.sid+'" style="display:none;" > <div class="block _bdy"> <div class="right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-link" data-spreadedit ="'+x.sid+'" >Edit</a><a href="javascript:void(0);" class="btn btn-link" data-spreaddeleteask ="'+x.sid+':d">Delete</a></div></div></div></div>';   
            }else{
              ch += '<div class="block bg_7" data-spreadeditlink ="'+x.sid+'" style="display:none;" > <div class="block _bdy"> <div class="right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-link" data-spreaddeleteask ="'+x.sid+':r">Remove</a></div></div></div></div>';     
            }
            return ch;

        },
        lagecy: function (x) {
     //       console.log(x.prpo); console.log(x.aoj);
            var ch = '<div class="block _bdy " data-spread ="lagecy:'+x.sid+'" >';
            switch(x.prpo){
         case '01'://promostion prodcut
         if(x.aoj.length>0){

             ch+= S.ProductCard(x.aoj,'G2');
         }

         break;
         case '10'://category spread
 if(typeof (x.aojinfo.cN) != 'undefined'){
 ch += ' <div class=" block  bg_6"><div class=" block _bdy al-c "><h2><a href="'+x.aojinfo.slug+'"  title="'+x.aojinfo.cN+'">'+x.aojinfo.cN+'</a></h2></div><!-- images  container--><!-- images  container--></div>';
         }

         if(x.aoj.length>0){

             ch+= S.ProductCard(x.aoj,'G2');
         }

         break;                 
          case '11'://product spread
         if(x.aoj.length>0){
             ch+= S.ProductCard(x.aoj,'G2');
         }

         break; 
            }
   
            ch+='</div>';
       ch+='<div class="block _bdy "  >pid ='+x.pid+'</br>sid ='+x.sid+'</div>';
            return ch;
        },
        text: function (x) {
            var t=x.ctt;
              var text = t[(t.length - 1)].content;
            var ch = '<div class="block _bdy " data-spread ="text:'+x.sid+'" ><div class="block t pt"><p>' + text + '</p></div></div>';


            return ch;
        },
        action: function (x) {
             var ch='';
            //reaction state 0= No, 1 process ,2 done
         
          ch += ' <div class="block " data-junction="spreadaction'+x.sid+'" ></div>';

 W.U.JunctionAdd(W.A.page.AppId,'spreadaction'+x.sid,function(){
  W.U.spread_ViewReaction.SpreadReactionInit.bind({Node:this.Node,ID:this.data})();  
  },x.sid); 
 
            return ch;
        },
        commentwrap: function (x) {
            var ch = '<div class="block b_gtl " data-junction="commentwrap:'+x.sid+'"></div>';

  W.U.JunctionAdd(W.A.page.AppId,'commentwrap:'+x.sid,function(){
  W.U.SpreadComment.init.bind({Node:this.Node,spreadData:this.data})();  
  },x); 


            return ch;
        } ,
        ViewReactionWrap:function(x){
     var ch = '<div class="block b_gtl " data-junction="ViewReactionWrap:'+x.sid+'"></div>';

  W.U.JunctionAdd(W.A.page.AppId,'ViewReactionWrap:'+x.sid,function(){
   W.U.spread_ViewReaction.init.bind({Node:this.Node,spreadData:this.data})();  
  },x); 


            return ch;
        },
        paging:function(){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-pagingspread="0" >Load More</button></div>';
        return ch;

    } ,
        ProductCard:function(x,GClass){
          var ch='<div class="block '+GClass+'  m_b10 bg_0"  >';
         for(var q in x){
       ch+='<div class="block grid_gap bg_0" >'+W.T.C.C2_Prductcard(x[q],{})+'</div>'; 

         }
          
           ch+='</div>';
        return ch;
             
        },
        deletespread:function(x){
       
     var ch='<div class="block" > <div class=" _bdy bdr-s-s bdr-w-1 bdr-c-4"> <div class="block "> <div class="sr-w-6"> <p>Do you sure to delete this Spread?</p> </div><div class="sr-w-6 al-r"><a href="javascript:void(0);" class="btn btn-xs" data-reiniteditlink="'+x.sid+'"  >Cancel</a> <a href="javascript:void(0);" class="btn btn-xs" data-spreaddelete="'+x.sid+':d" >Delete</a></div> </div></div></div>';



         return ch;

     },
        removespread:function(x){
            
     var ch='<div class="block" > <div class=" _bdy bdr-s-s bdr-w-1 bdr-c-4"> <div class="block "> <div class="sr-w-6"> <p>Do you sure to Remove this Spread?</p> </div><div class="sr-w-6 al-r"><a href="javascript:void(0);" class="btn btn-xs" data-reiniteditlink="'+x.sid+'" >Cancel</a> <a href="javascript:void(0);" class="btn btn-xs" data-spreaddelete="'+x.sid+':r" >Remove</a></div> </div></div></div>';



         return ch;

     }
    };








 function Layout(){
   var ch='';
var spreadform='<div class="block bg_0 _B-gray  br-2 _bdy m_b10"><div class="left "><span class="fw-b fs14"> What\'s new with you?</span></div> <div class="right "><button class="btn _fbtn " data-spreadedit="0" ><span>Spread</span></button></div></div>';
  if(AppId=="ProfilePageBuyer"||AppId=="ProfilePageStore"){
    spreadform='';
  }
 var front='<div class="block"><div class="hide"><a class="hide" data-openbtn="spreadone" data-btnid="back"  ></a></div>'+spreadform+'<div class="block" data-nodeid="spreadonefront" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';

 var back=W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="spreadone" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><span class="fw-b al-c tt-c"><span class="vl-sp" data-jqid="spreadonebackTitle" >View Spread</span></<span></span>',
                done: '<div class="li b_gll tt-c" ><a href="javascript:void(0);"  data-jqid="spreadonebacksubmit" style="display:none;"  ><span>Spread</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="spreadoneback" ></div>');
   
var blockList=[front,back];
var blockName=["spreadonefront","spreadoneback"];
var setting ={
    name:'spreadone',
    target:'spreadonefront',
    page:true,
    minheight:'auto'
};
   
   return W.T.ToggleBlock(blockList, blockName,setting);
     
 }




    W.T.Spread = {Layout:Layout,
    spreadFormBody:spreadFormBody,
    S:S};
})(wowrol);
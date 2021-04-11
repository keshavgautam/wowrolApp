; (function (W) {
    "use strict";

    var S={
     t0: function (x) {
            var ch = ''; console.log(x);
            for(var q in x){
               ch += S.t00(x[q]);   
            }
         
    
            return ch;

        },
     t00: function (x) {
            var ch = '';
       
            ch += '<div class="block  _bdy  _B-gray  bg_6" data-commentcard="'+x.cid+'" >';
            ch += '<div class="_b block"><div class="w11">';
            ch+=' <div class="feed"><div class="feed-ob"> <a href="'+x.ESd.entityUrl+'"> <img class="sr-img-35" src="'+x.ESd.avatar+'" alt="..." data-src=""> </a> </div> <div class="feed-body">';
           ch+=S.header(x);
         ch+='<div class="block" data-commentnodeid="mid:'+x.cid+'" >'+S.mid(x)+'</div>';
       

         var edtbtn='<div class="right"><a href="javascript:void(0);" class="btn btn-link btn-xs"  data-commenteditlinkbtn="'+x.cid+'" >' + W.T.SVG('menuHori', 18, '#1274c0') + '</a></div>';  
         if(x.rf.show==1){
            edtbtn='';  
         }

            ch+='</div></div></div><div class="w1">'+edtbtn+'</div></div>';
        
            ch += '</div>';
    
            return ch;

        },
     header:function(x){
        var ch='<div class="block _pnl "> <span class="pnl0 truncate"><a  href="'+x.ESd.entityUrl+'" title="'+x.ESd.entityName+'">'+x.ESd.entityName+'</a></span> <span class="span mklabel  circular empty "></span></span> <span>@'+x.ESd.slug+'</span><span class="span"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time></span></div>';

        return ch;
    },
     mid:function(x){
      var ch='<div class="block">';
      
        if(x.eid===x.veid){
               ch += '<div class="block bg_7" data-commenteditlink ="'+x.cid+'" style="display:none;" > <div class="block _bdy"> <div class="right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-link" data-commentedit ="'+x.sid+':'+x.cid+'" >Edit</a><a href="javascript:void(0);" class="btn btn-link" data-commentdeleteask ="'+x.sid+':'+x.cid+':d">Delete</a></div></div></div></div>';   
            }else{
       ch += '<div class="block bg_7" data-commenteditlink="'+x.cid+'" style="display:none;" > <div class="block _bdy"> <div class="right"><div class="btn-group" role="group" ><a href="javascript:void(0);" class="btn btn-link" data-commentdeleteask ="'+x.sid+':'+x.cid+':r">Remove</a></div></div></div></div>';     
            }     
   
    if (x.rf.show == 1) {
            var width =W.U.Ratting.getWidthFromValue(x.rf.value);
     ch += '<div class="block "> <div class="di-ib po-re rating-pot "> <div class="di-ib po-re bstar-xs "> <div class="di-ib po-re fstar-xs" style="width: ' + width + '%;"> </div></div></div></div>';
        }

    ch+='<div class="block"  >'+S.text(x)+'</div>';
     // ch+='<div class="block"  >'+S.action(x)+'</div>';
    ch+='</div>';
        return ch;
    },
     text:function(x){
      
            var t=x.ctt;
              var text = t[(t.length - 1)].content;
        var ch='<div class="block t fs11" > <p>'+text+'</p> </div>';

        return ch;
    },
    action:function(){
        var ch='<div class="block fs11 "><div class="block   b_gbl"><div class="left"><div class="btn-group" role="group"><a href="Javascript:void(0);" class=" fs11"><span class="vl-sp">Wow</span> <i>' + W.T.SVG('wowOff', 12, '#1274c0') + ' <i class="vl-sp">3456</i></a></div></div></div><div class="block "><div class="block  "><div class="left "><p>You and 1245 people  wowed on this. </p></div><div class="left "><a href="javascript:void(0);">View</a></div></div></div></div>';


        return ch;

    },
     editcomment:function(x){
           
              var t=x.ctt, text = t[(t.length - 1)].content;
         var ch='<div class="block" ><form name="commenteditform:'+x.cid+'" onsubmit="return false;"> <div class="block _bdy bdr-s-s bdr-w-1 bdr-c-3"><div class="block "><div class="block "> <textarea class="form-mold textarea no-border " name="commenttext" placeholder="" rows="1" >'+text+'</textarea> </div></div><div class="block "><div class="row"><div class="block al-l" data-help="comment-form"> </div><div class=" al-r"><a href="javascript:void(0);" class="btn btn-xs" data-reinitcommentmid="'+x.sid+':'+x.cid+'"  >Cancel</a> <a href="javascript:void(0);" class="btn btn-xs"  data-commenteditsave="'+x.sid+':'+x.cid+'"   >Save</a></div></div></div></div></form ></div>';



         return ch;

     },
     deletecomment:function(x){
       
     var ch='<div class="block" > <div class=" _bdy bdr-s-s bdr-w-1 bdr-c-4"> <div class="block "> <div class="sr-w-6"> <p>Do you sure to delete this Comment?</p> </div><div class="sr-w-6 al-r"><a href="javascript:void(0);" class="btn btn-xs" data-reinitcommentmid="'+x.sid+':'+x.cid+'"  >Cancel</a> <a href="javascript:void(0);" class="btn btn-xs" data-commentdelete="'+x.sid+':'+x.cid+':d" >Delete</a></div> </div></div></div>';



         return ch;

     },
     removecomment:function(x){
            
     var ch='<div class="block" > <div class=" _bdy bdr-s-s bdr-w-1 bdr-c-4"> <div class="block "> <div class="sr-w-6"> <p>Do you sure to Remove this Comment?</p> </div><div class="sr-w-6 al-r"><a href="javascript:void(0);" class="btn btn-xs" data-reinitcommentmid="'+x.sid+':'+x.cid+'"  >Cancel</a> <a href="javascript:void(0);" class="btn btn-xs" data-commentdelete ="'+x.sid+':'+x.cid+':r" >Remove</a></div> </div></div></div>';



         return ch;

     },
    Loading:'<div class="block sr-bgC _bdy m_b5 al-c">'+ W.U.loading_svg(40,40)+'</div>',
    paging:function(SpreadID){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-commentpaging="'+SpreadID+'" >Load More</button></div>';
        return ch;

    } 
    };



function commentFrom(x,y){
  

     

  var ch ='<form name="commentform:'+x.sid+'"  data-junction="commentform:'+x.sid+'" onsubmit="return false;"></form>';
   
      W.U.JunctionAdd(W.A.page.AppId,'commentform:'+x.sid+'',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.SpreadComment.CommentSubmitData(x,y));   

  return ch;
}

function commentFromBody(data){
  var ch=''; 
  var x=data.SpreadData;
  var y=data.CommentData;
    var placeholder="Write a Comment", 
    ratting='',
    t=y.ctt, text = t[(t.length - 1)].content,
    comment_id=y.cid;
    console.log(x);  console.log(y);

    if(x.prpo=="11"){
    comment_id=x.rfinfo.cid;
   t=x.rfinfo.ctt;
    text = t[(t.length - 1)].content;
    placeholder="Write a Review", 
    ratting='<div class="block rating-pot _bdy" data-junction="spreadratting:'+x.sid+'"></div>'; 
     var ratingparameter = { name: 'productquality',
                        caption: { 0: '', 1: 'One Star', 2: 'Two Stars', 3: 'Three Stars', 4: 'Four Stars', 5: 'Five Stars' },
                        value: x.rfinfo.rf.value
                    };
  W.U.JunctionAdd(W.A.page.AppId,'spreadratting:'+x.sid,function(){
  W.U.Ratting.input.bind({Node:this.Node,data:this.data})();  
  },ratingparameter); 

   }
      ch += '<div class="block bg_0">';
      ch+='<div class="block m_b10"><input type="hidden" name="cid" value="'+comment_id+'">'+ratting+' <div class="input-group"> <textarea name="commenttext" class="form-mold textarea" placeholder="'+placeholder+'" rows="1" >'+text+'</textarea> <span class="input-group-btn"><button class="btn" type="submit" >Submit</button></span> </div></div>';  
   ch += '<div class="hide" data-help="commentform:'+x.sid+'"></div></div>';

    return ch;

}



 function Layout(x){
   var ch='';
 var CommentData= W.U.SpreadComment.GetCommentData(x.sid,0);


 var front='<div class="block"><div class="hide"><a class="hide" data-openbtn="spreadcommentone" data-btnid="back"  ></a></div>'+commentFrom(x,CommentData)+'<div class="block" data-nodeid="spreadcommentonefront" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';

 var back=W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="spreadcommentone" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><span class="fw-b al-c tt-c"><span class="vl-sp" data-jqid="spreadcommentonebackTitle" >View Spread</span></<span></span>',
                done: '<div class="li b_gll tt-c" ><a href="javascript:void(0);"  data-jqid="spreadcommentonebacksubmit" style="display:none;"  ><span>Spread</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="spreadcommentoneback" ></div>');
   
var blockList=[front,back];
var blockName=["spreadcommentonefront","spreadcommentoneback"];
var setting ={
    name:'spreadcommentone',
    target:'spreadcommentonefront',
    page:true,
    minheight:'auto'
};
   
   return W.T.ToggleBlock(blockList, blockName,setting);
     
 }


 W.T.SpreadComment={
 commentFromBody:commentFromBody,
 Layout:Layout,
    S:S
 };
  
})(wowrol);
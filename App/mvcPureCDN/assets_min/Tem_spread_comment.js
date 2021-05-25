; (function (W) {
    "use strict";
       var S={
     t0: function (x) {
            var ch = ''; 
          
            for(var q in x){
               ch += S.t00(x[q]);   
            }
         
    
            return ch;

        },
     t00: function (x) {
            var ch = '';
          var EditLink=[];
            ch += '<div class="block  _bdy bs-1  bg_0" data-spreadcommentcard="'+x.cid+'" >';
            ch += '<div class="_b block"><div class="w11">';
            ch+=' <div class="feed"><div class="feed-ob"> <a href="'+x.ESd.entityUrl+'"> <img class="sr-img-35" src="'+x.ESd.avatar+'" alt="..." data-src=""> </a> </div> <div class="feed-body">';
           ch+=S.header(x);
         ch+='<div class="block" data-commentnodeid="mid:'+x.cid+'" >'+S.mid(x)+'</div>';
       


          //--edit links
       if(x.eid===x.veid){
   EditLink.push({href:'javascript:void(0);',text:'Edit',icon:'',attrStr:'  data-commentedit ="'+x.sid+':'+x.cid+'" '});
     EditLink.push({href:'javascript:void(0);',text:'Delete',icon:'',attrStr:'data-commentdeleteask ="'+x.sid+':'+x.cid+':d"'});
   }else{

     EditLink.push({href:'javascript:void(0);',text:'Remove',icon:'',attrStr:'data-commentdeleteask ="'+x.sid+':'+x.cid+':r"'});
   }
   var dd_menu=' <div class="hide po-ab" data-block="menu">'+
   W.U.CreateMENU(EditLink,['block ul hover bg_0 fg_4 ff_3  bs-0','li _B-gray','block _Bdy',' tt-c  ',''])+'</div>';
      //--edit links


         var edtbtn='<div class="right"><a href="javascript:void(0);" class="btn btn-link btn-xs"   data-toggle="dropdown" >' + W.T.SVG('menuHori', 18, '#1274c0') + '</a>'+dd_menu+'</div>'; 
         
          
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
      
           
              var text = x.ctt;
              text =W.U.ParseText(text ) ;
        var ch='<div class="block t fs11" > <p>'+text+'</p><p> comment Id'+x.cid+'</p> </div>';
      
        return ch;
    },
    action:function(){
        var ch='<div class="block fs11 "><div class="block   b_gbl"><div class="left"><div class="btn-group" role="group"><a href="Javascript:void(0);" class=" fs11"><span class="vl-sp">Wow</span> <i>' + W.T.SVG('wowOff', 12, '#1274c0') + ' <i class="vl-sp">3456</i></a></div></div></div><div class="block "><div class="block  "><div class="left "><p>You and 1245 people  wowed on this. </p></div><div class="left "><a href="javascript:void(0);">View</a></div></div></div></div>';


        return ch;

    },
     editcomment:function(x){
           
              var t=x.ctt, text = x.ctt;
         var ch='<div class="block" ><form name="commenteditform:'+x.cid+'" onsubmit="return false;"> <div class="block _bdy bdr-s-s bdr-w-1 bdr-c-3"><div class="block "><div class="block "> <textarea class="form-mold textarea no-border " name="commenttext" placeholder="" rows="1" style="max-height:250px;" >'+text+'</textarea> </div></div><div class="block "><div class="row"><div class="block al-l" data-help="comment-form"> </div></div></div></div></form ></div>';



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

//----------------------
function CommentForm(x,y){
  var ch='';

  if(W.A.page.AcessData.LoginStatus){
       if(x.cp.w==1){
             ch='<form name="commentform:'+x.sid+'"  data-junction="commentform:'+x.sid+'" onsubmit="return false;"></form>';
     W.U.Junction('commentform:'+x.sid+'',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.SpreadComment.CommentSubmitData(x,y)); 

       }else{
         ch+='<div class="block _Bdy"><span></span></div>';    
       }
      
  }else {
      ch+='<div class="block _Bdy"><span>text_224</span></div>';
  }

  return ch;
}

function commentFromBody(data){
  var ch=''; 
  var x=data.SpreadData;
  var y=data.CommentData;
    var placeholder="Write a Comment", 
    ratting='',
    t=y.ctt, text = y.ctt,
    comment_id=y.cid;

  
    if(x.prpo=="11"||x.prpo=="12"){
    comment_id=x.rfinfo.cid;
   t=x.rfinfo.ctt;
    text =x.rfinfo.ctt;
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
      ch += '<div class="block bg_6  _bdy">';
      ch+='<div class="block m_b10 m_t10 "><input type="hidden" name="cid" value="'+comment_id+'">'+ratting+' <div class="block" data-junction="commenttextarea'+comment_id+'"  >   </div></div>';  
     ch +='<span class="input-group-btn hide"><button class="btn" type="submit" >Submit</button></span>';
   ch += '<div class="hide" data-help="commentform:'+x.sid+'"></div></div>';

    W.U.Junction('commenttextarea'+comment_id,function(){
        var _this=this;
    //   W.U.ccbk.Add(this.Node,'autosizeresized', onautosize);
 W.U.contentEditable.bind({Node: this.Node,data:{text:text,
                                                 name:'commenttext',
                                                 placeholder:placeholder,
                                                 onautosize:onautosize, 
                                                 layout:'layout3',
                                                 onsubmit:function(){ 
                                                   W.U.ccbk.Run(W.U.GetFORM('commentform:'+x.sid+''),'submit'); 
                                                  },
                                                 minheight:(20)
                                                 }
                                                 })();
   function onautosize(){
    if( (W.I.AppId!='spread'&& W.I.wf=='mob')||W.I.AppId=='productPageStore'&& W.I.wf=='web'){
   W.U.ccbk.Run(W.U.id('bottomfixwrap.spreadComment'+x.sid),'resizeouter'); 
      }
     
    }

  },{});  
    return ch;

}

//----------------------------
/*
* @ parameter => block data from W.U pager
*/
  function  mobLayout(block){
 
  var Header=W.T.ActivityHeader({ back: '<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="mainpage:blockFront"   >'+W.T.SVG('cross',24,'#f1f5fc')+' </a>',
               Title: '<span class=" block header-cell al-l fs14 ff-3"><span class="vl-sp" >View comments</span></span>',
                RightLink: '<div class="di-td"></div>'
            });
        //-------------
var x=block.objectdata;


     var mid =  '<div class="block "  data-junction="commentwrap:'+x.SpreadData.sid+'" ></div>';

     var foot=CommentForm(x.SpreadData,x.CommentData);
  W.U.Junction('commentwrap:'+x.SpreadData.sid,function(){
//W.U.SpreadComment.init( x.SpreadData);
var  PagingData=W.U.SpreadComment.PagingData;
  PagingData.TranseData={ifo:{sid:x.SpreadData.sid},pgd:1};
  PagingData.Node=  this.Node;
 
   PagingData.initent= W.U.paging.getintentname(PagingData.initent) +':'+x.SpreadData.sid;
  W.U.paging.init(PagingData);
  W.U.SpreadComment.init(x.SpreadData);

  },{}); 
        return  '<div class="block bg_6"   >'+W.T.BottomFixWrap(Header,mid,foot,'spreadComment'+x.SpreadData.sid)+'</div>'; 
    }
/*
* @ parameter => xsimple spread data 
*/
function  SpreadPageLayout(x){
        var defaultComment={"ESd":[],"sid":x.sid,"eid":0,"cid":0,"veid":"","ctt":'',"date":"","date_gmt":"","qati":{"total":0,"self":0,"pyi":0,"type":0},"rf":{"show":0,"value":0}};
     
  W.U.intentdata.add('spreadcomment.0',defaultComment);

 var CommentData=W.U.intentdata.get('spreadcomment.0'); 

 


     var mid =  '<div class="block"  data-junction="commentwrap:'+x.sid+'" ></div>';

       mid+=CommentForm(x,CommentData);
  W.U.Junction('commentwrap:'+x.sid,function(){
//W.U.SpreadComment.init( x.SpreadData);
var  PagingData=W.U.SpreadComment.PagingData;
  PagingData.TranseData={ifo:{sid:x.sid},pgd:1};
  PagingData.Node=  this.Node;
   PagingData.initent= W.U.paging.getintentname(PagingData.initent) +':'+x.sid;
  W.U.paging.init(PagingData);
  W.U.SpreadComment.init(x);

  },{}); 
        return mid;
    }
/*
* @ parameter => block data from W.U pager
*/
  function  webLayout(x){
        var defaultComment={"ESd":[],"sid":x.sid,"eid":0,"cid":0,"veid":"","ctt":'',"date":"","date_gmt":"","qati":{"total":0,"self":0,"pyi":0,"type":0},"rf":{"show":0,"value":0}};
  W.U.intentdata.add('spreadcomment.0',defaultComment);
       
 var CommentData=W.U.intentdata.get('spreadcomment.0'); 


     var mid =  '<div class="hide bg_6 b_gtl _Bdy"  >';
        mid+='<div class="block"  data-junction="commentwrap:'+x.sid+'" ></div>';
        mid+=CommentForm(x,CommentData);
        mid+='</div>';
  W.U.Junction('commentwrap:'+x.sid,function(){
      var  PagingData=W.U.SpreadComment.PagingData,_this=this;
  PagingData.TranseData={ifo:{sid:x.sid},pgd:1};
  PagingData.Node=  this.Node;
 PagingData.initent= W.U.paging.getintentname(PagingData.initent) +':'+x.sid;
  W.U.paging.init(PagingData);

       W.U.ccbk.Add('webspreadcommentshow'+x.sid,function(){
           $( _this.Node).parent().addClass('block').removeClass('hide');
             W.U.SpreadComment.init(x);

       });

  },{}); 
        return mid;
    }

 W.T.SpreadComment={
 SpreadPageLayout: SpreadPageLayout,
     mobLayout: mobLayout,
     webLayout:webLayout,
     commentFromBody:commentFromBody,
     S:S
 };
  
})(wowrol);



; (function (W) {
    "use strict";

       var Whirlgig_0_width=function(){
               var w=$('#page').find('.main_pane ').width();

if(W.I.wf=="web"){
             w=530;
           }

if(W.I.wf=="mob"){
       w=w-20;
}
           return w;
           }

function scalfit(img,i){
    var h=[],p=[],scale_ratio;

     for(var c in i){
         scale_ratio = (i[c].width / i[c].height);
         var r={};
          if ((img[c].width  /img[c].height) > scale_ratio) {
     r.width = img[c].height * scale_ratio;
     r.height =img[c].height;
    } else {
     r.width =img[c].width;
     r.height = img[c].width/ scale_ratio;
    }
      r.left=i[c].width-(img[c].width / 2) - (i[c].width / 2);
       r.top=i[c].height-(img[c].height / 2) - (i[c].height / 2);

     p={width:(i[c].width-4),height:i[c].height};
        h.push({i:i[c],r:r,p:p});
    
          }

       return h;
}

// portarit 1 images // landscape 1 images

function collageB1(img){
    var i=[],target_width,target_height;
    
       target_width= W.U.intval(Whirlgig_0_width());
       target_height=((1/(4/3))*target_width);
   i.push({
          width: target_width,
          height:target_height,
          left:0,
          top:0,
          url:img[0].url
          });
 
      return {images:scalfit(img,i),layoutdim:{width:target_width,height:target_height}};  
}
// portarit 2 images // landscape 2 images

function collageB2(img){
    var i=[],target_width,target_height;
    
       target_width= W.U.intval(Whirlgig_0_width());
       target_height=((1/(4/3))*target_width);
   i.push({
          width: ((target_width)/2),
          height:target_height,
          left:0,
          top:0,
          url:img[0].url
          });
    i.push({
          width:  ((target_width)/2),
          height:target_height,
          left:i[0].width,
          top: 0,
          url:img[1].url
          });
      return {images:scalfit(img,i),layoutdim:{width:target_width,height:target_height}};  
}


// landscape 3 images
function collageA3(img){
     var i=[],target_width,target_height;
    
       target_width= W.U.intval(Whirlgig_0_width());
       target_height=((1/(4/3))*target_width);
   i.push({
          width: target_width,
          height:((1/(5/2))*target_width),
          left:0,
          top:0,
          url:img[0].url
          });
    i.push({
          width:  (target_width/2),
          height:(target_height-i[0].height),
          left:0,
          top: i[0].height,
          url:img[1].url
          });
    i.push({
          width:  (target_width/2),
          height:(target_height-i[0].height),
          left: (target_width/2),
          top: i[0].height,
          url:img[2].url
          });

      return {images:scalfit(img,i),layoutdim:{width:target_width,height:target_height}};    
}

// patrait 3 images
function collageA4(img){
     var i=[],target_width,target_height;
    
       target_width= W.U.intval(Whirlgig_0_width());
       target_height=((1/(4/3))*target_width);
   i.push({
          width: (((4/3)*target_width)/2),
          height:target_height,
          left:0,
          top:0,
          url:img[0].url
          });
    i.push({
          width:  (((4/3)*target_width)/2),
          height:target_height,
          left:(((4/3)*target_width)/2),
          top: 0,
          url:img[1].url
          });
      return {images:scalfit(img,i),layoutdim:{width:target_width,height:target_height}};    
}
// landscape 4 images
 function collageA5(img){
        var i=[],h=[],left,top,scale_ratio,target_width,target_height;
    
       target_width= W.U.intval(Whirlgig_0_width());
       target_height=((1/(4/3))*target_width);

          i.push({
          width: target_width,
          height:(target_height/2),
          left:0,
          top:0,
          url:img[0].url
          });
          i.push({
          width: target_width/3,
          height:(target_height-i[0].height),
          left:0,
          top:i[0].height,
          url:img[1].url
          });
          i.push({
          width: target_width/3,
          height:(target_height-i[0].height),
          left:i[1].width,
          top:i[0].height,
          url:img[2].url
          });
          i.push({
          width: target_width/3,
          height:(target_height-i[0].height),
          left:(i[1].width+i[2].width),
          top:i[0].height,
          url:img[3].url
          });


         


      return {images:scalfit(img,i),layoutdim:{width:target_width,height:target_height}};
   }
// landscape 5 images
 function collageA6(img){
        var i=[],h=[],left,top,scale_ratio,target_width,target_height;
    
       target_width= W.U.intval(Whirlgig_0_width());
       target_height=((1/(4/3))*target_width);

          i.push({
          width: target_width,
          height:(target_height/2),
          left:0,
          top:0,
          url:img[0].url
          });
          i.push({
          width: target_width/3,
          height:(target_height-i[0].height),
          left:0,
          top:i[0].height,
          url:img[1].url
          });
          i.push({
          width: target_width/3,
          height:(target_height-i[0].height),
          left:i[1].width,
          top:i[0].height,
          url:img[2].url
          });
          i.push({
          width: target_width/3,
          height:(target_height-i[0].height),
          left:(i[1].width+i[2].width),
          top:i[0].height,
          url:img[3].url
          });


         


      return {images:scalfit(img,i),layoutdim:{width:target_width,height:target_height}};
   }


/*
*
*/
 function get_collage_oriention(img){
    var $oriention,$scale_ratio;
  
     $oriention=0;
       // $oriention 0=> landscape,1=>portait;
       
     
     
   
     $scale_ratio=(img[0].width / img[0].height);
    
 if($scale_ratio>1){
     $oriention=0;

 }else{
       $oriention=1;
 }


 
    
return $oriention;
}
//-------------------------------------------------------

   function show(x){
       
  var presention=(W.I.wf=='mob')?'page':'model'; 
 W.U.Pager.addblockdata({name:x.name, htmlStr:x.htmlStr,objectdata:x.objectdata,presention:presention});

 W.U.Pager.DirectTogglePage('mainpage',x.name); 
    }





     W.U.Collage={
         Create:function(img){
             
       var Jid=W.U.KKJ({
       controller:function(){     
  var   _this =this;
   this.img=img
   this.name=W.U.uId();
  function getImages(){
      var i={};
     if(W.U.count(img)>0){
         
   
      switch(W.U.count(img)){
          
case 1:
  i=collageB1(img);  
break;
case 2:
  i=collageB2(img);  
break;
case 3:
if(get_collage_oriention(img)==0){
  i=collageA3(img);  
}else{
 i=collageA3(img);   
}
break;
case 4:
i=collageA5(img);

break;
default:
 i=collageA6(img); 

      }

        }
      return i;
  }
 var imags=getImages();

  this.images=imags.images;
  this.layoutdim =imags.layoutdim;

  this.ViewZoom=function (){
    
     show({name:_this.name,htmlStr:W.T.Spread.Collage.ViewZoom,objectdata:_this.img});




  }


       }


 });

                return '<div class="block po-re ov-hi bs-5" data-kkcomponent="'+Jid+'" ><div class="block po-re bs-1 ad-13"   kk-style="this.layoutdim" ><a  class="block po-ab bs-1 ad-13" kk-repeat="images in this.images"  kk-style="images.i" href="javascript:void(0);"   kk-click="this.ViewZoom" kk-debug="this.ViewZoom" > <div class="block ov-hi po-re " kk-style="images.p"  ><img class="po-ab img"  src="{{images.i.url}}" rt-src="{{images.i.url}}"   kk-style="images.r"    ></div></a></div></div>';
              
         }

     };

    })(wowrol);
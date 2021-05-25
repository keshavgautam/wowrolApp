/*
* page set up 2
*/
; (function(W){
   "use strict";
var drawerContent={};
   drawerContent.left='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title left</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';
     drawerContent.top='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title top</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

    drawerContent.bottom='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title bottom</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

   drawerContent.right='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title bottom</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

 

//-------------------------------------
  function  drawer (block){
     var ch='';
          console.log(block);
       
 var formData=block.objectdata;
 
 switch(block.name){
case 'drawerleft':
ch+= drawerContent.left;
break;     
case 'drawertop':
ch+= drawerContent.top;
break;  
case 'drawerright':
ch+= drawerContent.bottom;
break; 
case 'drawerbottom':
ch+= drawerContent.right;
break;  
 
 }


 return  W.T.wrap('',ch,'');
 }

//-------------------------------------
   function firstBlock(){
       var ch='<div class="block ">';
//dialog
   ch+='<div class="block bg_0 _B-gray  br-2 _bdy m_b10">';

   ch+='<button class="btn _fbtn " data-pagerbtn="mainpage:testmodal:spg:0" ><span>modal</span></button>';

   ch+='<button class="btn _fbtn " data-pagerbtn="mainpage:testmodal:spg:0" ><span>modal</span></button>';

   ch+='</div>';


  //drawer
     ch+='<div class="block bg_0 _B-gray  br-2 _bdy m_b10">';

   ch+='<button class="btn _fbtn " data-pagerbtn="mainpage:drawerleft:spg:0" ><span>drawerleft</span></button>';

   ch+='<button class="btn _fbtn " data-pagerbtn="mainpage:drawertop:spg:0" ><span>drawertop</span></button>';

   ch+='<button class="btn _fbtn " data-pagerbtn="mainpage:drawerright:spg:0" ><span>drawerright</span></button>';
   ch+='<button class="btn _fbtn " data-pagerbtn="mainpage:drawerbottom:spg:0" ><span>drawerbottom</span></button>';

   ch+='</div>';






    ch+='<div class="block"  >' + W.T.DummyDiv('<button class="btn" data-pagerbtn="mainpage:'+'block.1"    > open Block </button>') + '</div>';


   ch+='</div>';

       var footer='';
       return  W.T.wrap('',ch,footer);


   }



















/////////////////////////////////-----------------------
   var ch='';
  
   var limit=5;


   var BlockList=[];
 var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};


     for (var q = 0; q <= limit; q++) {
    BlockList[q]={};
if(q==0){
       BlockList[q].htmlStr = firstBlock; ;
}else{
   BlockList[q].htmlStr  =  '<div class="block"  >' + W.T.DummyDiv('<button class="btn" data-pagerbtn="'+setting.name+':'+'block.'+
(q+1)+'"    > open Block '+(q)+'</button>') + '</div>';
}


       BlockList[q].name='block.'+q;
     }






setting. BlockList=BlockList;

 



//--
function Modeldata(){
    return {
name:'testmodal',
 Tilte:'Tilte',
 msg:'Message',
 body:'Message',  
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ alert('hi')}
};
}




//--



   
   ch+=W.T.Pager(setting);
  
   var newView=W.U.Rander('<div class="block" >'+W.T.Pane(ch)+'</div>');   
   
 


           W.U('#page').html(newView);

            W.U.intentdata.add('spg.0',{
                    spgid: 0,
                    Name: '',
                    des: '',
                    type: 0,
                    srng: [],
                    lif: [],
                    stcg: [],
                    Up:'Rs.',
                    Uw:'kg.' 

                });
    W.U.Pager.AddModal(Modeldata());

  W.U.Pager.addblockdata({   name:'drawerleft',   htmlStr: drawer,presention:'drawerleft'});
  W.U.Pager.addblockdata({   name:'drawertop',    htmlStr: drawer,presention:'drawertop' });
  W.U.Pager.addblockdata({   name:'drawerright',  htmlStr: drawer ,presention:'drawerright' });
  W.U.Pager.addblockdata({   name:'drawerbottom', htmlStr: drawer,presention:'drawerbottom'});

})(wowrol);


 
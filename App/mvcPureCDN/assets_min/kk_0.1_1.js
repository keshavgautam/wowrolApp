
var braketMatch=/({{)(.*?)(}})/igm;  
var EventArr=['kk-click','kk-input','kk-submit','kk-change','kk-reapet','kk-model']; 

/*
@des parse
*/

function Parse(Node,context,id){
     var _this=context;
   
    if(W.U.isOK(Node)){
       for (var i = 0; i < Node.length; i++) {
  var   dataAttrsToDelete = [];
             id=(W.U.isOK(id))?id+'.'+i:'0';
          
        
            Node[i]['kkid']=id;


          var   dataAttrs =Node[i].attributes;
          //------------
             if(W.U.isOK(dataAttrs)){
              for (var a=0; a<dataAttrs.length; a++) {

                 if(W.U.isOK(dataAttrs[a])){
          if( W.U.iskeyInArray(dataAttrs[a].name,DirectiveNameArr)){
               
              var DirectiveFn = Directive[dataAttrs[a].name];
               if(isFunction(DirectiveFn)){
                   DirectiveFn.bind(_this).call(this,Node[i],dataAttrs[a].value,id,context); 
// in repeat we delete node
     if(Node.length==0){
         a = dataAttrs.length;
           continue;
        }
               }
              

             
                if (W.U.isOK(dataAttrs[a])) { //for prevent error in nested repeat
                dataAttrsToDelete.push(dataAttrs[a].name);
               }
          }  
          
             if (W.U.isOK(dataAttrs[a])) { //for prevent error in nested repeat
            //all None kk Attribute
    Directive['none-kkattr'].bind(_this).call(this,Node[i],dataAttrs[a].name,dataAttrs[a].value,id,context); 
               }

                   
                 }  



              }     
             }
    // in repeat we delete node
     if(Node.length==0){
         continue;
        }
       if(W.U.isOK(Node[i])){
     for(var q in dataAttrsToDelete){
       
       if(Node[i].nodeType!=NODE_TYPE_TEXT){

          Node[i].removeAttribute(dataAttrsToDelete[q]);   
       }
   
     }        
          //---------
          if(Node[i].nodeType == NODE_TYPE_TEXT){
      Directive['text-replace'].bind(_this).call(this,Node[i],id); 
         //    Node[i].textContent=this.ReplaceDataInText(Node[i]);
          }
           

       //--work on nodename
     if (Node[i].childNodes.length>0) {
            Parse(Node[i].childNodes,context,id);
            }       
       }
              
       }    
    }


      
             
         return Node;   

}
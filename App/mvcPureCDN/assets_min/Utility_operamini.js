; (function(W){







    function changebutton(Node){
     if(Node.nodeName=="BUTTON"){
           var newNode= W.U.createElement('a');
           newNode.href="javascript:void(0);";
           newNode.classList=Node.classList;
           newNode.innerHTML=Node.innerHTML;
           newNode.onclick=Node.onclick;
           Node.parentNode.replaceChild(newNode, Node);
           return newNode;
     }
        return Node; 
    }


    W.U.OperaMini={
       changebutton:changebutton

    };



    })(wowrol);
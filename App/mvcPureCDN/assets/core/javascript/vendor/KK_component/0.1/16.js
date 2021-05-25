/*
@des - directive kk-repeat
*/

;RagisterDirective('kk-switch', function (Node, Expression, id, context) {
    var ParentNode = Node;
 
 
      context.To_updateList.push( new SwitchDirective(ParentNode, Expression,ParentNode.kkid, context));
  
});
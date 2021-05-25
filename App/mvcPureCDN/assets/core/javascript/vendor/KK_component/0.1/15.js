/*
@des - directive kk-model
*/
;RagisterDirective('kk-show', function (Node, Expression, id, context) {
  




  context.To_updateList.push(new ShowDirective(Node, Expression, id, context));

});
/*
@des - directive kk-model
*/
;RagisterDirective('kk-class', function (Node, Expression, id, context) {
  




    context.To_updateList.push(new ClassDirective(Node, Expression, id, context));

});
/*
@des - directive all None kk-getNode
*/

;RagisterDirective('kk-debug', function (Node, Expression, id, context) {

   
 context.To_updateList.push(new DebugDirective(Node, Expression, id, context));

});

/*
@des - directive all None kk-getNode
*/

;RagisterDirective('kk-style', function (Node, Expression, id, context) {

   
 context.To_updateList.push(new StyleDirective(Node, Expression, id, context));

});


/*
@des - directive all None kk-getNode
*/


;RagisterDirective('kk-whirlgig', function (Node, Expression, id, context) {
       context.To_updateList.push(new WhirlgigDirective(Node, Expression, id, context));
 
 

});

/*
@des - directive all None kk-pager
*/


;RagisterDirective('kk-pager', function (Node, Expression, id, context) {
       context.To_updateList.push(new PagerDirective(Node, Expression, id, context));
 
 

});

/*
@des - directive all None kk-fileuploader
*/


;RagisterDirective('kk-fileuploader', function (Node, Expression, id, context) {
       context.To_updateList.push(new FileUploaderDirective(Node, Expression, id, context));
 
 

});

/*
@des - directive all None kk-fileuploader
*/


;RagisterDirective('kk-listcheckbox', function (Node, Expression, id, context) {
       context.To_updateList.push(new LISTCheckBoxDirective(Node, Expression, id, context));
 
 

});


/*
@des - directive all None kk-fileuploader
*/


;RagisterDirective('kk-selectbox', function (Node, Expression, id, context) {
       context.To_updateList.push(new SelectBoxDirective(Node, Expression, id, context));
 
 

});
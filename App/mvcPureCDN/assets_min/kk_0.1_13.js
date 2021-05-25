/*
@des - directive kk-model
*/
;RagisterDirective('kk-model', function (Node, Expression, id, context) {
    var _this = this;

    switch (Node.type) {
        case 'search':
        case 'text':
        case 'number':
        case 'textarea':
            EventListener.listen(Node, 'input', function (e) {
                this.IsEventGenrater = true;
                var Value = this.value;
                var Exp_data = ParseExpression(Expression);
                var path = CreateVariblePath(Exp_data);

                var opk = FindPathValue(path, context.data);
                if (opk != null) {

                    SetPathValue(context.data, path, Value);
                    context.update_source = 'kk-model';
                    context.UpdateView();
                }


            });
            break;
        case 'file':
            EventListener.listen(Node, 'change', function (e) {
              
                this.IsEventGenrater = true;
                var Value = (this.checked) ? true : false;
                var Exp_data = ParseExpression(Expression);
                var path = CreateVariblePath(Exp_data);
                var opk = FindPathValue(path, context.data); ;

                if (opk != null) {

                    if (isFunction(opk)) {
                        opk.bind(this).call(this, e);
                    }
                    context.update_source = 'kk-model';
                    context.UpdateView();
                }
            });
            break;
        case 'radio':
        case 'checkbox':

            EventListener.listen(Node, 'change', function (e) {

                this.IsEventGenrater = true;
                var Value = (this.checked) ? true : false;
                var Exp_data = ParseExpression(Expression);
                var path = CreateVariblePath(Exp_data);
                var opk = FindPathValue(path, context.data); ;

                if (opk != null) {

                    SetPathValue(context.data, path, Value);
                    context.update_source = 'kk-model';
                    context.UpdateView();
                }
            });
            break;
        case 'select-one':
            EventListener.listen(Node, 'change', function (e) {
                this.IsEventGenrater = true;
                var Value = this.value;
                var Exp_data = ParseExpression(Expression);
                var path = CreateVariblePath(Exp_data);

                var opk = FindPathValue(path, context.data); ;
                if (opk != null) {

                    SetPathValue(context.data, path, Value);
                    context.update_source = 'kk-model';
                    context.UpdateView();
                }


            });
            break;
    }


    _this.To_updateList.push(new RagisterBinding(Node, Expression, _this));

});
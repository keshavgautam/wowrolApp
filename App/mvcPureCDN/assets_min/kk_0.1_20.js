/*

*/

function RagisterBinding(Node,Expression) {
    this.Node = Node;
    this.Expression = Expression;
   
}

RagisterBinding.prototype = {
    UpdateView: function (context) {

        // var oldval = FindtextValue.bind(context.old_data)(this.Expression, context);
        var newval = FindtextValue.bind(context.data)(this.Expression, context);
        var IsEventGenrater = (isOK(this.Node.IsEventGenrater)) ? this.Node.IsEventGenrater : false;

        //check for parent data in repeat
        if(isOK(context.data.$parent)&&(newval==null)){
      newval = FindtextValue.bind(context.data.$parent)(this.Expression, context);   
        }

        //oldval != newval &&
        if ((!IsEventGenrater)) {



            switch (this.Node.nodeName) {
                case 'INPUT':
                    switch (this.Node.type) {
                        case 'radio':
                        case 'checkbox':
                            this.Node.checked = (newval) ? true : false;
                            break;

                        default:
                            this.Node.value = newval;
                    }


                    break;
                case 'SELECT':

                    this.Node.value = newval;

                    break;
                case 'TEXTAREA':

                    this.Node.value = newval;

                    break;
                default:
                    if (isOK(newval)) {
                        this.Node.textContent = this.GetStr(newval);
                    }



            }
           
            //for debugger
            if (isOK(this.Node.kk_debugger)) {
                this.Node.kk_debugger();
            }

        }

        if (IsEventGenrater) {
            this.Node.IsEventGenrater = false;
        }

    },
    GetStr: function (newval) {
        var str = '';
        var match;

        if (isOK(this.Node.isTextReplcementApplied)) {
            str = this.Node.textContentStr;
            match = this.Node.TextReplcementMatch;

            for (var q = 0; q < match.length; q++) {
                if (this.Expression == match[q].name) {

                    match[q].value = newval;
                }

                str = str.replace('{{' + match[q].name + '}}', match[q].value);
            }

            this.Node.TextReplcementMatch = match;
        }


        return W.U.GetText(W.F.makeHTML(str));
    }













};
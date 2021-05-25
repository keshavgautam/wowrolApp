/*
@des - directive text-replace
*/
;RagisterDirective('text-replace', function (Node, id) {
    var _this = this;
    // 
    var text = Node.textContent;
    var match = text.match(braketMatch);

    if (isOK(match)) {

        var TextReplcementMatch = [];

        for (var q = 0; q < match.length; q++) {
            match[q] = match[q].substring(2, (match[q].length - 2));

            _this.To_updateList.push(new RagisterBinding(Node, match[q], _this));
            TextReplcementMatch.push({ name: match[q], value: '' }); ;
        }

        Node.textContentStr = text;
        Node.TextReplcementMatch = TextReplcementMatch;
        Node.isTextReplcementApplied = true;



    }

   
});
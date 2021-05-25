<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script>

    var timestamp = null;


    function waitforMsg() {


        $.ajax({
            type: "GET",
            url: "getdata.php?timestamp=" + timestamp,
            async: true,
            cache: false,
            success: function (data) {
                var json = eval('(' + data + ')');
                if (json['msg'] != '') {
                    var splitted = json['msg'].split("\n");
                    if (splitted.length > 2000) {
                        empty();
                    }
                   // splitted.reverse();
                    $("#div1").html('<div style="display:block;">' + splitted.join('<br>') + '</div><br>');
                }
                if (json['difference'] != 0) {
                    //debugger;
                }
                timestamp = json['timestamp'];
                setTimeout(waitforMsg, 1000);

            },
            error: function (result) {

            }




        });

    }


    function empty() {


        $.ajax({
            type: "GET",
            url: "empty.php?timestamp=" + timestamp,
            async: true,
            cache: false,
            success: function (data) {


            },
            error: function (result) {

            }




        });

    }


    $(document).ready(function () {
        waitforMsg();
    });

</script>
</head>
<body>

<div id="div1"><h2>Let jQuery AJAX Change This Text</h2></div>


</body>
</html>
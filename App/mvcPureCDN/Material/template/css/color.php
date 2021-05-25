<style>
            div.row {
            margin:  30px 0px;
          
            }
            
            div.block  [class^=w3 ] {
  padding-top: 10px;
  padding-bottom: 10px;
 
  border: 1px solid #ddd;
  border: 1px solid rgba(86,61,124,.2);
}
        </style>
<div class="block">
         <div class="block" id="result">

        
 


                 
 
</div></div>


<script>
    var ch = '<div class="block">';
    for (var i = 0; i < 14; i++) {
        for (var r = 0; r < 18; r++) {
            for (var p = 0; p < 14; p++) {

                ch+=' <div class="w3 h50 bg_' + i + ' fg_' + r + ' ff_' + p + ' fw-b"> bg_' + i + '  fg_' + r + ' ff_' + p + '</div>';

            }
        }
    }
    ch += '</div >';
    wowrol.U.AddDom(document.getElementById('result'),ch , 'append');
        </script>
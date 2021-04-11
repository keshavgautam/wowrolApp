<?php


  $files = dirToArray(ROOT.'/Material/template') ;
 
?>
/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";




  var Material={<?php 

 $str='';
 $folderlength=1; 
 foreach( $files as  $folder=>$subfile ){
     $subfilelength=1;
     $str.=''. $folder.': [';
     $folderdata=array();
     if(is_array($subfile)){
     foreach($subfile as $file_link){
          $str.='"'. $file_link.'"';
  
   if($subfilelength<count($subfile)){
       $str.=','; 
     }

    
     $subfilelength++;

     }
     }
        
       $str.=']';
   if($folderlength<count($files)){
       $str.=','; 
     }
     $folderlength++;
 }
 echo $str;
  ?>};

   



   var Landing=function(x){
var ch=' <style>html, body{width: 100%; min-height: 100%; margin: 0; font-family: "Helvetica", "Arial", sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;}table, th, td{border: 1px solid black; border-collapse: collapse;}table{border-spacing: 5px;}th{text-align: left;}th, td{padding: 15px;}</style>';

for (var q in Material) {
    ch += '<table class="block m30_0" border="1" style="width:100%"><caption> <h3  class="al-c">' + q+ '</h3></caption>';
    
        var col = 0;
        var subfile = Material[q];
        for (var p in subfile) {
            if (col == 0) {
                ch += '<tr>';
            }

            ch += '<td><a href="/getmaterial?folder=' +q + '&file=' + subfile[p] + '" target="_blank">' + subfile[p]  + '</a></td>';
  col++;
            if (col == 3) {
                ch += '</tr>';col = 0;
            }
        }



   


ch+='</table>';
}
  var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
       

     return  W.T.wrap(header,ch,footer);
   }
   
    

   





     W.M.Material =  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

 } )(wowrol);
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

   



   var Madian=function(x){
var ch=' <style>html, body{width: 100%; min-height: 100%; margin: 0; font-family: "Helvetica", "Arial", sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;}table, th, td{border: 1px solid black; border-collapse: collapse;}table{border-spacing: 5px;}th{text-align: left;}th, td{padding: 15px;}</style>';

for (var q in Material) {
    ch += '<div class="block m30_0"  ><div> <h3  class="al-c">' + q+ '</h3></div><div class="ul ul-menu" > ';
    
        var col = 0;
        var subfile = Material[q];
        for (var p in subfile) {
            if (col == 0) {
                ch += '<div class="li " >';
            }

            ch += '<a class="block _Bdy bs-1" href="/getmaterial?folder=' +q + '&file=' + subfile[p] + '" target="_blank" >' + subfile[p]  + '</a>';
  col++;
            if (col == 3) {
                ch += '</div>';col = 0;
            }
        }



   


ch+='</div></div>';
}


  
       

     return ch;
   }
   
    

   




  W.M[W.A.page.AppId]=  {
     
Madian:Madian

     };

 } )(wowrol);
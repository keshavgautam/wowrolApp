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
         <div class="block">

             <?php for($i=0;$i<9;$i++){
     
     for($r=1;$r<11;$r++){
      for($p=1;$p<4;$p++){
         echo ' <div class="w3 bg_'.$i.' p_10 fg_'.$r.' ff_'.$p.' fw-b"> bg_'.$i.'  fg_'.$r.' ff_'.$p.'</div>';

 }
 }


 }?>
                 
 
</div></div>
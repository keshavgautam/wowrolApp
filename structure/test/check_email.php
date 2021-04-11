<?php
    
// your folder name, here I am using templates in root
$directory = 'C:/xampp/mailoutput/';
foreach (glob($directory."*.txt") as $filename) {
    $file = realpath($filename);
    
    rename($file, str_replace(".txt",".eml",$file));
}
var_dump(glob($directory."*.txt"));
?>
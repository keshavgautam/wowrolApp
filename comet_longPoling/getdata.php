<?php
   // mvcPureCDN/updater_0/response.txt
$fileame=$_SERVER['DOCUMENT_ROOT'].'/App/mvcPureCDN/updater_0/response.txt';

$lastmodif=isset($_GET['timestamp'])?$_GET['timestamp']:0;
$currentModif= filemtime($fileame);
$wait=60;
$start=time()+$wait;


while ($currentModif <=$lastmodif){
    usleep(10000);
    clearstatcache();
$currentModif= filemtime($fileame);
$end=time();
if($end>$start){
    $currentModif=$end;
}

}


$reponse =array();
$response ['msg'] =file_get_contents($fileame);
$response ['timestamp']=$currentModif;
$response ['lastmodif']=$lastmodif;
$response ['check']=($currentModif <=$lastmodif);
$response ['difference']=($currentModif-$lastmodif);
$response ['fileame']=$fileame;

echo json_encode($response);






?>
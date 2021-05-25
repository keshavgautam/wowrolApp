<?php
  

    
/**
array(1) {
  ["filename"]=>
  array(5) {
    ["name"]=>
    string(15) "3mdb24AwGQ_.png"
    ["type"]=>
    string(9) "image/png"
    ["tmp_name"]=>
    string(24) "C:\xampp\tmp\phpEAF4.tmp"
    ["error"]=>
    int(0)
    ["size"]=>
    int(2995)
  }
}


* @description=>this class has all ragistration mathod.
* @param  => 
* @return => 
*/
class ImageUpload{
    

 /**
* @description=>this class has all ragistration mathod.
* @param  => 
* @return => 
*/

public function ImageUploadToS3($args){
    $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'Store','message'=>array()));  
   $args['ActorEntityData']=$GLOBALS['Var_ActorEntityData'];
    //getting image id

   $GetImageId=  $this->GetImageId($args);
    $Imagekey=   $GetImageId['key'];
     $uploadName= $GetImageId['name'];

   if($GetImageId['is_moved']){
 

 //Amazon S3 PHP Class  
$credentials = new Aws\Credentials\Credentials('AKIAJVKLMFUSXDEJC3LQ','glNbbjVydrd2Ds2KaDVR6urz0RLHzgziWlxyCGVB');
// Instantiate the S3 client with your AWS credentials
$s3Client = Aws\S3\S3Client::factory(array(
    'credentials' => $credentials,
     'version' => 'latest',
    'region'  => 'ap-south-1'
));
  
   
// Upload a publicly accessible file. The file size and type are determined by the SDK.
try {
  $putobjectresult=  $s3Client->putObject([
        'Bucket' => 'wowrol',
        'Key'    =>  $uploadName,
      'Body'   =>  $args['Body'],
      'ContentType'  => $args['ContentType'],
        //'SourceFile' => $GetImageId['filelocalPath'],
        'ACL'    => 'public-read',
    ]);

 //check_response($putobjectresult['ObjectURL']);
 $GetImageId['ObjectURL']=$putobjectresult['ObjectURL'];
 // update the image url
 $this->UpdateImage(array('ObjectURL'=>$GetImageId['ObjectURL'] ,'image_id'=> $GetImageId['image_id']));

 //deleteing local copy  
//chown(realpath($GetImageId['filelocalPath']),456);
//unlink(realpath($GetImageId['filelocalPath']));
   $arr['state']=200;
  $arr['response']=array('url'=>$GetImageId['ObjectURL'],
                         'key'=>$GetImageId['key'],
                         'id'=>$GetImageId['id'],
                         'width'=>$args['width'],
                         'height'=>$args['height'],
                         'name'=>$GetImageId['name'],
                         'hash'=>$GetImageId['hash']
                         );



} catch (Aws\Exception\S3Exception $e) {
 // $e->getMessage();
  $arr['mistake']['message'][]="There was an error uploading the file.\n";
      return  $arr ;
}


}

    
    return  $arr ;
}
/*
* @des
* @parem
* @return 
*/
public function GetImageId( $args){
    $storage_info=0;
       $update_hash=generate_random_string(10,TRUE,TRUE,FALSE,FALSE);

   
   $GetImageId=$GLOBALS['Var_DBMysqli']->insert(DB_NAME_UTILITY_0,'images_0', array('storage_info','entity_id','update_hash','time_node','filesize','width','height'),array($storage_info, $args['ActorEntityData']['EntityData']['entity_id'], $update_hash,time(),$args['filesize'],$args['width'],$args['height']));

  $key=$storage_info.'_'.$GetImageId.'_'.$update_hash;
  $NewName=$key.'.'.$args['ImageExt'];
  $filelocalPath= TEMP_PHOTOS.'/'.$NewName;
//  $is_moved= move_uploaded_file($temp_file,  $filelocalPath);
$is_moved=TRUE;

   return array(
    'id'=> $GetImageId,
   'key'=> $key,
   'image_id'=> $GetImageId,
   'hash'=>$update_hash,
   'name'=>$NewName,
   'filelocalPath'=>$filelocalPath,
   'is_moved'=>$is_moved
   );
}
/*
* @des
* @parem
* @return 
*/
public function UpdateImage($args){

      $GetImageId=$GLOBALS['Var_DBMysqli']->update(DB_NAME_UTILITY_0,'images_0', array('ObjectURL'),array($args['ObjectURL']),array('image_id'),array($args['image_id'])); 

}


/*
* @des Deleting an Object from a Non-Versioned Bucket
* @parem
* @return 
*/
public function DeleteImage($args){
    

     //Amazon S3 PHP Class  
$credentials = new Aws\Credentials\Credentials('AKIAJVKLMFUSXDEJC3LQ','glNbbjVydrd2Ds2KaDVR6urz0RLHzgziWlxyCGVB');
// Instantiate the S3 client with your AWS credentials
$s3Client = Aws\S3\S3Client::factory(array(
    'credentials' => $credentials,
     'version' => 'latest',
    'region'  => 'ap-south-1'
));

$result =$s3Client->deleteObject(array(
    'Bucket' => 'wowrol',
    'Key'    => $args['Key']
));  




}


}



$GLOBALS['Var_ImageUpload'] =new ImageUpload();






?>
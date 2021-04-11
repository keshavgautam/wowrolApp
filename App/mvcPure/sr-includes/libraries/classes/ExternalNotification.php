<?php

 
 /**
 *  $ExternalNotification=\class_ExternalNotification\ExternalNotification::SendEmail();
 */
 class ExternalNotification{
  
  
  
  
 /**
* @description=> send the activation code.
* @param  => 
* @return => 
*/
public function SendActivationCode($args=array()){
    
    switch($args['identity_type']){
        case 'email':
         $Dispaly_name=$args['login_identity'];
         $emailargs=array('setFrom'=>array('address'=>setFrom_Email,
                                       'name'=>'Wowrol'),
                     'ReplyTo'=>array('address'=>ReplyTo_Email,
                                       'name'=>'Wowrol'),
                     'SentTo'=>array('address'=>$args['login_identity'],
                                       'name'=>$Dispaly_name),
                     'Subject'=>'Wowrol Account Activation',
                     'msgHTML'=>$this->TemplateEmail('Account_activation',array('To_name'=>$Dispaly_name,'account_activation_key'=>$args['account_activation_key'])),
                     'AltBody'=>'' );
           $ExternalNotification=$this->SendEmail($emailargs);
        break;
        case 'phone':

        break;

    }
    


} 
/**
* @description=> send the activation code.
* @param  => 
* @return => 
*/  
 public function ResendVerificationCode($args=array()){
    
    switch($args['identity_type']){
        case 'email':
         $Dispaly_name=$args['login_identity'];
         $emailargs=array('setFrom'=>array('address'=>setFrom_Email,
                                       'name'=>'Wowrol'),
                     'ReplyTo'=>array('address'=>ReplyTo_Email,
                                       'name'=>'Wowrol'),
                     'SentTo'=>array('address'=>$args['login_identity'],
                                       'name'=>$Dispaly_name),
                     'Subject'=>'Wowrol Account Activation',
                     'msgHTML'=>$this->TemplateEmail('ResendVerificationCode',array('To_name'=>$Dispaly_name,'account_activation_key'=>$args['account_activation_key'])),
                     'AltBody'=>'' );
           $ExternalNotification=$this->SendEmail($emailargs);
        break;
        case 'phone':

        break;

    }
    


}  

 /**
* @description=> Notify store for an new order.
* @param  => 
* @return => 
*/ 
public function Neworder_to_seller($args=array()){
    switch($args['identity_type']){
        case 'email':
         $Dispaly_name=$args['login_identity'];
         $emailargs=array('setFrom'=>array('address'=>setFrom_Email,
                                       'name'=>'Wowrol'),
                     'ReplyTo'=>array('address'=>ReplyTo_Email,
                                       'name'=>'Wowrol'),
                     'SentTo'=>array('address'=>$args['login_identity'],
                                       'name'=>$Dispaly_name),
                     'Subject'=>'New Order',
                     'msgHTML'=>$this->TemplateEmail('Neworder_to_store',$args),
                     'AltBody'=>'' );
           $ExternalNotification=$this->SendEmail($emailargs);
        break;
        case 'phone':

        break;

    }
}



  /**
* @description=> send the activation code.
* @param  => 
* @return => 
*/ 
public function TemplateEmail($name,$data=array()){
    $Template='';
    switch($name){
        

        case 'header':
  $Template.='<!DOCTYPE html "-//w3c//dtd xhtml 1.0 transitional //en" "http://www.w3.org/tr/xhtml1/dtd/xhtml1-transitional.dtd"><html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE"> <title>Template Base</title> </head> <body style="width: 100% !important;min-width: 100%;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100% !important;margin: 0;padding: 0;background-color: #FFFFFF"> <style id="media-query"> /* Client-specific Styles & Reset */ #outlook a { padding: 0; } /* .ExternalClass applies to Outlook.com (the artist formerly known as Hotmail) */ .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } #backgroundTable { margin: 0; padding: 0; width: 100% !important; line-height: 100% !important; } /* Buttons */ .button a { display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; } .button a div { text-align: center !important; } /* Outlook First */ body.outlook p { display: inline !important; } /* Media Queries */ @media only screen and (max-width: 500px) { table[class="body"] img { height: auto !important; max-width: 100% !important; } table[class="body"] img.fullwidth { width: 100% !important; } table[class="body"] center { min-width: 0 !important; } table[class="body"] .container { width: 95% !important; } table[class="body"] .row { width: 100% !important; display: block !important; } table[class="body"] .wrapper { display: block !important; padding-right: 0 !important; } table[class="body"] .columns, table[class="body"] .column { table-layout: fixed !important; float: none !important; width: 100% !important; padding-right: 0px !important; padding-left: 0px !important; display: block !important; } table[class="body"] .wrapper.first .columns, table[class="body"] .wrapper.first .column { display: table !important; } table[class="body"] table.columns td, table[class="body"] table.column td, .col { width: 100% !important; } table[class="body"] table.columns td.expander { width: 1px !important; } table[class="body"] .right-text-pad, table[class="body"] .text-pad-right { padding-left: 10px !important; } table[class="body"] .left-text-pad, table[class="body"] .text-pad-left { padding-right: 10px !important; } table[class="body"] .hide-for-small, table[class="body"] .show-for-desktop { display: none !important; } table[class="body"] .show-for-small, table[class="body"] .hide-for-desktop { display: inherit !important; } .mixed-two-up .col { width: 100% !important; } } @media screen and (max-width: 500px) { div[class="col"] { width: 100% !important; } } @media screen and (min-width: 501px) { table[class="block-grid"] { width: 500px !important; } } </style> <table class="body" style="border-spacing: 0;border-collapse: collapse;vertical-align: top;height: 100%;width: 100%;table-layout: fixed" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td class="center" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;text-align: center;background-color: #FFFFFF" align="center" valign="top"> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top;background-color: #1d8ec0" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top" width="100%"> <!--[if (gte mso 9)|(IE)]> <table width="500" class="ieCell" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table class="container" style="border-spacing: 0;border-collapse: collapse;vertical-align: top;max-width: 500px;margin: 0 auto;text-align: inherit" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top" width="100%"> <table class="block-grid two-up" style="border-spacing: 0;border-collapse: collapse;vertical-align: top;width: 100%;max-width: 500px;color: #333;background-color: transparent" cellpadding="0" cellspacing="0" width="100%" bgcolor="transparent"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;text-align: center;font-size: 0"> <!--[if (gte mso 9)|(IE)]> <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td valign="top"> <![endif]--> <div class="col num6" style="display: inline-block;vertical-align: top;width: 250px;text-align: center"> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;background-color: transparent;padding-top: 20px;padding-right: 0px;padding-bottom: 5px;padding-left: 0px;border-top: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-left: 0px solid transparent"> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;width: 100%;padding-top: 0px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px" align="center"> <div align="center"> <a href="'.Responsive_SITEURL.'" target="_blank"> <img class="center fullwidth" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block;border: none;height: auto;line-height: 100%;margin: 0 auto;float: none;width: 100% !important;max-width: 250px !important" align="center" border="0" data-custom-width="250" src="'.Responsive_SITEURL.'/assets/imgs/pic/logo_1.png" alt="Image" title="Image"> </a> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if (gte mso 9)|(IE)]> </td><td> <![endif]--> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> </td> </tr> </tbody></table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top;background-color: #F9F9F9" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top" width="100%"> <!--[if (gte mso 9)|(IE)]> <table width="500" class="ieCell" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]-->';
        break;
        case 'footer':
  $Template.='<!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top;background-color: #FBFBFB" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top" width="100%"> <!--[if (gte mso 9)|(IE)]> <table width="500" class="ieCell" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table class="container" style="border-spacing: 0;border-collapse: collapse;vertical-align: top;max-width: 500px;margin: 0 auto;text-align: inherit" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top" width="100%"> <table class="block-grid" style="border-spacing: 0;border-collapse: collapse;vertical-align: top;width: 100%;max-width: 500px;color: #333;background-color: transparent" cellpadding="0" cellspacing="0" width="100%" bgcolor="transparent"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;text-align: center;font-size: 0"> <!--[if (gte mso 9)|(IE)]> <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td valign="top"> <![endif]--> <div class="col num12" style="display: inline-block;vertical-align: top;width: 100%"> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top" cellpadding="0" cellspacing="0" align="center" width="100%" border="0"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;background-color: transparent;padding-top: 10px;padding-right: 0px;padding-bottom: 10px;padding-left: 0px;border-top: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-left: 0px solid transparent"> <table style="border-spacing: 0;border-collapse: collapse;vertical-align: top" cellpadding="0" cellspacing="0" width="100%"> <tbody><tr style="vertical-align: top"> <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;border-collapse: collapse !important;vertical-align: top;padding-top: 15px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px"> <div style="color:#959595;line-height:150%;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;"> <div style="font-size:14px;line-height:21px;text-align:center;color:#959595;font-family:Arial,Helvetica Neue, Helvetica, sans-serif;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Wowrol India, Gardner House, Wilton Plaza, Wilton Place, Dublin 2, India</p></div> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> </td> </tr> </tbody></table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </body></html>';
        break;
        case 'Account_activation':
          $Template.=$this->TemplateEmail('header');
           $Template.='<div style=" color: #000; line-height: 120%; font-family: inherit; position: relative; padding: 15px 0px;" ><p style="font-size: 14px; line-height: 16px; text-align: center;" ><span style="font-size: 24px; line-height: 28px; font-family: tahoma, arial, helvetica, sans-serif;" ><strong>Account Activation</strong></span></p></div> <table width="600" border="0" cellspacing="0" cellpadding="0" style="font-family: arial, sans-serif; margin: 0px auto; "><tbody><tr><td align="left" valign="top" style="font-size: 12.8px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; border: 1px solid rgb(228, 228, 228); padding: 30px; color: rgb(104, 104, 104); background: rgb(255, 255, 255);"> <p>Hello '.$data['To_name'].',<br><br>We have received your registration details. For activating your account, please use the code below to verify your email address on  Wowrol.&nbsp;</p><br> <span style="background-color: rgb(255, 255, 255);"><font color="#333333" face="Helvetica Neue, Helvetica, Arial, sans-serif"><span style="font-size: 14px; line-height: 20px;">Your 6 digit activation key :&nbsp;&nbsp;</span></font></span><code style="box-sizing: border-box; font-family: Menlo, Monaco, Consolas,Courier New, monospace; font-size: 18px; padding: 2px 4px; color: rgb(199, 37, 78); border-radius: 4px; background-color: rgb(249, 242, 244);">'.$data['account_activation_key'].'</code><span style="color: rgb(51, 51, 51); font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; background-color: rgb(255, 255, 255);">&nbsp;</span> <p><br><br>Thank you.<br><br>Regards,<br>Wowrol</p> <p style="line-height: 20px; margin: 0px; padding: 0px 0px 30px;">&nbsp;</p> </td></tr></tbody></table></td></tr></tbody></table>';
           $Template.=$this->TemplateEmail('footer');
         break;
   case 'ResendVerificationCode':
          $Template.=$this->TemplateEmail('header');
           $Template.='<div style=" color: #000; line-height: 120%; font-family: inherit; position: relative; padding: 15px 0px;" ><p style="font-size: 14px; line-height: 16px; text-align: center;" ><span style="font-size: 24px; line-height: 28px; font-family: tahoma, arial, helvetica, sans-serif;" ><strong>Account Activation</strong></span></p></div> <table width="600" border="0" cellspacing="0" cellpadding="0" style="font-family: arial, sans-serif; margin: 0px auto; "><tbody><tr><td align="left" valign="top" style="font-size: 12.8px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; border: 1px solid rgb(228, 228, 228); padding: 30px; color: rgb(104, 104, 104); background: rgb(255, 255, 255);"> <p>Hello '.$data['To_name'].',<br><br>We have received your resend request. For activating your account, please use the code below to verify your email address on  Wowrol.&nbsp;</p><br> <span style="background-color: rgb(255, 255, 255);"><font color="#333333" face="Helvetica Neue, Helvetica, Arial, sans-serif"><span style="font-size: 14px; line-height: 20px;">Your 6 digit activation key :&nbsp;&nbsp;</span></font></span><code style="box-sizing: border-box; font-family: Menlo, Monaco, Consolas,Courier New, monospace; font-size: 18px; padding: 2px 4px; color: rgb(199, 37, 78); border-radius: 4px; background-color: rgb(249, 242, 244);">'.$data['account_activation_key'].'</code><span style="color: rgb(51, 51, 51); font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; background-color: rgb(255, 255, 255);">&nbsp;</span> <p><br><br>Thank you.<br><br>Regards,<br>Wowrol</p> <p style="line-height: 20px; margin: 0px; padding: 0px 0px 30px;">&nbsp;</p> </td></tr></tbody></table></td></tr></tbody></table>';
           $Template.=$this->TemplateEmail('footer');
         break;
         case 'Neworder_to_store':
  $Template.=$this->TemplateEmail('header');
  $Template.='<div style=" color: #000; line-height: 120%; font-family: inherit; position: relative; padding: 15px 0px;" ><p style="font-size: 14px; line-height: 16px; text-align: center;" ><span style="font-size: 24px; line-height: 28px; font-family: tahoma, arial, helvetica, sans-serif;" ><strong>New order </strong></span></p></div> <table width="600" border="0" cellspacing="0" cellpadding="0" style="font-family: arial, sans-serif; margin: 0px auto; "><tbody><tr><td align="left" valign="top" style="font-size: 12.8px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" valign="top" style="font-family:Helvetica Neue, Roboto, Segoe UI, Calibri, sans-serif;font-size: 14px; border: 1px solid rgb(228, 228, 228); padding: 30px; color: rgb(104, 104, 104); background: rgb(255, 255, 255);"> <p style="font-size: 14px; line-height: 18px;">Hello '.$data['shop_name'].' administration </p> <p style="font-size: 14px; line-height: 18px;">your store received a new order '.$data['order_name'].' from '.$data['customer_name'].'.</p> <p style="font-size: 14px; line-height: 18px;"> Total Purchase - <b>'.$data['Total_Purchase'].'</b> </p> <p style="font-size: 14px; line-height: 18px;"> Payment Method - <b>'.$data['Payment_Method'].' </b></p> <p style="font-size: 14px; line-height: 18px;"> Delivery Method - <b>'.$data['Delivery_Method'].'</b></p> <p style="font-size: 14px; line-height: 18px;">'.$data['More_Information_link'].'  </p> <p><br><br>Thank you.<br><br>Regards,<br>Wowrol</p><p style="line-height: 20px; margin: 0px; padding: 0px 0px 30px;">&nbsp;</p> </td></tr></tbody></table></td></tr></tbody></table>';
 $Template.=$this->TemplateEmail('footer');
         break;



    }
   return $Template;
} 
     
 /**
 * Verifies that an email is valid.
 * @param args=array('setFrom'=>array('address'=>'',
                                       'name'=>''),
                     'ReplyTo'=>array('address'=>'',
                                       'name'=>''),
                     'SentTo'=>array('address'=>'',
                                       'name'=>''),
                     'Subject'=>'',
                     'msgHTML'=>'',
                     'AltBody'=>''                                  );.
 * @return 
 */ 
 public function SendEmail($args=array()){
   
     //Create a new PHPMailer instance
$mail =new \PHPMailer();
 
//Set who the message is to be sent from
$mail->setFrom($args['setFrom']['address'], $args['setFrom']['name']);
//Set an alternative reply-to address
$mail->addReplyTo($args['ReplyTo']['address'], $args['ReplyTo']['name']);
//Set who the message is to be sent to
$mail->addAddress($args['SentTo']['address'], $args['SentTo']['name']);

//Set the subject line
$mail->Subject = $args['Subject'];
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML($args['msgHTML']);
//Replace the plain text body with one created manually
$mail->AltBody = $args['AltBody'];


//send the message, check for errors
if (!$mail->send()) {
   $return = FALSE;
} else {
  $return = TRUE;
}

 return $return;

 }
 /**
 *
 */
  public function SendEmail_smtp($args=array()){

     //Create a new PHPMailer instance
$mail =new \PHPMailer();
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = SMTP_Host;
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
//Username to use for SMTP authentication
$mail->Username = SMTP_Username;
//Password to use for SMTP authentication
$mail->Password = SMTP_Password;
//Set who the message is to be sent from 
//Set who the message is to be sent from
$mail->setFrom($args['setFrom']['address'], $args['setFrom']['name']);
//Set an alternative reply-to address
$mail->addReplyTo($args['ReplyTo']['address'], $args['ReplyTo']['name']);
//Set who the message is to be sent to
$mail->addAddress($args['SentTo']['address'], $args['SentTo']['name']);

//Set the subject line
$mail->Subject = $args['Subject'];
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML($args['msgHTML']);
//Replace the plain text body with one created manually
$mail->AltBody = $args['AltBody'];


//send the message, check for errors
if (!$mail->send()) {
   $return = FALSE;
} else {
  $return = TRUE;
}

 return $return;

 }




 }
 $GLOBALS['Var_ExternalNotification'] =new ExternalNotification();
?>
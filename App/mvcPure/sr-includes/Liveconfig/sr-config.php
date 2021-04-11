<?php
/* Here name of all perameter used through out site

This file is used for all the name of varible 
*/
/** The name of the database for shpiroll */
define('DB_NAME', 'wowrol');

/** MySQL database username */
define('DB_USER', 'LLiMmm5dgkZ4vZ');

/** MySQL database password */
define('DB_PASSWORD', 'yxs6Dga.TzVl');
/** The Host of the database for shpiroll */
define('DB_HOST', 'localhost');

/**
 * Stores the location of the directory of functions, classes, and core content.
 *
 * 
 */

define( 'SRINC', 'sr-includes' );
define( 'SRSTYCOM', 'sr-style/css' );
define( 'SRSTYMOB', 'sr-style/css' );

define( 'SRJS', 'sr-style/js' );
define( 'SRJQ', 'sr-style/js/jq' );
define( 'SRJSMOB', 'sr-style/js' );
define( 'SRJQMOB', 'sr-style/js/jq' );
define( 'SRTEMCOM', 'sr-template' );
define( 'SRTEMMOB', 'sr-template' );

define( 'CookieDomainName', 'wowrol' );
define( 'CookieDomain', 'www.wowrol.com' );
define( 'WOWROL', 'http://wowrol.com' );
define( 'ORIGIN',"http://".$_SERVER['HTTP_HOST']);
define( 'SRCOOKIESPATH', $_SERVER['HTTP_HOST'].'/' );
define( 'CDN', "http://".$_SERVER['HTTP_HOST'].'/' );///for css   and script fills
define( 'PICTURE_CDN', 'http://cdn.wowrol.com/' );
define( 'dir_CONTENT', PICTURE_CDN.'/sr-content' );
define( 'dir_ALBUMS', dir_CONTENT.'/albums' );
define( 'dir_COMMENTS', dir_CONTENT.'/comments' );
define( 'dir_PRODUCTS', dir_CONTENT.'/products' );
define( 'CSITEURL', 'http://www.wowrol.com/' );
  define( 'MSITEURL', 'http://m.wowrol.com/' );
/* define all the root document of the site.*/
define( 'SRROOT', $_SERVER['DOCUMENT_ROOT'].'/' );
define( 'GO_Page','b' );
define( 'Browse_Page',GO_Page.'/browse' );

/**
 * database table name.
 *
 * 
 */
  define( 'Table1', 'activity' );
  define( 'Table1a', 'clean_id_gen' );
  define( 'Table1b', 'wise_id' );
  define( 'Table1c', 'all_pincode' );
  define( 'Table1d', 'cp_currency' ); 
  define( 'Table1e', 'wowrol_admin_option' );
  define( 'Table2', 'login' );
  define( 'Table3', 'accounts' );
  define( 'Table4', 'wowrol_index' );
  define( 'Table5', 'wowrol_index_options' );
  define( 'Table6', 'privacy_lists' );
  define( 'Table7', 'privacy_list_members' );
  define( 'Table8', 'relation_two_way' );
  define( 'Table8a', 'relation_one_way' );
  define( 'Table9', 'store_options' );
  define( 'Table10', 'activities' );  
  define( 'Table11', 'notifications' );
  define( 'Table12', 'taxonomy' );
  define( 'Table12a', 'term_relationships' ); 
  define( 'Table13', 'spread' ); 
  define( 'Table14', 'product_varients' );  
  define( 'Table15', 'product_meta' ); 
  define( 'Table16', 'product_attributes' ); 
  define( 'Table17', 'conversation' );  
  define( 'Table18', 'messages' ); 
  define( 'Table19', 'message_info' ); 
                        
       /*date for all system*/
   // comment image storage folder
     define( 'comment_image_folder', 'x4utw' ); 
      // social user images uploaded  storage folder
     define( 'social_image_upload_folder', 'cioe' ); 
     //product image folder
     define( 'product_image_folder', 'emtw' );
     define( 'temp_product_image_folder', 'emtws' );        
/* Include files required for initialization.*/



//--
require(  dirname( __FILE__ ) . '/sr-load.php' );


?>
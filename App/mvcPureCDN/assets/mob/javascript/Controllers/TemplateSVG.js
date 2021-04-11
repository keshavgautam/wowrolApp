/*
* page set up 2
*/
; (function(W){
   "use strict";

function SVG(name,size,color) {
     var svg = '';
            switch (name) {
                  case 'left':
    svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1"  viewBox="0 0 24 24"  ><path d="M0 0h24v24H0z" fill="none"/> <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';

                    break;
            case 'search':
     svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1"  width="' + size + 'px" height="' + size + 'px"  viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 9 2 C 5.1 2 2 5.1 2 9 C 2 12.9 5.1 16 9 16 C 10.722428 16 12.28779 15.386196 13.5 14.375 L 14 14.875 L 14 15.6875 L 20.3125 22 L 22 20.3125 L 15.6875 14 L 14.8125 14 L 14.34375 13.53125 C 15.372135 12.314388 16 10.738606 16 9 C 16 5.1 12.9 2 9 2 z M 9 4 C 11.8 4 14 6.2 14 9 C 14 11.8 11.8 14 9 14 C 6.2 14 4 11.8 4 9 C 4 6.2 6.2 4 9 4 z"></path></svg>';

                    break;
                case 'menu':
    svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1"  viewBox="0 0 ' + size + ' ' + size + '" enable-background="new 0 0 24 24" fill="'+color+'" ><path d="M0 0h24v24H0z" fill="none"/> <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';

                    break;     
             case 'edit':
    svg = '<svg fill="#000000" height="' + size + '" viewBox="0 0 24 24" width="' + size + '" xmlns="http://www.w3.org/2000/svg"> <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/> <path d="M0 0h24v24H0z" fill="none"/></svg>';

                    break; 
             case 'cross':
    svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" fill="'+color+'" ><path d="M21.736,19.64l-2.098,2.096c-0.383,0.386-1.011,0.386-1.396,0l-5.241-5.239L7.76,21.735 c-0.385,0.386-1.014,0.386-1.397-0.002L4.264,19.64c-0.385-0.386-0.385-1.011,0-1.398L9.505,13l-5.24-5.24 c-0.384-0.387-0.384-1.016,0-1.398l2.098-2.097c0.384-0.388,1.013-0.388,1.397,0L13,9.506l5.242-5.241 c0.386-0.388,1.014-0.388,1.396,0l2.098,2.094c0.386,0.386,0.386,1.015,0.001,1.401L16.496,13l5.24,5.241 C22.121,18.629,22.121,19.254,21.736,19.64z"></path></svg>';

                    break; 

           case 'box':
  svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px"  viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 5.5 2 L 5.1875 2.40625 L 2.34375 6.1875 A 1.001098 1.001098 0 0 0 2.28125 6.25 A 1.001098 1.001098 0 0 0 2.09375 6.5 A 1.001098 1.001098 0 0 0 2.03125 6.625 L 2 6.65625 A 1.001098 1.001098 0 0 0 2 6.6875 A 1.001098 1.001098 0 0 0 2 7.28125 L 2 21 L 2 22 L 3 22 L 21 22 L 22 22 L 22 21 L 22 7.1875 A 1.0001 1.0001 0 0 0 22 7 L 22 6.875 A 1.0001 1.0001 0 0 0 22 6.78125 L 22 6.65625 L 21.9375 6.59375 A 1.0001 1.0001 0 0 0 21.875 6.46875 L 21.84375 6.4375 A 1.0001 1.0001 0 0 0 21.8125 6.40625 L 21.78125 6.34375 A 1.0001 1.0001 0 0 0 21.75 6.3125 L 18.8125 2.40625 L 18.5 2 L 18 2 L 6 2 L 5.5 2 z M 6.5 4 L 11.5 4 L 11.5 6 L 5 6 L 6.5 4 z M 12.5 4 L 17.5 4 L 19 6 L 12.5 6 L 12.5 4 z M 4 8 L 20 8 L 20 20 L 4 20 L 4 8 z M 9 10 L 9 12 L 15 12 L 15 10 L 9 10 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path></svg>';

                    break; 
     case 'info':
 svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" fill="'+color+'" > <path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';

    break;
     case 'home':
   svg = '<svg  width="' + size + 'px" height="' + size + 'px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"> <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/> <path d="M0 0h24v24H0z" fill="none"/></svg>';

    break;
     case 'cancel':
  svg = '<svg version="1.1"  width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.536 79.536" style="enable-background:new 0 0 79.536 79.536;" xml:space="preserve"><g><path  d="M39.769,0C17.805,0,0,17.8,0,39.768c0,21.956,17.805,39.768,39.769,39.768c21.965,0,39.768-17.812,39.768-39.768C79.536,17.8,61.733,0,39.769,0z M54.77,62.262L39.769,47.266L24.772,62.262l-7.498-7.498l14.996-15.001L17.274,24.767l7.498-7.498l14.996,14.996l14.995-14.99l7.498,7.498l-14.995,14.99l15,15.001L54.77,62.262z"/></g></svg>';

    break;
     case 'setting':
  svg = '<svg version="1.0" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + size + ' ' + size + '"  xml:space="preserve"  ><path d="M0 0h24v24H0z" fill="none"/> <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>';

    break;
                case 'checkmark':
  svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" fill="'+color+'" ><path d="M0 0h24v24H0z" fill="none"/> <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

                    break;
        
 case 'ok':
  svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1" viewBox="0 0 26 26" enable-background="new 0 0 24 24" fill="'+color+'" ><path d="M13,0.188C5.924,0.188,0.188,5.924,0.188,13S5.924,25.813,13,25.813S25.813,20.076,25.813,13 S20.076,0.188,13,0.188z M19.736,9.035l-6.871,10.132c-0.206,0.303-0.528,0.504-0.848,0.504s-0.675-0.175-0.9-0.399l-4.032-4.033 c-0.274-0.275-0.274-0.722,0-0.996l0.996-0.998c0.274-0.272,0.722-0.272,0.995,0l2.623,2.623l5.705-8.414 c0.217-0.32,0.657-0.403,0.979-0.187l1.166,0.791C19.869,8.275,19.953,8.715,19.736,9.035z"></path></svg>';

                    break;

                    
case 'buy':
     svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 26 26" fill="'+color+'"  ><path  d="M 1.1875 1 A 1.5020331 1.5020331 0 0 0 1.5 4 C 2.6005317 4 3.1008732 4.2632875 3.40625 4.53125 C 3.7116268 4.7992125 3.9191723 5.1825189 4.03125 5.78125 C 4.4040406 7.7787092 5.7186846 14.278725 6.03125 15.8125 C 6.5651246 18.429427 8.973 20 11.5 20 L 19.5 20 C 20.470536 20 20.796969 19.54444 21.125 19.21875 C 21.453031 18.89306 21.738791 18.541942 22.03125 18.125 C 22.616167 17.291116 23.218558 16.244507 23.78125 15.21875 C 24.906634 13.167235 25.84375 11.125 25.84375 11.125 A 1.50015 1.50015 0 1 0 23.15625 9.875 C 23.15625 9.875 22.225116 11.832765 21.15625 13.78125 C 20.621817 14.755493 20.029739 15.708884 19.5625 16.375 C 19.357638 16.66706 19.182021 16.87128 19.0625 17 L 11.5 17 C 10.027 17 9.2288754 16.462573 8.96875 15.1875 C 8.6573154 13.659275 7.3219594 7.1112908 6.96875 5.21875 C 6.7768277 4.1934811 6.3476232 3.0760375 5.40625 2.25 C 4.4648768 1.4239625 3.1084683 1 1.5 1 A 1.50015 1.50015 0 0 0 1.34375 1 A 1.5020331 1.5020331 0 0 0 1.1875 1 z M 15 2.03125 C 14.439 2.03125 13.582 2.23725 13.375 2.53125 C 13.234 2.72925 13.03125 7.03125 13.03125 7.03125 L 10.78125 7.03125 C 10.57525 7.03125 10.4095 7.1315 10.3125 7.3125 C 10.2155 7.4945 10.1985 7.704 10.3125 7.875 C 11.8015 10.09 14.55725 12.76475 14.65625 12.84375 C 14.75625 12.92475 14.877 12.96875 15 12.96875 C 15.123 12.96875 15.24175 12.92475 15.34375 12.84375 C 15.44375 12.76475 18.16825 10.089 19.65625 7.875 C 19.77125 7.703 19.7855 7.4945 19.6875 7.3125 C 19.5925 7.1315 19.42375 7.03125 19.21875 7.03125 L 16.96875 7.03125 C 16.96875 7.03125 16.767 2.73025 16.625 2.53125 C 16.419 2.23725 15.559 2.03125 15 2.03125 z M 10.5 21 C 9.1192881 21 8 22.119288 8 23.5 C 8 24.880712 9.1192881 26 10.5 26 C 11.880712 26 13 24.880712 13 23.5 C 13 22.119288 11.880712 21 10.5 21 z M 19.5 21 C 18.119288 21 17 22.119288 17 23.5 C 17 24.880712 18.119288 26 19.5 26 C 20.880712 26 22 24.880712 22 23.5 C 22 22.119288 20.880712 21 19.5 21 z" ></path></svg>';

     break;
case 'category':
    svg = '<svg width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 0 0 L 0 11 L 11 11 L 11 0 L 0 0 z M 13 0 L 13 11 L 24 11 L 24 0 L 13 0 z M 15 2 L 22 2 L 22 9 L 15 9 L 15 2 z M 0 13 L 0 24 L 11 24 L 11 13 L 0 13 z M 13 13 L 13 24 L 24 24 L 24 13 L 13 13 z M 3.90625 15 L 7.09375 15 C 7.040108 15.154319 7 15.327411 7 15.5 C 7 16.328427 7.6715729 17 8.5 17 C 8.672589 17 8.845681 16.959892 9 16.90625 L 9 20.09375 C 8.845681 20.040108 8.672589 20 8.5 20 C 7.6715729 20 7 20.671573 7 21.5 C 7 21.672589 7.040108 21.845681 7.09375 22 L 3.90625 22 C 3.959892 21.845681 4 21.672589 4 21.5 C 4 20.671573 3.3284271 20 2.5 20 C 2.327411 20 2.154319 20.040108 2 20.09375 L 2 16.90625 C 2.154319 16.959892 2.327411 17 2.5 17 C 3.3284271 17 4 16.328427 4 15.5 C 4 15.327411 3.959892 15.154319 3.90625 15 z M 15 15 L 16.5625 15 L 15 16.5625 L 15 15 z M 19.4375 15 L 20.5625 15 L 15 20.5625 L 15 19.4375 L 19.4375 15 z M 22 16.4375 L 22 17.5625 L 17.5625 22 L 16.4375 22 L 22 16.4375 z M 5.5 17 C 4.6715729 17 4 17.671573 4 18.5 C 4 19.328427 4.6715729 20 5.5 20 C 6.3284271 20 7 19.328427 7 18.5 C 7 17.671573 6.3284271 17 5.5 17 z M 22 20.4375 L 22 22 L 20.4375 22 L 22 20.4375 z"></path></svg>';

       break;
  case 'storemenu':
    svg = '<svg xmlns="http://www.w3.org/2000/svg"  width="' + size + '" height="' + size + '" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path " d="M 2 2 L 2 4 L 4 4 L 4 2 L 2 2 z M 7 2 L 7 4 L 22 4 L 22 2 L 7 2 z M 2 8 L 2 10 L 4 10 L 4 8 L 2 8 z M 7 8 L 7 10 L 22 10 L 22 8 L 7 8 z M 2 14 L 2 16 L 4 16 L 4 14 L 2 14 z M 7 14 L 7 16 L 22 16 L 22 14 L 7 14 z M 2 20 L 2 22 L 4 22 L 4 20 L 2 20 z M 7 20 L 7 22 L 22 22 L 22 20 L 7 20 z"></path></svg>';

       break;
case 'orders':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 5 2 L 5 3 L 5 16 L 7 16 L 7 4 L 20 4 L 20 19 C 20 19.554545 19.554545 20 19 20 C 18.4 20 18 19.6 18 19 L 18 17 L 3 17 L 3 20 C 3 21.1 3.9 22 5 22 L 19 22 C 20.645455 22 22 20.645455 22 19 L 22 3 L 22 2 L 21 2 L 6 2 L 5 2 z M 9 7 L 9 9 L 11 9 L 11 7 L 9 7 z M 12 7 L 12 9 L 18 9 L 18 7 L 12 7 z M 9 12 L 9 14 L 11 14 L 11 12 L 9 12 z M 12 12 L 12 14 L 18 14 L 18 12 L 12 12 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path></svg>';

       break;
case 'Shippping':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 0.875 7 C 0.394 7 0 7.394 0 7.875 L 0 20.125 C 0 20.606 0.394 21 0.875 21 L 3 21 C 3 22.657 4.343 24 6 24 C 7.657 24 9 22.657 9 21 L 12.125 21 C 12.606 21 13 20.606 13 20.125 L 13 7.875 C 13 7.394 12.606 7 12.125 7 L 0.875 7 z M 14.65625 9 C 14.29525 9 14 9.29425 14 9.65625 L 14 20.34375 C 14 20.6145 14.170844 20.837891 14.40625 20.9375 C 14.484719 20.970703 14.56575 21 14.65625 21 L 16 21 C 16 22.657 17.343 24 19 24 C 20.657 24 22 22.657 22 21 L 23.34375 21 C 23.43425 21 23.515281 20.970719 23.59375 20.9375 C 23.750687 20.871063 23.871063 20.750688 23.9375 20.59375 C 23.970719 20.515281 24 20.43425 24 20.34375 L 24 15.1875 C 24 15.0585 23.947 14.95175 23.875 14.84375 L 20.1875 9.28125 C 20.0655 9.10025 19.87525 9 19.65625 9 L 14.65625 9 z M 17 11 L 19.53125 11 L 22.1875 15 L 17 15 L 17 11 z M 6 19.5 C 6.827 19.5 7.5 20.173 7.5 21 C 7.5 21.827 6.827 22.5 6 22.5 C 5.173 22.5 4.5 21.827 4.5 21 C 4.5 20.173 5.173 19.5 6 19.5 z M 19 19.5 C 19.827 19.5 20.5 20.173 20.5 21 C 20.5 21.827 19.827 22.5 19 22.5 C 18.173 22.5 17.5 21.827 17.5 21 C 17.5 20.173 18.173 19.5 19 19.5 z"></path></svg>';

       break;
case 'frontpage':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"> <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Sans" d="M 4 3 C 2.9069372 3 2 3.9069372 2 5 L 2 19 C 2 20.093063 2.9069372 21 4 21 L 20 21 C 21.093063 21 22 20.093063 22 19 L 22 5 C 22 3.9069372 21.093063 3 20 3 L 4 3 z M 4 7 L 20 7 L 20 19 L 4 19 L 4 7 z M 6 9 L 6 11 L 18 11 L 18 9 L 6 9 z M 6 12 L 6 14 L 8 14 L 8 12 L 6 12 z M 9 12 L 9 14 L 18 14 L 18 12 L 9 12 z M 6 15 L 6 17 L 8 17 L 8 15 L 6 15 z M 9 15 L 9 17 L 18 17 L 18 15 L 9 15 z" color="#000" overflow="visible" font-family="Sans"></path></svg>';

       break;
case 'changeEntity':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"> <path d="M 4 2 C 2.9 2 2 2.9 2 4 L 2 12 C 2 13.1 2.9 14 4 14 L 5 14 L 5 12 L 4 12 L 4 6 L 16 6 L 16 9 L 18 9 L 18 4 C 18 2.9 17.1 2 16 2 L 4 2 z M 6 7 L 6 9.78125 C 6.532 9.30225 7.229 9 8 9 L 8.65625 9 L 9 9 L 9 7 L 6 7 z M 11 7 L 11 9 L 14 9 L 14 7 L 11 7 z M 8 10 C 6.9 10 6 10.9 6 12 L 6 20 C 6 21.1 6.9 22 8 22 L 20 22 C 21.1 22 22 21.1 22 20 L 22 12 C 22 10.9 21.1 10 20 10 L 8 10 z M 8 12 L 20 12 L 20 14 L 8 14 L 8 12 z M 10 16 L 13 16 L 13 19 L 10 19 L 10 16 z M 15 16 L 18 16 L 18 19 L 15 19 L 15 16 z"></path></svg>';

       break;
       
       case 'store':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '"  viewBox="0 0 26 26"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>';
      break;

  case 'logout':
      svg = '<svg xmlns="http://www.w3.org/2000/svg"  width="' + size + '" height="' + size + '" viewBox="0 0 24 24"> <path  d="M 6 2 C 4.897 2 4 2.897 4 4 L 4 20 C 4 21.103 4.897 22 6 22 L 18 22 C 19.103 22 20 21.103 20 20 L 20 15.25 L 18 16.75 L 18 20 L 6 20 L 6 4 L 18 4 L 18 7.25 L 20 8.75 L 20 4 C 20 2.897 19.103 2 18 2 L 6 2 z M 16 8.25 L 16 11 L 11 11 L 11 13 L 16 13 L 16 15.75 L 21 12 L 16 8.25 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"></path></svg>';
      break;

case 'alert':
    svg = '<svg xmlns="http://www.w3.org/2000/svg"  width="' + size + 'px" height="' + size + 'px"   viewBox="0 0 24 24" enable-background="new 0 0 24 24" fill="'+color+'"  > <path d="M 12 0 C 10.895431 0 10 0.8954305 10 2 C 10 2.0422335 9.9974202 2.0834163 10 2.125 C 7.6777188 2.4308126 6 3.4214047 6 6.03125 C 6 15.94425 1 14.034 1 20 C 1 20 5.006 21 12 21 C 18.994 21 23 20 23 20 C 23 14.07 18 16.00225 18 6.03125 C 18 3.3985892 16.342171 2.4214713 14 2.125 C 14.00258 2.0834163 14 2.0422335 14 2 C 14 0.8954305 13.104569 0 12 0 z M 9.15625 21.9375 C 9.55225 23.1305 10.674 24 12 24 C 13.326 24 14.44775 23.1295 14.84375 21.9375 C 13.96275 21.9725 13.008 22 12 22 C 10.987 22 10.04125 21.9735 9.15625 21.9375 z"></path></svg>';

       break;

case 'sent':
    svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" fill="'+color+'" ><path d="M 2 3 L 2 10.8125 L 18 12 L 2 13.1875 L 2 21 L 22 12 L 2 3 z"></path></svg>';

       break;
 case 'user':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px"  viewBox="0 0 26 26" fill="'+color+'" > <path d="M16.563,15.9c-0.159-0.052-1.164-0.505-0.536-2.414h-0.009c1.637-1.686,2.888-4.399,2.888-7.07 c0-4.107-2.731-6.26-5.905-6.26c-3.176,0-5.892,2.152-5.892,6.26c0,2.682,1.244,5.406,2.891,7.088 c0.642,1.684-0.506,2.309-0.746,2.396C5.93,17.103,2.03,19.294,2.03,21.457c0,0.584,0,0.23,0,0.811 c0,2.947,5.714,3.617,11.002,3.617c5.296,0,10.938-0.67,10.938-3.617c0-0.58,0-0.227,0-0.811 C23.97,19.229,20.051,17.055,16.563,15.9z"></path></svg>';

       break;

       case 'error':
  svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg"  version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" fill="'+color+'" ><path d="M21.736,19.64l-2.098,2.096c-0.383,0.386-1.011,0.386-1.396,0l-5.241-5.239L7.76,21.735 c-0.385,0.386-1.014,0.386-1.397-0.002L4.264,19.64c-0.385-0.386-0.385-1.011,0-1.398L9.505,13l-5.24-5.24 c-0.384-0.387-0.384-1.016,0-1.398l2.098-2.097c0.384-0.388,1.013-0.388,1.397,0L13,9.506l5.242-5.241 c0.386-0.388,1.014-0.388,1.396,0l2.098,2.094c0.386,0.386,0.386,1.015,0.001,1.401L16.496,13l5.24,5.241 C22.121,18.629,22.121,19.254,21.736,19.64z"></path></svg>';

       break;
case 'nextarrow':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="' + size + '" height="' + size + '"   fill="'+color+'"  > <path  d="M 9.21875 2.28125 L 7.78125 3.71875 L 16.0625 12 L 7.78125 20.28125 L 9.21875 21.71875 L 18.21875 12.71875 L 18.90625 12 L 18.21875 11.28125 L 9.21875 2.28125 z"></path></svg>';

       break;
case 'backarrow':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '"   fill="'+color+'" viewBox="0 0 50 50"> <path d="M 35 2.75 L 12.75 25 L 35 47.25 L 37.09375 45.15625 L 16.9375 25 L 37.09375 4.84375 L 35 2.75 z"></path></svg>';

       break;
case 'menuHori':
    svg = '<svg width="' + size + '" height="' + size + '"  xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 12 3 C 10.895431 3 10 3.8954305 10 5 C 10 6.1045695 10.895431 7 12 7 C 13.104569 7 14 6.1045695 14 5 C 14 3.8954305 13.104569 3 12 3 z M 12 10 C 10.895431 10 10 10.895431 10 12 C 10 13.104569 10.895431 14 12 14 C 13.104569 14 14 13.104569 14 12 C 14 10.895431 13.104569 10 12 10 z M 12 17 C 10.895431 17 10 17.895431 10 19 C 10 20.104569 10.895431 21 12 21 C 13.104569 21 14 20.104569 14 19 C 14 17.895431 13.104569 17 12 17 z"></path></svg>';

       break;

case 'cart':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path d="M 2 2 L 2 4 L 4.28125 4 L 6.90625 11.8125 L 5.40625 13.8125 L 5.375 13.8125 C 4.9155448 14.455737 4.8951058 15.315107 5.21875 15.9375 C 5.5423942 16.559893 6.225 17 7 17 L 20 17 L 20 15 L 7 15 C 7.0020068 14.994613 6.9898637 14.98294 7 14.96875 L 8.5 13 L 17.90625 13 C 18.30625 13 18.7125 12.80625 18.8125 12.40625 L 21.90625 5.40625 C 22.20625 4.70625 21.7 4 21 4 L 6.375 4 L 5.9375 2.6875 L 5.71875 2 L 5 2 L 2 2 z M 7 18 C 5.8954305 18 5 18.895431 5 20 C 5 21.104569 5.8954305 22 7 22 C 8.1045695 22 9 21.104569 9 20 C 9 18.895431 8.1045695 18 7 18 z M 18 18 C 16.895431 18 16 18.895431 16 20 C 16 21.104569 16.895431 22 18 22 C 19.104569 22 20 21.104569 20 20 C 20 18.895431 19.104569 18 18 18 z"></path></svg>';

       break;

case 'staff':
    svg = '<svg xmlns="http://www.w3.org/2000/svg"  width="' + size + '" height="' + size + '" viewBox="0 0 24 25"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>';

       break;
case 'uparrow':
    svg = '<svg   width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 12 6.65625 L 11.34375 7.25 L 1.34375 16.25 L 2.65625 17.75 L 12 9.34375 L 21.34375 17.75 L 22.65625 16.25 L 12.65625 7.25 L 12 6.65625 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path></svg>';

       break;
case 'downarrow':
    svg = '<svg  width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24"> <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 2.65625 6.25 L 1.34375 7.75 L 11.34375 16.75 L 12 17.34375 L 12.65625 16.75 L 22.65625 7.75 L 21.34375 6.25 L 12 14.65625 L 2.65625 6.25 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path></svg>';

       break;

case 'wowOn':
    svg = '<svg width="' + size + 'px" height="' + size + 'px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64"><circle fill="#ffdd67" cx="31.999" cy="32" r="30"/><g fill="#664e27"><circle cx="20.501" cy="26.967" r="4.5"/><circle cx="43.501" cy="26.967" r="4.5"/></g><g fill="#917524"><path d="m50.2 17.05c-3.236-2.732-7.523-3.881-11.693-3.133-.578.113-1.088-2.02-.385-2.156 4.809-.863 9.756.461 13.492 3.615.541.469-.97 2.061-1.414 1.674"/><path d="m25.487 13.764c-4.168-.748-8.455.4-11.693 3.133-.443.389-1.953-1.205-1.412-1.674 3.734-3.152 8.682-4.479 13.492-3.615.703.134.191 2.269-.387 2.156"/></g><circle fill="#664e27" cx="31.999" cy="47.23" r="3.75"/></svg>';

 break;
 case 'wowOff':
    svg = '<svg width="' + size + 'px" height="' + size + 'px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64" > <defs id="defs3356"/> <circle fill="#ffdd67" cx="31.999" cy="32" r="30" id="circle3338" style="fill:#f2f2f2"/> <g fill="#664e27" id="g3340" style="fill:#333333"> <circle cx="20.501" cy="26.967" r="4.5" id="circle3342" style="fill:#333333"/> <circle cx="43.501" cy="26.967" r="4.5" id="circle3344" style="fill:#333333"/> </g> <g fill="#917524" id="g3346" style="fill:#4d4d4d"> <path d="m50.2 17.05c-3.236-2.732-7.523-3.881-11.693-3.133-.578.113-1.088-2.02-.385-2.156 4.809-.863 9.756.461 13.492 3.615.541.469-.97 2.061-1.414 1.674" id="path3348" style="fill:#4d4d4d"/> <path d="m25.487 13.764c-4.168-.748-8.455.4-11.693 3.133-.443.389-1.953-1.205-1.412-1.674 3.734-3.152 8.682-4.479 13.492-3.615.703.134.191 2.269-.387 2.156" id="path3350" style="fill:#4d4d4d"/> </g> <circle fill="#664e27" cx="31.999" cy="47.23" r="3.75" id="circle3352" style="fill:#333333"/></svg>';

 break;

  case 'comment':
    svg = '<svg width="' + size + 'px" height="' + size + 'px"  version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 404.941 404.941" style="enable-background:new 0 0 404.941 404.941;" ><g><path d="M391.689,18.283H13.25C5.931,18.283,0,24.218,0,31.535v242.48c0,7.32,5.931,13.252,13.25,13.252h202.674v86.137c0,5.359,3.228,10.193,8.18,12.244c1.64,0.68,3.361,1.01,5.068,1.01c3.446,0,6.838-1.348,9.372-3.883l96.171-95.508h56.975c7.32,0,13.252-5.932,13.252-13.252V31.534C404.943,24.217,399.01,18.283,391.689,18.283L391.689,18.283z"/></g></svg>';

 break;
case 'checkIn':
    svg = '<svg width="' + size + 'px" height="' + size + 'px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/> <path d="M0 0h24v24H0z" fill="none"/></svg>';

       break;
case 'likeOn':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px" viewBox="0 0 24 24"> <path d="M 17,4 C 14.2,4 12,6.8 12,6.8 12,6.8 9.8,4 7,4 4.2,4 2,6.2 2,9 2,15.8 12,21.3 12,21.3 12,21.3 22,15.8 22,9 22,6.2 19.8,4 17,4 Z"  style="fill:#ffcc00" /></svg>';

       break;
case 'likeOff':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px" viewBox="0 0 24 24"> <path d="M 17,4 C 14.2,4 12,6.8 12,6.8 12,6.8 9.8,4 7,4 4.2,4 2,6.2 2,9 2,15.8 12,21.3 12,21.3 12,21.3 22,15.8 22,9 22,6.2 19.8,4 17,4 Z" style="fill:#e3dedb" /></svg>';

   break;
 case 'agreeOn':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px" viewBox="0 0 48 48"><circle style="fill:#ffcc00" cx="24" cy="24" r="19" /><polygon style="fill:#fff6d5" points="21.014,28.172 15.413,22.584 12.587,25.416 21.019,33.828 37.415,17.414 34.585,14.586 " /></svg>';

   break;
 case 'agreeOff':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px" viewBox="0 0 48 48"><circle style="fill:#e3dedb" cx="24" cy="24" r="19" /><polygon style="fill:#ffffff" points="15.413,22.584 12.587,25.416 21.019,33.828 37.415,17.414 34.585,14.586 21.014,28.172 "/></svg>';

   break;    
 case 'feelsadOn':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px"  viewBox="0 0 48 48"> <path d="M 25,1 C 11.767,1 1,11.767 1,25 1,38.233 11.767,49 25,49 38.233,49 49,38.233 49,25 49,11.767 38.233,1 25,1 Z m -8,18 c 1.657,0 3,1.343 3,3 0,1.657 -1.343,3 -3,3 -1.657,0 -3,-1.343 -3,-3 0,-1.657 1.343,-3 3,-3 z M 35.707,35.707 C 35.512,35.902 35.256,36 35,36 34.744,36 34.488,35.902 34.293,35.707 34.257,35.672 30.49,32 25,32 c -5.522,0 -9.256,3.67 -9.293,3.707 -0.391,0.391 -1.023,0.391 -1.414,0 -0.391,-0.391 -0.391,-1.023 0,-1.414 C 14.468,34.117 18.659,30 25,30 c 6.341,0 10.532,4.117 10.707,4.293 0.391,0.391 0.391,1.023 0,1.414 z M 33,25 c -1.656,0 -3,-1.343 -3,-3 0,-1.657 1.344,-3 3,-3 1.656,0 3,1.343 3,3 0,1.657 -1.344,3 -3,3 z"  style="fill:#ffcc00" /></svg>';

   break;
 case 'feelsadOff':
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + 'px" height="' + size + 'px" viewBox="0 0 48 48"> <path d="M 25,1 C 11.767,1 1,11.767 1,25 1,38.233 11.767,49 25,49 38.233,49 49,38.233 49,25 49,11.767 38.233,1 25,1 Z m -8,18 c 1.657,0 3,1.343 3,3 0,1.657 -1.343,3 -3,3 -1.657,0 -3,-1.343 -3,-3 0,-1.657 1.343,-3 3,-3 z M 35.707,35.707 C 35.512,35.902 35.256,36 35,36 34.744,36 34.488,35.902 34.293,35.707 34.257,35.672 30.49,32 25,32 c -5.522,0 -9.256,3.67 -9.293,3.707 -0.391,0.391 -1.023,0.391 -1.414,0 -0.391,-0.391 -0.391,-1.023 0,-1.414 C 14.468,34.117 18.659,30 25,30 c 6.341,0 10.532,4.117 10.707,4.293 0.391,0.391 0.391,1.023 0,1.414 z M 33,25 c -1.656,0 -3,-1.343 -3,-3 0,-1.657 1.344,-3 3,-3 1.656,0 3,1.343 3,3 0,1.657 -1.344,3 -3,3 z"  style="fill:#e3dedb" /></svg>';

   break;  
   case 'chats':
   svg =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="' + size + 'px" height="' + size + 'px"  > <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 2 5 L 2 6 L 2 20 L 2 21 L 3 21 L 6 21 L 6 24 L 6 26.09375 L 7.625 24.78125 L 12.34375 21 L 21 21 L 22 21 L 22 20 L 22 6 L 22 5 L 21 5 L 3 5 L 2 5 z M 4 7 L 20 7 L 20 19 L 12 19 L 11.65625 19 L 11.375 19.21875 L 8 21.90625 L 8 20 L 8 19 L 7 19 L 4 19 L 4 7 z M 24 9 L 24 11 L 28 11 L 28 23 L 24 23 L 24 25.90625 L 20.34375 23 L 12.84375 23 L 10.34375 25 L 19.65625 25 L 26 30.09375 L 26 25 L 30 25 L 30 9 L 24 9 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"></path></svg>';
   break;   
     case 'money':
   svg =  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="' + size + 'px" height="' + size + 'px"  > <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 2 5 L 2 6 L 2 20 L 2 21 L 3 21 L 6 21 L 6 24 L 6 26.09375 L 7.625 24.78125 L 12.34375 21 L 21 21 L 22 21 L 22 20 L 22 6 L 22 5 L 21 5 L 3 5 L 2 5 z M 4 7 L 20 7 L 20 19 L 12 19 L 11.65625 19 L 11.375 19.21875 L 8 21.90625 L 8 20 L 8 19 L 7 19 L 4 19 L 4 7 z M 24 9 L 24 11 L 28 11 L 28 23 L 24 23 L 24 25.90625 L 20.34375 23 L 12.84375 23 L 10.34375 25 L 19.65625 25 L 26 30.09375 L 26 25 L 30 25 L 30 9 L 24 9 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"></path></svg>';
   break;         
        }
     
        return svg;
     }

  W.T.SVG = SVG;


})(wowrol);

function wpssGetCookie(e){var t=document.cookie.indexOf(e+'=');var n=t+e.length+1;if(!t&&e!=document.cookie.substring(0,e.length)){return null}if(t==-1)return null;var r=document.cookie.indexOf(';',n);if(r==-1)r=document.cookie.length;return unescape(document.cookie.substring(n,r))}function wpssSetCookie(e,t,n,r,i,s){var o=new Date;o.setTime(o.getTime());if(n){n=n*1e3*60*60*24}var u=new Date(o.getTime()+n);document.cookie=e+'='+escape(t)+(n?';expires='+u.toGMTString():'')+(r?';path='+r:'')+(i?';domain='+i:'')+(s?';secure':'')}function wpssDeleteCookie(e,t,n){if(wpssGetCookie(e))document.cookie=e+'='+(t?';path='+t:'')+(n?';domain='+n:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT'}
function wpssCommentVal(){wpssSetCookie('41111aa6a9d244f97d0635add6617a4e','55cc653fb2f04f86ce4cec67c3499f67','','/');wpssSetCookie('SJECT15','CKON15','','/');}
wpssCommentVal();jQuery(document).ready(function($){var h="form[method='post']";$(h).submit(function(){$('<input>').attr('type','hidden').attr('name','f6598cbe4eecdcbf3046599a62cb320a').attr('value','66d4e70dc9e1802e80bd84f5b1fa5549').appendTo(h);return true;})});
// Generated in: 0.000127 seconds

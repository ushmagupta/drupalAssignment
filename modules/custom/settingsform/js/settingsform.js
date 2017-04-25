(function ($, window, Drupal) {
 'use strict'; //


 Drupal.behaviors.settingsform = {  //name can be anything
   attach: function (context, settings) {  //context is dom object for new elements
       alert(settings.settingsform.name); 
       alert(settings.settingsform.interest);
   }
 };
})(jQuery, window, Drupal);
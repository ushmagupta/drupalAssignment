<?php
/**
 * @file
 * this is contact file
 **/

namespace Drupal\form_db\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\form_db\Form\Formdb_Helper;

class FormdbController extends ControllerBase{
  
  
  public function content(){
    
  $details = Formdb_Helper::getDetails();

    return [
      '#theme' => 'myformdb',
      '#details' => $details,
    ];
  }
  
}

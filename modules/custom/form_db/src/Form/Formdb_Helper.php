<?php
namespace Drupal\form_db\Form;

class Formdb_Helper {

  static function getDetails() {
    $result = db_query('SELECT * FROM {form_db_details}')->fetchAllAssoc('id');
	return $result;
  }

//  static function exists($id) {
//    $details = db_query('SELECT 1 FROM {form_db_details} WHERE id = :id', array(':id' => $id))->fetchField();
//    return (bool) $details;
//  }

  static function addDetails($name, $gender,$email,$address,$city,$phone) {
    db_insert('form_db_details')->fields(array(
	   'name' => $name,
     'gender' => $gender,
	   'email' => $email,
     'address' => $address,
     'city' => $city,     
     'phone' => $phone,
	  ))->execute();
  }

  
}


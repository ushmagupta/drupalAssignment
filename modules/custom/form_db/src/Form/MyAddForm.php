<?php
/**
 * @file
 * this is custom form file
 **/

namespace Drupal\form_db\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class MyAddForm extends FormBase{
  
  
  public function getFormId() {
    return 'MyAddForm';
  }
  

  public function buildForm(array $form, FormStateInterface $form_state) {
  
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Name'),
      '#required' => TRUE,
    ];
    
    
    $form['gender'] = [
      '#type' => 'radios',
      '#title' => $this->t('Gender'),
      '#options' => [
          'Male' => $this->t('Male'),
          'Female' => $this->t('Female'),
      ],
      '#required' => TRUE,
    ];
    
    $form['email'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Email id'),
      	
    ];
    
    
    $form['address'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Address'),
      '#required' => TRUE,
    ];
    
    $form['city'] = [
      '#type' => 'textfield',
      '#title' => $this->t('City'),
      '#required' => TRUE,
    ];
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone no'),

    ];
    
    
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
  
    ];
    
    return $form;
  }

  function validateForm(array &$form, FormStateInterface $form_state) {
    $email= $form_state->getValue('email');
    $phn= strlen($form_state->getValue('phone'));
    if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
   	  $form_state->setErrorByName('email', t('Invalid email format !'));
    }
    
    if ( $phn && !is_numeric($form_state->getValue('phone')) ) {
    $form_state->setErrorByName('phone', $this->t('Please enter only digits in Phone number.'));
    }
    else if ( $phn && $phn!=10  ) {
    $form_state->setErrorByName('phone', $this->t('Please enter 10 digit phone number.'));
    }

  }

  function submitForm(array &$form, FormStateInterface $form_state) {
    $name = $form_state->getValue('name');
    $gender = $form_state->getValue('gender');
    $email = $form_state->getValue('email');
    $address = $form_state->getValue('address');
    $city = $form_state->getValue('city');
    $phone = $form_state->getValue('phone');
    Formdb_Helper::addDetails($name,$gender,$email,$address,$city,$phone);
    
    drupal_set_message($this->t('Your contact details have been submitted'));
  }
  

}


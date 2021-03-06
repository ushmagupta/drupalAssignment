<?php

/**
 * @file
 * this is custom form file
 * */

namespace Drupal\customform2\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax;
use Drupal\Core\Url;

class CustomForm2 extends FormBase {

  public function getFormId() {
    return 'custom_form2_settings';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['start_datelist'] = [
        '#type' => 'datelist',
        '#title' => $this->t('Event timing'),
        '#ajax' => [
            'callback' => '::checkNameAjax',
            'event' => 'change',
        ],
    ];



    $form['feedback_option'] = [
        '#type' => 'radios',
        '#title' => $this->t('Do you want to give any feedback?'),
        '#options' => [
            'yes' => $this->t('Yes'),
            'no' => $this->t('no'),
        ],
    ];

    $form['feedback'] = [
        '#type' => 'container',
        '#attributes' => [
            'class' => 'feedback',
        ],
        '#states' => [
            'visible' => [
                'input[name="feedback_option"]' => ['value' => 'yes'],
            ],
        ],
    ];

    $form['feedback']['detail'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Your feedback'),
    ];

    $form['email'] = [
        '#type' => 'email',
        '#title' => $this->t('Email'),
        '#ajax' => [
            'callback' => '::validateEmailAjax',
            'event' => 'change',
        ],
        '#suffix' => '<span class="email-valid-message"></span>',
    ];

    $form['actions']['extra_actions'] = [
        '#type' => 'dropbutton',
        '#links' => [
            'site1' => [
                'title' => $this->t('google'),
                'url' => Url::fromUri('https://google.com'),
            ],
            'site2' => [
                'title' => $this->t('Drupal.org'),
                'url' => Url::fromUri('https://www.drupal.org'),
            ],
        ],
    ];
    $form['ageRange'] = [
        '#type' => 'range',
        '#title' => 'Choose your age',
        '#min' => 20,
        '#max' => 40,
        '#step' => 1,
        '#description' => '(between 20 and 40)',
        '#ajax' => [
            'callback' => '::ageAjax',
            'event' => 'change',
        ],
    ];

    $form['age'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Age selected'),
        '#prefix' => '<div id="age-ajax">',
        '#suffix' => '</div>',
        '#default_value' => 30,
        '#attributes' => ['disabled' => TRUE,],

    ];
    return $form;
  }

  function ageAjax($form, FormStateInterface $form_state) {

    $myage = $form_state->getValue('ageRange');
    $response = new Ajax\AjaxResponse();

    $form['age'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Age selected'),
        '#value' => $myage,
        '#attributes' => ['disabled' => TRUE,],

    ];

    $response->addCommand(new Ajax\HtmlCommand('#age-ajax', $form['age']));
    return $response;
  }

  
  public function validateEmail(array &$form, FormStateInterface $form_state) {
    $email=$form_state->getValue('email');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return FALSE;
    }
    return TRUE;
  }

  public function validateEmailAjax(array &$form, FormStateInterface $form_state) {
    $valid = $this->validateEmail($form, $form_state);
    $response = new Ajax\AjaxResponse();
    if ($valid) {

      $message = $this->t('Email ok.');
    } else {

      $message = $this->t('Invalid email format');
    }

    $response->addCommand(new Ajax\HtmlCommand('.email-valid-message', $message));
    return $response;
  }


  public function submitForm(array &$form, FormStateInterface $form_state) {
    drupal_set_message($this->t("Your details saved successfully"));
  }

}

<?php

/**
 * @file
 * this is custom form file
 * */

namespace Drupal\customform1\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use \Drupal\Core\Ajax;

class CustomForm1 extends FormBase {

  public function getFormId() {
    return 'custom_form1_settings';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['name'] = [
        '#type' => 'textfield',
        '#title' => $this->t('NAME'),
        '#ajax' => [
            'callback' => '::checkNameAjax',
            'event' => 'change',
        ],
        '#prefix' => '<div id="edit-username">',
        '#suffix' => '</div><span id="edit-description"></span>',
    ];

    $form['color'] = [
        '#type' => 'color',
        '#title' => $this->t('Choose Color'),
        '#default_value' => '#2a22d2',
        '#ajax' => [
            'callback' => '::changeColorAjax',
            'event' => 'change',
        ],
    ];


    $form['candidate_dob'] = [
        '#type' => 'date',
        '#title' => t('DOB'),
        '#attributes' => ['id' => 'mydob'],
    ];

    $form['terms'] = [
        '#type' => 'checkbox',
        '#title' => $this->t('I agree to terms n conditions'),
        '#ajax' => [
            'callback' => '::enableSubmitAjax',
            'event' => 'change',
        ],
    ];

    $form['actions']['submit'] = [
        '#type' => 'submit',
        '#value' => $this->t('cant save'),
        '#attributes' => ['disabled' => TRUE,],
        '#prefix' => '<div id="edit-actions">',
        '#suffix' => '</div>',
    ];

    $form['actions']['delete'] = [
        '#type' => 'submit',
        '#value' => $this->t('delete'),
        '#states' => array(
            // Only show this field when the 'toggle_me' checkbox is enabled.
            'disabled' => array(
                ':input[name="terms"]' => array('checked' => FALSE),
            ),
        ),
    ];

    return $form;
  }

  function checkNameAjax(array &$form, FormStateInterface &$form_state) {

    $valid = $form_state->getValue('name');
    if ($valid == 'ushma') {
      $css = ['border' => '1px solid green'];
      $message = ('valid name.');
    } else {
      $css = ['border' => '1px solid red'];
      $message = ('invalid name');
    }
    $response = new Ajax\AjaxResponse();
    $response->addCommand(new Ajax\CssCommand('#edit-username', $css));
    $response->addCommand(new Ajax\HtmlCommand('#edit-description', $message));
    return $response;
  }

  function changeColorAjax(array &$form, FormStateInterface &$form_state) {

    $mycolor = $form_state->getValue('color');
    $css = ['color' => $mycolor];

    $response = new Ajax\AjaxResponse();
    $response->addCommand(new Ajax\CssCommand('#mydob', $css));

    return $response;
  }

  function enableSubmitAjax($form, FormStateInterface $form_state) {

    $response = new Ajax\AjaxResponse();
    $valid = $form_state->getValue('terms');

    if ($valid == 1) {

      $form['actions']['submit'] = [
          '#type' => 'submit',
          '#value' => $this->t('save'),
      ];
    } else {

      $form['actions']['submit'] = [
          '#type' => 'submit',
          '#attributes' => ['disabled' => TRUE],
          '#value' => $this->t('cant save'),
      ];
    }
    $response->addCommand(new Ajax\HtmlCommand('#edit-actions', $form['actions']['submit']));
    return $response;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    drupal_set_message($this->t("Your details saved successfully"));
  }

}

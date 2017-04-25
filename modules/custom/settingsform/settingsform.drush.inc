<?php

/**
 * @file Contains the code to generate the custom drush commands.
 */

/**
 * Implements hook_drush_command().
 */
function settingsform_drush_command() {
  $items = array();
  $items['say-hello'] = [
      'description' => 'Echo the name you type with Say hello command',
      'arguments' => [
      //    'name' => 'The name for saying hello',
      ],
      //  'drupal dependencies' => ['settingsform'],
      'aliases' => ['say:hello'],
  ];
  return $items;
}

/**
 * Call back function drush_custom_drush_command_say_hello()
 * The call back function name in the  following format
 *   drush_{module_name}_{item_id_for_command}()
 */
function drush_settingsform_say_hello() {
  //drush_print('Hello ' . $name . ' !');
  $selected = array(1 => "hi", 2 => "hello", 3 => "bye");
  $choice = drush_choice($selected, "select choice :");
  drush_print(t("you selected @choice",array('@choice' => $selected[$choice])));

  $choice1 = drush_prompt("yes or no ?");
  drush_print(t("you selected @choice1",array('@choice1' => $choice1)));
}

<?php

/**
 * @file Contains the code to generate the custom drush commands.
 */
use Drupal\node\Entity\Node;

/**
 * Implements hook_drush_command().
 */
function count_node_drush_command() {
  $items = array();
  $items['show-users'] = [
      'description' => 'Echo all usernames with their email ids',
      'aliases' => ['showu'],
  ];
  $items['create-article-node'] = [
      'description' => 'creates a node of article type',
      'aliases' => ['create-an'],
  ];
  return $items;
}

/**
 * Call back function drush_count_node_show_users()
 */
function drush_count_node_show_users() {
  
  $query = \Drupal::entityQuery('user');
  $users = $query->execute();
  $uids = entity_load_multiple('user', $users);
  foreach ($uids as $user) {
  
    $mail = (null !== $user->getEmail()) ? $user->getEmail() : 'Anonymous user mail';
    $name = ($user->getAccountName()) ? $user->getAccountName() : 'Anonymous user name';
    drush_print($name.' => Email : '.$mail);
  }

}

/**
 * Call back function drush_count_node_create_article_node()
 */

function drush_count_node_create_article_node() {
  
  $title = drush_prompt("Enter title ");
  $body = drush_prompt("Enter body ");
   
  $article = Node::create([
              'type' => 'article',
              'title' => $title,
              'uid' => 1,
              'status' => 1,
              'body' => $body,
  ]);
  $article->save();
  drush_print('Article type node created successfully!');
}

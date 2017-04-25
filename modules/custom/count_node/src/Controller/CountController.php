<?php

/**
 * @file
 * this is contact file
 * */

namespace Drupal\count_node\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\DependencyInjection\ContainerInterface;

class CountController extends ControllerBase {

  protected $entityQuery;

  public function __construct(QueryFactory $entityQuery) {
    $this->entityQuery = $entityQuery;
  }

  public static function create(ContainerInterface $container) {
    
    return new static(
    $container->get('entity.query')
    );
  }
  
  public function content() {
 
    $contentTypes = \Drupal::service('entity.manager')->getStorage('node_type')->loadMultiple();
        
     $result=[];
            
    foreach ($contentTypes as $contentType) {
      $query = $this->entityQuery->get('node');
      $id=$contentType->id();
      $query->condition('type', $id);
      $query->count();
      $result[$id]=$query->execute();
    }

    return [
        '#theme' => 'count',
        '#result' => $result,
    ];

  }

}

<?php
/**
 * @file
 * Contains Drupal\count_node\Plugin\Block\MyBlock .
 */

namespace Drupal\count_node\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;




/**
 * Provides the  Block 'MyBlock'.
 *
 * @Block(
 *   id = "count_node_countblock",
 *   subject = @Translation("CountBlock"),
 *   admin_label = @Translation("CountBlock")
 * )
 */
class CountBlock extends BlockBase implements ContainerFactoryPluginInterface{

  /**
   * Implements Drupal\block\BlockBase::blockBuild().
   */
  protected $entityQuery;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, QueryFactory $entityQuery) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityQuery = $entityQuery;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $entity=$container->get('entity.query');
    return new static(
      $configuration, $plugin_id, $plugin_definition,$entity
    );
  }
  
  public function build() {

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
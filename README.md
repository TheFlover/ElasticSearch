# ElasticSearch

## Schéma

![alt text](https://github.com/TheFlover/ElasticSearch/blob/tp---3/Sch%C3%A9ma%20ELK.png?raw=true)

Elasticsearch stocke ses données de manière distribuée et redondante pour assurer la robustesse, la sauvegarde et l'intégrité des données. Il utilise un système de stockage distribué appelé Apache Lucene, qui est une bibliothèque de recherche et d'indexation.

### Voici comment Elasticsearch stocke ses données et comment certaines notions renforcent la robustesse des données :

Sharding : Elasticsearch divise les données en plusieurs fragments appelés shards. Chaque shard est une unité de stockage autonome qui contient une partie des données indexées. Les shards permettent de répartir la charge et d'optimiser les opérations de recherche et d'indexation. Ils offrent également une résilience accrue, car la perte d'un seul shard n'entraîne pas la perte de toutes les données.

Réplication : Les shards peuvent être répliqués pour assurer la redondance des données. Chaque shard primaire peut avoir un ou plusieurs réplicas, qui sont des copies exactes du shard. Les réplicas sont répartis sur différents nœuds du cluster Elasticsearch, ce qui garantit la disponibilité des données même en cas de défaillance d'un nœud ou d'un shard primaire. Les réplicas permettent également d'augmenter les performances en parallélisant les opérations de recherche.

Cluster : Un cluster Elasticsearch est constitué de plusieurs nœuds qui travaillent ensemble pour stocker et gérer les données. Les nœuds se coordonnent et se répartissent les tâches, ce qui augmente la résilience et la disponibilité du système. En cas de défaillance d'un nœud, les autres nœuds continuent de fonctionner normalement.

Sauvegarde : Elasticsearch offre des fonctionnalités de sauvegarde intégrées qui permettent de créer des snapshots des index et des shards. Ces snapshots peuvent être stockés sur un système de fichiers distant ou dans un référentiel dédié. La sauvegarde régulière des données garantit la récupération en cas de défaillance ou de perte de données.

### En ce qui concerne la mise à l'échelle, Elasticsearch dispose de fonctionnalités puissantes pour s'adapter aux besoins croissants de stockage et de performances :

Scaling horizontal : Elasticsearch prend en charge le scaling horizontal, ce qui signifie qu'il peut ajouter ou supprimer facilement des nœuds du cluster pour augmenter ou réduire la capacité de stockage et la puissance de calcul. Cette flexibilité permet d'ajuster les ressources en fonction des charges de travail et de gérer les pics de trafic.

Auto-sharding : Lors de l'ajout de nouveaux nœuds ou de la création d'index, Elasticsearch effectue automatiquement le sharding des données pour les répartir de manière équilibrée sur les nœuds disponibles. Cela permet de tirer pleinement parti des ressources du cluster et d'optimiser les performances.

Partitionnement : Elasticsearch permet de partitionner les index en utilisant des techniques telles que le partitionnement basé sur le temps (time-based partitioning) ou le partitionnement basé sur des critères personnalisés. Cela facilite la gestion des gros volumes de données et permet de limiter l'impact des opérations sur l'ensemble du cluster.

En résumé, Elasticsearch stocke ses données de manière distribuée en utilisant le sharding et la réplication. Ces concepts renforcent la robustesse des données en assurant la disponibilité, la résilience et la redondance. De plus, Elasticsearch offre des fonctionnalités de sauvegarde intégrées et des capacités de mise à l'échelle horizontale pour répondre aux besoins de stockage croissants et aux exigences de performances élevées.

## La Scroll API

La Scroll API d'Elasticsearch est utilisée pour effectuer des requêtes de recherche paginées efficaces sur un grand nombre de résultats. Elle permet de récupérer des ensembles de résultats volumineux de manière itérative, en évitant les limitations de taille de résultat par défaut et en garantissant une performance optimale.

Lorsqu'une recherche classique est effectuée avec Elasticsearch, seule une partie des résultats est renvoyée dans la réponse, généralement un nombre limité défini par le paramètre "size". Cela peut poser un problème lors de la récupération de grands ensembles de résultats, notamment lors de la pagination. La Scroll API résout ce problème en maintenant une "vue" continue des résultats pendant une période spécifiée.

### Pourquoi l'utiliser ?

#### Performance optimisée : 

L'utilisation de la Scroll API permet de minimiser les coûts de recherche en évitant de réexécuter la requête à chaque itération de pagination. Une fois initialisée, la recherche est maintenue en mémoire et les résultats suivants sont récupérés rapidement. Cela réduit la charge sur le cluster Elasticsearch et améliore les performances globales.

#### Consistance des résultats : 

Lorsque des modifications sont apportées à l'index entre les pages de pagination, la Scroll API garantit que les résultats restent cohérents pendant toute la durée du scroll. Cela évite les duplications ou les omissions accidentelles de résultats.

#### Gestion flexible des délais 

La Scroll API permet de spécifier une durée de scroll, déterminant combien de temps les résultats seront conservés en mémoire. Cela offre une flexibilité pour traiter les résultats à son propre rythme sans risque de les perdre. Une fois la durée de scroll expirée, les ressources associées sont libérées automatiquement.

En revanche, la Scroll API n'est pas recommandée pour toutes les situations de recherche paginée. Pour des volumes de données plus petits ou lorsqu'une recherche en temps réel est nécessaire, d'autres paramètres de recherche tels que "from" et "size" peuvent être utilisés (comme je l'ai fais pour mon projet) pour obtenir des résultats paginés. Cela dépend des besoins spécifiques de l'application et des contraintes de performance.

En résumé, la Scroll API est un choix approprié pour la recherche paginée lorsqu'il est nécessaire de traiter efficacement de grands ensembles de résultats tout en maintenant des performances optimales et une consistance des données.

## Kibana

Kibana est un outil utilisé pour visualiser et analyser les données stockées dans Elasticsearch. 
Son principal usage est de permettre aux utilisateurs de visualiser, d'explorer et d'interagir avec les données stockées dans Elasticsearch.

Il permet de créer des Dashboards, qui sont des pages personnalisées regroupant différentes visualisations. Les Dashboards offrent une vue synthétique des données et permettent aux utilisateurs d'interagir avec les informations de manière intuitive. Ils facilitent la surveillance, l'analyse et la prise de décision en présentant les données sous forme de graphiques, de tableaux et d'autres visualisations. 

En résumé, Kibana est un outil de visualisation de données puissant, utilisé pour créer des Dashboards et explorer les données stockées dans Elasticsearch.

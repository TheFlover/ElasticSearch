# Installation ElasticSearch

Site :
- https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

Executer :
- docker pull docker.elastic.co/elasticsearch/elasticsearch:8.7.1
- docker network create elastic
- docker run --name es01 --net elastic -p 9200:9200 -it docker.elastic.co/elasticsearch/elasticsearch:8.7.1
- Récupérer en copiant les informations retournées dans le terminal
- docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .*

 La commande : "curl --cacert http_ca.crt -u elastic https://localhost:9200" ne fonctionne pas.
 Il faut Executer depuis un terminal (fonctionne pas avec un powershell) : 
 - curl --ssl-revoke-best-effort --cacert http_ca.crt -u elastic https://localhost:9200/
 - Copier coller le mot de passe que l'on a récupéré à la création du container ElasticSearch

# Installation Kibana

Site :
- https://www.elastic.co/guide/en/kibana/current/docker.html

Executer :
- docker pull docker.elastic.co/kibana/kibana:8.7.1
- docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.1

Si on dépasse 30 min, il faut régénérer le mot de passe de l'Elastic user avec :
- docker exec -it es-node01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic

Allez sur : http://localhost:5601/ depuis le navigateur
Renseigner l'enrollment token et écrivez les 6 chiffres envoyés dans le docker kib-01
Si l'enrollment token est expiré, faite :
- docker exec -it es-01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
Utilisez le nouveau enrollment token

Se connecter avec le user/password donné lors du docker run de elesticSearch

# Installation Logstash 

Site :
- https://www.elastic.co/guide/en/logstash/current/docker.html

Executer :
- docker pull docker.elastic.co/logstash/logstash:8.7.1

# Installation de Kaggle

Se créer un compte sur : https://www.kaggle.com/

# Questions

## Comment Elasticsearch procède-t-il au mapping ?
Elasticsearch utilise un processus appelé "mapping" pour définir la structure et le type des données dans un index. Le mapping permet à Elasticsearch de comprendre comment interpréter et traiter les différents champs de données. Lorsque nous indexons des documents, Elasticsearch examine les données et déduit automatiquement le mapping en fonction du contenu. Il analyse les valeurs des champs pour déterminer les types de données appropriés tels que les chaînes de caractères, les nombres ou les dates. Nous pouvons également définir un mapping personnalisé pour spécifier les types de données et les paramètres de traitement des champs.

## Peut-on modifier le mapping sans recréer l'index ?
Non, il n'est pas possible de modifier directement le mapping sans recréer l'index. Une fois qu'un index est créé avec un certain mapping, il est en lecture seule et ne peut pas être modifié. Pour apporter des modifications de mapping, il est nécessaire de créer un nouvel index avec le mapping souhaité, puis de réindexer les données de l'ancien index vers le nouvel index. Ce processus implique de copier les données de l'index existant vers le nouvel index tout en appliquant le nouveau mapping. Il existe des techniques et des outils tels que l'API Elasticsearch ou des outils de reindexation dédiés pour faciliter ce processus de recréation d'index avec un nouveau mapping.

## Tentez de définir : Tokenisation et Normalisation 

### Tokenisation

La tokenisation est le processus de découpage d'un texte en unités discrètes appelées "tokens". Un token représente une unité du texte, telle qu'un mot, une phrase, un symbole ou même un caractère individuel. 
La tokenisation est une étape importante qui permet de transformer le texte en une séquence structurée de tokens, qui peuvent ensuite être analysés, indexés ou utilisés dans diverses tâches linguistiques telles que la recherche, la classification ou la génération de texte.

### Normalisation

La normalisation est le processus de transformation d'un texte en une forme standardisée ou normalisée afin de réduire les variations et d'assurer une cohérence lors de la comparaison et de la recherche de texte. 
La normalisation peut inclure plusieurs opérations, telles que la suppression des accents, la mise en minuscules, la suppression des signes de ponctuation, la conversion des nombres en leur forme textuelle, etc. L'objectif de la normalisation est d'obtenir une représentation uniforme du texte, indépendamment des variations liées à la casse, à l'orthographe ou à d'autres différences linguistiques, facilitant ainsi le traitement et l'analyse des données de manière cohérente.

En résumé, la tokenisation consiste à découper un texte en unités discrètes appelées "tokens", tandis que la normalisation vise à transformer le texte en une forme standardisée en appliquant des opérations. 
Ces deux processus sont utilisés dans le traitement du langage naturel pour préparer et traiter les données textuelles de manière efficace et cohérente.

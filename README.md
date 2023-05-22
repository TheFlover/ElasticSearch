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

# Installation Logstash 

Site :
- https://www.elastic.co/guide/en/logstash/current/docker.html

Executer :
- docker pull docker.elastic.co/logstash/logstash:8.7.1

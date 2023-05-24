# ElasticSearch

Création d'un projet permettant d'afficher les commentaire tripadvisor en fonction des notes des commentaires.

# Installation

Modification de max_map_count sur docker desktop :
``` wsl -d docker-desktop -u root ```
``` sysctl -w vm.max_map_count=262144 ```
``` exit ```

Installer elastic search et kibana à l'aide du docker compose :
``` docker-compose up -d ```

Importer le CSV tripadvisor-datas.csv dans elastic search a l'aide de Kibana.
- Aller dans l'url : http://localhost:5601/
- se login avec : Username : elastic, Password : Florian
- Allez dans "Machine Learning" > "Data Visualizer"
- Importez le fichier "tripadvisor-datas.csv"
- Créez l'index avec comme nom "tripreviews".

Lancer le Back :
``` cd .\back-ELK\ ```
``` npm install ```
``` npm run start ```

Lancer le Front :
``` cd .\front-ELK\ ```
``` pnpm install ```
``` pnpm run dev ```

# ScientificArticles
Predmetni projekat tima 17 iz premdeta XML i veb servisi.

# Prerequisites
- Node.js v12.14.0
- Python3
- Apache Tomee
  - exist v4.6.1
  - apache-jena-fuseki
- Apache FOP 2.4 (FOP_CMD environmental variable)

# Setup
## Node.js backend
In ./Backend folder run `npm install`
## Flask backend
In ./xsltService create .venv python virtual environment.
Run `.venv/Scripts/activate`
Run `pip install -r requirements.txt`
Set environmental variable FOP_CMD to .../fop-2.4/fop
## Angular frontend
In ./Frontend run `npm install`
## Databases
In ./.. create folder apache-tomee-8.0.0-plus/apache-tomee-8.0.0-plus with apache tomee server
Copy exist.war and fuseki.war in webapps folder

# Running project
Run ./start.bat

Alternatively start each server separately
- `./Backend npm start`
- `./xsltService python server.py`
- `./../apache-tomee-8.0.0-plus/apache-tomee-8.0.0-plus/bin/startup.bat`
- `./Frontend ng serve`

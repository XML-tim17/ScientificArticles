# ScientificArticles
Predmetni projekat tima 17 iz premdeta XML i veb servisi.

Demo video can be found [here](https://l.facebook.com/l.php?u=https%3A%2F%2Fdrive.google.com%2Fopen%3Fid%3D1kP2N9yi-fDA73WyT0X3BO-FllaElZLVG%26fbclid%3DIwAR2ak_tNFu4d61ifi8t8Yzm7kKbbvjxCxiAOV9MUvFEp8vmSOsnflYjl65Y&h=AT3RZGqZyM6KyCF2akbCQHtAwTAegqlDbLwuf0_ujqiLyFWEHeXfgd2dL6dvSzXLVQDRPS5_--OPnBXjfjA-a4aMrcTGO71Z7efEI9EeQzV3ulgCV8r4tZLTFgpNoQfzj-qtPw)

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

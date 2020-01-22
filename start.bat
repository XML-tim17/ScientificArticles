REM kako treba da izgleda struktura foldera
REM root-folder [ime kako god]
REM     apache-tomee-8.0.0-plus
REM         apache-tomee-plus-8.0.0
REM             bin
REM                 ...
REM     ScientificArticles
REM         start.bat
REM         ...

cd ..
cd apache-tomee-8.0.0-plus
cd apache-tomee-plus-8.0.0
cd bin
start startup.bat
cd ..
cd ..
cd ..

cd ScientificArticles

cd Backend
start cmd /k code .
start cmd /k npm start
cd ..

cd xsltService
cd venv
cd Scripts
CALL activate.bat
cd ..
cd ..
python server.py
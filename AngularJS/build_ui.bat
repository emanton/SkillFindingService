@echo off

call npm install

echo *** start grunt ***
call grunt build-ui
echo *** end grunt ***

rmdir /q /s node_modules
@echo off

set pathApi=src\app\swagger

if exist pathApi (
  DEL /F /Q /S %pathApi%\*.*
  RMDIR /Q /S %pathApi%
  if exist pathApi RMDIR /Q /S %pathApi%
)

java -jar swagger-codegen-cli.jar generate -i http://localhost:52647/swagger/v1/swagger.json -l typescript-angular -c config-swagger-generate.json -o %pathApi%

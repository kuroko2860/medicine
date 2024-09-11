#!/bin/sh

docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -v D:/Projects/medicine/db/data:/var/opt/mssql/data -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest

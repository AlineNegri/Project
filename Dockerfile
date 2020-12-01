FROM mcr.microsoft.com/dotnet/sdk:3.1

 # Install NodeJs
RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
apt-get install -y build-essential nodejs
# End Install

WORKDIR /app
EXPOSE 80

COPY Teste/Test.csproj ./Teste/
RUN dotnet restore "Teste/Test.csproj"

COPY . ./
RUN dotnet publish "Teste/Test.csproj" -c Release -o out

WORKDIR ./out
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Test.dll
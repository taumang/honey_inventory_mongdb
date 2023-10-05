FROM mcr.microsoft.com/dotnet/aspnet:7.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:7.0-nanoserver-1809 AS build
ARG configuration=Release
WORKDIR /src
COPY ["honey_inventory_mongdb.csproj", "./"]
RUN dotnet restore "honey_inventory_mongdb.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "honey_inventory_mongdb.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "honey_inventory_mongdb.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "honey_inventory_mongdb.dll"]

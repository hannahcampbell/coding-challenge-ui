FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /app

COPY . ./
RUN dotnet publish "./SchedulicityChat/SchedulicityChat.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine
EXPOSE 80

WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SchedulicityChat.dll"]

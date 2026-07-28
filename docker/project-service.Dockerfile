FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["services/project/ProjectService.Api/ProjectService.Api.csproj", "ProjectService.Api/"]
COPY ["services/project/ProjectService.Infrastructure/ProjectService.Infrastructure.csproj", "ProjectService.Infrastructure/"]
COPY ["services/project/ProjectService.Domain/ProjectService.Domain.csproj", "ProjectService.Domain/"]
COPY ["shared/Shared.Core/Shared.Core.csproj", "Shared.Core/"]

RUN dotnet restore "ProjectService.Api/ProjectService.Api.csproj"

# Copy everything else and build
COPY services/project/ services/project/
COPY shared/ shared/

WORKDIR "/src/ProjectService.Api"
RUN dotnet build "ProjectService.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProjectService.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:8080;http://+:8081
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

ENTRYPOINT ["dotnet", "ProjectService.Api.dll"]

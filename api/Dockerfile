# Based on: https://github.com/nitin27may/clean-architecture-docker-dotnet-angular/blob/main/backend/src/Dockerfile

#region SERVICE SETUP
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS base
WORKDIR /src
EXPOSE 8000
ENV ASPNETCORE_URLS=http://+:8000
# Optional: Create a non-root user
# RUN groupadd -g 2000 dotnet \
#     && useradd -m -u 2000 -g 2000 dotnet
# USER dotnet

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
ARG PUBLISH_CONFIGURATION=Release
ARG BUILD_CONFIGURATION=Release
ARG DOTNET_SKIP_POLICY_LOADING=true
#endregion

#region COPY AND BUILD
WORKDIR /src/CandyStore

# Copy project files individually
COPY ["/src/CandyStore/Candy.API/Candy.API.csproj", "Candy.API/"]
COPY ["/src/CandyStore/Candy.BLL/Candy.BLL.csproj", "Candy.BLL/"]
COPY ["/src/CandyStore/Candy.DAL/Candy.DAL.csproj", "Candy.DAL/"]
COPY ["/src/CandyStore/Candy.sln", "."]

# Restore dependencies for the solution
RUN dotnet restore "Candy.sln"

# Copy the rest of the source code
COPY /src/CandyStore .

# Restore dependencies for the project
RUN dotnet restore "Candy.API/Candy.API.csproj"

# Copy the rest of source code
COPY /src/CandyStore/. .

RUN dotnet build "./Candy.API/Candy.API.csproj" -c $BUILD_CONFIGURATION -o /app/build
#endregion

#region PUBLISH
FROM build AS publish
RUN dotnet publish "./Candy.API/Candy.API.csproj" -c $PUBLISH_CONFIGURATION -o /app/publish /p:UseAppHost=false
#endregion

#region HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
		CMD curl --fail http://localhost:8000/health || exit 1
#endregion

#region ENTRYPOINT
# Entry point to run the application (using a pattern for flexibility)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Candy.API.dll"]
#endregion
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["*.csproj", "./"]
RUN dotnet restore

# Copy the rest of source code
COPY . .
WORKDIR "/src/."

RUN dotnet publish -c Release -o /app/publish

# Create the final, smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose the port the app will run on
EXPOSE 8080

# Entry point to run the application
ENTRYPOINT ["dotnet", "Candy.API.dll"]
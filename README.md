# Frontend project using Next.js

- [1. Prerequisites](#1-prerequisites)
- [2. Installation ](#2-installation)
- [3. Running the Application](#3-running-the-application)
- [4. Environment Configuration](#4-environment-configuration)
- [5. Prerequisites to run the Application in Docker](#5-prerequisites-to-run-the-application-in-docker)
- [6. Build the Docker image using the provided Dockerfile](#6-build-the-docker-image-using-the-provided-dockerfile)
- [7. Run the Application](#7-run-the-application)
- [8. Accessing the Application](#8-accessing-the-application)
- [9. Stopping and Cleaning Up](#9-stopping-and-cleaning-up)

## 1. Prerequisites:

Before running the application, make sure you have the following dependencies installed:

- Node.js: Download and Install Node.js
- npm (Node Package Manager): It comes with Node.js, so no need to install separately.

## 2. Installation:

Clone the repository and install project dependencies.

```
git clone https://github.com/katelovestocode/frontend-internship.git
cd your-project-directory
npm install
```

## 3. Running the Application:

Start your Next.js application on port **3000** using the following command:

```
npm run dev
```

## 4. Environment Configuration:

To configure your Next.js application, you will need an environment (`.env`) file. This file is used to store sensitive data and configuration settings. Here's how you can set up your `.env` file:

1. Create an `.env` file in the root of your project directory.

2. Define your environment variables in the `.env` file. You need to specify values for variables like PORT, Database connection URLs, API keys, and other configuration settings. For example:

   ```env
   PORT=3000
   ```

## 5.Prerequisites to run the Application in Docker

Before you can run the application in Docker, make sure you have the following dependencies installed on your machine:

- Docker: Download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).

## 6. Build the Docker image using the provided Dockerfile:

```
docker build -t frontend-image .
```

## 7. Run the Application

Now that you have built the Docker image, you can run the application within a Docker container. Use the following command:

```
docker run -d -p 3000:3000 --name frontend-container frontend-image
```

## 8. Accessing the Application

Once the container is up and running, you can access the application in your web browser by navigating to:

```
http://localhost:3000
```

## 9. Stopping and Cleaning Up

To stop the Docker container, use the following command:

```
docker stop frontend-container
```

To remove the Docker container and image when you're done, run:

```
docker rm frontend-container
docker rmi frontend-container
```

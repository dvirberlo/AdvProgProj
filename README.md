# AdvProgProj

## Run the Project

### Run using Docker (recommended)

You can run the code using Docker in the following way:
(replace `3000` and `8080` with any available ports you want. just make sure to update them in `.env` files as well as any running commands)

1. Run a Mongo DB container (NOTE: the DB will start empty every time it is restarted)

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports --rm --name mongo mongo
```

2. Run the recommendation server (make sure the file `./data/user_data.txt` is deleted first)

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports --rm --name server-main server-main 8080
```

3. Create a config file at `./src/web-server/config/.env.production` with the relevant ports and addresses. If you follow our exact command, this should look like this:

```env
CONNECTION_STRING=mongodb://mongo:27017
PORT=3000
RECOMMEND_IP="server-main"
RECOMMEND_PORT=8080
JWT_PRIVATE_KEY=some_private_key
```

4. Run the web server

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --rm --name web-server -p 3000:3000 web-server
```

Now, you can access the web server through localhost at the specified port (here `3000`). For example:

```bash
curl -i http://localhost:3000/api/categories
```

#### Run only recommendation server and python client

if you wish to run only thee recommendation server and the python client, follow these steps:

1. To run the server, execute:

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports --rm --name server-main server-main 8080
```

2. To run the client, execute:

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports client-main server-main 8080
```

Note : First run the Server then run the client.

you can test the app using

```bash
docker-compose -f src/docker-compose.yml run --build server-test
```

## Short explanation about the program

This repository contains the implementation of a Movie Recommendation System API, which provides various functionalities for user registration, login, movie categorization, movie management, and user-based movie recommendations.
The API is designed to handle movie recommendations for authenticated users and interact with an internal recommendation system written in C++. This system provides movie recommendations based on the user's preferences and the movies they have watched.

### Features

#### User Authentication and Registration:

- Register new users.
- Login and retrieve authentication tokens.
- Retrieve user details based on a unique user ID.

#### Categories Management:

- Create, read, update, and delete movie categories.
- Retrieve all categories or a specific category by ID.

#### Movies Management:

- Retrieve movies by category.
- Add new movies to the system.
- Update or delete existing movies.
- Search for movies by query.

#### Recommendations:

- Retrieve recommended movies based on user preferences.
- Add movies to a user’s watch list.
- The recommendations are fetched from an internal recommendation system implemented in C++.

### API Endpoints

#### 1. User Management

**POST** `/api/users`
Creates a new user in the system.

**GET** `/api/users/:id`
Retrieves user details based on the provided user ID (:id).

**POST** `/api/tokens`
Logs in a user by verifying the username and password.

#### 2. Categories Management

**GET** `/api/categories`
Retrieves all categories.

**POST** `/api/categories`
Creates a new category.

**GET** `/api/categories/:id`
Retrieves the category details by ID.

**PATCH** `/api/categories/:id`
Updates the category based on its ID.

**DELETE** `/api/categories/:id`
Deletes the category by ID.

#### 3. Movies Management

**GET** `/api/movies`
Retrieves a list of movies based on the user's viewing history and category preferences.

**POST** `/api/movies`
Adds a new movie to the system.

**GET** `/api/movies/:id`
Retrieves the details of a specific movie by ID.

**PUT** `/api/movies/:id`
Updates an existing movie by ID.

**DELETE** `/api/movies/:id`
Deletes a movie by ID.

#### 4. Movie Recommendations

**GET** `/api/movies/:id/recommend/`
Retrieves recommended movies based on the user’s viewing history and the current movie’s ID from the internal recommendation system (written in C++).

**POST** `/api/movies/:id/recommend/`
Adds the current movie to the user’s watch list.

#### 5. Movie Search

**GET** `/api/movies/search/:query/`
Searches for movies based on the given query string.

### Authentication

All requests that require the user to be authenticated must include the Token-ID header.

### Integration with the Recommendation System

This API integrates with an internal recommendation system implemented in C++. The system provides movie suggestions based on the user's historical data and interactions with the movies in the system. When a request is made to fetch recommendations for a movie, the backend will send the request to the recommendation system, receive the recommended movies, and forward them to the user.

## Output example:

### `/api/users`

![98](https://github.com/user-attachments/assets/cbe6e889-5374-49b8-b157-66641ce755b8)

![99](https://github.com/user-attachments/assets/4ae3dc8e-8845-4256-91fd-cd7902269fa3)

![100](https://github.com/user-attachments/assets/47e27dac-ac9c-4c15-93b2-52cc1e1a7df3)

### `/api/tokens`

![101](https://github.com/user-attachments/assets/df22d46e-c172-46d6-8c28-df9cd3cb781e)

![102](https://github.com/user-attachments/assets/7c5c71ec-e692-4e06-b3a4-68f6e5141d6c)

![103](https://github.com/user-attachments/assets/213e7ac3-ba4e-43a3-89b9-a0edbe05b37a)

### `/api/categories`

![104](https://github.com/user-attachments/assets/e8dc88e8-3ebe-4939-aef1-572b5a7679d4)

![105](https://github.com/user-attachments/assets/376b3d96-a889-4cca-b748-912a56fdda08)

![106](https://github.com/user-attachments/assets/988b835a-5333-4a76-9443-fb3cef2eb66b)

![107](https://github.com/user-attachments/assets/57c0c019-d468-46d5-b966-c886aa44dd0f)

![108](https://github.com/user-attachments/assets/0dcab6aa-4880-493f-bf71-dc5d7c03171f)

![109](https://github.com/user-attachments/assets/66d533eb-780e-4429-a1b2-7df00600f97d)

![110](https://github.com/user-attachments/assets/18f300bf-614b-4ca1-b33b-f98ae7555ae5)

![111](https://github.com/user-attachments/assets/c49ef415-637f-4121-b3e5-ef649c53d672)

### `/api/movies`

![112](https://github.com/user-attachments/assets/1c6a06af-ee4a-4907-871e-1cf80c8a1b2a)

![113](https://github.com/user-attachments/assets/78775c21-3a37-475e-a31f-cb0170b4bda0)

![114](https://github.com/user-attachments/assets/bf1befe3-93e5-4e5c-832e-4aa2d2a65a73)

![115](https://github.com/user-attachments/assets/86c977b6-f135-48de-8508-c718a1da6510)

![116](https://github.com/user-attachments/assets/bafe3ee5-c710-4c1e-ade0-fbd6887ceb81)

![117](https://github.com/user-attachments/assets/e1b010e2-2502-42b8-8d5b-ed527b0c890e)

![118](https://github.com/user-attachments/assets/7d5d9847-0b65-40cc-b7b3-fe7b82a3bfd7)

![119](https://github.com/user-attachments/assets/4af59bed-12d5-484f-961d-d0baaea19f8d)

![120](https://github.com/user-attachments/assets/35f60f92-5732-4ff2-9680-3902c878400a)

![121](https://github.com/user-attachments/assets/f3ea4b86-0c2a-46c6-aafb-ba9630c9dca1)

### `/api/movies/:id/recommend/`

![122](https://github.com/user-attachments/assets/65adb444-addd-4cd1-9428-6a7e1f4bfc6c)

![123](https://github.com/user-attachments/assets/8e81a59e-f9de-4def-9ceb-72f5ac418459)

![124](https://github.com/user-attachments/assets/5f3725b7-58ea-4d21-a219-994292105caa)

![125](https://github.com/user-attachments/assets/3a2ef3d4-b063-4abe-940b-c57d57e6da07)

![126](https://github.com/user-attachments/assets/40a34585-014c-4c61-84b3-40a72a050978)

![127](https://github.com/user-attachments/assets/1abf8c3b-3b3f-4163-952a-d77e15e3b419)

![128](https://github.com/user-attachments/assets/a11f3989-4fcc-42a6-8b40-08c2c08ac696)

![129](https://github.com/user-attachments/assets/7cd88ab0-8f5b-4ea8-be17-07b80b73c313)

![130](https://github.com/user-attachments/assets/bffeee90-e651-4444-a235-77727491c0fb)

### `/api/movies/search/:query/`

![131](https://github.com/user-attachments/assets/42a3f32c-4ddf-41f7-a33a-a066061f4a11)

![132](https://github.com/user-attachments/assets/a21c0f8b-77c2-41d6-a1d1-5b167e156ce7)

![133](https://github.com/user-attachments/assets/140e439a-99d4-4ce5-aa7d-f542785b704c)

![134](https://github.com/user-attachments/assets/47bd543c-472f-4368-91d4-cb4a4073d37d)

## Development

### Run the code locally

#### Recommendation Server

For faster development iteration, you can also run the code directly on your Linux/WSL machine:

First, install CMake (command for Debian based distributions)

```bash
sudo apt-get update
sudo apt-get install cmake
```

From the root directory of the project, you can run our provided scripts

```bash
./src/server/scripts/run.sh 8080 # run the app with port 8080


./src/server/scripts/test.sh # test the app
```

#### Python Recommendation Client

First, run the server as described above. Then, navigate to the root directory folder and execute the following:

```bash
python3 src/client/client.py 127.0.0.1 8080
```

Note: When running locally, ensure that the server is hosted on your own localhost. For now, port 8080 is the designated port for the server to listen on.

#### Web Server

First, install [NodeJS](https://nodejs.org) and [MongoDB](https://www.mongodb.com/docs/manual/installation).

Second, create an environment file `.env.local` inside `src/web-server/config` folder, with MongoDB `CONNECTION_STRING` and `PORT` for the server.
The file should look like this:

```env
CONNECTION_STRING=mongodb://localhost:27017
PORT=3000
RECOMMEND_IP="127.0.0.1"
RECOMMEND_PORT=8080
JWT_PRIVATE_KEY=some_private_key
```

Once everything is installed and configured, you can enter the Web Server's folder and run it:

```bash
cd src/web-server
npm install # install required npm packages
npm start # start the web server
```

#### React Client

First, install [NodeJS](https://nodejs.org).

Once installed, you can install the npm dependencies and run the client locally:

```bash
cd src/react-client
npm install # install required npm packages
npm start # start a static server on local host and open the client in browser
```

### Code Style and Format

Please, always format your files.

We use [Prettier](https://prettier.io/) formatter for any language it supports (currently: .md and .yml files)

We use [Clang Format](https://clang.llvm.org/docs/ClangFormat.html) for our C++ server source code.

#### Install the Formatters

Both formatter have VSCode extensions (see recommendations at [./.vscode/extensions.json](./.vscode/extensions.json)).
But you can also install and run them using CLIs:

```bash
# Prettier:
# install Prettier globally (using npm)
sudo apt-get install nodejs
npm install -g prettier
# check all the files using Prettier
npx prettier . --check
# format all the files using Prettier
npx prettier . --write

# Clang Format:
# install Clang Format
sudo apt-get install clang-format
# check all the files using Clang Format
clang-format --dry-run $(find . -name "*.cpp" -o -name "*.h")
# format all the files using Clang Format
clang-format -i $(find . -name "*.cpp" -o -name "*.h")
```

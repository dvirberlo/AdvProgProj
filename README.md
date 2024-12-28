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

//example of curl requests

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
./src/server/scripts/run.sh # run the app


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
```

Once everything is installed and configured, you can enter the Web Server's folder and run it:

```bash
cd src/web-server
npm install # install required npm packages
npm start # start the web server
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

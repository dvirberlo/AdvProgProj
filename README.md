# AdvProgProj

## Run the Project

### Run using Docker (recommended)

You can run the code using Docker:

```bash
cd src
docker-compose up --build
```

(you can run only the app using `docker-compose up --build app` or only the tests `docker-compose up --build test`)

### Run locally:

You can run the code directly on your Linux/WSL machine, if you wish:

First, compile the project using CMake:

```bash
cd src && mkdir local-build
cd local-build && cmake .. && make
```

Then, you can run the app and the tests:

```bash
./app.out
./test.out
```

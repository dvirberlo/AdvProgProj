# AdvProgProj

## Run the Project

### Run using Docker (recommended)

You can run the code using Docker:

```bash
cd src
docker-compose up --build
```

(you can run the app using `docker-compose up --build main` or test it using `docker-compose up --build test`)

### Run locally:

You can run the code directly on your Linux/WSL machine, if you wish:

Run the app:

```bash
cd src && mkdir build-main
cd build-main && cmake ../main && make
./main.out
```

Test the app:

```bash
cd src && mkdir build-test
cd build-test && cmake ../test && make
./test.out
```

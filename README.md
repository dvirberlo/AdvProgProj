# AdvProgProj

## Run the Project

### Run using Docker (recommended)

You can run the code using Docker:

```bash
docker-compose -f src/docker-compose.yml run --build main
```

you can test the app using

```bash
docker-compose -f src/docker-compose.yml run --build test
```

### Run locally:

For faster development iteration, you can also run the code directly on your Linux/WSL machine:

First, install CMake (command for Debian based distributions)

```bash
sudo apt-get update
sudo apt-get install cmake
```

You can run the app with

```bash
mkdir src/build-main
cmake -S src/main -B src/build-main
make -C src/build-main
./src/build-main/main.out
```

You can test the app with

```bash
mkdir src/build-test
cmake -S src/test -B src/build-test
make -C src/build-test
./src/build-test/test.out
```

Or from the root directory of the project, run our provided scripts

```bash
./src/scripts/run.sh # run the app
./src/scripts/test.sh # test the app
```

FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

# copy project into container (assume Docker context (directory) is the root of the project)
COPY . /usr/project/src

WORKDIR /usr/project

# clean
RUN ./src/scripts/clean.sh

# build
RUN ./src/scripts/build.sh main

# run
CMD [ "./src/build-main/main.out" ]

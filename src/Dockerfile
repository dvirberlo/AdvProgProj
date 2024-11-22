FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

# assume Docker context (directory) is the root of the project
COPY . /usr/project

WORKDIR /usr/project

RUN mkdir src/build
RUN cmake -S src/main -B src/build
RUN make -C src/build

CMD [ "./src/build/main.out" ]

FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

# assume Docker context (directory) is the root of the project
COPY . /usr/project

WORKDIR /usr/project

CMD [ "./src/scripts/clean.sh" ]
CMD [ "./src/scripts/test.sh" ]

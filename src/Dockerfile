FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

# copy project into container (assume Docker context (directory) is the root of the project)
COPY . /usr/project

WORKDIR /usr/project

# clean
RUN "./src/scripts/clean.sh"

# run
CMD [ "./src/scripts/run.sh" ]

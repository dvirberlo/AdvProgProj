# This is the Dockerfile for the client side of the project
FROM  python:3
# Create a directory for the client : the contianer will start in this directory
WORKDIR /client
# Copy the client files to the container
COPY . /client
ENTRYPOINT ["python3", "client.py"]
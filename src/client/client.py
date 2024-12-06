import socket
import sys

MAXIMUM_BYTES_PER_MSG = 4096  # Define a constant for the buffer size

def main():
    if len(sys.argv) != 3:
        sys.exit(1)  

    dest_ip = sys.argv[1]  # Get the server IP address from command line arguments
    dest_port = int(sys.argv[2])  # Get the server port number from command line arguments

    socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        socket.connect((dest_ip, dest_port))
    except ConnectionError as e:
        print(f"Failed to connect to {dest_ip}:{dest_port}", file=sys.stderr)
        sys.exit(1)
    # The client will keep sending messages to the server until the client is terminated by the user himself
    while True:
        msg = input()
        socket.send(bytes(msg, 'utf-8'))
        data = socket.recv(MAXIMUM_BYTES_PER_MSG)
        print(data.decode('utf-8'))
if __name__ == "__main__":
    main()

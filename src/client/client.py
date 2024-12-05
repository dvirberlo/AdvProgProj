import socket
import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <server_ip>")
        sys.exit(1)

    dest_ip = sys.argv[1]  # Get the server IP address from command line argument
    dest_port = 8080

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect((dest_ip, dest_port))
    except ConnectionError as e:
        print(f"Failed to connect to {dest_ip}:{dest_port}. Error: {e}")
        sys.exit(1)

    msg = input("Message to send: ")
    while msg != 'quit':
        s.send(bytes(msg, 'utf-8'))
        data = s.recv(4096)
        print("Server sent: ", data.decode('utf-8'))
        msg = input("Message to send: ")

    s.close()

if __name__ == '__main__':
    main()

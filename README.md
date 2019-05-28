# Server
Http server based on libevent library.

## Author
Ushakova Valentina

## Getting started
- Download all files: 
```git clone https://github.com/ValentinaUshakova/server.git```
- To start server use function int server(int argc, char *argv[]) in file server.cpp 
argv array should have such form:
`./main.out [path: optional] -i 127.0.0.1 -p 5555 -w 4 -v`

Note! Server can process only POST, GET ang HEAD requests!

## Command line params:
* `path` - optional - server work dir (def - "dir") 
* `-i/--ip` - optional - ip address (def - "0.0.0.0")
* `-p/--port` - optional - port (def - 8000)
* `-w/--workers` - optional - number of workers (def -1)
* `-v/--verbose` - optional - system log 
* `-h/--help` - optional - print help message and close program.

## License
This project is licensed under the MIT License




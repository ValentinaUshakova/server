#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include "server.cpp"
#include <string.h>
#include "req_parser.cpp"

int main(int argc, char *argv[])
{    
    run_tests();

    server(argc, argv);

    return 0;
}
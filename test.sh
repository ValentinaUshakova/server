#!/bin/bash

echo "Test GET /"
for i in {1..5}
do
    start=`date +%s`
    for j in {1..10}
    do
        curl -X GET http://127.0.0.1:5555/ -I -s | grep "HTTP/1.1" &
    done
    end=`date +%s`
    sleep 2s
done
sleep 2s

echo "Test POST /"
for i in {1..5}
do
    for j in {1..10}
    do
        curl -X POST http://127.0.0.1:5555/ -I -s | grep "HTTP/1.1" &
    done
    sleep 2s
done

echo "Test mix /"
for i in {1..5}
do
    for j in {1..5}
    do
        curl -X GET http://127.0.0.1:5555/ -I -s | grep "HTTP/1.1" &
        curl -X POST http://127.0.0.1:5555/ -I -s | grep "HTTP/1.1" &
    done
    sleep 2s
done

echo "Test mix / with errors"
for i in {1..5}
do
    for j in {1..5}
    do
        curl -X GET http://127.0.0.1:5555/ -I -s | grep "HTTP/1.1" &
        curl -X POST http://127.0.0.1:5555/ -I -s | grep "HTTP/1.1" &
        curl -X POST http://127.0.0.1:5555/asdf -I -s | grep "HTTP/1.1" &
    done
    sleep 2s
done


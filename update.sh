#!/bin/bash
git pull --force
docker build -t covid .
docker stop covid
docker rm covid
docker run --name covid -e VIRTUAL_HOST=covid2019.tech -e VIRTUAL_PORT=8080 --network=draven_default --restart unless-stopped -d covid:latest

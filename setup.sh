#!/bin/bash

(cd ./client && npm install && npm build)
docker compose up
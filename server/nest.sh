#!/bin/bash
# Execute Nest commands inside of the running container
# Usage: ./nest.sh <npm-script> [...script-args]
# e.g. ./nest.sh seed:summaries --count=25

SERVER_CONTAINER_NAME=$(docker ps | grep -w 'fd-server' | awk '{print $NF}')
docker exec -i $SERVER_CONTAINER_NAME sh << EOF
npm run nest-command $1 -- ${@:2}
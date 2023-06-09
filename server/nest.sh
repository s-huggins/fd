#!/bin/bash
# Execute nest-commander commands inside of the running server container
# Usage: ./nest.sh <npm-script> [...script-args]
# e.g. ./nest.sh `summaries:seed` --count=25

SERVER_CONTAINER_NAME=$(docker ps | grep -w 'fd-server' | awk '{print $NF}')
docker exec -i $SERVER_CONTAINER_NAME sh << EOF
NODE_ENV='dev' npm run nest-command $1 -- ${@:2}
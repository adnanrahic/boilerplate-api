if [[ "$(docker images -q $API_IMAGE:$TAG 2> /dev/null)" == "" ]]; then
  docker build --tag $API_IMAGE:$TAG -f Dockerfile.builder .
  docker build --tag $CLIENT_IMAGE:$TAG ./client
fi
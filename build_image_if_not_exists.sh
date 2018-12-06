if [[ "$(docker images -q $API_IMAGE:$TAG 2> /dev/null)" == "" ]]; then
  docker-compose build -f docker-compose.build.yml
fi
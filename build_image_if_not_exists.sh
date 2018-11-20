if [[ "$(docker images -q $API_IMAGE:$TAG 2> /dev/null)" == "" ]]; then
  docker-compose -f docker-compose.prebuild.yml build
fi
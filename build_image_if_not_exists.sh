if [ -d "docker_images" ]; then 
  docker load -i docker_images/api_image_${TAG}.tar
  docker load -i docker_images/client_image_${TAG}.tar
else 
  if [[ "$(docker images -q $API_IMAGE:$TAG 2> /dev/null)" == "" ]]; then
    docker-compose -f docker-compose.build.yml build
  fi
fi
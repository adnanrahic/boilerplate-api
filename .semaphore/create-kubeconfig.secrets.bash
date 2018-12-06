sem create secret kubeconfig \
  --file ${HOME}/${KOPS_CLUSTER_NAME}-kubeconfig.yaml:/home/semaphore/.kube/config

sem get secrets kubeconfig

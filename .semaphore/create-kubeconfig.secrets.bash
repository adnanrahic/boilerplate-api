KUBECONFIG=${HOME}/${KOPS_CLUSTER_NAME}-kubeconfig.yaml kops export kubecfg --name ${KOPS_CLUSTER_NAME} --state ${KOPS_STATE_STORE}

sem create secret kubeconfig \
  --file ${HOME}/${KOPS_CLUSTER_NAME}-kubeconfig.yaml:/home/semaphore/.kube/config

sem get secrets kubeconfig

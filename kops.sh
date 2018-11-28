export ORGANIZATION_NAME=<your_org_name>

# create state store
export BUCKET_NAME=${ORGANIZATION_NAME}-kops-state-store
aws s3api create-bucket --bucket ${BUCKET_NAME} --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1
aws s3api put-bucket-versioning --bucket ${BUCKET_NAME} --versioning-configuration Status=Enabled

# create cluster
export KOPS_CLUSTER_NAME=${ORGANIZATION_NAME}.k8s.local
export KOPS_STATE_STORE=s3://${BUCKET_NAME}

# define cluster config
kops create cluster --master-count=1 --master-size=t2.micro --node-count=1 --node-size=t2.micro --zones=eu-west-1a --name=${KOPS_CLUSTER_NAME}

# if you want to edit config
kops edit cluster --name ${KOPS_CLUSTER_NAME}

# apply and create cluster
kops update cluster --name ${KOPS_CLUSTER_NAME} --yes

# validate cluster is running
kops validate cluster

# export kubectl config file
KUBECONFIG=${HOME}/${KOPS_CLUSTER_NAME}-kubeconfig.yaml kops export kubecfg --name ${KOPS_CLUSTER_NAME} --state ${KOPS_STATE_STORE}

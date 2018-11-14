export GIT_HASH=$(shell git log --format=format:'%h' -1)
export TAG=$SEMAPHORE_GIT_BRANCH_$GIT_HASH_$SEMAPHORE_WORKFLOW_ID
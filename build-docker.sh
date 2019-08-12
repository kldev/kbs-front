TAG=latest

if [ -z "$1" ]; then
echo 'build with tag latest'
else
echo "build with tag $1"
TAG=${1}
fi

docker build -t kbs-front:${TAG} .
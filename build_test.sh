IMAGE_TAG=registry.cn-hangzhou.aliyuncs.com/social-sensor/thoth-web-admin-test:latest
docker build . --platform linux/amd64 -t $IMAGE_TAG
docker push $IMAGE_TAG

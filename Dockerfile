FROM docker.io/nginx
MAINTAINER DZG <jsjjdzg@163.com>
LABEL Descripttion="This Image is build for tiangou"
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /
ADD bilidili-dog /
ADD web.conf  /etc/nginx/conf.d/
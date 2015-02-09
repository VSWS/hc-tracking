# VERSION 0.2
# DOCKER-VERSION 0.3.4
# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .

FROM centos:6.6

# Dependencies
RUN \
    yum groupinstall -y "Development tools" && \
    yum install -y epel-release && \
    yum install -y npm && \
    yum install -y nodejs && \
    yum update &&

# App
ADD . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE  4444
CMD ["node", "/src/udp.js"];
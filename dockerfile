# VERSION 0.2
# DOCKER-VERSION 0.3.4
# To build:
    # 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .

    FROM centos:6.6

# Dependencies system .
    RUN \
    yum groupinstall "Development tools" && \
    yum install epel-release && \
    yum update

# Install dependencies App

RUN \

# -- Install Node.js
    cd /tmp && \
    wget http://nodejs.org/dist/node-latest.tar.gz && \
        tar vxzf node-latest.tar.gz && \
    rm -f node-latest.tar.gz && \
    cd node-v* && \
    ./configure && \
    CXX="g++ -Wno-unused-local-typedefs" make && \
    CXX="g++ -Wno-unused-local-typedefs" make install && \
    cd /tmp && \
    rm -rf /tmp/node-v* && \
    npm install -g npm && \
    echo -e '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

# -- Install Redis
    cd /tmp && \
    wget http://download.redis.io/redis-stable.tar.gz && \
        tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    make install && \
    cp -f src/redis-sentinel /usr/local/bin && \
    mkdir -p /etc/redis && \
    cp -f *.conf /etc/redis && \
    rm -rf /tmp/redis-stable* && \
    sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf && \
    sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf && \
    sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
    sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf


# Define mountable directories.
#    VOLUME ["/data"]

# Define working directory.
# WORKDIR /data


# App
ADD . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE  4444
CMD ["node", "/src/udp.js"]
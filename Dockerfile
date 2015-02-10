# Build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .

    FROM centos:7

    MAINTAINER Tung Touch <tungnguyen@vsoft.vn>

# Dependencies system .
    RUN \
    yum install wget -y && \
    yum install tar -y && \
    yum update -y && \
    yum groupinstall "Development tools" -y && \
    yum install epel-release -y && \
    yum install wget -y && \
    yum update -y

# Install dependencies App

    RUN \
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
    RUN \
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


# Copy source app
ADD . /src

# Install app dependencies
RUN cd /src; npm install
RUN ls
EXPOSE  4444
CMD ["node", "/src/udp.js"]
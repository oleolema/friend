FROM maven
MAINTAINER yqh<yqh@qq.com>

ENV CODE /code
ENV WORK /code/work
RUN mkdir -p $CODE \
    && mkdir -p $WORK
WORKDIR $CODE
COPY ./ ./

# mvn打包
RUN chmod 777 ./server/mvnw
RUN mvn install
RUN mvn package
RUN cp ./server/target/*.jar $WORK/work.jar

WORKDIR $WORK

CMD ["java","-jar","work.jar"]







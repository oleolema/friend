FROM maven
MAINTAINER yqh<yqh@qq.com>

ENV CODE /code
ENV WORK /code/work
RUN mkdir -p $CODE
RUN mkdir -p $WORK
WORKDIR $CODE
COPY . .

# mvn打包
RUN ./server/mvnw package
RUN cp ./server/target/*.jar $WORK/work.jar

WORKDIR $WORK

CMD ["java","-jar","work.jar"]







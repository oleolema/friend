## 运行项目

1. 创建数据库
```
source ./server/resources/create.sql
```

2. 编译运行
```
cd ./client
npm install
npm run build

cd ../server
mvn install
mvn package
java -jar ./target/friend-0.0.1.jar
```

3. 浏览器访问
```
http://localhost:8080/
```
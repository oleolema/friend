/**
 * FileName:   SwaggerConfig
 * Author:     O了吗
 * Date:       2020/3/8 16:40
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/8
 * @since 1.0.0
 */

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket docket(Environment environment) {
        boolean dev = environment.acceptsProfiles(Profiles.of("dev"));
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                //只在开发模式启用
                .enable(dev)
                .select()
                /*
                    RequestHandlerSelectors:配置扫描接口的方式
                        basePackage(String): 扫描指定包
                        any(): 扫描全部
                        none(): 不扫描
                        withClassAnnotation(Class): 扫描类上的注解
                        withMethodAnnotation(Class): 扫描方法上的注解
                 */
                .apis(RequestHandlerSelectors.basePackage("com.yqh.omall.controller"))
                /*
                    PathSelectors : 过滤的路径
                        ant(String) : 正则路径
                 */
//                .paths(PathSelectors.any())
                .build();
    }

    public ApiInfo apiInfo() {
        return new ApiInfo("omall的API文档",
                "omallAPI的描述信息",
                "1.0",
                "oleolema",
                new Contact("oleolema", "https://www.github.com/oleolema", "oleolema@qq.com"),
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0",
                new ArrayList());
    }
}
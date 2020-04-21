/**
 * FileName:   SpringMvcConfig
 * Author:     O了吗
 * Date:       2020/3/10 23:34
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/10
 * @since 1.0.0
 */
@Configuration
public class SpringMvcConfig implements WebMvcConfigurer {

    private static final List<String> NO_NEED_LOGIN_LIST =
            Arrays.asList(
                    "/user/login", "/user/register", "/user/forget*", "/user/checkValid",
                    "/manage/user/login",
                    "/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg", "/*.html", "/**/*.html", "/swagger-resources/**"
            );


    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildConfig());
        return new CorsFilter(source);
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        //登录拦截器
//        registry.addInterceptor(new LoginInterceptor())
//                .addPathPatterns("/**")
//                .excludePathPatterns(NO_NEED_LOGIN_LIST);
//
//        //管理员拦截器
//        registry.addInterceptor(new AdminInterceptor())
//                .addPathPatterns("/manage/**")
//                .excludePathPatterns(NO_NEED_LOGIN_LIST);
//    }
}
/**
 * FileName:   IndexController
 * Author:     O了吗
 * Date:       2020/4/3 23:12
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/4/3
 * @since 1.0.0
 */
public class IndexController {

    @GetMapping("/")
    public void index(HttpServletResponse response) throws IOException {
        response.sendRedirect("/index.html");
    }
}
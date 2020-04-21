/**
 * FileName:   ControllerUtils
 * Author:     O了吗
 * Date:       2020/3/10 23:30
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.util;

import com.example.test1.demo.common.ResponseMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/10
 * @since 1.0.0
 */
@Slf4j
public class ControllerUtils {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public static void printJson(HttpServletResponse response, ResponseMessage<?> responseMessage) {
        response.setContentType("application/json; charset=utf-8");
        try (PrintWriter writer = response.getWriter()) {
            writer.print(OBJECT_MAPPER.writeValueAsString(responseMessage));
        } catch (IOException e) {
            log.error("response error", e);
        }
    }
}
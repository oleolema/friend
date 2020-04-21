/**
 * FileName:   Constant
 * Author:     O了吗
 * Date:       2020/3/7 22:00
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.common;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/7`
 * @since 1.0.0
 */
public class Constant {

    public static final String CURRENT_USER = "currentUser";

    public interface Valid {
        String username = "username";
        String email = "email";
        String phone = "phone";
    }

    public interface Role{
        int admin = 0;
        int normal = 1;
    }

}
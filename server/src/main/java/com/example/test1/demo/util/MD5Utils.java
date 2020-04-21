/**
 * FileName:   MD5Utils
 * Author:     O了吗
 * Date:       2020/3/7 22:53
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/7
 * @since 1.0.0
 */
public class MD5Utils {

    private static final String[] CHARS = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"};

    private static final String SALT = "";

    public static String encode(String text) {
        String str = text + SALT;
        MessageDigest md = null;
        byte[] digest = null;
        try {
            md = MessageDigest.getInstance("MD5");
            // 计算md5函数
            digest = md.digest(str.getBytes("utf-8"));
            StringBuilder sb = new StringBuilder();
            for (byte x : digest) {
                //高4位
                int h = 0x0f & (x >>> 4);
                //低4位
                int l = 0x0f & x;
                sb.append(CHARS[h]).append(CHARS[l]);
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
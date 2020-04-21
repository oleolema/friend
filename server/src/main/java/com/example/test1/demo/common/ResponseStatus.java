/**
 * FileName:   ResponseStatus
 * Author:     O了吗
 * Date:       2020/3/7 18:09
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/7
 * @since 1.0.0
 */
@Getter
@AllArgsConstructor
public enum ResponseStatus {

    SUCCESS(0, "success"),
    ERROR(1, "error"),
    NEED_LOGIN(10, "need login"),
    ILLEGAL_ARGUMENT(2, "illegal argument"),
    NO_PERMISSION(2, "no permission");

    private int code;
    private String desc;

}
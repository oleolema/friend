/**
 * FileName:   ResponseMessage
 * Author:     O了吗
 * Date:       2020/3/7 18:09
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/3/7
 * @since 1.0.0
 */
@AllArgsConstructor
@Getter
@ToString
//只序列化字段的值不为空的字段
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage<T> {
    private int code;
    private String msg;
    private T data;

    public static <E> ResponseMessage<E> create(ResponseStatus status, String msg, E data) {
        if (msg == null) {
            msg = status.getDesc();
        }
        return new ResponseMessage<>(status.getCode(), msg, data);
    }

    //忽略这个字段的序列化
//    @JsonIgnore
    public boolean isSuccess() {
        return code == ResponseStatus.SUCCESS.getCode();
    }

    /*
    success
     */

    public static <T> ResponseMessage<T> success() {
        return create(ResponseStatus.SUCCESS, null, null);
    }

    public static <T> ResponseMessage<T> successMsg(String msg) {
        return create(ResponseStatus.SUCCESS, msg, null);
    }

    public static <T> ResponseMessage<T> successData(T data) {
        return create(ResponseStatus.SUCCESS, null, data);
    }

    public static <T> ResponseMessage<T> successMsgData(String msg, T data) {
        return create(ResponseStatus.SUCCESS, msg, data);
    }

    /*
    error
     */

    public static <T> ResponseMessage<T> error() {
        return create(ResponseStatus.ERROR, null, null);
    }

    public static <T> ResponseMessage<T> errorMsg(String msg) {
        return create(ResponseStatus.ERROR, msg, null);
    }

    public static <T> ResponseMessage<T> errorData(T data) {
        return create(ResponseStatus.ERROR, null, data);
    }

    public static <T> ResponseMessage<T> errorMsgData(String msg, T data) {
        return create(ResponseStatus.ERROR, msg, data);
    }


}
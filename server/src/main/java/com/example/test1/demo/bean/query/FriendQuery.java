/**
 * FileName:   Friend
 * Author:     yueqiuhong
 * Create:       2020/5/30 13:43
 * Description:
 */
package com.example.test1.demo.bean.query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;

/**
 * 〈〉
 *
 * @author yueqiuhong
 * @create 2020/5/30
 * @since 1.0.0
 */
@Slf4j
@Data
@Accessors(chain = true)
@FieldNameConstants
@NoArgsConstructor
@AllArgsConstructor
public class FriendQuery implements Serializable {

    private static final long serialVersionUID = 1L;

    private String qq;

}
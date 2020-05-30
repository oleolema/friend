/**
 * FileName:   SimplePage
 * Author:     O了吗
 * Date:       2020/4/3 21:04
 * Description:
 * History:
 * author:     oleolema
 */
package com.example.test1.demo.common;

import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 〈〉
 *
 * @author O了吗
 * @create 2020/4/3
 * @since 1.0.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimplePage<T> {

    private List<T> data;

    private long total;

    private long current;

    private long pageSize;

    public static <T> SimplePage<T> create(T data) {
        SimplePage<T> simplePage = new SimplePage<>();
        simplePage.data = Collections.singletonList(data);
        simplePage.total = 1;
        simplePage.current = 1;
        return simplePage;
    }

    public SimplePage(IPage<T> iPage) {
        data = iPage.getRecords();
        total = iPage.getTotal();
        current = iPage.getCurrent();
        pageSize = iPage.getSize();
    }
}
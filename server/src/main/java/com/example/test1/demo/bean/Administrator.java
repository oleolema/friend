package com.example.test1.demo.bean;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import lombok.extern.slf4j.Slf4j;
import lombok.experimental.Accessors;
import com.baomidou.mybatisplus.annotation.TableId;


@Slf4j
@Data
@Accessors(chain = true)
@FieldNameConstants
@NoArgsConstructor
@AllArgsConstructor
public class Administrator implements Serializable{
    private static final long serialVersionUID = 1L;

	@TableId
	private String id;

	private String password;


}
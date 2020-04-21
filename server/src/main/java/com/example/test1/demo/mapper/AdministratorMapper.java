package com.example.test1.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.test1.demo.bean.Administrator;
import org.apache.ibatis.annotations.Select;

public interface AdministratorMapper extends BaseMapper<Administrator> {

    @Select("select count(id) from `administrator` where `id`=#{id} and `password`=#{password}")
    boolean checkIdAndPassword(String id, String password);


    @Select("select count(id) from `administrator` where `id`=#{id}")
    boolean checkId(String id);
}
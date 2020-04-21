package com.example.test1.demo.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.test1.demo.bean.Administrator;
import com.example.test1.demo.common.ResponseMessage;

public interface AdministratorService extends IService<Administrator> {
    /**
     * 分页查询
     */
    IPage<Administrator> pageList(QueryWrapper<Administrator> wrapper, Integer pageNo, Integer pageSize);


    public ResponseMessage<Object> login(Administrator administrator);

    public ResponseMessage<Object> saveAdmin(Administrator administrator);

}
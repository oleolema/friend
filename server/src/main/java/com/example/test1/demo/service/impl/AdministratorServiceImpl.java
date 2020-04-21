package com.example.test1.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.test1.demo.bean.Administrator;
import com.example.test1.demo.common.ResponseMessage;
import com.example.test1.demo.mapper.AdministratorMapper;
import com.example.test1.demo.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorServiceImpl extends ServiceImpl<AdministratorMapper, Administrator> implements AdministratorService {

    @Autowired
    AdministratorMapper administratorMapper;

    @Override
    public ResponseMessage<Object> login(Administrator administrator) {
        ResponseMessage<Object> message = null;
        if (!administratorMapper.checkId(administrator.getId())) {
            message = ResponseMessage.errorMsg("用户名不存在");
        } else if (!administratorMapper.checkIdAndPassword(administrator.getId(), administrator.getPassword())) {
            message = ResponseMessage.errorMsg("密码有误");
        } else {
            message = ResponseMessage.successMsg("登录成功");
        }
        return message;
    }

    @Override
    public ResponseMessage<Object> saveAdmin(Administrator administrator) {
        ResponseMessage<Object> message = null;
        if (administratorMapper.checkId(administrator.getId())) {
            message = ResponseMessage.errorMsg("用户名已存在");
        } else if (administratorMapper.insert(administrator) != 1) {
            message = ResponseMessage.errorMsg("注册失败");
        } else {
            message = ResponseMessage.successMsg("注册成功");
        }
        return message;
    }


    @Override
    public IPage<Administrator> pageList(QueryWrapper<Administrator> wrapper, Integer pageNo, Integer pageSize) {
        IPage<Administrator> page = new Page<>(pageNo, pageSize);
        return baseMapper.selectPage(page, wrapper);
    }

}
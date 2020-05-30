package com.example.test1.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.test1.demo.bean.Friend;
import com.example.test1.demo.mapper.FriendMapper;
import com.example.test1.demo.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendServiceImpl extends ServiceImpl
        <FriendMapper, Friend> implements FriendService {

    @Autowired
    FriendMapper friendMapper;

    @Override
    public IPage<Friend> pageList(QueryWrapper<Friend> wrapper, Integer pageNo, Integer pageSize) {
        IPage<Friend> page = new Page<>(pageNo, pageSize);
        return baseMapper.selectPage(page, wrapper);
    }

    @Override
    public Friend findByQQ(Integer qq) {
        return friendMapper.findByQQ(qq);
    }

}
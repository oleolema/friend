package com.example.test1.demo.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.test1.demo.bean.Friend;

public interface FriendService extends IService<Friend> {
    /**
     * 分页查询
     */
    IPage<Friend> pageList(QueryWrapper<Friend> wrapper, Integer pageNo, Integer pageSize);

    Friend findByQQ(Integer qq);

}
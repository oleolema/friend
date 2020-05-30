package com.example.test1.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.test1.demo.bean.Friend;
import org.apache.ibatis.annotations.Select;

public interface FriendMapper extends BaseMapper<Friend> {

    @Select("select * from friend where qq=#{qq}")
    Friend findByQQ(Integer qq);

}
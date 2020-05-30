package com.example.test1.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.test1.demo.bean.Friend;
import com.example.test1.demo.bean.query.FriendQuery;
import com.example.test1.demo.common.ResponseMessage;
import com.example.test1.demo.common.SimplePage;
import com.example.test1.demo.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/friend")
public class FriendController {

    @Autowired
    private FriendService friendService;


    @GetMapping("/query")
    public ResponseMessage<SimplePage<Friend>> query(@RequestParam(value = "current", defaultValue = "0") int p,
                                                     @RequestParam(value = "pageSize", defaultValue = "-1") int s,
                                                     @RequestParam(value = "qq", required = false) String qq) {
        System.out.println(p + " " + s);
        QueryWrapper<Friend> queryWrapper = new QueryWrapper<>();
        if (qq != null) {
            queryWrapper.lambda().eq(Friend::getQq, qq);
        }
        IPage<Friend> friendIPage = friendService.pageList(queryWrapper, p, s);

        System.out.println(friendIPage);
        return ResponseMessage.successData(new SimplePage<>(friendIPage));
    }


    @PostMapping("/add")
    public ResponseMessage<Friend> query(@RequestBody Friend friend) {
        ResponseMessage<Friend> message = null;
        if (friendService.save(friend)) {
            message = ResponseMessage.successMsg("添加好友成功");
        } else {
            message = ResponseMessage.successMsg("添加好友失败");
        }
        return message;
    }

    @PostMapping("/update")
    public ResponseMessage<Friend> update(@RequestBody Friend friend) {
        System.out.println(friend);
        ResponseMessage<Friend> message = null;
        if (friendService.updateById(friend)) {
            message = ResponseMessage.successMsg("修改好友成功");
        } else {
            message = ResponseMessage.successMsg("修改好友失败");
        }
        return message;
    }

    @PostMapping("/delete")
    public ResponseMessage<Friend> delete(@RequestBody List<Integer> ids) {
        System.out.println(ids);
//        friends.stream().map(item -> item.getId()).collect(Collectors.toList())
        ResponseMessage<Friend> message = null;
        if (friendService.removeByIds(ids)) {
            message = ResponseMessage.successMsg("删除成功");
        } else {
            message = ResponseMessage.successMsg("删除失败");
        }
        return message;
    }


    @GetMapping("/friend")
    public IPage<Friend> friend(Friend friend, @RequestParam(value = "p", defaultValue = "0") int p, @RequestParam(value = "s", defaultValue = "-1") int s) {
        QueryWrapper<Friend> queryWrapper = new QueryWrapper<>(friend);
        return friendService.pageList(queryWrapper, p, s);
    }

    @GetMapping("/friend/{id}")
    public Friend friendById(@PathVariable("id") String id) {
        return friendService.getById(id);
    }

    @PostMapping("/friend")
    public boolean modify(Friend friend) {
        return friendService.updateById(friend);
    }

    @PutMapping("/friend")
    public Friend save(Friend friend) {
        if (friendService.save(friend)) {
            return friend;
        }
        return null;
    }

    @DeleteMapping("/friend/{id}")
    public boolean remove(@PathVariable("id") String id) {
        return friendService.removeById(id);
    }

    @DeleteMapping("/friend")
    public boolean remove(Friend friend) {
        QueryWrapper<Friend> wrapper = new QueryWrapper<>(friend);
        return friendService.remove(wrapper);
    }


}
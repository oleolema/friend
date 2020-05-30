package com.example.test1.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.test1.demo.bean.Administrator;
import com.example.test1.demo.common.Constant;
import com.example.test1.demo.common.ResponseMessage;
import com.example.test1.demo.service.AdministratorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@Slf4j
@RequestMapping("/api/user")
public class AdministratorController {

    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/login")
    public ResponseMessage<Object> login(@RequestBody Administrator administrator, HttpSession session) {
        ResponseMessage<Object> login = administratorService.login(administrator);
        if (login.isSuccess()) {
            session.setAttribute(Constant.CURRENT_USER, administrator);
        }
        return login;
    }

    @PostMapping("/register")
    public ResponseMessage<Object> register(@RequestBody Administrator administrator) {
        return administratorService.saveAdmin(administrator);
    }


    @GetMapping("/currentUser")
    public ResponseMessage<Administrator> currentUser(HttpSession session) {
        Administrator currentUser = (Administrator) session.getAttribute(Constant.CURRENT_USER);
        if (currentUser == null) {
            return ResponseMessage.errorMsg("请登录");
        }
        return ResponseMessage.successData(currentUser);
    }


    @GetMapping("/admin")
    public IPage<Administrator> admin(Administrator administrator, @RequestParam(value = "p", defaultValue = "0") int p, @RequestParam(value = "s", defaultValue = "-1") int s) {
        QueryWrapper<Administrator> queryWrapper = new QueryWrapper<>(administrator);
        return administratorService.pageList(queryWrapper, p, s);
    }

    @GetMapping("/admin/{id}")
    public Administrator adminById(@PathVariable("id") String id) {
        return administratorService.getById(id);
    }

    @PostMapping("/admin")
    public boolean modify(Administrator administrator) {
        return administratorService.updateById(administrator);
    }

    @PutMapping("/admin")
    public Administrator save(Administrator administrator) {
        if (administratorService.save(administrator)) {
            return administrator;
        }
        return null;
    }

    @DeleteMapping("/admin/{id}")
    public boolean remove(@PathVariable("id") String id) {
        return administratorService.removeById(id);
    }

    @DeleteMapping("/admin")
    public boolean remove(Administrator administrator) {
        QueryWrapper<Administrator> wrapper = new QueryWrapper<>(administrator);
        return administratorService.remove(wrapper);
    }


}
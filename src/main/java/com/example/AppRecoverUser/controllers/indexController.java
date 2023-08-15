package com.example.AppRecoverUser.controllers;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.web.bind.annotation.*;

@SpringBootTest
@RestController
@RequestMapping("/api")
public class indexController {

    @GetMapping("/helloWorld")
    public String helloWorld() {
        return "Hello World!";
    }



}

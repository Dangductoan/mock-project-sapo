package com.sapo.mockproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @GetMapping("/api/v1/accountant")
    public String test() {
        return "ahihi";
    }
}

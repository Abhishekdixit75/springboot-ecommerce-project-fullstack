package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.AnalyticsResponse;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderResponse;
import com.ecommerce.project.service.AnalyticsService;
import com.ecommerce.project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;
    @Autowired
    private OrderService orderService;

    @GetMapping("admin/app/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics() {
        AnalyticsResponse response = analyticsService.getAnalyticsData();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}

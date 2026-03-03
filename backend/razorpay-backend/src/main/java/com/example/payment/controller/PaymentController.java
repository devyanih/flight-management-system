package com.example.payment.controller;

import com.example.payment.dto.OrderRequest;
import com.example.payment.dto.OrderResponse;
import com.example.payment.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
//@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public OrderResponse createOrder(@RequestBody OrderRequest request) throws RazorpayException {
        return paymentService.createOrder(request);
    }
}

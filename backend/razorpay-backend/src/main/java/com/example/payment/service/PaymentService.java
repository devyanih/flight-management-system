package com.example.payment.service;

import com.example.payment.dto.OrderRequest;
import com.example.payment.dto.OrderResponse;
import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    public OrderResponse createOrder(OrderRequest request) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject options = new JSONObject();
        options.put("amount", request.getAmount() * 100);
        options.put("currency", "INR");
        options.put("receipt", "txn_123456");

        Order order = client.orders.create(options);

        OrderResponse response = new OrderResponse();
        response.setRazorpayOrderId(order.get("id"));
        response.setRazorpayKey(razorpayKey);
        response.setAmount(request.getAmount());
        response.setName(request.getName());

        return response;
    }
}

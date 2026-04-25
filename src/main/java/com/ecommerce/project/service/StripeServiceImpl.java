package com.ecommerce.project.service;

import com.ecommerce.project.payload.StripePaymentDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {
        Customer customer;

        // search for the customers using the email id
        CustomerSearchParams params =
                CustomerSearchParams.builder()
                        .setQuery("email:'" + stripePaymentDTO.getEmail() + "'")
                        .build();
        CustomerSearchResult customers = Customer.search(params);

        if (customers.getData().isEmpty()) {
            // create new customer
            CustomerCreateParams newCustomerParams =
                    CustomerCreateParams.builder()
                            .setName(stripePaymentDTO.getName())
                            .setEmail(stripePaymentDTO.getEmail())
                            .setAddress(CustomerCreateParams.Address.builder()
                                    .setLine1(stripePaymentDTO.getAddress().getStreet())
                                    .setCity(stripePaymentDTO.getAddress().getCity())
                                    .setState(stripePaymentDTO.getAddress().getState())
                                    .setPostalCode(stripePaymentDTO.getAddress().getPincode())
                                    .setCountry(stripePaymentDTO.getAddress().getCountry()).build())
                            .build();

            customer = Customer.create(newCustomerParams);
        } else {
            // fetch the customer that exists
            customer = customers.getData().get(0);
        }


        PaymentIntentCreateParams paymentIntentParams = PaymentIntentCreateParams.builder()
                .setAmount(stripePaymentDTO.getAmount())
                .setCurrency(stripePaymentDTO.getCurrency())
                .setCustomer(customer.getId())
                .setDescription(stripePaymentDTO.getDescription())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams
                                .AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build())
                .build();

        return PaymentIntent.create(paymentIntentParams);
    }
}

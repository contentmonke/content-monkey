package com.content.monkey.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;
import java.util.Map;
import java.util.HashMap;

@Service
public class Auth0Service {

    @Value("${auth0.domain}")
    private String auth0Domain;

    @Value("${auth0.client.id}")
    private String clientId;

    @Value("${auth0.client.secret}")
    private String clientSecret;

    @Value("${auth0.token}")
    private String token;

    private final RestTemplate restTemplate;

    public Auth0Service(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAccessToken() {
        String url = String.format("https://%s/oauth/token", auth0Domain);
        System.out.println(url);
        // Set the request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the request body
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("grant_type", "client_credentials");
        requestBody.put("client_id", clientId);
        requestBody.put("client_secret", clientSecret);
        requestBody.put("audience", "https://" + auth0Domain + "/api/v2/");

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        // Make the POST request
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        // Extract the access token from the response
        return (String) response.getBody().get("access_token");
    }


    public void deleteUser(String userId) {
        String url = String.format("https://%s/api/v2/users/%s", auth0Domain, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("User deleted successfully.");
        } else {
            throw new RuntimeException("Failed to delete user: " + response.getStatusCode());
        }
    }
}

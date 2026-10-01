package backend;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

/**
 * SCAMSHIELD - Academic Web Project
 * Lightweight Java Backend Demonstration Server
 *
 * Designed for B.Sc. IT Viva demonstration.
 * Uses only standard Java SE library (no external frameworks or Spring Boot).
 * 
 * How to compile:
 *   javac backend/SimpleFeedbackServer.java
 *
 * How to run:
 *   java backend.SimpleFeedbackServer
 */
public class SimpleFeedbackServer {

    private static final int PORT = 8080;

    public static void main(String[] args) throws IOException {
        // Create an HTTP server listening on port 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // Register the feedback API endpoint
        server.createContext("/api/feedback", new FeedbackHandler());

        // Default thread executor
        server.setExecutor(null);

        System.out.println("==================================================");
        System.out.println("SCAMSHIELD Academic Java Backend Server");
        System.out.println("Status: Running on http://localhost:" + PORT);
        System.out.println("Endpoint: http://localhost:" + PORT + "/api/feedback");
        System.out.println("Press Ctrl+C to stop the server.");
        System.out.println("==================================================");

        server.start();
    }

    /**
     * HTTP Handler for incoming feedback submissions.
     */
    static class FeedbackHandler implements HttpHandler {

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Enable Cross-Origin Resource Sharing (CORS) for local HTML frontend
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            // Handle pre-flight OPTIONS request
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            // Accept only POST requests
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                String errorJson = "{\"status\":\"error\",\"message\":\"Method Not Allowed\"}";
                sendJsonResponse(exchange, 405, errorJson);
                return;
            }

            // Read the incoming request body
            StringBuilder bodyBuilder = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    bodyBuilder.append(line);
                }
            }

            String requestBody = bodyBuilder.toString();
            System.out.println("\n[NEW FEEDBACK RECEIVED]");
            System.out.println("Payload: " + requestBody);

            // Simple validation check: ensure body is not empty
            if (requestBody.trim().isEmpty()) {
                String errorResponse = "{\"status\":\"error\",\"message\":\"Request body cannot be empty\"}";
                sendJsonResponse(exchange, 400, errorResponse);
                return;
            }

            // Send successful JSON response back to the client
            String successResponse = "{\"status\":\"success\",\"message\":\"Feedback received and logged successfully.\"}";
            sendJsonResponse(exchange, 200, successResponse);
        }

        private void sendJsonResponse(HttpExchange exchange, int statusCode, String responseJson) throws IOException {
            byte[] responseBytes = responseJson.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            exchange.sendResponseHeaders(statusCode, responseBytes.length);

            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
                os.flush();
            }
        }
    }
}

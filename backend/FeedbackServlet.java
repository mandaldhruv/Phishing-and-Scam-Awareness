package backend;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * SCAMSHIELD - Academic Web Project
 * Standard Java Servlet Implementation for Faculty Review
 *
 * This class illustrates classic Java EE / Jakarta Servlet architecture:
 * - Extends HttpServlet
 * - Overrides doPost to process form submissions
 * - Extracts form parameters
 * - Validates inputs
 * - Returns a clean JSON response
 *
 * Can be deployed directly into Apache Tomcat or any standard Servlet container.
 */
@WebServlet(name = "FeedbackServlet", urlPatterns = {"/api/feedback-servlet"})
public class FeedbackServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set request encoding
        request.setCharacterEncoding("UTF-8");

        // Read form parameters
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String category = request.getParameter("category");
        String rating = request.getParameter("rating");
        String comments = request.getParameter("comments");

        // Set response headers
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        PrintWriter out = response.getWriter();

        // Server-side validation
        if (name == null || name.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            comments == null || comments.trim().isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\",\"message\":\"All required fields must be provided.\"}");
            out.flush();
            return;
        }

        // Output log to server console for examination demo
        System.out.println("----------------------------------------------");
        System.out.println("Feedback processed via FeedbackServlet:");
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Category: " + category);
        System.out.println("Rating: " + rating);
        System.out.println("Comments: " + comments);
        System.out.println("----------------------------------------------");

        // Return success JSON
        response.setStatus(HttpServletResponse.SC_OK);
        out.print("{\"status\":\"success\",\"message\":\"Thank you! Your feedback has been recorded by the Servlet.\"}");
        out.flush();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.print("{\"status\":\"ready\",\"service\":\"SCAMSHIELD Feedback Servlet\"}");
        out.flush();
    }
}

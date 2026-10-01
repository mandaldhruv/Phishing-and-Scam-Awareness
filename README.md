# SCAMSHIELD: Phishing, Scam and Fraud Detection Awareness Program

A clean, responsive, educational web platform developed as an undergraduate B.Sc. Information Technology academic project.

---

## 1. Project Overview

SCAMSHIELD is an interactive cybersecurity awareness website created to help everyday citizens, students, and digital consumers understand, recognize, and avoid modern online scams, payment frauds, and phishing attacks.

Rather than relying on abstract technical jargon or exaggerated graphics, this project emphasizes practical, real-world social engineering vectors: UPI payment traps, fake KYC text alerts, credit card reward frauds, remote screen-sharing manipulation, and account impersonation.

- **Brand Name:** SCAMSHIELD
- **Project Tagline:** Think Before You Click.
- **Academic Stream:** B.Sc. Information Technology (Year 2)
- **Primary Design Style:** Warm, minimal, editorial, human, Pinterest-inspired typography system.

---

## 2. Key Objectives

1. **Demystify Social Engineering:** Explain how modern scams manipulate normal psychological triggers like urgency, curiosity, fear, and authority.
2. **Clarify Digital Payment Realities:** Solidify fundamental principles such as: *Entering your UPI PIN is only required to send money, never to receive it.*
3. **Provide Interactive Browser Diagnostics:** Allow users to safely test suspicious links, evaluate fictional scenarios in a sandboxed simulator, measure password entropy, and assess cyber awareness via an MCQ quiz.
4. **Offer Step-by-Step Incident Guidance:** Provide clear, actionable instructions for victims during the crucial "Golden Hour" after an incident, connecting them with verified official reporting channels (Helpline 1930 and cybercrime.gov.in).

---

## 3. Project Structure

```text
SCAMSHIELD/
│
├── index.html                 # 01. Home Landing Page
├── about.html                 # 02. About Phishing and Fraud Lifecycle
├── scams.html                 # 03. Directory of Scam Types and Matrix
├── phishing.html              # 04. In-Depth Phishing and Smishing Awareness
├── upi-scams.html             # 05. UPI, QR Code and Payment Safety
├── banking-scams.html         # 06. Banking, KYC and OTP Protection
├── social-media-scams.html    # 07. Social Media Traps and Account Impersonation
├── simulator.html             # 08. Interactive Scam Message Simulator (10 Scenarios)
├── link-checker.html          # 09. Suspicious Link Heuristic Inspector
├── quiz.html                  # 10. Cyber Safety Awareness Quiz (12 MCQs)
├── password-safety.html       # 11. Password Strength and Privacy Checker
├── after-scam.html            # 12. Post-Incident Emergency Action Guide
├── checklist.html             # 13. Interactive Cyber Safety Checklist
├── resources.html             # 14. Help, Verified Authorities and Helplines
├── feedback.html              # 15. Student Project Feedback Form
│
├── css/
│   └── style.css              # Complete Design Tokens, Typography, and Layout
│
├── js/
│   └── script.js              # Vanilla JavaScript Interactive Engines
│
├── backend/
│   ├── SimpleFeedbackServer.java  # Standalone Java HTTP Server (Zero Dependencies)
│   └── FeedbackServlet.java       # Classic Java EE Servlet Implementation
│
└── README.md                  # Project Documentation and Viva Explanation Guide
```

---

## 4. Technologies Used

### Frontend
- **HTML5:** Semantic document markup (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **CSS3:** Custom properties (design tokens), Manrope typography scale, responsive Flexbox and Grid layouts, subtle borders and shadows. Strictly no heavy frameworks (No Bootstrap, No Tailwind).
- **Vanilla JavaScript (ES6):** Pure browser-native scripting for DOM manipulation, heuristic URL analysis, password entropy calculations, interactive quiz scoring, and localStorage persistence.

### Backend (Simple Java)
- **Java SE (Standard Edition):** `SimpleFeedbackServer.java` uses `com.sun.net.httpserver.HttpServer` built into the Java Standard Development Kit. Zero third-party frameworks or JAR dependencies required.
- **Java Servlet API:** `FeedbackServlet.java` demonstrates classic `HttpServlet` request handling, input sanitization, and JSON response generation for academic curriculum alignment.

---

## 5. Detailed Breakdown of Interactive Features

### A. Scam Simulator (`simulator.html`)
- **How It Works:** Presents 10 realistic, completely fictional text and email scenarios (fake bank KYC alerts, YouTube rating job offers, electricity cutoff threats, legitimate courier updates, UPI QR code traps, and lottery claims).
- **User Action:** The user reviews the sender details, timestamp, and message body, then chooses "Mark as Safe" or "Mark as Suspicious".
- **Feedback Engine:** JavaScript immediately validates the selection, toggles visual feedback banners, and displays an educational explanation detailing the exact red flags or safe markers.

### B. Suspicious Link Checker (`link-checker.html`)
- **How It Works:** Accepts any URL input and runs a multi-factor client-side heuristic inspection:
  1. *Protocol Security:* Verifies if HTTPS is present.
  2. *Hostname Format:* Detects if an IP address is used instead of a registered domain.
  3. *Subdomain Stacking:* Analyzes depth of subdomains (e.g. `bank.com.fake-site.ru`).
  4. *Sensitive Keywords:* Identifies common phishing lures (`login`, `verify`, `kyc`, `refund`, `banking`).
  5. *High-Risk TLDs:* Flags low-cost disposable top-level domains (`.tk`, `.ml`, `.xyz`, etc.).
  6. *Hyphenation Patterns:* Highlights spoofed brand couplings (e.g., `sbi-login`, `paytm-refund`).
  7. *Deceptive Symbols:* Checks for browser trickery like the `@` symbol.
- **Academic Disclaimer:** Prominently clarifies that this is an educational heuristic demonstration and cannot replace certified enterprise threat intelligence feeds.

### C. Cyber Safety Quiz (`quiz.html`)
- **How It Works:** 12 curated multiple-choice questions covering OTP secrecy, UPI transaction mechanics, vishing calls, typosquatting domains, fake customer support listings, passphrases, and official emergency numbers.
- **Evaluation:** Instant option verification, detailed technical explanation on selection, real-time score tracking, and performance category feedback (Excellent, Good, Needs Improvement) with retake capability.

### D. Password Strength Evaluator (`password-safety.html`)
- **How It Works:** Evaluates typed input in real time across five parameters: minimum length, uppercase characters, lowercase characters, numbers, and special symbols.
- **Pattern Matching:** Includes dictionary penalty checks for common predictable words (`password`, `123456`, `admin`, `qwerty`).
- **Privacy:** Formulated entirely in local client memory. Clear assurance that passwords are never transmitted or stored.

### E. Interactive Safety Checklist (`checklist.html`)
- **How It Works:** 16 practical checks divided into four categories: Link Inspection, Payment Verification, Unknown Callers, and Account Hygiene.
- **State Persistence:** Saves completed check states to the browser's `localStorage` so users can return to their progress, with an instant "Reset All Checks" button.

---

## 6. How to Run the Project

### Option 1: Direct File Access (No Server Required)
Because the entire user-facing project is built using standard HTML5, CSS3, and Vanilla JavaScript:
1. Navigate to the project root directory.
2. Double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Safari).
3. All interactive features (Simulator, Link Checker, Quiz, Password Checker, Checklist) work immediately.

### Option 2: Using Python Simple Server (Optional Local HTTP)
To serve the files over local HTTP:
```bash
# In the project directory:
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 3: Running the Simple Java Backend Server (For Viva Demonstration)
If your faculty examiner asks to see the Java component running:
1. Open a terminal / command prompt in the project root directory.
2. Compile the standalone Java server:
   ```bash
   javac backend/SimpleFeedbackServer.java
   ```
3. Run the compiled server:
   ```bash
   java backend.SimpleFeedbackServer
   ```
4. The server will start on `http://localhost:8080`.
5. Open `feedback.html` in your browser and submit feedback. The form will automatically transmit the JSON data to the running Java server, which prints the received submission to the terminal window.

---

## 7. Viva Explanation Guide for Students

When presenting this project to an external examiner, highlight the following:

1. **Why Vanilla Web Technologies?**
   - Eliminates framework overhead, build-step failures, and security vulnerabilities inside massive node_modules directories.
   - Proves deep command of foundational web standards: DOM manipulation, asynchronous fetch APIs, and CSS variable architectures.

2. **Design System and Accessibility:**
   - Adheres to a strict design system utilizing CSS tokens for typography (Manrope font family, weights 400 to 800) and an editorial warm palette (`#F7F3EC`, `#EDE5D8`, `#242320`, `#A8B5A0`, `#C98F78`).
   - Rectangular buttons with subtle 4px borders avoid generic AI template aesthetics.

3. **Security Awareness Impact:**
   - Focuses on the human layer of cybersecurity. 90% of successful corporate breaches and consumer losses begin with social engineering. Teaching users to pause and verify saves more money than automated firewalls alone.

---

## 8. Future Scope

- **Regional Language Support:** Translating educational modules into Hindi, Marathi, Tamil, Telugu, and other regional languages.
- **Simulated Voice Phishing (Vishing) Audio Snippets:** Adding audio examples demonstrating how callers sound during fake bank fraud cell alerts.
- **Offline Progressive Web App (PWA):** Adding a Service Worker manifest so rural schools and colleges can install the awareness guide offline.

---

## 9. Project Team & Academic Credits

- **Project Title:** SCAMSHIELD: Phishing, Scam & Fraud Detection Awareness Program
- **Degree:** Bachelor of Science in Information Technology (B.Sc. IT)
- **Student Name:** [Student Name Placeholder]
- **Roll Number:** [Roll Number Placeholder]
- **College / University:** [College Name Placeholder]
- **Academic Year:** 2025 - 2026
- **Faculty Guide / Mentor:** [Guide Name Placeholder]

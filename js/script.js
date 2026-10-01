/*
  SCAMSHIELD - Academic Web Project
  Phishing, Scam and Fraud Detection Awareness Program
  Vanilla JavaScript: Educational Interactive Engines
  Note: Strictly student-level, readable, clean code.
*/

document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initSimulator();
  initLinkChecker();
  initQuiz();
  initPasswordChecker();
  initChecklist();
  initFeedbackForm();
});

/* ==================================================
   1. NAVIGATION & ACCESSIBILITY
   ================================================== */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Highlight active page link based on location pathname
  const rawPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentPath = rawPath.endsWith('.html') ? rawPath : (rawPath + '.html');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a');
  
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && (href === 'index.html' || href === ''))) {
      link.classList.add('active');
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
}

/* ==================================================
   2. SCAM SIMULATOR ENGINE (simulator.html)
   ================================================== */
const SCENARIOS = [
  {
    id: 1,
    title: 'Scenario 1: Urgent Bank Account Alert',
    type: 'SMS Message',
    sender: 'VM-HDFCBK (Unverified SMS header)',
    timestamp: 'Today, 10:14 AM',
    body: 'Dear Customer, your bank account will be suspended within 24 hours due to pending KYC verification. Update your PAN immediately to avoid disruption: http://hdfc-kyc-update.net/login',
    isSuspicious: true,
    explanation: 'This is a classic KYC phishing scam. Banks never threaten immediate 24-hour suspension via SMS with third-party domain links. Notice the suspicious domain "hdfc-kyc-update.net" instead of the official bank domain.'
  },
  {
    id: 2,
    title: 'Scenario 2: Part-Time Video Rating Job',
    type: 'WhatsApp Direct Message',
    sender: '+91 98210 XXXXX (Unknown Number)',
    timestamp: 'Yesterday, 3:20 PM',
    body: 'Hello! I am Priya from Global Digital HR. We offer flexible work from home: earn Rs. 2,500 to Rs. 8,000 daily simply by liking YouTube videos and rating hotels. No experience required. Reply YES to start today.',
    isSuspicious: true,
    explanation: 'This is a prevalent task-based employment scam. Scammers promise unrealistic daily earnings for trivial tasks. Later, they demand "prepaid task security deposits" or cryptocurrency transfers before releasing any money.'
  },
  {
    id: 3,
    title: 'Scenario 3: Electricity Bill Disconnection Notice',
    type: 'SMS Message',
    sender: '+91 76059 XXXXX (Personal Mobile Number)',
    timestamp: 'Today, 6:45 PM',
    body: 'Dear Consumer, your electricity power supply will be disconnected tonight at 9:30 PM from the power sub-station because previous month bill was not updated. Please call electricity officer Mr. Sharma immediately at 9876543210.',
    isSuspicious: true,
    explanation: 'This is an electricity bill panic scam. Official state utility boards do not send disconnection threats from personal 10-digit mobile numbers asking users to call a private mobile contact.'
  },
  {
    id: 4,
    title: 'Scenario 4: Legitimate Courier Delivery Update',
    type: 'SMS Message',
    sender: 'AX-BLDART (Registered Business Sender)',
    timestamp: 'Today, 1:15 PM',
    body: 'Your shipment with AWB 49201938491 is out for delivery today with courier associate Rajesh. To track your package status, visit the official site: https://www.bluedart.com or check your retail order page.',
    isSuspicious: false,
    explanation: 'This message is safe. It comes from a registered business short-code, contains an actual shipment number, does not ask for money or OTP, and directs users to the genuine official domain (bluedart.com).'
  },
  {
    id: 5,
    title: 'Scenario 5: Scan QR Code to Receive Refund',
    type: 'UPI Payment Request / Chat',
    sender: 'Marketplace Buyer (Unknown Caller)',
    timestamp: 'Today, 2:30 PM',
    body: 'I have sent you a QR code on WhatsApp for Rs. 4,500 refund for the furniture you listed. Please open Google Pay or PhonePe, scan this QR code, and enter your UPI PIN to receive the money into your bank account.',
    isSuspicious: true,
    explanation: 'Crucial rule: Receiving money NEVER requires entering your UPI PIN or scanning a QR code. Entering your UPI PIN always authorizes money leaving your account, never receiving it.'
  },
  {
    id: 6,
    title: 'Scenario 6: Kaun Banega Crorepati Lottery Alert',
    type: 'WhatsApp Image / Message',
    sender: '+92 301 XXXXXXX (Foreign Country Code)',
    timestamp: '2 days ago, 11:00 AM',
    body: 'Congratulations! Your mobile number was selected in KBC All India SIM Card Lucky Draw 2026. You have won Rs. 25 Lakh cash prize. To claim your lottery cheque, deposit Rs. 3,500 government clearance tax to SBI account no 302910XXXX.',
    isSuspicious: true,
    explanation: 'This is an advance-fee lottery scam. Legitimate lotteries do not select random phone numbers that never bought tickets. Furthermore, genuine prizes do not require upfront clearance fees deposited into private bank accounts.'
  },
  {
    id: 7,
    title: 'Scenario 7: Instagram Copyright Infringement Notice',
    type: 'Instagram Direct Message',
    sender: 'Instagram Support Team (@help_center_case921)',
    timestamp: 'Yesterday, 8:12 PM',
    body: 'Copyright Violation Notice: Your account will be permanently disabled within 24 hours for copyright infringement. If you think this is a mistake, verify your credentials here: https://ig-verification-badge-appeal.co/login',
    isSuspicious: true,
    explanation: 'Instagram never sends copyright or policy warnings via direct messages. Official communications appear exclusively under Settings > Security > Emails from Instagram. The link points to a fake phishing domain.'
  },
  {
    id: 8,
    title: 'Scenario 8: Customer Support Screen Sharing Request',
    type: 'Phone Call / Remote Assistance',
    sender: 'Calling from "Bank Technical Support"',
    timestamp: 'Today, 11:45 AM',
    body: 'Hello sir, your recent online transaction failed. To reverse the pending debited amount, please install the AnyDesk or TeamViewer QuickSupport app from Play Store and share the 9-digit code visible on your screen.',
    isSuspicious: true,
    explanation: 'Bank support agents will never ask you to install remote-desktop software like AnyDesk or TeamViewer. Doing so gives scammers complete remote view and control of your phone and OTP notifications.'
  },
  {
    id: 9,
    title: 'Scenario 9: Legitimate Two-Factor Security Alert',
    type: 'Bank SMS Alert',
    sender: 'VK-SBIINB (Official Bank Sender)',
    timestamp: 'Today, 4:05 PM',
    body: 'OTP 829401 for online purchase of Rs. 650.00 at Swiggy. Valid for 10 minutes. NEVER share this OTP with anyone, including bank staff or delivery personnel. SBI will never call to ask for your OTP.',
    isSuspicious: false,
    explanation: 'This is a genuine two-factor authentication message. It clearly states the exact transaction purpose, exact amount, and explicitly instructs you not to disclose the code to anyone.'
  },
  {
    id: 10,
    title: 'Scenario 10: Income Tax Refund Notification with Attachment',
    type: 'Email Message',
    sender: 'refunds@incometax-portal-refund.org',
    timestamp: 'Yesterday, 9:00 AM',
    body: 'Dear Taxpayer, An income tax refund of Rs. 18,450 has been approved for AY 2025-26. To receive the credit into your preferred bank account, download and run the attached TaxRefund_Verification.exe file.',
    isSuspicious: true,
    explanation: 'Income Tax departments never send executable (.exe) files or ask users to run software. All legitimate refunds are credited directly to pre-validated bank accounts via official portal incometax.gov.in.'
  }
];

function initSimulator() {
  const container = document.getElementById('simulatorContainer');
  if (!container) return;

  let currentIndex = 0;
  let userScore = 0;
  let answered = false;

  function renderScenario(index) {
    answered = false;
    const item = SCENARIOS[index];
    
    container.innerHTML = `
      <div class="card card-accent-charcoal">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <span class="meta-label">Scenario ${index + 1} of ${SCENARIOS.length}</span>
          <span class="tag tag-sage">${item.type}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        
        <div class="message-simulation">
          <div class="message-header">
            <span class="message-sender">From: ${item.sender}</span>
            <span>${item.timestamp}</span>
          </div>
          <div class="message-body">${item.body}</div>
        </div>

        <p class="body-normal" style="font-weight: 600; margin-bottom: 12px;">
          What is your evaluation of this message?
        </p>

        <div class="btn-group" id="simActions">
          <button class="btn btn-secondary" id="btnSafe" type="button">Mark as Safe</button>
          <button class="btn btn-terracotta" id="btnSuspicious" type="button">Mark as Suspicious</button>
        </div>

        <div id="simFeedback" class="sim-feedback">
          <h4 id="simFeedbackTitle" style="font-size: 16px; font-weight: 700; margin-bottom: 6px;"></h4>
          <p id="simFeedbackText" class="body-normal" style="margin-bottom: 14px;"></p>
          <button class="btn btn-primary btn-sm" id="btnNextScenario" type="button">
            ${index + 1 < SCENARIOS.length ? 'Next Scenario' : 'View Final Results'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('btnSafe').addEventListener('click', function () {
      evaluateAnswer(false);
    });

    document.getElementById('btnSuspicious').addEventListener('click', function () {
      evaluateAnswer(true);
    });
  }

  function evaluateAnswer(userChoseSuspicious) {
    if (answered) return;
    answered = true;

    const item = SCENARIOS[currentIndex];
    const isCorrect = (userChoseSuspicious === item.isSuspicious);

    if (isCorrect) {
      userScore++;
    }

    // Disable choice buttons
    const btnSafe = document.getElementById('btnSafe');
    const btnSuspicious = document.getElementById('btnSuspicious');
    if (btnSafe) btnSafe.disabled = true;
    if (btnSuspicious) btnSuspicious.disabled = true;

    const feedbackBox = document.getElementById('simFeedback');
    const feedbackTitle = document.getElementById('simFeedbackTitle');
    const feedbackText = document.getElementById('simFeedbackText');

    feedbackBox.className = 'sim-feedback visible ' + (isCorrect ? 'correct' : 'incorrect');
    feedbackTitle.textContent = isCorrect 
      ? 'Correct Analysis!' 
      : 'Careful! This evaluation was incorrect.';
    
    feedbackText.innerHTML = `<strong>Why:</strong> ${item.explanation}`;

    document.getElementById('btnNextScenario').addEventListener('click', function () {
      if (currentIndex + 1 < SCENARIOS.length) {
        currentIndex++;
        renderScenario(currentIndex);
      } else {
        renderFinalSummary();
      }
    });
  }

  function renderFinalSummary() {
    const percentage = Math.round((userScore / SCENARIOS.length) * 100);
    let category = '';
    let categoryClass = '';

    if (userScore >= 9) {
      category = 'Sharp Vigilance: Excellent scam recognition ability.';
      categoryClass = 'notice-info';
    } else if (userScore >= 7) {
      category = 'Moderate Vigilance: Good awareness, but stay mindful of subtle clues.';
      categoryClass = 'notice-warning';
    } else {
      category = 'High Risk: You missed several red flags. Review the awareness guides.';
      categoryClass = 'notice-warning';
    }

    container.innerHTML = `
      <div class="card card-accent-sage" style="text-align: center; padding: 36px 20px;">
        <span class="meta-label">Simulation Completed</span>
        <h3 class="section-title" style="margin-top: 10px; margin-bottom: 8px;">
          Your Score: ${userScore} / ${SCENARIOS.length} (${percentage}%)
        </h3>
        
        <div class="notice-box ${categoryClass}" style="max-width: 540px; margin: 16px auto; text-align: left;">
          ${category}
        </div>

        <p class="body-normal" style="max-width: 540px; margin: 0 auto 24px;">
          Remember the core principle: when in doubt, pause. Never click unverified links, never enter your UPI PIN to receive money, and never share one-time passwords.
        </p>

        <button class="btn btn-primary" id="btnRestartSim" type="button">Restart Simulator</button>
      </div>
    `;

    document.getElementById('btnRestartSim').addEventListener('click', function () {
      currentIndex = 0;
      userScore = 0;
      renderScenario(currentIndex);
    });
  }

  renderScenario(0);
}

/* ==================================================
   3. SUSPICIOUS LINK CHECKER (link-checker.html)
   ================================================== */
function initLinkChecker() {
  const form = document.getElementById('linkCheckerForm');
  const input = document.getElementById('urlInput');
  const resultsArea = document.getElementById('checkerResults');
  if (!form || !input || !resultsArea) return;

  // Preset sample buttons
  const sampleSafe = document.getElementById('sampleSafe');
  const samplePhish = document.getElementById('samplePhish');
  const sampleIp = document.getElementById('sampleIp');

  if (sampleSafe) {
    sampleSafe.addEventListener('click', function () {
      input.value = 'https://www.onlinesbi.sbi/portal/index.html';
      analyzeUrl(input.value);
    });
  }

  if (samplePhish) {
    samplePhish.addEventListener('click', function () {
      input.value = 'http://sbi-online-banking-kyc-verify.free-hosting.tk/login';
      analyzeUrl(input.value);
    });
  }

  if (sampleIp) {
    sampleIp.addEventListener('click', function () {
      input.value = 'http://192.168.1.105:8080/secure-update-password';
      analyzeUrl(input.value);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    analyzeUrl(input.value.trim());
  });

  function analyzeUrl(urlString) {
    if (!urlString) return;

    // Clean or prepend protocol if missing for URL parsing
    let parsed;
    let raw = urlString;
    try {
      if (!/^https?:\/\//i.test(urlString)) {
        parsed = new URL('http://' + urlString);
      } else {
        parsed = new URL(urlString);
      }
    } catch (err) {
      resultsArea.innerHTML = `
        <div class="notice-box notice-warning">
          <strong>Invalid URL:</strong> The input could not be parsed as a valid web address. Please ensure it follows a standard URL format.
        </div>
      `;
      resultsArea.style.display = 'block';
      return;
    }

    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();
    const fullUrl = parsed.href.toLowerCase();

    const indicators = [];
    let riskPoints = 0;

    // 1. Protocol check
    const isHttps = parsed.protocol === 'https:';
    if (!isHttps) {
      indicators.push({
        status: 'warning',
        label: 'Insecure Protocol (HTTP)',
        desc: 'The link does not use encrypted HTTPS. Sensitive credentials sent over HTTP can be intercepted.'
      });
      riskPoints += 2;
    } else {
      indicators.push({
        status: 'safe',
        label: 'Encrypted Protocol (HTTPS)',
        desc: 'Connection uses HTTPS encryption (Note: modern phishing sites can also obtain free SSL certificates).'
      });
    }

    // 2. IP address as host check
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(hostname)) {
      indicators.push({
        status: 'danger',
        label: 'Raw IP Address Used as Hostname',
        desc: 'Legitimate organizations use registered domain names. Using raw IP addresses is common in automated attack campaigns.'
      });
      riskPoints += 4;
    }

    // 3. Suspicious Keywords in host or path
    const keywords = ['login', 'verify', 'update', 'kyc', 'banking', 'secure', 'wallet', 'refund', 'confirm', 'password', 'free-gift'];
    const matchedKeywords = keywords.filter(kw => fullUrl.includes(kw));
    if (matchedKeywords.length > 0) {
      indicators.push({
        status: matchedKeywords.length > 2 ? 'danger' : 'warning',
        label: 'Sensitive Security Keywords Detected',
        desc: `Contains keywords often exploited in phishing lures: ${matchedKeywords.join(', ')}.`
      });
      riskPoints += (matchedKeywords.length * 1.5);
    }

    // 4. Excessive Subdomains / Subdomain Stacking
    const domainParts = hostname.split('.');
    if (domainParts.length > 3 && !ipPattern.test(hostname)) {
      indicators.push({
        status: 'warning',
        label: 'Excessive Subdomain Stacking',
        desc: `Hostname contains ${domainParts.length} parts. Scammers frequently stack names like "bank.com.fake-server.org" to confuse users.`
      });
      riskPoints += 2.5;
    }

    // 5. High-Risk / Free TLDs
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.xyz', '.buzz', '.work', '.click', '.fit', '.country'];
    const hasSuspiciousTld = suspiciousTlds.some(tld => hostname.endsWith(tld));
    if (hasSuspiciousTld) {
      indicators.push({
        status: 'danger',
        label: 'High-Risk or Disposable Domain Extension',
        desc: 'The domain uses an extension frequently associated with low-cost disposable fraud campaigns.'
      });
      riskPoints += 3;
    }

    // 6. Misleading Brand Hyphenation
    const brandNames = ['sbi', 'hdfc', 'icici', 'paytm', 'phonepe', 'gpay', 'amazon', 'apple', 'google', 'netflix', 'paypal'];
    const hasHyphenBrand = brandNames.some(b => hostname.includes(b + '-') || hostname.includes('-' + b));
    if (hasHyphenBrand) {
      indicators.push({
        status: 'danger',
        label: 'Hyphenated Brand Name Pattern',
        desc: 'Contains a well-known brand coupled with hyphens (e.g., sbi-login, paytm-refund), a classic impersonation tactic.'
      });
      riskPoints += 3.5;
    }

    // 7. Overall Length
    if (raw.length > 90) {
      indicators.push({
        status: 'warning',
        label: 'Excessive URL Length',
        desc: `URL is unusually lengthy (${raw.length} characters). Long paths can be used to hide suspicious domains on mobile viewports.`
      });
      riskPoints += 1.5;
    }

    // 8. At symbol check
    if (urlString.includes('@')) {
      indicators.push({
        status: 'danger',
        label: 'Suspicious "@" Symbol in URL',
        desc: 'The "@" symbol tricks browsers into ignoring characters before it, directing you to an entirely unexpected host.'
      });
      riskPoints += 4;
    }

    // Verdict calculation
    let verdictTitle = '';
    let verdictClass = '';
    let verdictDesc = '';

    if (riskPoints >= 4) {
      verdictTitle = 'Potential Warning Signs Detected';
      verdictClass = 'notice-warning';
      verdictDesc = 'Multiple structural warning signs or high-risk patterns were detected. Exercise extreme caution. Do not enter credentials, OTPs, or payment details.';
    } else if (riskPoints >= 1.5) {
      verdictTitle = 'Moderate Ambiguity Detected';
      verdictClass = 'notice-disclaimer';
      verdictDesc = 'Minor anomalies observed. Independently verify the domain with the organization before proceeding.';
    } else {
      verdictTitle = 'Looks Relatively Normal';
      verdictClass = 'notice-info';
      verdictDesc = 'No obvious structural red flags detected in basic heuristic tests. Always verify that the address matches the exact official domain.';
    }

    // Render results
    let indicatorsHtml = indicators.map(ind => {
      let tagClass = 'tag-sage';
      if (ind.status === 'warning') tagClass = 'tag-terracotta';
      if (ind.status === 'danger') tagClass = 'tag-danger';

      return `
        <div style="padding: 12px; background-color: var(--color-white); border: 1px solid var(--color-border); border-radius: 4px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="font-size: 14px;">${ind.label}</strong>
            <span class="tag ${tagClass}">${ind.status.toUpperCase()}</span>
          </div>
          <p class="body-secondary">${ind.desc}</p>
        </div>
      `;
    }).join('');

    resultsArea.innerHTML = `
      <div class="card card-accent-charcoal" style="margin-top: 24px;">
        <span class="meta-label">Heuristic Analysis Result</span>
        <h3 class="card-title" style="margin-top: 6px; word-break: break-all;">Checked: ${escapeHtml(raw)}</h3>
        
        <div class="notice-box ${verdictClass}">
          <strong>${verdictTitle}</strong>
          <p style="margin-top: 4px;">${verdictDesc}</p>
        </div>

        <h4 style="font-size: 14px; font-weight: 700; margin: 16px 0 8px;">Breakdown of Heuristic Checks:</h4>
        ${indicatorsHtml}

        <div class="notice-box notice-disclaimer" style="margin-top: 18px;">
          <strong>Educational Heuristic Disclaimer:</strong> This tool performs basic structural heuristic analysis for educational demonstration. It cannot guarantee that a website is safe or malicious. Advanced scams can host malicious pages on clean domains, and valid links can trigger heuristics. Always practice cautious judgment.
        </div>
      </div>
    `;

    resultsArea.style.display = 'block';
  }
}

/* ==================================================
   4. CYBER SAFETY QUIZ ENGINE (quiz.html)
   ================================================== */
const QUIZ_QUESTIONS = [
  {
    question: 'When is it completely safe to share your bank OTP or UPI PIN with a customer care caller?',
    options: [
      'Only if they claim to call directly from the head office',
      'Never. Legitimate officials will never request your OTP or UPI PIN',
      'Only after they confirm your full name and date of birth',
      'Whenever an urgent refund or transaction reversal is required'
    ],
    correctIndex: 1,
    explanation: 'Banks, police, and legitimate payment platforms will NEVER ask for your OTP or PIN. It is designed strictly for your personal entry on trusted verification screens.'
  },
  {
    question: 'You want to receive money from a buyer on an online marketplace. What action is required on your UPI app?',
    options: [
      'Scan the QR code they sent and enter your UPI PIN',
      'Approve a "Collect Request" notification inside your UPI app',
      'No PIN is required. You only provide your UPI ID or mobile number',
      'Install a screen-sharing app so they can verify your account balance'
    ],
    correctIndex: 2,
    explanation: 'Receiving money via UPI never requires entering your UPI PIN or scanning a QR code. Providing your phone number or UPI ID is sufficient.'
  },
  {
    question: 'What is the term for a deceptive phone call where scammers impersonate bank staff or authorities?',
    options: [
      'Smishing',
      'Vishing (Voice Phishing)',
      'Pharming',
      'Spoofing cache'
    ],
    correctIndex: 1,
    explanation: 'Vishing (voice phishing) involves phone calls where fraudulent actors use social engineering to trick victims into revealing financial credentials.'
  },
  {
    question: 'You receive an email from "service@paypa1-update.com" stating your account is locked. What is the primary red flag?',
    options: [
      'The message uses formal English grammar',
      'The domain replaces the letter "l" with the number "1" (typosquatting)',
      'The email was received on a weekday morning',
      'The email footer contains a copyright date'
    ],
    correctIndex: 1,
    explanation: 'Typosquatting involves using visually similar domains (like paypa1 instead of paypal) to trick users into trusting a spoofed website.'
  },
  {
    question: 'Why is it risky to search for bank customer care phone numbers directly on search engines without verifying?',
    options: [
      'Search engines do not show phone numbers',
      'Fraudsters create fake business listings and search ads with their own contact numbers',
      'Bank customer support numbers change every 24 hours',
      'Search engine phone numbers automatically install spyware'
    ],
    correctIndex: 1,
    explanation: 'Scammers frequently manipulate public search listings and run targeted search ads containing fraudulent support numbers to catch stressed customers.'
  },
  {
    question: 'What should you do if an urgent SMS claims your electricity or power connection will be cut off within hours?',
    options: [
      'Call the 10-digit mobile number given in the SMS right away',
      'Pay via any random payment link sent in the text message',
      'Verify your bill status directly through your official utility app or official portal',
      'Forward the message to all your contacts'
    ],
    correctIndex: 2,
    explanation: 'Always verify through your official utility bill statement, authorized government portal, or customer app. Avoid calling mobile numbers inside alarming messages.'
  },
  {
    question: 'Which of the following creates the most secure password according to modern cyber hygiene guidelines?',
    options: [
      'A short 6-character word with one exclamation mark',
      'Your birthday followed by your childhood pet name',
      'A memorable multi-word passphrase with at least 14 characters, numbers, and symbols',
      'The word "Password123#"'
    ],
    correctIndex: 2,
    explanation: 'Length and entropy are critical. Long passphrases with varied characters resist brute-force and dictionary attacks far better than short predictable words.'
  },
  {
    question: 'What is the official National Cyber Crime helpline number in India for financial fraud reporting?',
    options: [
      '100',
      '1930',
      '1091',
      '108'
    ],
    correctIndex: 1,
    explanation: '1930 is the dedicated National Cyber Crime Reporting Portal helpline (formerly known as the Citizen Financial Cyber Fraud Reporting System).'
  },
  {
    question: 'A friend on social media suddenly messages you asking for urgent money via UPI because of a medical emergency. What is your first step?',
    options: [
      'Send the money immediately to avoid offending them',
      'Call your friend directly via a regular phone call to verify if their account was compromised',
      'Ask them to send their bank card photos',
      'Send half the requested amount to be safe'
    ],
    correctIndex: 1,
    explanation: 'Account impersonation and takeover scams are very common. Always verify emergencies independently through a direct voice call before sending any money.'
  },
  {
    question: 'Why should you avoid conducting banking or sensitive transactions on open, password-free public Wi-Fi networks?',
    options: [
      'Public Wi-Fi discharges phone batteries rapidly',
      'Open networks can be monitored or spoofed by rogue actors using man-in-the-middle techniques',
      'Banks automatically block all accounts accessed over Wi-Fi',
      'Public Wi-Fi deletes your saved passwords'
    ],
    correctIndex: 1,
    explanation: 'Unsecured public Wi-Fi allows attackers on the same network to intercept unencrypted packets or set up fake access points (evil twin attacks).'
  },
  {
    question: 'If you suspect you have fallen victim to an online financial fraud, within what timeframe should you report it to maximize recovery chances?',
    options: [
      'Within the first "Golden Hour" (as quickly as possible)',
      'Wait at least 30 days to see if the money is automatically refunded',
      'Only after visiting the nearest high court',
      'It does not matter, digital transactions cannot be tracked'
    ],
    correctIndex: 0,
    explanation: 'The initial period (often called the "Golden Hour") is critical. Immediate reporting to your bank and 1930 enables authorities to freeze fraudulent intermediary accounts.'
  },
  {
    question: 'What is the safest way to visit your bank or credit card login page?',
    options: [
      'Click the link inside an unsolicited SMS or promotional email',
      'Type the verified domain URL directly into your browser or use an official mobile app',
      'Click the first sponsored ad link on a search engine',
      'Ask a social media group for the latest login link'
    ],
    correctIndex: 1,
    explanation: 'Manually typing the verified web address (e.g., https://www.onlinesbi.sbi) or using bookmarked official links eliminates the risk of navigating to spoofed phishing sites.'
  }
];

function initQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  let currentQuestion = 0;
  let score = 0;
  let selectedOption = null;

  function renderQuestion(index) {
    selectedOption = null;
    const q = QUIZ_QUESTIONS[index];

    let optionsHtml = q.options.map((opt, i) => {
      return `
        <button class="quiz-option-btn" type="button" data-index="${i}">
          ${escapeHtml(opt)}
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">
          <span>Question ${index + 1} of ${QUIZ_QUESTIONS.length}</span>
          <span>Score: ${score}</span>
        </div>

        <h3 class="quiz-question">${escapeHtml(q.question)}</h3>

        <div class="quiz-options" id="quizOptions">
          ${optionsHtml}
        </div>

        <div id="quizFeedback" style="display: none; margin-top: 16px;">
          <div class="notice-box notice-info" id="quizFeedbackBox" style="margin-bottom: 16px;">
            <strong id="quizFeedbackStatus"></strong>
            <p id="quizFeedbackText" style="margin-top: 4px;"></p>
          </div>
          <button class="btn btn-primary" id="btnNextQuestion" type="button">
            ${index + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Final Score'}
          </button>
        </div>
      </div>
    `;

    const optionButtons = container.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        if (selectedOption !== null) return;
        const chosen = parseInt(this.getAttribute('data-index'), 10);
        evaluateQuizAnswer(chosen);
      });
    });
  }

  function evaluateQuizAnswer(chosenIndex) {
    selectedOption = chosenIndex;
    const q = QUIZ_QUESTIONS[currentQuestion];
    const isCorrect = (chosenIndex === q.correctIndex);

    if (isCorrect) {
      score++;
    }

    const buttons = container.querySelectorAll('.quiz-option-btn');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correctIndex) {
        btn.classList.add('show-correct');
      }
      if (i === chosenIndex && !isCorrect) {
        btn.classList.add('selected-wrong');
      }
    });

    const feedbackSection = document.getElementById('quizFeedback');
    const feedbackBox = document.getElementById('quizFeedbackBox');
    const statusText = document.getElementById('quizFeedbackStatus');
    const descText = document.getElementById('quizFeedbackText');

    feedbackBox.className = 'notice-box ' + (isCorrect ? 'notice-info' : 'notice-warning');
    statusText.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    descText.textContent = q.explanation;
    feedbackSection.style.display = 'block';

    document.getElementById('btnNextQuestion').addEventListener('click', function () {
      if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
        currentQuestion++;
        renderQuestion(currentQuestion);
      } else {
        renderQuizSummary();
      }
    });
  }

  function renderQuizSummary() {
    const total = QUIZ_QUESTIONS.length;
    const percent = Math.round((score / total) * 100);
    let title = '';
    let message = '';
    let tagClass = '';

    if (score >= 10) {
      title = 'Excellent Awareness';
      message = 'You demonstrate a comprehensive understanding of phishing, payment safety, and digital fraud prevention.';
      tagClass = 'notice-info';
    } else if (score >= 7) {
      title = 'Good Awareness';
      message = 'You have solid baseline knowledge, but several tricky social-engineering techniques could still pose a risk.';
      tagClass = 'notice-warning';
    } else {
      title = 'Needs Improvement';
      message = 'You missed multiple foundational cyber safety concepts. Take time to read through our learning modules.';
      tagClass = 'notice-warning';
    }

    container.innerHTML = `
      <div class="card card-accent-sage" style="text-align: center; padding: 40px 24px;">
        <span class="meta-label">Assessment Completed</span>
        <h2 class="section-title" style="margin-top: 8px;">Final Score: ${score} / ${total} (${percent}%)</h2>
        
        <div class="notice-box ${tagClass}" style="max-width: 580px; margin: 20px auto; text-align: left;">
          <strong>${title}</strong>
          <p style="margin-top: 4px;">${message}</p>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btnRestartQuiz" type="button">Retake Quiz</button>
          <a class="btn btn-secondary" href="scams.html">Review Scam Modules</a>
        </div>
      </div>
    `;

    document.getElementById('btnRestartQuiz').addEventListener('click', function () {
      currentQuestion = 0;
      score = 0;
      renderQuestion(0);
    });
  }

  renderQuestion(0);
}

/* ==================================================
   5. PASSWORD STRENGTH CHECKER (password-safety.html)
   ================================================== */
function initPasswordChecker() {
  const input = document.getElementById('pwdInput');
  const toggleBtn = document.getElementById('pwdToggle');
  const meterBar = document.getElementById('pwdMeter');
  const ratingText = document.getElementById('pwdRatingText');
  const crackEstimate = document.getElementById('pwdCrackEstimate');

  if (!input || !meterBar) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.textContent = 'Hide';
      } else {
        input.type = 'password';
        toggleBtn.textContent = 'Show';
      }
    });
  }

  input.addEventListener('input', function () {
    evaluatePassword(input.value);
  });

  function evaluatePassword(pwd) {
    const critLength = document.getElementById('critLength');
    const critUpper = document.getElementById('critUpper');
    const critLower = document.getElementById('critLower');
    const critNumber = document.getElementById('critNumber');
    const critSpecial = document.getElementById('critSpecial');

    if (!pwd) {
      meterBar.className = 'meter-bar';
      meterBar.style.width = '0%';
      ratingText.textContent = 'Enter a password to evaluate';
      crackEstimate.textContent = 'Awaiting input';
      [critLength, critUpper, critLower, critNumber, critSpecial].forEach(el => {
        if (el) el.classList.remove('met');
      });
      return;
    }

    const hasLength = pwd.length >= 10;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    // Update criteria checklist
    if (critLength) critLength.classList.toggle('met', hasLength);
    if (critUpper) critUpper.classList.toggle('met', hasUpper);
    if (critLower) critLower.classList.toggle('met', hasLower);
    if (critNumber) critNumber.classList.toggle('met', hasNumber);
    if (critSpecial) critSpecial.classList.toggle('met', hasSpecial);

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (hasUpper) score += 1;
    if (hasLower) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    // Penalty for predictable common words
    const commonPatterns = ['password', '123456', 'admin', 'qwerty', 'letmein', 'welcome'];
    const hasPattern = commonPatterns.some(pat => pwd.toLowerCase().includes(pat));
    if (hasPattern) score = Math.max(1, score - 2);

    let strength = 'Weak';
    let meterClass = 'meter-weak';
    let estimate = 'A few seconds to minutes';

    if (score >= 6) {
      strength = 'Strong';
      meterClass = 'meter-strong';
      estimate = 'Centuries with modern computational clusters';
    } else if (score >= 4) {
      strength = 'Good';
      meterClass = 'meter-good';
      estimate = 'Several months to years';
    } else if (score >= 3) {
      strength = 'Fair';
      meterClass = 'meter-fair';
      estimate = 'A few hours to days';
    }

    meterBar.className = 'meter-bar ' + meterClass;
    ratingText.textContent = `Strength: ${strength}`;
    crackEstimate.textContent = `Theoretical Resistance: ${estimate}`;
  }
}

/* ==================================================
   6. SAFETY CHECKLIST (checklist.html)
   ================================================== */
function initChecklist() {
  const checklistContainer = document.getElementById('safetyChecklist');
  const progressText = document.getElementById('checklistProgressText');
  const resetBtn = document.getElementById('btnResetChecklist');

  if (!checklistContainer) return;

  const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');

  // Load saved state from localStorage if available
  checkboxes.forEach((cb, idx) => {
    const saved = localStorage.getItem('scamshield_check_' + idx);
    if (saved === 'true') {
      cb.checked = true;
      cb.closest('.checklist-item').classList.add('checked');
    }

    cb.addEventListener('change', function () {
      const item = this.closest('.checklist-item');
      if (this.checked) {
        item.classList.add('checked');
        localStorage.setItem('scamshield_check_' + idx, 'true');
      } else {
        item.classList.remove('checked');
        localStorage.removeItem('scamshield_check_' + idx);
      }
      updateChecklistProgress();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      checkboxes.forEach((cb, idx) => {
        cb.checked = false;
        cb.closest('.checklist-item').classList.remove('checked');
        localStorage.removeItem('scamshield_check_' + idx);
      });
      updateChecklistProgress();
    });
  }

  function updateChecklistProgress() {
    const total = checkboxes.length;
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    if (progressText) {
      const percent = Math.round((checkedCount / total) * 100);
      progressText.textContent = `Completed ${checkedCount} of ${total} checks (${percent}%)`;
    }
  }

  updateChecklistProgress();
}

/* ==================================================
   7. FEEDBACK FORM (feedback.html)
   ================================================== */
function initFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  const feedbackStatus = document.getElementById('feedbackStatus');
  if (!form || !feedbackStatus) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('feedName').value.trim();
    const email = document.getElementById('feedEmail').value.trim();
    const rating = document.getElementById('feedRating').value;
    const category = document.getElementById('feedCategory').value;
    const comments = document.getElementById('feedComments').value.trim();

    // Validation
    if (!name || !email || !rating || !comments) {
      showStatus('Please complete all required fields.', 'notice-warning');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showStatus('Please enter a valid email address.', 'notice-warning');
      return;
    }

    // Optional async request to local student Java backend if running
    const payload = {
      name: name,
      email: email,
      rating: rating,
      category: category,
      comments: comments,
      submittedAt: new Date().toISOString()
    };

    // Attempt to notify local Java backend (if running on standard port 8080)
    // Silently fall back to client-side demonstration if backend server is not launched
    fetch('http://localhost:8080/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(data => {
        showSuccessMessage(name, true);
      })
      .catch(err => {
        // Standalone client demonstration mode
        showSuccessMessage(name, false);
      });
  });

  function showSuccessMessage(name, sentToBackend) {
    const backendNote = sentToBackend
      ? 'Your response was successfully processed by the Java backend server.'
      : 'Feedback logged in your local session (Demo Mode: Java backend is optional).';

    form.reset();
    feedbackStatus.innerHTML = `
      <div class="notice-box notice-info">
        <strong>Thank you, ${escapeHtml(name)}!</strong>
        <p style="margin-top: 4px;">Your feedback and observations have been received.</p>
        <p class="body-secondary" style="margin-top: 6px;">${backendNote}</p>
      </div>
    `;
    feedbackStatus.style.display = 'block';
  }

  function showStatus(msg, className) {
    feedbackStatus.innerHTML = `
      <div class="notice-box ${className}">
        ${escapeHtml(msg)}
      </div>
    `;
    feedbackStatus.style.display = 'block';
  }
}

/* Helper to prevent HTML injection */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

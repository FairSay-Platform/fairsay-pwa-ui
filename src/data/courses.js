// src/data/courses.js

export const courses = [
  {
    id: "workplace-harassment",
    title: "Understanding Workplace Harassment",
    description:
      "Learn what constitutes workplace harassment, recognize behaviors, understand your rights under Nigerian law, and know the impact of harassment.",
    icon: "shield",
    color: "#DC2626",
    progress: 0,
    order: 1,
    lessons: [
      { id: 1, title: "Introduction to Workplace Harassment", duration: "4 min" },
      { id: 2, title: "What Workplace Harassment Looks Like", duration: "5 min" },
      { id: 3, title: "Understanding Impact & Boundaries", duration: "4 min" },
      { id: 4, title: "Quiz", duration: "3 min" },
    ],
  },
  {
    id: "discrimination-laws",
    title: "Discrimination Laws and Protected Classes",
    description:
      "Understand workplace discrimination, protected classes under Nigerian law, key federal and state laws, and resources for reporting discrimination.",
    icon: "balance",
    color: "#7C3AED",
    progress: 0,
    order: 2,
    lessons: [
      { id: 1, title: "Introduction & Learning Objectives", duration: "3 min" },
      { id: 2, title: "Legal Definitions & Protected Rights", duration: "6 min" },
      { id: 3, title: "Institutional Mechanisms & Practical Protections", duration: "5 min" },
      { id: 4, title: "Quiz", duration: "3 min" },
    ],
  },
  {
    id: "complaint-procedures",
    title: "Proper Complaint Filing Procedures",
    description:
      "Learn how to prepare a clear and strong complaint, gather important information, and follow safe steps to report workplace issues including through the PCC.",
    icon: "document",
    color: "#0F766E",
    progress: 0,
    order: 3,
    lessons: [
      { id: 1, title: "Introduction to Complaint Filing", duration: "3 min" },
      { id: 2, title: "Preparing a Strong Complaint", duration: "5 min" },
      { id: 3, title: "Submission & Escalation Steps", duration: "4 min" },
      { id: 4, title: "Quiz", duration: "3 min" },
    ],
  },
  {
    id: "wage-hour",
    title: "Wage & Hour Rights",
    description:
      "Learn about Nigeria's minimum wage (₦70,000), salary payment rights, working hours, overtime, and unlawful deductions under Nigerian labour law.",
    icon: "dollar",
    color: "#1E3A8A",
    progress: 0,
    order: 4,
    lessons: [
      { id: 1, title: "Introduction to Wage & Hour Rights", duration: "4 min" },
      { id: 2, title: "What Wage and Hour Issues Look Like", duration: "5 min" },
      { id: 3, title: "Understanding Impact & Boundaries", duration: "4 min" },
      { id: 4, title: "Quiz", duration: "3 min" },
    ],
  },
  {
    id: "retaliation-protection",
    title: "Retaliation Protection",
    description:
      "Understand workplace retaliation, recognize retaliatory behaviors, and learn about legal protections under Nigerian law and the PCC framework.",
    icon: "heart",
    color: "#059669",
    progress: 0,
    order: 5,
    lessons: [
      { id: 1, title: "Introduction to Retaliation Protection", duration: "4 min" },
      { id: 2, title: "Legal Foundation for Retaliation Protection", duration: "5 min" },
      { id: 3, title: "What Retaliation Looks Like", duration: "5 min" },
      { id: 4, title: "Quiz", duration: "3 min" },
    ],
  },
];

// ============ WORKPLACE HARASSMENT MODULE ============
export const workplaceHarassmentLessons = [
  {
    id: 1,
    title: "Introduction to Workplace Harassment",
    duration: "4 min",
    completed: false,
    heading: "Understanding Workplace Harassment",
    body: "Understanding workplace harassment helps you know what behavior is wrong and unacceptable at work. This module helps you recognize problems early and know the right steps to take.",
    learnItems: [
      "Define workplace harassment – Understand what constitutes harassment in the Nigerian workplace, including verbal, physical, and psychological forms.",
      "Recognize harassment behaviors – Identify actions, patterns, or attitudes that may amount to harassment.",
      "Understand your rights – Learn the legal and organizational protections available to employees under Nigerian labor laws and the PCC guidelines.",
      "Know the impact of harassment – Understand how harassment affects individuals, teams, and organizations.",
    ],
    callout: {
      type: "info",
      text: "Did You Know? Workplace harassment is one of the most underreported workplace issues globally because many employees fear retaliation or believe nothing will change.",
    },
    sections: [
      {
        heading: "What Is Workplace Harassment?",
        intro:
          "Workplace harassment refers to repeated or serious unwanted behavior in a work environment that creates fear, humiliation, intimidation, or a hostile atmosphere for an employee.",
        items: [
          {
            label: "Who it affects:",
            text: "Harassment can occur between employer and employee, supervisor and subordinate, colleagues, or contractors and third parties.",
          },
          {
            label: "Forms:",
            text: "Not limited to sexual misconduct. May involve verbal abuse, bullying, threats, intimidation, or misuse of authority.",
          },
        ],
      },
      {
        heading: "Harassment becomes serious when:",
        items: [
          { label: "", text: "It is persistent or severe" },
          { label: "", text: "It affects a person's ability to work" },
          { label: "", text: "It creates an unsafe or hostile environment" },
          { label: "", text: "It is used to control, silence, or punish someone" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "What Workplace Harassment Looks Like",
    duration: "5 min",
    completed: false,
    heading: "Forms of Workplace Harassment",
    body: "Workplace harassment can take different forms. It is not always physical or obvious.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did You Know? The Public Complaints Commission (PCC) aka Ombudsman, established under the Constitution of the Federal Republic of Nigeria, has the authority to investigate administrative injustice in both public and private institutions.",
    },
    sections: [
      {
        heading: "Verbal and Psychological Harassment",
        intro: "This includes:",
        items: [
          { label: "", text: "Repeated insults or shouting" },
          { label: "", text: "Public humiliation" },
          { label: "", text: "Derogatory comments" },
          { label: "", text: "Persistent mockery" },
          { label: "", text: "Threats of dismissal without cause" },
          { label: "", text: "Spreading false rumors" },
        ],
      },
      {
        heading: "Physical or Threatening Behavior",
        intro: "This includes:",
        items: [
          { label: "", text: "Unwanted physical contact" },
          { label: "", text: "Blocking someone's movement" },
          { label: "", text: "Intimidating gestures" },
          { label: "", text: "Aggressive confrontation" },
          { label: "", text: "Physical assault" },
        ],
      },
      {
        heading: "Abuse of Authority",
        intro: "Harassment can also occur when power is misused, such as:",
        items: [
          { label: "", text: "Unfairly targeting an employee" },
          { label: "", text: "Excessive monitoring meant to intimidate" },
          { label: "", text: "Assigning impossible tasks as punishment" },
          { label: "", text: "Deliberate exclusion from opportunities" },
          { label: "", text: "Arbitrary suspension or demotion" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Understanding Impact & Boundaries",
    duration: "4 min",
    completed: false,
    heading: "The Impact of Workplace Harassment",
    body: "Harassment can lead to emotional stress, anxiety or fear at work, reduced productivity, loss of confidence, and unsafe working conditions. A healthy workplace should promote dignity, respect, and professionalism.",
    learnItems: [],
    callout: {
      type: "warning",
      text: "Did You Know? Abuse of authority is one of the most overlooked forms of workplace harassment because it can be disguised as 'management style.'",
    },
    sections: [
      {
        heading: "What Harassment Is Not",
        intro: "Not every workplace disagreement is harassment. Examples that may not automatically qualify:",
        items: [
          { label: "", text: "Constructive performance feedback" },
          { label: "", text: "Reasonable disciplinary action" },
          { label: "", text: "Professional disagreement" },
          { label: "", text: "Performance management conducted fairly" },
        ],
      },
      {
        heading: "The Key Difference:",
        intro: "Understanding this distinction helps prevent misuse of complaint systems. The key difference lies in:",
        items: [
          { label: "", text: "Intent" },
          { label: "", text: "Frequency" },
          { label: "", text: "Severity" },
          { label: "", text: "Whether it creates a hostile environment" },
        ],
      },
    ],
  },
];

export const workplaceHarassmentQuiz = [
  {
    id: 1,
    question: "1. Workplace harassment must always involve physical contact.",
    options: ["True", "False"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "2. Which of the following can be a form of harassment?",
    options: [
      "Repeated public humiliation",
      "Constructive performance review",
      "Respectful feedback",
      "Approved annual leave",
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "3. Abuse of authority can be considered harassment when it is used to:",
    options: [
      "Improve performance fairly",
      "Intimidate or unfairly target an employee",
      "Provide training",
      "Assign regular duties",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "4. A single serious threatening incident can qualify as harassment.",
    options: ["True", "False"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "5. The main difference between harassment and normal workplace management is:",
    options: [
      "Salary level",
      "Frequency and impact of behavior",
      "Office size",
      "Job title",
    ],
    correctIndex: 1,
  },
];

// ============ DISCRIMINATION LAWS MODULE ============
export const discriminationLawsLessons = [
  {
    id: 1,
    title: "Introduction & Learning Objectives",
    duration: "3 min",
    completed: false,
    heading: "Discrimination Laws and Protected Classes",
    body: "Discrimination in the workplace occurs when employees are treated unfairly because of who they are, rather than what they do. It can affect hiring, promotions, salary, task assignments, and termination decisions. In Nigeria, workplace discrimination can be based on gender, ethnicity, religion, tribe, marital status, place of origin, age, or disability.",
    learnItems: [
      "Define workplace discrimination and identify behaviors that constitute discrimination.",
      "Understand protected classes under Nigerian law.",
      "Recognize key federal and state laws that protect employees from discrimination.",
      "Identify institutions and resources for reporting and addressing discrimination.",
      "Understand your practical steps if you experience or witness discrimination.",
    ],
    callout: {
      type: "info",
      text: "Did you know? Section 42 of the Nigerian Constitution guarantees freedom from discrimination on the basis of sex, ethnicity, religion, place of origin, or political opinion, applying to both law and its enforcement.",
    },
    sections: [],
  },
  {
    id: 2,
    title: "Legal Definitions & Protected Rights",
    duration: "6 min",
    completed: false,
    heading: "Understanding Workplace Discrimination",
    body: "Discrimination occurs when an employee is treated unfairly or unequally compared to others because of personal attributes rather than performance or qualifications.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did you know? Approximately 30% of women and girls in Nigeria experience gender-based violence, including workplace harassment, highlighting the importance of knowing your rights.",
    },
    sections: [
      {
        heading: "Examples of Discrimination:",
        items: [
          {
            label: "",
            text: "Denying promotion or salary increase based on gender or ethnicity",
          },
          {
            label: "",
            text: "Harassment or verbal abuse targeted at a specific group",
          },
          {
            label: "",
            text: "Assigning unfavorable tasks because of religion or marital status",
          },
        ],
      },
      {
        heading: "Key Nigerian Laws Protecting Employees:",
        items: [
          {
            label: "Constitution (Section 34):",
            text: "Right to dignity – protection from torture, degrading treatment, or forced labor",
          },
          {
            label: "Constitution (Section 35):",
            text: "Right to personal liberty – ensures lawful procedures before deprivation of liberty",
          },
          {
            label: "Constitution (Section 36):",
            text: "Right to fair hearing – ensures impartial legal processes",
          },
          {
            label: "Constitution (Section 42):",
            text: "Freedom from discrimination – guarantees equal treatment regardless of sex, ethnicity, religion, place of origin, or political opinion",
          },
          {
            label: "Labour Act:",
            text: "Protects written employment contracts, fair dismissal procedures, wages, annual leave, and sick leave",
          },
          {
            label: "VAPP Act 2015:",
            text: "Protects employees from sexual harassment, coercion, intimidation, and other forms of gender-based violence",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Institutional Mechanisms & Practical Protections",
    duration: "5 min",
    completed: false,
    heading: "How to Take Action",
    body: "Nigeria has several institutions and escalation channels to help employees who experience discrimination.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did you know? PCC and SARCs maintain publicly accessible offender registers, which can be used for background verification and deterrence.",
    },
    sections: [
      {
        heading: "Institutions and Escalation Channels:",
        items: [
          {
            label: "Internal HR/Complaint Systems:",
            text: "First point of escalation within the company. Employees must attempt internal resolution first.",
          },
          {
            label: "Public Complaints Commission (PCC):",
            text: "Investigates unresolved complaints and acts as an external escalation body for both employees and whistleblowers.",
          },
          {
            label: "National Human Rights Commission (NHRC):",
            text: "Handles human rights violations and provides redress for affected employees.",
          },
          {
            label: "NAPTIP & SARCs:",
            text: "Manage sexual assault cases, maintain the Sexual Offenders Register, provide counseling, and coordinate rescue and legal support.",
          },
        ],
      },
      {
        heading: "Employee Rights & Practical Steps:",
        items: [
          {
            label: "",
            text: "Keep a written record of discriminatory acts, including dates, locations, and witnesses.",
          },
          {
            label: "",
            text: "Understand your protected rights and refer to relevant legal sections (e.g., Section 42 of the Constitution, VAPP Act Section 46).",
          },
          {
            label: "",
            text: "Escalate to HR first; if unresolved, escalate to PCC or NHRC depending on the type of discrimination.",
          },
          {
            label: "",
            text: "Maintain confidentiality and anonymity where possible, especially for whistleblowing or sensitive cases.",
          },
        ],
      },
    ],
  },
];

export const discriminationLawsQuiz = [
  {
    id: 1,
    question: "1. Workplace discrimination can include unfair treatment based on gender, ethnicity, or religion.",
    options: ["True", "False"],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "2. Which Nigerian law protects employees from sexual harassment at work?",
    options: [
      "Labour Act",
      "VAPP Act",
      "Constitution Section 42",
      "Both B and C",
    ],
    correctIndex: 3,
  },
  {
    id: 3,
    question: "3. If your company does not resolve a discrimination complaint, which institution can you escalate to?",
    options: [
      "PCC",
      "HR Department only",
      "Local community leader",
      "Colleagues",
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "4. Gender-based violence in Nigeria can include:",
    options: [
      "Verbal abuse and isolation",
      "Economic exploitation",
      "Forced sexual activity",
      "All of the above",
    ],
    correctIndex: 3,
  },
  {
    id: 5,
    question: "5. Section 42 of the Nigerian Constitution prohibits discrimination based on:",
    options: [
      "Salary level",
      "Ethnic group, sex, religion, place of origin",
      "Office location",
      "Job title",
    ],
    correctIndex: 1,
  },
];

// ============ COMPLAINT PROCEDURES MODULE ============
export const complaintProceduresLessons = [
  {
    id: 1,
    title: "Introduction to Complaint Filing",
    duration: "3 min",
    completed: false,
    heading: "Proper Complaint Filing Procedures",
    body: "Filing a workplace complaint the right way helps you make sure your problem is heard and taken seriously. This module teaches you how to prepare a clear complaint, gather important information, and follow safe steps to report issues.",
    learnItems: [
      "Identify what a complaint filing procedure is",
      "Follow the basic steps to report a workplace issue",
      "Collect the right information before submitting a complaint",
      "Choose the right person or authority to report to (including the PCC)",
      "Take safe action while protecting yourself",
    ],
    callout: {
      type: "info",
      text: "Did You Know? Filing a complaint with the PCC in Nigeria is free, and you do not need a lawyer to start a case.",
    },
    sections: [
      {
        heading: "Why Proper Complaint Filing Matters",
        intro:
          "Filing a complaint properly is important to solve workplace problems in a fair and safe way. Many complaints fail because they are missing details, unclear, or not supported by evidence.",
        items: [
          {
            label: "PCC Connection:",
            text: "This platform links to the Public Complaints Commission (PCC) — Nigeria's federal ombudsman — which investigates unfair treatment in both public and private organizations.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Preparing a Strong Complaint",
    duration: "5 min",
    completed: false,
    heading: "How to Prepare a Strong Complaint",
    body: "A strong complaint is clear, organized, and supported by evidence. It helps investigators understand the problem quickly.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did You Know? Many successful complaints are resolved using simple evidence like text messages, photos, or emails — not formal documents!",
    },
    sections: [
      {
        heading: "Steps to Prepare Your Complaint:",
        items: [
          {
            label: "1. Identify the Organization and People Involved:",
            text: "Name of company, department or office, name or position of the person involved (if known)",
          },
          {
            label: "2. Describe the Incident Clearly:",
            text: "What happened, when, and where. Explain events step by step using simple words",
          },
          {
            label: "3. Provide Supporting Evidence:",
            text: "Emails, messages, documents, photos, or witnesses. If evidence is missing, give a detailed description",
          },
          {
            label: "4. State the Desired Outcome:",
            text: "What you want to happen (investigation, correction, payment, formal response)",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Submission & Escalation Steps",
    duration: "4 min",
    completed: false,
    heading: "How to Submit and Escalate",
    body: "Understanding when and how to escalate your complaint ensures it gets the attention it deserves.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did You Know? A complaint can still be investigated even if your employer refuses to cooperate.",
    },
    sections: [
      {
        heading: "Submission & Escalation Steps:",
        items: [
          {
            label: "1. Internal Reporting (When Safe):",
            text: "Report to supervisors, HR, or internal grievance channels. Resolving internally is usually faster and safer",
          },
          {
            label: "2. External Escalation:",
            text: "When internal reporting is unsafe, ineffective, or biased, escalate to PCC or Ministry of Labour. Include supporting documents and details of what happened",
          },
          {
            label: "3. Submit Complete and Accurate Information:",
            text: "Review your complaint, attach evidence, keep copies of everything",
          },
          {
            label: "4. Maintain Confidentiality:",
            text: "Avoid sharing details publicly during investigation to protect yourself and ensure fairness",
          },
        ],
      },
    ],
  },
];

export const complaintProceduresQuiz = [
  {
    id: 1,
    question: "1. What is the most important characteristic of a strong complaint?",
    options: [
      "Emotional language",
      "Clear and factual information",
      "Anonymous rumors",
      "Public accusations",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "2. Which of the following should be included in a complaint?",
    options: [
      "Only opinions",
      "Step-by-step description of events",
      "Personal attacks",
      "Unverified assumptions",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "3. Why should you keep copies of submitted documents?",
    options: [
      "For personal records and follow-up",
      "It is required by law in all cases",
      "To share on social media",
      "To avoid submitting evidence",
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "4. When is external escalation necessary?",
    options: [
      "Internal reporting is unsafe or ineffective",
      "The issue is minor",
      "You prefer external attention",
      "It is always required",
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "5. Why is it important to review your complaint before submission?",
    options: [
      "To ensure clarity and accuracy",
      "To make it longer",
      "To remove all details",
      "To delay the process",
    ],
    correctIndex: 0,
  },
];

// ============ WAGE & HOUR RIGHTS MODULE ============
export const wageHourLessons = [
  {
    id: 1,
    title: "Introduction to Wage & Hour Rights",
    duration: "4 min",
    completed: false,
    heading: "Understanding Wage and Hour Rights",
    body: "Understanding wage and hour rights helps you know what pay and work-time rules employers must follow under Nigerian labour law. This module helps you recognize problems early and understand what protections you have.",
    learnItems: [
      "Define wage and hour rights — Understand what Nigerian law says about minimum wage, salary payment, working hours, overtime, and deductions.",
      "Recognize wage and hour issues — Identify unfair pay practices, underpayment, late wages, and unlawful deductions.",
      "Understand your rights — Learn your legal protections under Nigerian wage and labour regulations.",
      "Know the impact of wage issues — Understand how wage and hour violations affect your financial well being and work life.",
    ],
    callout: {
      type: "info",
      text: "Did You Know? Under Nigerian law, employers must pay no less than ₦70,000 monthly to qualifying workers, and failure to comply can lead to legal consequences.",
    },
    sections: [
      {
        heading: "What Are Wage and Hour Rights?",
        intro:
          "Wage and hour rights refer to your legal entitlement to fair pay and correct compensation for your work in Nigeria. These rights cover:",
        items: [
          { label: "", text: "Being paid at least the national minimum wage" },
          { label: "", text: "Receiving your salary regularly" },
          { label: "", text: "Having lawful deductions only" },
          { label: "", text: "Working hours that match your contract or law" },
          {
            label: "",
            text: "Being paid properly for overtime where your contract allows",
          },
        ],
      },
      {
        heading: "National Minimum Wage",
        intro:
          "In Nigeria, the national minimum wage is ₦70,000 per month, set by the National Minimum Wage (Amendment) Act, 2024.",
        items: [],
      },
    ],
  },
  {
    id: 2,
    title: "What Wage and Hour Issues Look Like",
    duration: "5 min",
    completed: false,
    heading: "Recognizing Wage and Hour Problems",
    body: "Wage and hour problems may take different forms. They aren't always obvious.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did You Know? The National Industrial Court of Nigeria has ruled in multiple cases that unpaid salary is a breach of contract and employees are entitled to recover their earnings.",
    },
    sections: [
      {
        heading: "Minimum Wage Issues",
        items: [
          {
            label: "",
            text: "Being paid less than ₦70,000 per month if you qualify",
          },
          {
            label: "",
            text: "Reducing pay to below the legal minimum without agreement",
          },
        ],
      },
      {
        heading: "Delayed or Withheld Salary",
        items: [
          {
            label: "",
            text: "Salary unpaid for months or on payday as agreed repeatedly",
          },
          {
            label: "",
            text: "Salary withheld after resignation without justification",
          },
          {
            label: "",
            text: "Employers skipping or postponing salaries without lawful reason",
          },
        ],
      },
      {
        heading: "Unpaid or Underpaid Overtime",
        items: [
          {
            label: "",
            text: "Working extra hours without overtime pay when your contract promises it",
          },
          { label: "", text: "Being forced to work late without compensation" },
        ],
      },
      {
        heading: "Unlawful Deductions",
        intro: "Employers may only deduct wages when:",
        items: [
          { label: "", text: "Authorized by law (e.g., tax, pension)" },
          { label: "", text: "Employee consents" },
          { label: "", text: "Court order exists" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Understanding Impact & Boundaries",
    duration: "4 min",
    completed: false,
    heading: "Impact and What's Not a Violation",
    body: "When you are underpaid or not paid on time, it can lead to financial stress and inability to meet basic needs, difficulty paying rent, bills, and family expenses, reduced trust in your employer, and lower morale and productivity.",
    learnItems: [],
    callout: {
      type: "warning",
      text: "Did You Know? Employers cannot reduce wages below minimum wage due to economic hardship unless legally restructured in compliance with labour regulations.",
    },
    sections: [
      {
        heading: "What Wage Issues Are Not",
        intro:
          "Not all disagreements over money at work are illegal. Examples that may not automatically qualify as wage violations:",
        items: [
          { label: "", text: "Pay raises or reductions agreed in writing" },
          {
            label: "",
            text: "Lawful statutory deductions (e.g., taxes, pension contributions)",
          },
          {
            label: "",
            text: "Contractual pay structures like commissions",
          },
          {
            label: "",
            text: "Delays explained and agreed in writing",
          },
        ],
      },
      {
        heading: "The Key Difference:",
        intro:
          "The key difference lies in whether the practice is allowed under your contract and Nigerian law.",
        items: [],
      },
    ],
  },
];

export const wageHourQuiz = [
  {
    id: 1,
    question: "1. An employer can legally pay less than ₦70,000 per month to a full-time employee.",
    options: ["True", "False"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "2. Which of the following can be a wage issue?",
    options: [
      "Being paid less than the minimum wage",
      "Lawful pension deduction",
      "Commission pay agreed in contract",
      "Work-from-home flexibility",
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "3. Salary deductions without consent or legal authority is:",
    options: [
      "Unlawful",
      "Required by law",
      "Helpful",
      "Always okay",
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "4. Working extra hours with no pay can be a wage concern if your contract promises overtime compensation.",
    options: ["True", "False"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "5. The main difference between legal deductions and wage abuse is:",
    options: [
      "Job title",
      "Whether your contract and the law permit it",
      "Office location",
      "Company size",
    ],
    correctIndex: 1,
  },
];

// ============ RETALIATION PROTECTION MODULE ============
export const retaliationProtectionLessons = [
  {
    id: 1,
    title: "Introduction to Retaliation Protection",
    duration: "4 min",
    completed: false,
    heading: "Understanding Retaliation Protection",
    body: "Understanding retaliation protection helps employees and employers recognize that no one should suffer punishment for speaking up about workplace misconduct, asserting their legal rights, or participating in investigations. This module explains what retaliation is, why it is unlawful, and the protections available under Nigerian law and regulatory frameworks.",
    learnItems: [
      "Define workplace retaliation – Understand what retaliation means in the Nigerian workplace context.",
      "Recognize retaliatory behaviors – Identify subtle and overt actions that may amount to retaliation.",
      "Understand your legal protections – Learn about safeguards under the Constitution, Labour Act, Public Interest Disclosure Act, and PCC.",
      "Understand the impact of retaliation – Learn how retaliation damages individuals, organizations, and workplace culture.",
    ],
    callout: {
      type: "info",
      text: "Did You Know? Retaliation is one of the most common reasons employees withdraw complaints.",
    },
    sections: [
      {
        heading: "What Is Workplace Retaliation?",
        intro:
          "Workplace retaliation occurs when an employer, supervisor, or colleague takes adverse action against an employee because the employee:",
        items: [
          { label: "", text: "Reported harassment or misconduct" },
          { label: "", text: "Filed a complaint" },
          { label: "", text: "Participated in an investigation" },
          { label: "", text: "Refused to engage in unlawful conduct" },
          { label: "", text: "Exercised a legal workplace right" },
        ],
      },
      {
        heading: "Key Point:",
        intro:
          "Retaliation is unlawful when it punishes someone for engaging in a protected activity.",
        items: [],
      },
    ],
  },
  {
    id: 2,
    title: "Legal Foundation for Retaliation Protection",
    duration: "5 min",
    completed: false,
    heading: "Legal Protections in Nigeria",
    body: "Nigeria has several legal frameworks that protect employees from retaliation.",
    learnItems: [],
    callout: {
      type: "info",
      text: "Did You Know? Many courts consider retaliation more serious than the original misconduct because it discourages accountability.",
    },
    sections: [
      {
        heading: "Constitutional Protection",
        intro: "The Constitution of the Federal Republic of Nigeria guarantees:",
        items: [
          {
            label: "Section 34:",
            text: "Right to dignity of the human person",
          },
          { label: "Section 39:", text: "Freedom of expression" },
          { label: "Section 17(3):", text: "Humane working conditions" },
        ],
      },
      {
        heading: "Labour Law Protection",
        intro:
          "The Labour Act regulates employment relationships and protects employees from unfair labor practices, wrongful termination, and abusive conduct. The National Industrial Court of Nigeria (NICN) has increasingly recognized unfair labor practices and victimization as contrary to modern labor standards.",
        items: [],
      },
      {
        heading: "Whistleblower & Public Interest Protection",
        intro:
          "The Public Interest Disclosure Act provides statutory protection for whistleblowers who disclose wrongdoing in the public interest. It prohibits retaliation such as:",
        items: [
          { label: "", text: "Dismissal" },
          { label: "", text: "Demotion" },
          { label: "", text: "Harassment" },
          { label: "", text: "Discrimination" },
        ],
      },
      {
        heading: "Administrative Oversight",
        intro:
          "The Public Complaints Commission (PCC) is empowered under the Constitution to investigate administrative injustice in both public and private organizations. Retaliatory treatment linked to complaints may fall within its jurisdiction.",
        items: [],
      },
    ],
  },
  {
    id: 3,
    title: "What Retaliation Looks Like",
    duration: "5 min",
    completed: false,
    heading: "Recognizing Retaliation",
    body: "Retaliation is not always obvious. It can be subtle and indirect.",
    learnItems: [],
    callout: {
      type: "warning",
      text: "Did You Know? Protection applies even if the complaint is later found unsubstantiated, provided it was made honestly and in good faith.",
    },
    sections: [
      {
        heading: "Direct Retaliation",
        items: [
          { label: "", text: "Termination after filing a complaint" },
          { label: "", text: "Sudden demotion" },
          { label: "", text: "Salary reduction" },
          { label: "", text: "Suspension without valid cause" },
        ],
      },
      {
        heading: "Indirect or Subtle Retaliation",
        items: [
          { label: "", text: "Exclusion from meetings or opportunities" },
          { label: "", text: "Negative performance reviews without basis" },
          { label: "", text: "Unreasonable workload increase" },
          { label: "", text: "Transfer to unfavorable assignments" },
          { label: "", text: "Social isolation encouraged by management" },
        ],
      },
      {
        heading: "Third-Party Retaliation",
        intro: "Retaliation may also occur through:",
        items: [
          {
            label: "",
            text: "Encouraging colleagues to ostracize the complainant",
          },
          { label: "", text: "Threatening future career prospects" },
          { label: "", text: "Blacklisting within an industry" },
        ],
      },
      {
        heading: "When Does Retaliation Become Illegal?",
        intro: "Retaliation becomes unlawful when three elements exist:",
        items: [
          {
            label: "1. Protected Activity:",
            text: "The employee reported misconduct or exercised a right.",
          },
          {
            label: "2. Adverse Action:",
            text: "The employer took negative action.",
          },
          {
            label: "3. Connection:",
            text: "The adverse action was because of the protected activity.",
          },
        ],
      },
      {
        heading: "What Retaliation Is Not",
        intro: "Not every negative action is retaliation. Examples that may not qualify include:",
        items: [
          {
            label: "",
            text: "Legitimate disciplinary action based on evidence",
          },
          { label: "", text: "Performance management conducted fairly" },
          {
            label: "",
            text: "Organizational restructuring unrelated to complaints",
          },
          { label: "", text: "Enforcement of standard company policies" },
        ],
      },
    ],
  },
];

export const retaliationProtectionQuiz = [
  {
    id: 1,
    question: "1. Retaliation only occurs if the original complaint is proven true.",
    options: ["True", "False"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "2. Which of the following may qualify as retaliation?",
    options: [
      "Terminating an employee after they report harassment",
      "Giving a fair performance review",
      "Approving annual leave",
      "Conducting scheduled training",
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "3. The Public Interest Disclosure Act (2022) protects employees from:",
    options: [
      "Workplace promotions",
      "Harassment and dismissal linked to whistleblowing",
      "Routine transfers",
      "Lawful disciplinary action",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "4. Retaliation can be subtle and indirect.",
    options: ["True", "False"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "5. For retaliation to be established, there must be:",
    options: [
      "Protected activity and adverse action",
      "High salary",
      "A written complaint only",
      "Office conflict",
    ],
    correctIndex: 0,
  },
];
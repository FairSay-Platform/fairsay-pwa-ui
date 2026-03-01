//FAIRSAY: Global Constants
//Centralized file for all constant values used across the app, such as complaint categories, status options, and app steps. Ensures consistency and makes it easier to manage any changes in the future.
//To edit as needed
//Waiting for api integration

//Added - icons for the landing page features
import shield from '../images/FS_Logo.svg';
import book from '../images/Book.svg';
import report from '../images/Report.svg';
import lock from '../images/Lock.svg';
import social from '../images/Social.svg';
import people from '../images/People.svg';
import analytics from '../images/Analytics.svg';

//Added - the web app name
export const APP_NAME = "FairSay";


//Added - complaint status options, simulating the different stages a complaint can go through in the system. This allows for better tracking and management of complaints within the app.
export const COMPLAINT_STATUS = {
  REVIEW: {label:'Under Review', id: 'pending'},
  PROGRESS: {label: 'Investigation', id: 'in_progress'},
  RESOLVED: {label: 'Resolved', id: 'resolved'},
};

//Added - complaint categories, simulating the different types of complaints that users can select when submitting a complaint. This helps categorize complaints for better organization and allows for more targeted handling of different issues within the app.

export const COMPLAINT_CATEGORIES = [
  { id: 'WAGE', label: 'Wage & Hour Violations' },
  { id: 'HARASSMENT', label: 'Harassment' },
  { id: 'SAFETY', label: 'Safety Violations' },
  { id: 'DISCRIMINATION', label: 'Discrimination' },
  { id: 'RETALIATION', label: 'Retaliation' },
  { id: 'WRONGFUL TERMINATION', label: 'Wrongful Termination' }
];

//Added- search categories for the complaint search feature, simulating the different criteria that users can use to filter and search through their complaints. This allows for a more efficient and user-friendly way to find specific complaints based on various attributes.
export const SEARCH_CATEGORIES = [
  { id: 'WAGE', label: 'Wage & Hour' },
  { id: 'HARASSMENT', label: 'Harassment' },
  { id: 'SAFETY', label: 'Safety' },
  { id: 'DISCRIMINATION', label: 'Discrimination' }
];

//Added - Priority list
export const PRIORITY_LIST = [
  { id: 'low', label: 'Low Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'high', label: 'High Priority' },
  {id: 'critical', label: 'Critical Priority' }
]

//Added - Form steps for the complaint submission process
export const COMPLAINT_STEPS = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Incident Details" },
  { number: 3, label: "Parties Involved" },
  { number: 4, label: "Impact & Evidence" },
  { number: 5, label: "Review & Submit" },
];

//Added - Types of impact a user can select when filing a complaint
export const IMPACT_TYPES = [
  { id: "emotional", label: "Emotional/Mental", description: "Stress, anxiety, depression" },
  { id: "financial", label: "Financial", description: "Lost wages, expenses" },
  { id: "physical", label: "Physical", description: "Injury, health issues" },
  { id: "career", label: "Career", description: "Demotion, missed promotion" },
];

//Added - Initial state blueprint for the complaint form
export const INITIAL_COMPLAINT_FORM_DATA = {
  violationCategory: "", 
  complaintTitle: "",
  detailedDescription: "",
  dateOfIncident: "",
  timeOfIncident: "",
  location: "",
  isOngoing: false,
  personsInvolved: "",
  jobTitle: "",
  department: "",
  hasWitnesses: false,
  witnessInfo: "",
  impactTypes: [],
  evidenceDescription: "",
  evidenceFiles: [],
  hasPreviouslyReported: false,
  reportedTo: "",
  dateReported: "",
  actionTaken: "",
  desiredOutcome: "",
  keepConfidential: true,
};

//Added - Complaint status styles for UI mapping
export const COMPLAINT_STATUS_STYLES = {
  resolved: { color: "bg-green-100 text-green-700", border: "border-l-green-500", label: "Resolved" },
  in_progress: { color: "bg-orange-100 text-orange-700", border: "border-l-orange-400", label: "Investigation" },
  pending: { color: "bg-blue-100 text-blue-700", border: "border-l-blue-500", label: "Under Review" }
};

//Added - Blueprint for the stats cards on the complaints page
export const COMPLAINT_STAT_CARDS = [
  {
    id: 'total',
    label: "Total Complaints",  
    iconBg: "bg-[#1E3A8A]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'review',
    label: "Under Review",  
    iconBg: "bg-[#1E3A8A]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'resolved',
    label: "Resolved", 
    iconBg: "bg-[#1E3A8A]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01L9 11.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'avgTime',
    label: "Avg. Response Time", 
    iconBg: "bg-[#1E3A8A]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

//Added - profile privacy options, simulating the different levels of privacy that users can choose for their profiles. This allows users to control who can see their information and complaints within the app, enhancing user privacy and security.
export const PROFILE_PRIVACY_OPTIONS = [
  { id: 'CONFIDENTIAL', label: 'Private - Only visible to you' },
  { id: 'SHARED', label: 'Public - Visible to all users' },
  { id: 'ORGANIZATION', label: 'Organization - Visible to your organization' }
];

//Added - app steps, simulating the different stages of the user journey within the app. This allows for better tracking of user progress and helps guide users through the various features and educational content in a structured way.

export const APP_STEPS = {
    REGISTRATION: 'isRegistered',
  EMAIL_VERIFICATION: 'emailVerified',
  PROFILE_COMPLETION: 'isVerified',
  EDUCATION: 'educated',
};

//Added - file upload validation rules, simulating the logic that ensures users can only upload files that meet certain criteria (such as file type and size limits). This helps prevent issues with file handling and ensures a smoother user experience when attaching evidence to complaints.

export const FILE_UPLOAD_RULES = {
  allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
  maxSize: 10 * 1024 * 1024 // 10MB
};

//Added - privacy disclaimers, simulating the important information that users need to be aware of when submitting complaints or sharing their information with the Public Complaints Commission (PCC). This ensures transparency and helps users make informed decisions about their privacy and data sharing preferences within the app.

export const PRIVACY_DISCLAIMERS = {
  PCC_SHARING: "By toggling this, you agree to share your employee ID and name with the Public Complaints Commission (PCC).",
  INTERNAL_ESCALATION: "I confirm I reported this internally and waited at least 14 days for a resolution before escalating to the PCC.",
  CONFIDENTIAL_MODE: "Your identity will be masked. The PCC will see you as 'Confidential Employee'.",
  HONESTY_DECLARATION: "I declare that the information provided is true and follows the Nigerian Labour Act."
};

//Added - landing page features list, which will make my life easier (wish I had done this sooner). This simulates the key features that will be highlighted on the landing page to attract and inform potential users about the benefits of using the app. This allows for easy updates to the landing page content without having to dig through the component code.

export const LANDING_FEATURES = [
  {
    id: 'edu',
    title: "Rights Education Hub",
    desc: "Comprehensive educational materials covering workplace rights, reporting procedures, and legal protections. Mandatory completion ensures informed decisions.",
    icon: book,
    color: "blue"
  },
  {
    id: 'report',
    title: "Complaint Submission",
    desc: "Easy-to-use complaint forms with evidence upload capabilities. Internal escalation verification ensures proper channels are followed.",
    icon: report,
    color: "blue"
  },
  {
    id: 'whistle',
    title: "Secure Whistleblowing",
    desc: "Anonymous drop-and-go submission option for those who wish to report without revealing their identity. Full encryption and protection guaranteed.",
    icon: shield,
    color: "red"
  },
  {
    id: 'track',
    title: "Real-Time Tracking",
    desc: "Monitor your complaint status from submission to resolution. Receive updates and notifications throughout the process.",
    icon: analytics,
    color: "blue"
  },
  {
    id: 'ai',
    title: "AI-Powered Guidance",
    desc: "RAG system provides personalized recommendations, answers FAQs, and suggests tailored next steps based on your situation.",
    icon: people,
    color: "blue"
  },
  {
    id: 'privacy',
    title: "Data Privacy & Security",
    desc: "Enterprise-grade security with role-based access control. Your data is encrypted and protected at all times.",
    icon: lock,
    color: "red"
  }
];
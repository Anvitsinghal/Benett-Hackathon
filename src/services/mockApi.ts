
import { Scheme } from "@/components/SchemeCard";
import { UserProfile } from "@/components/ProfileForm";

// Sample scheme data
const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year for farmer families',
    eligibilityReason: 'Based on your income and occupation status, you qualify for farmer assistance',
    category: 'income'
  },
  {
    id: 'pmjay',
    name: 'Ayushman Bharat (PMJAY)',
    description: 'Health insurance coverage of ₹5 lakh per family per year',
    eligibilityReason: 'Your family income is below the threshold for this health scheme',
    category: 'income'
  },
  {
    id: 'sukanya',
    name: 'Sukanya Samriddhi Yojana',
    description: 'Savings scheme for girl child with higher interest rate and tax benefits',
    eligibilityReason: 'Available for daughters under 10 years in your family',
    category: 'gender'
  },
  {
    id: 'ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana',
    description: 'LPG connections to women from BPL households',
    eligibilityReason: 'Based on your gender and income category',
    category: 'gender'
  },
  {
    id: 'sc-scholarship',
    name: 'Post-Matric Scholarship for SC Students',
    description: 'Financial assistance for SC students pursuing post-matric education',
    eligibilityReason: 'Based on your caste category and educational status',
    category: 'caste'
  },
  {
    id: 'st-scholarship',
    name: 'Top Class Education for ST Students',
    description: 'Scholarship for ST students in premier institutions',
    eligibilityReason: 'Your tribal status makes you eligible for educational support',
    category: 'caste'
  },
  {
    id: 'pmay',
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing subsidy for affordable housing for urban/rural poor',
    eligibilityReason: 'Based on your income and housing status',
    category: 'housing'
  },
  {
    id: 'nsap',
    name: 'National Social Assistance Program',
    description: 'Pension scheme for elderly, widows, and disabled persons',
    eligibilityReason: 'Based on your age and marital status',
    category: 'age'
  },
  {
    id: 'pmfby',
    name: 'PM Fasal Bima Yojana',
    description: 'Crop insurance for farmers against non-preventable risks',
    eligibilityReason: 'Available to all farmers growing notified crops',
    category: 'agriculture'
  },
  {
    id: 'pmjdy',
    name: 'Pradhan Mantri Jan Dhan Yojana',
    description: 'Financial inclusion program with zero-balance bank accounts',
    eligibilityReason: 'Available to all unbanked Indian citizens',
    category: 'income'
  },
  {
    id: 'pmjjby',
    name: 'PM Jeevan Jyoti Bima Yojana',
    description: 'Life insurance cover of ₹2 lakh at just ₹330 per year',
    eligibilityReason: 'Based on your age being between 18-50 years',
    category: 'age'
  },
  {
    id: 'pmegp',
    name: 'PM Employment Generation Program',
    description: 'Credit-linked subsidy for setting up micro enterprises',
    eligibilityReason: 'Based on your entrepreneurial interests and eligibility',
    category: 'income'
  },
  {
    id: 'scholarship-minority',
    name: 'Pre & Post Matric Scholarship for Minorities',
    description: 'Financial support for minority community students',
    eligibilityReason: 'Based on your religious minority status',
    category: 'education'
  },
  {
    id: 'skill-india',
    name: 'Skill India Mission (PMKVY)',
    description: 'Free skill development training with certification',
    eligibilityReason: 'Available for all citizens seeking skill improvement',
    category: 'education'
  }
];

// Mock delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockGetEligibleSchemes = async (): Promise<Scheme[]> => {
  // Simulate API delay
  await delay(1500);
  
  // In a real app, we would filter based on user profile
  // For now, we'll return all schemes
  return schemes;
};

export const mockGetSchemeById = async (id: string): Promise<Scheme> => {
  await delay(800);
  
  const scheme = schemes.find(s => s.id === id);
  if (!scheme) {
    throw new Error(`Scheme with ID ${id} not found`);
  }
  
  return scheme;
};

// Sample chatbot responses for scheme assistance
const schemeResponses: Record<string, string[]> = {
  'pm-kisan': [
    "To proceed with your PM Kisan application, I need to verify a few details. Can you confirm if you own agricultural land?",
    "Thank you. I see from your profile that your Aadhaar is linked. For PM Kisan, we'll need to verify your land records. Would you like me to check with the land registry using your Aadhaar number?",
    "Great! I've initialized the verification process. While that's processing, let me fill out the basic details in the form. Your name, age, and address have been auto-filled from your profile. The form also requires your bank account details for direct benefit transfer. Would you like to add that now?",
    "Perfect. I've added your bank details to the form. The land verification is complete, and I've attached the digital verification to your application. Your PM Kisan application is now ready for submission. Would you like me to submit it on your behalf?",
    "Your application has been successfully submitted! You will receive an SMS confirmation shortly. Your application reference number is PMKIS-2023-78542. You can track your application status using this number. Is there anything else you'd like help with?"
  ],
  'pmjay': [
    "To proceed with your Ayushman Bharat application, I need to confirm a few details first. Your profile shows your family income is below ₹2.5 lakh per annum. Is this correct?",
    "Thank you for confirming. For Ayushman Bharat, we need to verify your family composition. Based on your profile, I see you have 4 family members. Can you confirm if this is accurate?",
    "Perfect. I'm filling out the application form with your Aadhaar details. This health insurance will cover all pre-existing diseases from day one and will apply to your entire family. Would you like me to include any specific medical conditions in the application?",
    "I've noted the medical conditions. Your application form is now complete. Before submitting, I need your consent to share your Aadhaar data with the PMJAY authority. Do you consent to this?",
    "Thank you. Your Ayushman Bharat application has been successfully submitted! You should receive your e-card within 7 working days via SMS. Your application reference number is PMJAY-2023-45678. Is there anything else you need help with?"
  ]
};

// Default responses for other schemes
const defaultSchemeResponses = [
  "To start your application, I need to verify some details from your profile. Is that okay?",
  "Thank you. I've reviewed your profile information. Based on the details, I can confirm you're eligible for this scheme. I'm now filling out the application form with your information.",
  "I've completed most of the form with information from your profile. There are a few additional questions specific to this scheme. Do you have time to answer them now?",
  "Great! I've incorporated your responses into the application. The form is now complete and ready for submission. Would you like me to submit it on your behalf?",
  "Your application has been successfully submitted! You'll receive a confirmation soon, and your application will be processed within 7-10 working days. Your reference number is SCHEME-2023-12345. Is there anything else you need help with?"
];

let schemeMessageCounter: Record<string, number> = {};

export const mockSendSchemeMessage = async (message: string, schemeId?: string): Promise<string> => {
  await delay(1000);
  
  // Initialize counter for this scheme if it doesn't exist
  if (schemeId && !schemeMessageCounter[schemeId]) {
    schemeMessageCounter[schemeId] = 0;
  }
  
  let response = "I'm here to help with your scheme application. What would you like to know?";
  
  if (schemeId) {
    // Get responses for this scheme or use default
    const responses = schemeResponses[schemeId] || defaultSchemeResponses;
    
    // Get the next response
    response = responses[schemeMessageCounter[schemeId] % responses.length];
    
    // Increment counter
    schemeMessageCounter[schemeId]++;
  }
  
  return response;
};

// Sample complaint responses
const complaintResponses = [
  "I understand you're facing an issue. Can you please provide more details about the problem you're experiencing? When did it start, and what specific service or scheme is involved?",
  "Thank you for providing those details. I'm documenting your complaint. To ensure it's directed to the correct department, could you please specify your location (district and state)?",
  "I've recorded your complaint with all the details you've provided. Before I submit it, is there any additional information or evidence you'd like to add, such as photos or specific dates of incidents?",
  "Your complaint has been formatted and is ready to be submitted. Here's a summary:\n\nNature of complaint: [Extracted from user message]\nLocation: [User's location]\nRelevant scheme: [Identified scheme]\nDetails: [Summarized complaint]\n\nShould I proceed with submitting this complaint?",
  "Your complaint has been successfully submitted to the relevant department. Your complaint reference number is COMP-2023-98765. You will receive updates on the status of your complaint via SMS. Is there anything else you'd like assistance with today?"
];

let complaintMessageCounter = 0;

export const mockSendComplaintMessage = async (message: string): Promise<string> => {
  await delay(1000);
  
  // Get the next response
  const response = complaintResponses[complaintMessageCounter % complaintResponses.length];
  
  // Increment counter
  complaintMessageCounter++;
  
  return response;
};

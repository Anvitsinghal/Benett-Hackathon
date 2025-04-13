import { create } from 'zustand';

interface Translation {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageState {
  currentLanguage: string;
  translations: Translation;
  setLanguage: (language: string) => void;
  setTranslations: (translations: Translation) => void;
  translate: (key: string) => string;
}

// Initial translations for multiple languages
const initialTranslations: Translation = {
  en: {
    'hero.title': 'Empowering Rural India with AI',
    'hero.subtitle': 'AI-powered solution for accessing government schemes',
    'features.easyAccess.title': 'Easy Access',
    'features.easyAccess.description': 'Find and access government schemes tailored to your profile with our AI assistance.',
    'features.smartRecommendations.title': 'Smart Recommendations',
    'features.smartRecommendations.description': 'Get personalized scheme recommendations based on your eligibility criteria.',
    'features.guidedSupport.title': 'Guided Support',
    'features.guidedSupport.description': 'Step-by-step guidance for scheme applications and documentation.',
    'nav.signin': 'Sign In',
    'nav.getStarted': 'Get Started',
  },
  hi: {
    'hero.title': 'एआई के साथ ग्रामीण भारत को सशक्त बनाना',
    'hero.subtitle': 'सरकारी योजनाओं तक पहुंच के लिए एआई-संचालित समाधान',
    'features.easyAccess.title': 'आसान पहुंच',
    'features.easyAccess.description': 'हमारी एआई सहायता से अपनी प्रोफ़ाइल के अनुरूप सरकारी योजनाएं खोजें और एक्सेस करें।',
    'features.smartRecommendations.title': 'स्मार्ट सिफारिशें',
    'features.smartRecommendations.description': 'अपनी पात्रता मानदंडों के आधार पर व्यक्तिगत योजना सिफारिशें प्राप्त करें।',
    'features.guidedSupport.title': 'मार्गदर्शित सहायता',
    'features.guidedSupport.description': 'योजना आवेदन और दस्तावेज़ीकरण के लिए चरण-दर-चरण मार्गदर्शन।',
    'nav.signin': 'साइन इन करें',
    'nav.getStarted': 'शुरू करें',
  },
  bn: {
    'hero.title': 'এআই দিয়ে গ্রামীণ ভারতকে ক্ষমতায়ন',
    'hero.subtitle': 'সরকারি প্রকল্পগুলি অ্যাক্সেস করার জন্য এআই-চালিত সমাধান',
    'features.easyAccess.title': 'সহজ অ্যাক্সেস',
    'features.easyAccess.description': 'আমাদের এআই সহায়তার সাথে আপনার প্রোফাইলের জন্য নির্ধারিত সরকারি প্রকল্পগুলি খুঁজুন এবং অ্যাক্সেস করুন।',
    'features.smartRecommendations.title': 'স্মার্ট সুপারিশ',
    'features.smartRecommendations.description': 'আপনার যোগ্যতার মানদণ্ডের উপর ভিত্তি করে ব্যক্তিগতকৃত প্রকল্পের সুপারিশ পান।',
    'features.guidedSupport.title': 'নির্দেশিত সহায়তা',
    'features.guidedSupport.description': 'প্রকল্প আবেদন এবং ডকুমেন্টেশনের জন্য ধাপে ধাপে গাইডেন্স।',
    'nav.signin': 'সাইন ইন',
    'nav.getStarted': 'শুরু করুন',
  },
  ta: {
    'hero.title': 'AI மூலம் கிராமப்புற இந்தியாவை மேம்படுத்துதல்',
    'hero.subtitle': 'அரசு திட்டங்களை அணுகுவதற்கான AI-இயக்கப்படும் தீர்வு',
    'features.easyAccess.title': 'எளிதான அணுகல்',
    'features.easyAccess.description': 'எங்கள் AI உதவியுடன் உங்கள் சுயவிவரத்திற்கு ஏற்ற அரசு திட்டங்களைக் கண்டறிந்து அணுகவும்.',
    'features.smartRecommendations.title': 'ஸ்மார்ட் பரிந்துரைகள்',
    'features.smartRecommendations.description': 'உங்கள் தகுதி அளவுகோல்களின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட திட்ட பரிந்துரைகளைப் பெறுங்கள்.',
    'features.guidedSupport.title': 'வழிகாட்டப்பட்ட ஆதரவு',
    'features.guidedSupport.description': 'திட்ட விண்ணப்பம் மற்றும் ஆவணப்படுத்துதலுக்கான படிப்படியான வழிகாட்டுதல்.',
    'nav.signin': 'உள்நுழைக',
    'nav.getStarted': 'தொடங்குங்கள்',
  },
  te: {
    'hero.title': 'AI తో గ్రామీణ భారతదేశాన్ని సాధికారం చేయడం',
    'hero.subtitle': 'ప్రభుత్వ పథకాలను యాక్సెస్ చేయడానికి AI-ఆధారిత పరిష్కారం',
    'features.easyAccess.title': 'సులభమైన ప్రాప్యత',
    'features.easyAccess.description': 'మా AI సహాయంతో మీ ప్రొఫైల్‌కు అనుగుణంగా ప్రభుత్వ పథకాలను కనుగొని యాక్సెస్ చేయండి.',
    'features.smartRecommendations.title': 'స్మార్ట్ సిఫార్సులు',
    'features.smartRecommendations.description': 'మీ అర్హత ప్రమాణాల ఆధారంగా వ్యక్తిగతీకరించిన పథకం సిఫార్సులను పొందండి.',
    'features.guidedSupport.title': 'మార్గనిర్దేశిత మద్దతు',
    'features.guidedSupport.description': 'పథకం దరఖాస్తు మరియు పత్రీకరణ కోసం అడుగడుగునా మార్గదర్శకత్వం.',
    'nav.signin': 'సైన్ ఇన్',
    'nav.getStarted': 'ప్రారంభించండి',
  }
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: 'en',
  translations: initialTranslations,
  setLanguage: (language: string) => set({ currentLanguage: language }),
  setTranslations: (translations: Translation) => set({ translations }),
  translate: (key: string) => {
    const state = get();
    return state.translations[state.currentLanguage]?.[key] || state.translations['en']?.[key] || key;
  },
})); 
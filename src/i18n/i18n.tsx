import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  // App Core
  appTitle: {
    en: 'EVA Suite',
    fr: 'Suite EVA',
  },
  navProducts: {
    en: 'Products',
    fr: 'Produits',
  },
  navAbout: {
    en: 'About',
    fr: 'À Propos',
  },
  navLanguage: {
    en: 'Language',
    fr: 'Langue',
  },
  heroTagline: {
    en: 'Personal lab – Dec 24, 2025 demo',
    fr: 'Labo personnel – Démo 24 déc 2025',
  },
  
  // App Navigation (legacy keys for compatibility)
  'nav.products': {
    en: 'Products',
    fr: 'Produits',
  },
  'nav.switchLang': {
    en: 'Switch to French',
    fr: 'Passer en anglais',
  },
  
  // Home Page
  'home.vision.title': {
    en: 'The EVA Suite: A Visionary\'s Personal Project',
    fr: 'La Suite EVA : Un Projet Personnel Visionnaire',
  },
  'home.dashboard.title': {
    en: 'EVA Suite Dashboard',
    fr: 'Tableau de Bord EVA Suite',
  },
  'home.dashboard.subtitle': {
    en: 'Enterprise AI Platform - Development Status & Progress Tracking',
    fr: 'Plateforme IA d\'Entreprise - État de Développement et Suivi des Progrès',
  },
  'home.products.title': {
    en: 'EVA Suite Product Lineup',
    fr: 'Gamme de Produits EVA Suite',
  },
  'home.products.intro': {
    en: 'Every EVA product works 3 ways: Traditional UI clicks, Chat with keyboard, or Voice commands.',
    fr: 'Chaque produit EVA fonctionne de 3 façons : Clics UI traditionnels, Chat au clavier, ou Commandes vocales.',
  },
  'home.demo.badge': {
    en: 'Demo',
    fr: 'Démo',
  },
  
  // Product Card
  'product.description': {
    en: 'Description',
    fr: 'Description',
  },
  'product.useCase': {
    en: 'Use Case',
    fr: 'Cas d\'Usage',
  },
  'product.example': {
    en: 'Example:',
    fr: 'Exemple :',
  },
  'product.theArt': {
    en: 'The Art:',
    fr: 'L\'Art :',
  },
  
  // Product Page
  'productPage.back': {
    en: 'Back to all products',
    fr: 'Retour aux produits',
  },
  'productPage.overview': {
    en: 'Overview',
    fr: 'Aperçu',
  },
  'productPage.sampleUseCase': {
    en: 'Sample use case',
    fr: 'Exemple de cas d\'usage',
  },
  'productPage.moonshot': {
    en: 'Moonshot vision',
    fr: 'Vision ambitieuse',
  },
  
  // Footer
  'footer.builtWith': {
    en: 'Built with ChatGPT + Copilot',
    fr: 'Créé avec ChatGPT + Copilot',
  },
};

interface I18nContextType {
  language: Language;
  lang: Language;  // Alias for language
  setLanguage: (lang: Language) => void;
  setLang: (lang: Language) => void;  // Alias for setLanguage
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <I18nContext.Provider value={{ 
      language, 
      lang: language,
      setLanguage, 
      setLang: setLanguage,
      toggleLanguage,
      t 
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

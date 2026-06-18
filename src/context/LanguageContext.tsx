"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "vi" | "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    "common.home": "Trang chủ",
    "common.services": "Dịch vụ",
    "common.branches": "Chi nhánh",
    "common.promotions": "Khuyến mãi",
    "common.about": "Về chúng tôi",
    "common.membership": "Chương trình thành viên",
    "common.contact": "Liên hệ",
    "common.bookNow": "Đặt lịch ngay",
    "common.login": "Đăng nhập",
    "common.register": "Đăng ký",
    "footer.company": "CÔNG TY",
    "footer.explore": "KHÁM PHÁ",
    "footer.info": "THÔNG TIN",
    "footer.newsletter": "BẢN TIN",
    "footer.subscribeNewsletter": "Nhận tin tức spa hàng tuần",
  },
  en: {
    "common.home": "Home",
    "common.services": "Services",
    "common.branches": "Branches",
    "common.promotions": "Promotions",
    "common.about": "About Us",
    "common.membership": "Membership",
    "common.contact": "Contact",
    "common.bookNow": "Book Now",
    "common.login": "Login",
    "common.register": "Register",
    "footer.company": "COMPANY",
    "footer.explore": "EXPLORE",
    "footer.info": "INFORMATION",
    "footer.newsletter": "NEWSLETTER",
    "footer.subscribeNewsletter": "Get weekly spa updates",
  },
  zh: {
    "common.home": "首页",
    "common.services": "服务",
    "common.branches": "分店",
    "common.promotions": "促销",
    "common.about": "关于我们",
    "common.membership": "会员计划",
    "common.contact": "联系",
    "common.bookNow": "立即预订",
    "common.login": "登录",
    "common.register": "注册",
    "footer.company": "公司",
    "footer.explore": "探索",
    "footer.info": "信息",
    "footer.newsletter": "新闻通讯",
    "footer.subscribeNewsletter": "获取每周spa更新",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language");
    
    if (saved === "vi" || saved === "en" || saved === "zh") {
      setLanguageState(saved as Language);
    }
    
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div style={{ visibility: mounted ? "visible" : "hidden", display: "contents" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
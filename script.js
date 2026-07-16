const hero = document.querySelector(".hero");
const ctas = document.querySelectorAll(".button, .nav-cta");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const languageButtons = Array.from(document.querySelectorAll("[data-lang-switch]"));
let currentLanguage = localStorage.getItem("tutorings-language") || "en";
let renderChoiceSlide = () => {};

const translations = {
  ar: {
    title: "توتورنق | صفحة الهبوط",
    selectors: {
      ".brand-name": "Tutorings",
      ".nav-cta": "ابدأ التعلم",
      ".hero h1": "أتقن الإنجليزية<br /><span class=\"hero-title-emphasis\">بثقة.</span>",
      ".hero-copy p": "تجمع توتورنق ممارستك المتفرقة للإنجليزية في مسار واضح يشمل الدورات، وتحضير IELTS، والمدربين الخصوصيين.",
      ".hero-actions .button-primary": "ابدأ التعلم",
      ".hero-actions .button-secondary": "احجز استشارة",
      ".trust-strip > span": "شركاء تعليميون موثوقون",
      ".section-label": "الطريقة الحالية",
      "#problem-title": "تعلّم الإنجليزية لا يجب<br />أن يكون بهذا التشتت.",
      ".solution-label": "الحل",
      "#solution-title": "توتورنق <span>تعالج ذلك.</span>",
      ".solution-content > p:last-child": "توتورنق معهد رائد لتعليم الإنجليزية في السعودية، يستبدل المصادر المتفرقة بخطة منظمة واحدة، ومدربين متخصصين، وتعلّم شخصي، وتقدم قابل للقياس، وبرامج مركزة للإنجليزية وIELTS.",
      ".roadmap-label": "كيف تعمل الرحلة",
      "#roadmap-title": "مسار واضح من تحديد المستوى إلى تقدم حقيقي.",
      ".roadmap-header > p:last-child": "ترشد توتورنق كل طالب عبر رحلة بسيطة: افهم مستواك، اختر البرنامج المناسب، قابل مدربك، واستمر في التحسن بتغذية راجعة واضحة.",
      ".choice-hub-label": "نقاط إثبات",
      "#choice-hub-title": "لماذا توتورنق",
      "#programs-title": "أتقن <span data-program-headline-word>الإنجليزية</span> من خلال برامج شاملة.",
      ".programs-header-cta": "استكشف البرامج",
      "#partner-proof-title": "موثوق، ومعترف به، ومدعوم من شركاء رائدين",
      ".stats-label": "أثر قابل للقياس",
      "#stats-title": "أرقام قبل قصص النجاح.",
      ".stats-header p:last-child": "تدعم توتورنق المتعلمين بمدربين مؤهلين، وبرامج منظمة، ومؤشرات تقدم واضحة.",
      ".stat-card:nth-child(1) h3": "طالب تم تدريبهم",
      ".stat-card:nth-child(1) p": "رقم موثق من إشارات الثقة لدى توتورنق.",
      ".stat-card:nth-child(2) h3": "مدربون مؤهلون",
      ".stat-card:nth-child(2) p": "مدربون بدوام كامل لدعم متعلمي الإنجليزية.",
      ".stat-card:nth-child(3) h3": "رضا الطلاب",
      ".stat-card:nth-child(3) p": "عنصر مؤقت حتى يتوفر رقم رضا موثق.",
      ".golden-trial-label": "الضمان الذهبي",
      "#golden-trial-title": "جرّب أول محاضرة مباشرة بثقة.",
      ".golden-trial-copy p:last-child": "إذا لم تكن راضيًا بعد أول محاضرة مباشرة، تقدم توتورنق استردادًا كاملًا للبرنامج الذي اخترته.",
      ".golden-trial-button": "احجز استشارة",
      ".testimonials-label": "قصص نجاح",
      "#testimonials-title": "طلاب حقيقيون. نتائج حقيقية.",
      "#faq-title": "الأسئلة الشائعة",
      ".final-cta-label": "جاهز للبدء؟",
      "#final-cta-title": "ابدأ إتقان الإنجليزية اليوم.",
      ".final-cta-content p": "اختبر مستواك، واعثر على البرنامج المناسب، وابدأ التعلم مع مدربين متخصصين.",
      ".final-cta-button": "ابدأ التعلم",
      "#footer-title": "Tutorings",
      ".footer-brand-block p": "تلتزم توتورنق بتقديم تجربة تعلم إنجليزية شخصية باهتمام فردي لكل طالب.",
      ".footer-column:nth-child(2) h3": "الصفحات",
      ".footer-column:nth-child(3) h3": "البرامج",
      ".footer-column:nth-child(4) h3": "التواصل",
      ".footer-column:nth-child(4) > a:nth-of-type(3)": "الشراكات",
      ".footer-bottom p": "جميع الحقوق محفوظة @ 2024 توتورنق."
    },
    all: {
      ".experience-card.card-review:nth-of-type(1) strong, .hero-row-top .card-review strong": "حققت 7.5 في IELTS مع توتورنق.",
      ".hero-row-top .card-review small": "تحضير مركز، وتصحيح، واستراتيجية حقيقية للاختبار.",
      ".hero-row-middle .card-review strong": "انتقلت من المستوى 1 إلى المستوى 3.",
      ".hero-row-middle .card-review small": "ساعدني المسار المنظم على التحدث بثقة أكبر.",
      ".hero-row-bottom .card-review strong": "بدأت أخيرًا التحدث مع العملاء بالإنجليزية.",
      ".hero-row-bottom .card-review small": "جعلت الدروس الخاصة التحسن عمليًا وواضحًا.",
      ".program-guarantee-text": "الضمان الذهبي",
      ".object-book .object-title": "كتاب مفتوح",
      ".object-notebook .object-title": "دفتر ملاحظات",
      ".object-pdf .object-title": "PDF",
      ".object-flashcard .object-title": "مفردات",
      ".object-flashcard strong": "achieve",
      ".object-flashcard small": "فعل",
      ".object-sticky span": "مراجعة الأفعال الشاذة",
      ".object-headphones .object-title": "استماع",
      ".object-speech .object-title": "تدريب المحادثة",
      ".object-writing .object-title": "تصحيح الكتابة",
      ".object-writing .correction-mark": "إعادة صياغة",
      ".object-grammar .object-title": "قواعد",
      ".object-grammar .grammar-rule": "الماضي التام",
      ".object-dictionary .object-title": "قاموس",
      ".object-calendar .object-title": "اختبار تجريبي",
      ".object-calendar strong": "السبت 9:00",
      ".object-mobile .object-title": "تطبيق تعلم",
      ".object-video .object-title": "درس فيديو",
      ".object-ai .object-title": "مساعد الإجابات",
      ".object-reminder .object-title": "تذكير دراسة",
      ".program-card:nth-child(1) .program-title": "الإنجليزية العامة",
      ".program-card:nth-child(1) .program-description": "طوّر لغتك الإنجليزية من المبتدئ إلى المتقدم عبر مسار منظم مبني على CEFR.",
      ".program-card:nth-child(1) .program-button": "استكشف الإنجليزية العامة",
      ".program-card:nth-child(2) .program-title": "تحضير IELTS",
      ".program-card:nth-child(2) .program-description": "استعد لاختبار IELTS بدروس خاصة، وتدريب على المهارات الأربع، واستراتيجيات الاختبار.",
      ".program-card:nth-child(2) .program-button": "استكشف تحضير IELTS",
      ".program-card:nth-child(3) .program-title": "تحضير STEP",
      ".program-card:nth-child(3) .program-description": "ادرس محتوى STEP مركزًا مبنيًا على أنماط الاختبار الحقيقية وهدف واضح +90.",
      ".program-card:nth-child(3) .program-button": "استكشف تحضير STEP",
      ".testimonial-rating": "★★★★★",
      ".testimonial-card:nth-child(1) .testimonial-name, .testimonial-card:nth-child(5) .testimonial-name": "محمد التركي",
      ".testimonial-card:nth-child(2) .testimonial-name, .testimonial-card:nth-child(6) .testimonial-name": "ياسر القحطاني",
      ".testimonial-card:nth-child(3) .testimonial-name, .testimonial-card:nth-child(7) .testimonial-name": "رناد الغامدي",
      ".testimonial-card:nth-child(4) .testimonial-name, .testimonial-card:nth-child(8) .testimonial-name": "فيصل العتيبي"
    },
    lists: {
      ".program-card:nth-child(1) .program-benefits li": ["مسار مستويات من A0 إلى C1", "دروس خاصة 1-1", "مدرب ثابت طوال المستوى", "تقارير تقدم وشهادة", "دخول إلى Cambridge One"],
      ".program-card:nth-child(2) .program-benefits li": ["برنامج تحضير خلال 45 يومًا", "18 درسًا مباشرًا خاصًا", "قراءة وكتابة واستماع ومحادثة", "مدربون متخصصون في IELTS", "تدريب وواجبات وتصحيح"],
      ".program-card:nth-child(3) .program-benefits li": ["دورة STEP مركزة", "أنماط أسئلة STEP الحقيقية", "تدريب قواعد وقراءة واستماع", "وصول للمحتوى لمدة 75 يومًا", "مجتمع خاص للأسئلة"],
      ".roadmap-card": [
        ["01", "اختبار تحديد المستوى", "افهم مستواك الحالي في الإنجليزية قبل اختيار خطة التعلم.", "اختبر مستواك"],
        ["02", "اختر البرنامج", "اختر المسار المناسب لهدفك: الإنجليزية، IELTS، أو التدريب الخاص.", "استكشف البرامج"],
        ["03", "قابل مدربك", "تعلّم مع مدرب ثنائي اللغة يتابع تقدمك.", ""],
        ["04", "تابع تقدمك", "استمر في المسار مع التصحيح، والتقارير، والشهادات، والخطوات التالية.", ""]
      ],
      ".solution-card": [
        ["خطة منظمة", "ابدأ من مستواك وهدفك وجدولك حتى يكون لكل درس خطوة تالية واضحة."],
        ["مدربون متخصصون", "إرشاد خاص ثنائي اللغة مع مدرب ثابت يفهم أهدافك."],
        ["تقدم قابل للقياس", "تقارير وتصحيح وشهادات وخطوات تالية تجعل التحسن واضحًا."],
        ["تنوع البرامج", "مسارات CEFR للإنجليزية وتحضير IELTS المركز ضمن نظام واحد منظم."]
      ],
      ".faq-item": [
        ["هل يوجد مدربون ومدربات؟", "نعم. لدى توتورنق مدربون ومدربات محترفون من خلفيات مختلفة، ويتحدثون الإنجليزية والعربية بطلاقة لتسهيل التعلم."],
        ["هل سأدرس مع نفس المدرب طوال البرنامج؟", "نعم. تخصص توتورنق مدربًا ثابتًا خلال المستوى حتى يتابع تقدم الطالب ويفهم نقاط ضعفه."],
        ["هل يمكنني إيقاف البرنامج مؤقتًا إذا سافرت أو انشغلت؟", "نعم. يمكن للطلاب طلب تجميد البرنامج لمدة تصل إلى 14 يومًا عند إبلاغ الفريق مسبقًا."],
        ["هل يمكنني مشاهدة المحاضرة المباشرة لاحقًا؟", "نعم. تتوفر نسخة مسجلة في التطبيق بعد المحاضرة المباشرة حتى يتمكن الطلاب من مراجعتها لاحقًا."],
        ["لماذا البرنامج خاص؟", "لأن الدروس فردية ومخصصة حسب أهداف كل طالب ونقاط ضعفه وسرعته واحتياجاته التعليمية."],
        ["هل سأحصل على شهادة؟", "نعم. يحصل الطلاب على شهادة بعد إكمال المستوى واجتياز اختبار الانتقال."]
      ],
      ".footer-column:nth-child(2) a": ["الرئيسية", "التسجيل", "اختبار المستوى", "المدونة"],
      ".footer-column:nth-child(3) a": ["الإنجليزية العامة", "تحضير IELTS", "تحضير STEP", "المكتبة المجانية"],
      ".footer-legal a": ["الشروط والأحكام", "سياسة الخصوصية"],
      ".testimonial-card .testimonial-badge": ["الإنجليزية العامة", "IELTS", "خاص", "STEP", "الإنجليزية العامة", "IELTS", "خاص", "STEP"],
      ".testimonial-card .testimonial-score": ["IELTS 5.5 ← 7", "المستوى 1 ← المستوى 3", "STEP 92", "IELTS 5.5 ← 7", "المستوى 1 ← المستوى 3", "STEP 92"]
    },
    testimonials: [
      "أكملت الآن 3 أشهر في برنامج الإنجليزية العامة مع الأستاذ لؤي. في الشهر الأول لم أكن أعرف كيف أرتب الكلمات أو أتحدث بسرعة. لاحظت التحسن عندما بدأت أتحدث الإنجليزية مع عملائي الأجانب.",
      "انضممت إلى برنامج IELTS لأنني أردت دخول الاختبار للابتعاث. كان برنامجًا لمدة شهر، وكان تحديًا، لكنه أثمر فعلًا. حصلت على 7 من 9 في IELTS، وهي نتيجة أعلى من الحد الأدنى لأي فرصة أتقدم لها.",
      "أنا طالبة إدارة أعمال، وتعلمت الكثير مع توتورنق. درست 6 أشهر وانتقلت من المستوى 1 إلى المستوى 3. لاحظت أيضًا تحسنًا كبيرًا في التحدث مع زميلاتي، وهذا كان التحدي الأكبر لدي.",
      "كنت ضائعًا في STEP ولا أعرف من أين أبدأ. نظمت الدورة كل شيء لي. كانت الأسئلة مطابقة لنمط الاختبار. دخلت الاختبار بثقة وحصلت على 92."
    ]
  }
};

const englishCache = new Map();

const rememberEnglish = (element) => {
  if (!element) {
    return;
  }

  if (!englishCache.has(element)) {
    englishCache.set(element, element.innerHTML);
  }
};

const setHtml = (element, html) => {
  if (!element) {
    return;
  }

  rememberEnglish(element);
  element.innerHTML = html;
};

const applyLanguage = (language) => {
  currentLanguage = language;
  localStorage.setItem("tutorings-language", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("is-arabic", language === "ar");

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langSwitch === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (language === "en") {
    englishCache.forEach((html, element) => {
      element.innerHTML = html;
    });
    document.title = "Tutorings Landing Page";
    if (programHeadlineWord) {
      programHeadlineWord.textContent = "English";
    }
    renderChoiceSlide(undefined, { animate: false });
    return;
  }

  const dictionary = translations[language];
  document.title = dictionary.title;

  Object.entries(dictionary.selectors).forEach(([selector, html]) => {
    const element = document.querySelector(selector);
    if (element) {
      setHtml(element, html);
    }
  });

  Object.entries(dictionary.all).forEach(([selector, html]) => {
    document.querySelectorAll(selector).forEach((element) => setHtml(element, html));
  });

  Object.entries(dictionary.lists).forEach(([selector, values]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      const value = values[index];
      if (!value) {
        return;
      }

      if (selector === ".roadmap-card") {
        setHtml(element.querySelector(".roadmap-number"), value[0]);
        setHtml(element.querySelector("h3"), value[1]);
        setHtml(element.querySelector("p"), value[2]);
        const link = element.querySelector("a");
        if (link && value[3]) {
          setHtml(link, value[3]);
        }
        return;
      }

      if (selector === ".solution-card") {
        setHtml(element.querySelector("h3"), value[0]);
        setHtml(element.querySelector("p"), value[1]);
        return;
      }

      if (selector === ".faq-item") {
        setHtml(element.querySelector("summary"), value[0]);
        setHtml(element.querySelector("p"), value[1]);
        return;
      }

      setHtml(element, value);
    });
  });

  document.querySelectorAll(".testimonial-card").forEach((card, index) => {
    const quote = dictionary.testimonials[index % dictionary.testimonials.length];
    const quoteElement = card.querySelector(".testimonial-quote");
    if (quoteElement) {
      setHtml(quoteElement, quote);
    }
  });

  if (programHeadlineWord) {
    programHeadlineWord.textContent = "الإنجليزية";
  }

  renderChoiceSlide(undefined, { animate: false });
};

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang-switch]");

  if (!button) {
    return;
  }

  event.preventDefault();
  applyLanguage(button.dataset.langSwitch);
});

ctas.forEach((cta) => {
  cta.addEventListener("mouseenter", () => {
    hero?.classList.add("is-cta-hovered");
  });

  cta.addEventListener("mouseleave", () => {
    hero?.classList.remove("is-cta-hovered");
  });

  cta.addEventListener("focus", () => {
    hero?.classList.add("is-cta-hovered");
  });

  cta.addEventListener("blur", () => {
    hero?.classList.remove("is-cta-hovered");
  });
});

const roadmap = document.querySelector(".roadmap-section");
const roadmapList = document.querySelector(".roadmap-list");
const roadmapSteps = document.querySelectorAll(".roadmap-step");
const roadmapRibbonPath = document.querySelector(".roadmap-ribbon-path");
const programCards = Array.from(document.querySelectorAll(".program-card"));
const programHeadlineWord = document.querySelector("[data-program-headline-word]");
const problemSection = document.querySelector(".problem-panel");
const problemObjects = Array.from(document.querySelectorAll(".learning-object"));
const choiceHubSection = document.querySelector(".choice-hub-section");
const choicePanel = document.querySelector(".choice-hub-panel");
const choiceCopy = document.querySelector(".choice-copy");
const choiceNumber = document.querySelector("[data-choice-slide-number]");
const choiceTitle = document.querySelector("[data-choice-slide-title]");
const choiceDescription = document.querySelector("[data-choice-slide-description]");
const choiceVisual = document.querySelector("[data-choice-visual]");
const choicePagination = document.querySelector("[data-choice-pagination]");
const choicePrev = document.querySelector("[data-choice-prev]");
const choiceNext = document.querySelector("[data-choice-next]");

const choiceSlides = [
  {
    theme: "students",
    target: 200,
    suffix: "+",
    image: "https://englishtests.ca/wp-content/uploads/2023/01/CD-IELTS-test-takers-headphones-opt-1536x1025.jpg.webp",
    en: {
      title: "Students Trained",
      description: "Structured English learning for students with different goals and levels.",
      visual: ["A0", "IELTS", "C1"],
    },
    ar: {
      title: "طالب تم تدريبهم",
      description: "تعلم إنجليزي منظم لطلاب لديهم أهداف ومستويات مختلفة.",
      visual: ["A0", "IELTS", "C1"],
    },
  },
  {
    theme: "teachers",
    target: 50,
    suffix: "+",
    image: "./assets/qualified-teachers-ielts.jpg",
    en: {
      title: "Qualified Teachers",
      description: "A growing team of teachers supporting private English learners.",
      visual: ["CEFR", "Live", "Coach"],
    },
    ar: {
      title: "مدربون مؤهلون",
      description: "فريق متنامٍ من المدربين لدعم متعلمي الإنجليزية بدروس خاصة.",
      visual: ["CEFR", "مباشر", "مدرب"],
    },
  },
  {
    theme: "private",
    target: 1,
    suffix: ":1",
    image: "https://extousintlservices.wordpress.com/wp-content/uploads/2025/04/25-educational-websites-you-didnt-know-could-change-your-learning-game-number-11-will-shock-you-2.-coursera.webp",
    en: {
      title: "Private Lessons",
      description: "Personal attention with lessons built around the student, not the group.",
      visual: ["Tutor", "Plan", "You"],
    },
    ar: {
      title: "دروس خاصة",
      description: "اهتمام فردي بدروس مبنية حول الطالب، وليس المجموعة.",
      visual: ["مدرب", "خطة", "أنت"],
    },
  },
  {
    theme: "guarantee",
    target: 1,
    suffix: "st",
    logo: "https://tutorings.sa/wp-content/uploads/2024/09/Artboard-124@4x-8-3.webp",
    en: {
      title: "Golden Guarantee",
      description: "Try the first live session with Golden Guarantee confidence.",
      visual: ["Trial", "Gold", "OK"],
    },
    ar: {
      title: "الضمان الذهبي",
      description: "جرّب أول محاضرة مباشرة بثقة الضمان الذهبي.",
      visual: ["تجربة", "ذهبي", "OK"],
    },
  },
];

let choiceIndex = 0;
let choiceAnimationFrame = 0;
let choiceTouchStartX = null;
let choiceTouchStartY = null;

const getChoiceLocale = (slide) => slide[currentLanguage] || slide.en;
const formatChoiceNumber = (value, suffix) => `${value.toLocaleString()}${suffix}`;

const animateChoiceNumber = (slide) => {
  if (!choiceNumber) return;
  window.cancelAnimationFrame(choiceAnimationFrame);
  if (reduceMotion.matches) {
    choiceNumber.textContent = formatChoiceNumber(slide.target, slide.suffix);
    return;
  }
  const duration = 1700;
  const startTime = performance.now();
  const tick = (time) => {
    const progress = Math.min(1, (time - startTime) / duration);
    const value = Math.round(slide.target * (1 - Math.pow(1 - progress, 3)));
    choiceNumber.textContent = formatChoiceNumber(value, slide.suffix);
    if (progress < 1) choiceAnimationFrame = window.requestAnimationFrame(tick);
  };
  choiceNumber.textContent = formatChoiceNumber(0, slide.suffix);
  choiceAnimationFrame = window.requestAnimationFrame(tick);
};

const buildChoiceVisual = (slide) => {
  const media = slide.image
    ? `<img class="choice-visual-image" src="${slide.image}" alt="" loading="lazy" />`
    : slide.logo
      ? `<span class="choice-visual-logo"><img src="${slide.logo}" alt="" loading="lazy" /></span>`
      : `<span class="choice-visual-placeholder" aria-hidden="true"></span>`;

  return `
    <div class="choice-visual-stage choice-visual-${slide.theme} is-entering" aria-hidden="true">
      ${media}
    </div>`;
};

renderChoiceSlide = (nextIndex = choiceIndex, options = {}) => {
  if (!choiceHubSection || !choiceNumber || !choiceTitle || !choiceDescription || !choiceVisual) return;
  const slideCount = choiceSlides.length;
  const requestedIndex = Number.isFinite(nextIndex) ? nextIndex : choiceIndex;
  choiceIndex = ((requestedIndex % slideCount) + slideCount) % slideCount;
  const slide = choiceSlides[choiceIndex];
  const locale = getChoiceLocale(slide);
  choiceHubSection.dataset.choiceTheme = slide.theme;
  choiceTitle.textContent = locale.title;
  choiceDescription.textContent = locale.description;
  animateChoiceNumber(slide);
  if (choicePagination) {
    Array.from(choicePagination.children).forEach((dot, index) => {
      const isActive = index === choiceIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }
  if (options.animate !== false) {
    choiceCopy?.classList.remove("is-changing");
    void choiceCopy?.offsetWidth;
    choiceCopy?.classList.add("is-changing");
  }
  const previousVisual = choiceVisual.querySelector(".choice-visual-stage");
  choiceVisual.insertAdjacentHTML("beforeend", buildChoiceVisual(slide));
  const nextVisual = choiceVisual.lastElementChild;
  window.requestAnimationFrame(() => {
    nextVisual?.classList.remove("is-entering");
    previousVisual?.classList.add("is-exiting");
  });
  window.setTimeout(() => previousVisual?.remove(), reduceMotion.matches ? 0 : 680);
};

if (choiceHubSection && choicePagination) {
  choiceSlides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "choice-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${slide.en.title}`);
    dot.addEventListener("click", () => renderChoiceSlide(index));
    choicePagination.append(dot);
  });
  choicePrev?.addEventListener("click", () => renderChoiceSlide(choiceIndex - 1));
  choiceNext?.addEventListener("click", () => renderChoiceSlide(choiceIndex + 1));
  choicePanel?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderChoiceSlide(choiceIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      renderChoiceSlide(choiceIndex + 1);
    }
  });
  choicePanel?.addEventListener("touchstart", (event) => {
    choiceTouchStartX = event.touches[0]?.clientX ?? null;
    choiceTouchStartY = event.touches[0]?.clientY ?? null;
  }, { passive: true });
  choicePanel?.addEventListener("touchend", (event) => {
    if (choiceTouchStartX === null || choiceTouchStartY === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? choiceTouchStartX;
    const touchEndY = event.changedTouches[0]?.clientY ?? choiceTouchStartY;
    const deltaX = touchEndX - choiceTouchStartX;
    const deltaY = touchEndY - choiceTouchStartY;
    const primaryDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
    choiceTouchStartX = null;
    choiceTouchStartY = null;
    if (Math.abs(primaryDelta) < 42) return;
    renderChoiceSlide(primaryDelta < 0 ? choiceIndex + 1 : choiceIndex - 1);
  }, { passive: true });
  renderChoiceSlide(0, { animate: false });
}

if (problemSection && problemObjects.length > 0) {
  const edgePadding = 10;
  const pointerRadius = 96;
  const objects = [];
  let bounds = problemSection.getBoundingClientRect();
  let pointer = null;
  let lastTime = performance.now();
  let headlineBounds = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const updateHeadlineBounds = () => {
    const content = problemSection.querySelector(".problem-content");

    if (!content) {
      headlineBounds = null;
      return;
    }

    const rect = content.getBoundingClientRect();
    headlineBounds = {
      left: rect.left - bounds.left - 34,
      right: rect.right - bounds.left + 34,
      top: rect.top - bounds.top - 28,
      bottom: rect.bottom - bounds.top + 28,
      centerX: rect.left - bounds.left + rect.width / 2,
      centerY: rect.top - bounds.top + rect.height / 2,
    };
  };

  const getRotation = (element) => {
    const rawRotation = getComputedStyle(element).getPropertyValue("--rotate").trim();
    const parsedRotation = Number.parseFloat(rawRotation);
    return Number.isFinite(parsedRotation) ? parsedRotation : 0;
  };

  const measureProblemObjects = () => {
    bounds = problemSection.getBoundingClientRect();
    updateHeadlineBounds();

    if (objects.length > 0) {
      objects.forEach((object) => {
        const rect = object.element.getBoundingClientRect();
        object.width = rect.width;
        object.height = rect.height;
        object.x = clamp(object.x, edgePadding, Math.max(edgePadding, bounds.width - object.width - edgePadding));
        object.y = clamp(object.y, edgePadding, Math.max(edgePadding, bounds.height - object.height - edgePadding));
      });
      return;
    }

    objects.length = 0;

    problemObjects.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const maxX = Math.max(edgePadding, bounds.width - rect.width - edgePadding);
      const maxY = Math.max(edgePadding, bounds.height - rect.height - edgePadding);
      const x = clamp(rect.left - bounds.left, edgePadding, maxX);
      const y = clamp(rect.top - bounds.top, edgePadding, maxY);
      const direction = index % 2 === 0 ? 1 : -1;

      element.style.left = "0";
      element.style.top = "0";
      element.style.right = "auto";
      element.style.bottom = "auto";
      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${getRotation(element)}deg)`;

      objects.push({
        element,
        x,
        y,
        vx: 0,
        vy: 0,
        width: rect.width,
        height: rect.height,
        rotation: getRotation(element),
        baseRotation: getRotation(element),
        vr: 0,
      });
    });
  };

  const pushObjectFromPointer = (object, event, strength = 0.72) => {
    bounds = problemSection.getBoundingClientRect();

    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;
    const dx = centerX - pointerX;
    const dy = centerY - pointerY;
    const distance = Math.max(1, Math.hypot(dx, dy));

    object.vx += (dx / distance) * strength;
    object.vy += (dy / distance) * strength;
    object.vr += (dx / distance) * strength * 0.012;
  };

  const setPointer = (event) => {
    bounds = problemSection.getBoundingClientRect();
    pointer = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  const clearPointer = () => {
    pointer = null;
  };

  const animateProblemObjects = (time) => {
    const delta = Math.min(32, time - lastTime);
    lastTime = time;
    bounds = problemSection.getBoundingClientRect();
    updateHeadlineBounds();

    objects.forEach((object) => {
      const centerX = object.x + object.width / 2;
      const centerY = object.y + object.height / 2;

      if (pointer) {
        const dx = centerX - pointer.x;
        const dy = centerY - pointer.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const reach = pointerRadius + Math.max(object.width, object.height) * 0.45;

        if (distance < reach) {
          const force = (1 - distance / reach) * 0.12;
          object.vx += (dx / distance) * force;
          object.vy += (dy / distance) * force;
          object.vr += (dx / distance) * force * 0.006;
        }
      }

      if (
        headlineBounds &&
        centerX > headlineBounds.left &&
        centerX < headlineBounds.right &&
        centerY > headlineBounds.top &&
        centerY < headlineBounds.bottom
      ) {
        const dx = centerX - headlineBounds.centerX;
        const dy = centerY - headlineBounds.centerY;
        const distance = Math.max(1, Math.hypot(dx, dy));
        object.vx += (dx / distance) * 0.035;
        object.vy += (dy / distance) * 0.035;
      }

      object.x += object.vx * delta;
      object.y += object.vy * delta;
      object.rotation += object.vr * delta;

      const maxX = Math.max(edgePadding, bounds.width - object.width - edgePadding);
      const maxY = Math.max(edgePadding, bounds.height - object.height - edgePadding);

      if (object.x <= edgePadding || object.x >= maxX) {
        object.x = clamp(object.x, edgePadding, maxX);
        object.vx *= -0.86;
      }

      if (object.y <= edgePadding || object.y >= maxY) {
        object.y = clamp(object.y, edgePadding, maxY);
        object.vy *= -0.86;
      }

      object.vx = clamp(object.vx * 0.88, -0.85, 0.85);
      object.vy = clamp(object.vy * 0.88, -0.85, 0.85);
      object.vr = clamp(object.vr * 0.86, -0.025, 0.025);
      object.rotation += (object.baseRotation - object.rotation) * 0.025;

      object.element.style.transform = `translate3d(${object.x}px, ${object.y}px, 0) rotate(${object.rotation}deg)`;
      object.element.style.left = "0";
      object.element.style.top = "0";
    });

    window.requestAnimationFrame(animateProblemObjects);
  };

  measureProblemObjects();
  objects.forEach((object) => {
    object.element.addEventListener("pointerenter", (event) => {
      pushObjectFromPointer(object, event);
    });

    object.element.addEventListener("pointermove", (event) => {
      pushObjectFromPointer(object, event, 0.18);
    });
  });
  window.requestAnimationFrame(animateProblemObjects);
  problemSection.addEventListener("pointermove", setPointer);
  problemSection.addEventListener("pointerleave", clearPointer);
  window.addEventListener("resize", measureProblemObjects);
}

if (roadmap && roadmapList && roadmapSteps.length > 0) {
  let roadmapRibbonLength = 0;

  const measureRoadmapRibbon = () => {
    if (!roadmapRibbonPath) {
      return;
    }

    roadmapRibbonLength = roadmapRibbonPath.getTotalLength();
    roadmap.style.setProperty("--ribbon-length", roadmapRibbonLength);
    roadmap.style.setProperty("--ribbon-offset", roadmapRibbonLength);
  };

  const setRoadmapProgress = () => {
    const rect = roadmapList.getBoundingClientRect();
    const viewportAnchor = window.innerHeight * 0.58;
    const progress = (viewportAnchor - rect.top) / rect.height;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    roadmap.style.setProperty("--roadmap-progress", `${clampedProgress * 100}%`);

    if (roadmapRibbonLength > 0) {
      roadmap.style.setProperty("--ribbon-offset", roadmapRibbonLength * (1 - clampedProgress));
    }
  };

  const setActiveStep = () => {
    let activeStep = roadmapSteps[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    roadmapSteps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      const stepCenter = rect.top + rect.height / 2;
      const distance = Math.abs(window.innerHeight * 0.48 - stepCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeStep = step;
      }
    });

    roadmapSteps.forEach((step) => {
      step.classList.toggle("is-active", step === activeStep);
    });
  };

  const updateRoadmap = () => {
    setRoadmapProgress();
    setActiveStep();
  };

  if (reduceMotion.matches) {
    roadmap.style.setProperty("--roadmap-progress", "100%");
    measureRoadmapRibbon();
    roadmap.style.setProperty("--ribbon-offset", "0");
    roadmapSteps.forEach((step) => {
      step.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.2,
      }
    );

    roadmapSteps.forEach((step) => observer.observe(step));

    let ticking = false;

    const requestRoadmapUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateRoadmap();
          ticking = false;
        });
        ticking = true;
      }
    };

    measureRoadmapRibbon();
    updateRoadmap();
    window.addEventListener("scroll", requestRoadmapUpdate, { passive: true });
    window.addEventListener("resize", () => {
      measureRoadmapRibbon();
      requestRoadmapUpdate();
    });
  }
}

if (programCards.length > 0 && programHeadlineWord) {
  const setProgramHeadline = (card) => {
    programHeadlineWord.textContent =
      currentLanguage === "ar"
        ? card.dataset.programHeadlineAr || "الإنجليزية"
        : card.dataset.programHeadline || "English";
  };

  const resetProgramHeadline = () => {
    programHeadlineWord.textContent = currentLanguage === "ar" ? "الإنجليزية" : "English";
  };

  programCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setProgramHeadline(card));
    card.addEventListener("focusin", () => setProgramHeadline(card));
    card.addEventListener("mouseleave", resetProgramHeadline);
    card.addEventListener("focusout", resetProgramHeadline);
  });
}

const solutionCards = Array.from(document.querySelectorAll(".solution-card"));

if (solutionCards.length > 0) {
  const setActiveSolutionCard = (activeCard) => {
    solutionCards.forEach((card) => {
      card.classList.toggle("is-selected", card === activeCard);
    });
  };

  const resetSolutionCards = () => {
    solutionCards.forEach((card) => {
      card.classList.remove("is-selected");
    });
  };

  solutionCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("mouseenter", () => setActiveSolutionCard(card));
    card.addEventListener("focus", () => setActiveSolutionCard(card));
    card.addEventListener("mouseleave", resetSolutionCards);
    card.addEventListener("blur", resetSolutionCards);
  });
}

const statsSection = document.querySelector(".stats-section");
const statNumbers = Array.from(document.querySelectorAll("[data-count-target]"));

if (statsSection && statNumbers.length > 0) {
  const animateCounter = (element, index) => {
    const target = Number.parseFloat(element.dataset.countTarget || "0");
    const suffix = element.dataset.countSuffix || "";
    const duration = 1800;
    const delay = index * 180;
    const startTime = performance.now() + delay;

    const tick = (time) => {
      if (time < startTime) {
        window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, (time - startTime) / duration);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * easedProgress);

      element.textContent = `${value.toLocaleString()}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  const setFinalStats = () => {
    statNumbers.forEach((number) => {
      const target = Number.parseFloat(number.dataset.countTarget || "0");
      const suffix = number.dataset.countSuffix || "";
      number.textContent = `${target.toLocaleString()}${suffix}`;
    });
  };

  if (reduceMotion.matches) {
    setFinalStats();
  } else {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          statNumbers.forEach((number, index) => animateCounter(number, index));
          observer.disconnect();
        });
      },
      {
        threshold: 0.35,
      }
    );

    statsObserver.observe(statsSection);
  }
}

applyLanguage(currentLanguage);

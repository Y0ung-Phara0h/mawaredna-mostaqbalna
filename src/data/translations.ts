import type { Language, RoutePath } from '../config/siteConfig';
import type { CropTypeId, SoilTypeId } from '../lib/calculator';
import type { QuotationRequestType } from '../lib/quotation';

export interface SiteTranslations {
  brand: {
    arabicName: string;
    englishName: string;
    tagline: string;
    copyright: string;
    homeAria: string;
  };
  nav: {
    items: ReadonlyArray<{ label: string; path: RoutePath }>;
    getInTouch: string;
    openMenu: string;
    closeMenu: string;
    primaryAria: string;
    mobileAria: string;
    footerAria: string;
    switchLangLabel: string;
    switchLangAria: string;
    switchToLight: string;
    switchToDark: string;
    preferencesAria: string;
    preferencesTitle: string;
    languageHeading: string;
    appearanceHeading: string;
    darkModeLabel: string;
    lightModeLabel: string;
    arabicLabel: string;
    englishLabel: string;
  };
  social: {
    facebookAria: string;
    facebookLabel: string;
  };
  home: {
    heroLine1: string;
    heroLine2: string;
    heroLine3: string;
    heroHighlight: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroImgAlt: string;
    principlesAria: string;
    principles: ReadonlyArray<{ id: 'sustainable' | 'excellence' | 'future'; line1: string; line2: string }>;
    productTitle: string;
    productSubtitle: string;
    productCta: string;
    productImgAlt: string;
    keyMetrics: ReadonlyArray<{ value: string; label: string }>;
    circularTitle: string;
    circularSubtitle: string;
    circularStages: ReadonlyArray<{
      step: string;
      title: string;
      description: string;
      iconKey: 'iconSugarcaneStalk' | 'iconCompostBag' | 'iconSproutBlades';
    }>;
    qualityTitle: string;
    qualityBody: string;
    qualityCta: string;
    contextCards: ReadonlyArray<{
      title: string;
      caption: string;
      imageKey: 'sugarcaneFieldMountains' | 'tilledSoilSunrise';
    }>;
    quoteBannerTitle: string;
    quoteBannerSubtitle: string;
    quoteBannerCta: string;
  };
  calculator: {
    sectionAria: string;
    title: string;
    subtitle: string;
    pageEyebrow: string;
    pageTitle: string;
    pageSubtitle: string;
    steps: ReadonlyArray<{ num: string; title: string; desc: string }>;
    areaLabel: string;
    areaPlaceholder: string;
    feddanUnit: string;
    conversionHintAria: string;
    conversionHintTitle: string;
    conversions: ReadonlyArray<{ unit: string; value: string }>;
    cropTypeLabel: string;
    soilTypeLabel: string;
    cropTypes: Record<CropTypeId, string>;
    soilTypes: Record<SoilTypeId, string>;
    perFeddanRateLabel: string;
    perFeddanUnit: string;
    calculateBtn: string;
    continueBtn: string;
    openFullLink: string;
    estimatedRangeLabel: string;
    estimatedRequirementLabel: string;
    tonsUnit: string;
    cubicUnit: string;
    dualUnitCaption: string;
    densityNote: string;
    disclaimer: string;
    invalidAreaError: string;
  };
  about: {
    eyebrow: string;
    title: string;
    introSuffix: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyImgAlt: string;
    valuesTitle: string;
    values: ReadonlyArray<{ title: string; description: string }>;
    cycleTitle: string;
    cycleSubtitle: string;
    productionTitle: string;
    productionBody: string;
    productionImgAlt: string;
    ctaQuote: string;
    ctaContact: string;
  };
  products: {
    eyebrow: string;
    naturalBadge: string;
    taxExemptBadge: string;
    title: string;
    description: string;
    highlights: readonly string[];
    ctaCalc: string;
    ctaQuote: string;
    imgAlt: string;
    benefitsTitle: string;
    benefitsSubtitle: string;
    benefits: ReadonlyArray<{
      title: string;
      description: string;
      iconKey: 'iconCompostBag' | 'iconFieldRidges' | 'iconWaterDrop' | 'iconSoilLeaves';
    }>;
    specsTitle: string;
    specsSubtitle: string;
    tableHeaders: {
      parameter: string;
      unit: string;
      value: string;
    };
    labSpecs: ReadonlyArray<{
      parameter: string;
      unit: string;
      value: string;
      isFree?: boolean;
    }>;
    guaranteeTitle: string;
    guaranteeBody: string;
    guaranteeBadge: string;
    specs: ReadonlyArray<{ label: string; value: string }>;
    docsTitle: string;
    docsBody: string;
    docsCta: string;
  };
  quotation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    transferredBadge: string;
    areaPrefix: string;
    massPrefix: string;
    volumePrefix: string;
    transferredCaveat: string;
    clearSummaryAria: string;
    successTitle: string;
    successMessage: string;
    referencePrefix: string;
    errorTitle: string;
    errorUnconfigured: string;
    errorRejected: string;
    errorNetwork: string;
    viewContactChannels: string;
    step1Legend: string;
    selectedLabel: string;
    selectLabel: string;
    requestTypes: Record<QuotationRequestType, { title: string; subtitle: string }>;
    step2LegendSuffix: string;
    packagingLabel: string;
    packagingOptions: readonly string[];
    standardQtyLabel: string;
    standardQtyPlaceholder: string;
    bulkVolumeLabel: string;
    bulkVolumePlaceholder: string;
    deliveryFreqLabel: string;
    deliveryFreqOptions: readonly string[];
    siteAccessLabel: string;
    siteAccessPlaceholder: string;
    customSpecLabel: string;
    customSpecPlaceholder: string;
    targetCropLabel: string;
    targetCropPlaceholder: string;
    docNeedsLabel: string;
    docNeedsPlaceholder: string;
    step3Legend: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    locationLabel: string;
    locationPlaceholder: string;
    timelineLabel: string;
    timelinePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitFootnote: string;
    submitBtn: string;
    submittingBtn: string;
    validationErrors: {
      requestType: string;
      fullName: string;
      email: string;
      phone: string;
      location: string;
      bulkVolume: string;
      customSpecification: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    channelsHeading: string;
    channelsSubheading?: string;
    phoneTitle: string;
    phoneTag: string;
    phonePending: string;
    phoneAction: string;
    whatsappTitle: string;
    whatsappTag: string;
    whatsappPending: string;
    whatsappAction: string;
    emailTitle: string;
    emailTag: string;
    emailPending: string;
    emailAction: string;
    facebookTitle: string;
    facebookTag: string;
    facebookValueConfigured: string;
    facebookPending: string;
    facebookAction: string;
    useQuoteForm: string;
    locationTitle: string;
    locationBadge: string;
    locationPending: string;
    mapIframeTitle: string;
    mapOpenExternal: string;
    mapPendingBadge: string;
    mapDirectionsHint?: string;
    commercialBannerTitle: string;
    commercialBannerDesc: string;
    ctaQuote: string;
    ctaCalc: string;
  };
}

export const TRANSLATIONS: Record<Language, SiteTranslations> = {
  ar: {
    brand: {
      arabicName: 'مواردنا مستقبلنا',
      englishName: 'Mawariduna Mustaqabana',
      tagline: 'من مخلفاتنا نصنع مستقبلاً',
      copyright: '© 2025 مواردنا مستقبلنا. جميع الحقوق محفوظة.',
      homeAria: 'مواردنا مستقبلنا — الصفحة الرئيسية',
    },
    nav: {
      items: [
        { label: 'الرئيسية', path: '/' },
        { label: 'من نحن', path: '/about' },
        { label: 'المنتج', path: '/products' },
        { label: 'الحاسبة', path: '/calculator' },
        { label: 'طلب عرض سعر', path: '/request-quotation' },
        { label: 'اتصل بنا', path: '/contact' },
      ],
      getInTouch: 'تواصل معنا',
      openMenu: 'فتح قائمة التنقل',
      closeMenu: 'إغلاق قائمة التنقل',
      primaryAria: 'التنقل الرئيسي',
      mobileAria: 'قائمة الجوال',
      footerAria: 'روابط التذييل',
      switchLangLabel: 'EN',
      switchLangAria: 'Switch language to English',
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن',
      preferencesAria: 'تفضيلات اللغة والمظهر',
      preferencesTitle: 'التفضيلات',
      languageHeading: 'اللغة',
      appearanceHeading: 'المظهر',
      darkModeLabel: 'الوضع الداكن',
      lightModeLabel: 'الوضع الفاتح',
      arabicLabel: 'العربية',
      englishLabel: 'English',
    },
    social: {
      facebookAria: 'فيسبوك — مواردنا مستقبلنا',
      facebookLabel: 'فيسبوك',
    },
    home: {
      heroLine1: 'نحوّل',
      heroLine2: 'المخلفات الزراعية',
      heroLine3: 'إلى',
      heroHighlight: 'قيمة مستدامة',
      heroSubtitle: 'حلول كمبوست عضوي مبتكرة لغدٍ زراعي أكثر استدامة وخصوبة.',
      heroPrimaryCta: 'استكشف منتجنا',
      heroSecondaryCta: 'جرّب الحاسبة',
      heroImgAlt:
        'التحول الدائري من مخلفات قصب السكر إلى كمبوست عضوي ونباتات مزدهرة في حقل مشرق',
      principlesAria: 'المبادئ الزراعية الأساسية',
      principles: [
        { id: 'sustainable', line1: 'مستدام', line2: 'بالتصميم' },
        { id: 'excellence', line1: 'التميز', line2: 'الزراعي' },
        { id: 'future', line1: 'مستقبل', line2: 'أكثر خضرة' },
      ],
      productTitle: 'منتجنا',
      productSubtitle:
        'سماد عضوي طبيعي 100% من مخلفات قصب السكر، غني بالمادة العضوية (44.65%) وخالٍ تماماً من بذور الحشائش ومسببات أمراض النباتات.',
      productCta: 'استعراض المواصفات الكاملة',
      productImgAlt: 'أيدٍ تحمل كمبوست عضوي غني من مخلفات قصب السكر مع نبتة خضراء يانعة',
      keyMetrics: [
        { value: '44.65%', label: 'المادة العضوية' },
        { value: '6.8', label: 'درجة الحموضة (pH)' },
        { value: '500–550', label: 'كجم / متر مكعب' },
        { value: '13 : 1', label: 'نسبة الكربون للنيتروجين' },
      ],
      circularTitle: 'نظرة عامة على التحول الدائري',
      circularSubtitle:
        'عرض مفاهيمي لكيفية إعادة مخلفات قصب السكر كقيمة عضوية مستدامة للتربة الزراعية.',
      circularStages: [
        {
          step: '01',
          title: 'مخلفات قصب السكر',
          description:
            'تُجمع المخلفات النباتية لقصب السكر بدلاً من إهدارها أو حرقها، لتشكّل المادة الخام النباتية الأساسية.',
          iconKey: 'iconSugarcaneStalk',
        },
        {
          step: '02',
          title: 'كمبوست عضوي طبيعي 100%',
          description:
            'تتحول البقايا النباتية إلى كمبوست داكن ومستقر غني بالمادة العضوية والألياف السيليلوزية وخالٍ من الشوائب.',
          iconKey: 'iconCompostBag',
        },
        {
          step: '03',
          title: 'التربة ونمو المحاصيل',
          description:
            'يحسّن بناء التربة ويحافظ على الرطوبة وينشّط الحياة الميكروبية النافعة لدعم محاصيل مزدهرة.',
          iconKey: 'iconSproutBlades',
        },
      ],
      qualityTitle: 'تعهّد الشركة وضمان الجودة',
      qualityBody:
        'تتعهد شركة مواردنا مستقبلنا بأن عينة الكمبوست المقدمة منا بنفس جودة الكميات المتفق عليها — والمنتج معفى من جميع الضرائب.',
      qualityCta: 'اطلب عينة أو عرض سعر',
      contextCards: [
        {
          title: 'دائرية موارد قصب السكر',
          caption: 'الاستفادة من مخلفات قصب السكر كمدخل عضوي متجدد للزراعة الإقليمية.',
          imageKey: 'sugarcaneFieldMountains',
        },
        {
          title: 'تجهيز الحقول والتربة',
          caption: 'دعم البنية العضوية للتربة في الحقول المفتوحة ومشاريع الاستصلاح الزراعي.',
          imageKey: 'tilledSoilSunrise',
        },
      ],
      quoteBannerTitle: 'اطلب عرض سعر',
      quoteBannerSubtitle: 'احصل على عرض سعر مخصص لاحتياجات مشاريعك الزراعية.',
      quoteBannerCta: 'تواصل معنا',
    },
    calculator: {
      sectionAria: 'حاسبة احتياجات المزرعة من الكمبوست',
      title: 'حاسبة احتياج المزرعة',
      subtitle: 'احصل على تقدير مبدئي لنطاق احتياج مزرعتك من الكمبوست العضوي بالطن والمتر المكعب',
      pageEyebrow: 'مقدّر الاحتياج ثنائي الوحدات (بالفدان)',
      pageTitle: 'حاسبة الكمبوست العضوي',
      pageSubtitle:
        'أدخل مساحة الأرض بالفدان واختر نوع المحصول ونوع التربة لمعرفة النطاق التقديري (الحد الأدنى – الأقصى) بالطن والمتر المكعب، ثم انقل النتائج مباشرة لطلب عرض السعر.',
      steps: [
        { num: '1', title: 'أدخل المساحة بالفدان', desc: 'حدد مساحة المزرعة بالفدان مع دليل التحويل الفوري للقيراط والهكتار والمتر المربع.' },
        { num: '2', title: 'اختر المحصول والتربة', desc: 'حدد نوع المحصول وطبيعة التربة لتعديل معدل الإضافة للفدان تلقائياً.' },
        { num: '3', title: 'راجع النطاق وتابع الطلب', desc: 'اعرض الحد الأدنى والأقصى بالطن والمتر المكعب ثم انتقل لطلب عرض السعر.' },
      ],
      areaLabel: 'مساحة المزرعة (فدان) *',
      areaPlaceholder: 'مثال: 25',
      feddanUnit: 'فدان',
      conversionHintAria: 'عرض تحويلات وحدات المساحة الشائعة في مصر',
      conversionHintTitle: 'تحويلات وحدات المساحة في مصر',
      conversions: [
        { unit: 'الفدان', value: '4,200 م² (24 قيراط)' },
        { unit: 'القيراط', value: '175 م²' },
        { unit: 'الهكتار', value: '10,000 م² (≈ 2.38 فدان)' },
        { unit: 'المتر المربع', value: '1 م²' },
      ],
      cropTypeLabel: 'نوع المحصول',
      soilTypeLabel: 'نوع التربة',
      cropTypes: {
        field_crops: 'المحاصيل الحقلية',
        vegetables: 'الخضروات',
        orchards: 'البساتين وأشجار الفاكهة',
        sugarcane: 'قصب السكر',
        date_palms: 'النخيل',
        protected_agriculture: 'الزراعات المحمية (الصوب)',
        newly_reclaimed: 'الأراضي المستصلحة حديثاً',
      },
      soilTypes: {
        sandy: 'رملية',
        loamy: 'طميية (صفراء)',
        clay: 'طينية',
        calcareous: 'جيرية',
        saline: 'ملحية',
      },
      perFeddanRateLabel: 'معدل الإضافة التقديري للفدان',
      perFeddanUnit: '/ فدان',
      calculateBtn: 'احسب الاحتياج',
      continueBtn: 'المتابعة لطلب عرض السعر',
      openFullLink: 'فتح الحاسبة الكاملة',
      estimatedRangeLabel: 'النطاق التقديري (الحد الأدنى – الأقصى)',
      estimatedRequirementLabel: 'الاحتياج التقديري الإجمالي',
      tonsUnit: 'طن',
      cubicUnit: 'م³',
      dualUnitCaption: 'نطاق الكتلة بالطن المتري وما يعادلها بالحجم (م³)',
      densityNote: 'محسوبة وفق الكثافة المخبرية المعتمدة للمنتج: 500 – 550 كجم/م³',
      disclaimer:
        'المخرجات هي تقديرات مبدئية استرشادية بنطاق (الحد الأدنى – الأقصى) بناءً على الكثافة المخبرية للمنتج (500–550 كجم/م³) ومتوسطات الإضافة الزراعية، ولا تُعد توصية زراعية نهائية أو عرض سعر ملزماً.',
      invalidAreaError: 'يرجى إدخال مساحة صالحة بالفدان أكبر من الصفر.',
    },
    about: {
      eyebrow: 'عن مواردنا مستقبلنا',
      title: 'تحويل مخلفات قصب السكر إلى كمبوست عضوي موثوق',
      introSuffix:
        'تركّز شركة مواردنا مستقبلنا على منتج زراعي واحد متقن: كمبوست عضوي مستخلص من مخلفات قصب السكر لإثراء الأراضي الزراعية ودعم الاقتصاد الدائري.',
      storyTitle: 'قصتنا ورسالتنا الزراعية',
      storyP1:
        'تنتج زراعة قصب السكر كميات كبيرة من المخلفات النباتية في كل موسم حصاد. وبدلاً من إهدار هذه المادة العضوية القيّمة، تقوم مواردنا مستقبلنا بتحويلها إلى كمبوست عضوي ملائم لتجهيز التربة الزراعية.',
      storyP2:
        'نتعاون مع المزارع التجارية والمهندسين الزراعيين وشركات الاستثمار الزراعي ومطوري المشاريع الذين يبحثون عن مدخلات عضوية متناسقة وتوثيق واضح وتنسيق توريد موثوق.',
      storyImgAlt: 'حقول قصب سكر خضراء ممتدة في ضوء النهار',
      valuesTitle: 'قيمنا الأساسية',
      values: [
        {
          title: 'إدارة دائرية للموارد',
          description:
            'نحوّل مخلفات قصب السكر إلى مدخلات عضوية عملية تحافظ على إنتاجية الموارد الزراعية.',
        },
        {
          title: 'توريد تجاري موثوق',
          description:
            'نخدم المزارع والمهندسين الزراعيين والشركات بتواصل واضح وعروض أسعار شفافة.',
        },
        {
          title: 'معايير قائمة على التوثيق',
          description:
            'ننشر المواصفات المعتمدة فقط ونشارك وثائق الجودة المخبرية مباشرة مع العملاء.',
        },
      ],
      cycleTitle: 'من مخلفات زراعية إلى مورد للتربة',
      cycleSubtitle: 'نظرة مفاهيمية على دورة إنتاج الكمبوست العضوي من قصب السكر.',
      productionTitle: 'تنسيق الإنتاج والتوريد',
      productionBody:
        'يتم تنسيق الشحنات وزيارات المواقع وتوفير تقارير جودة الدفعات مباشرة مع المزارع والمشترين التجاريين وفقاً للموقع وجدول المواسم الزراعية.',
      productionImgAlt: 'صفوف تربة زراعية داكنة مجهزة عند شروق الشمس',
      ctaQuote: 'اطلب عرض سعر',
      ctaContact: 'تواصل مع فريقنا',
    },
    products: {
      eyebrow: 'كمبوست مواردنا مستقبلنا',
      naturalBadge: 'سماد عضوي طبيعي 100%',
      taxExemptBadge: 'المنتج معفى من جميع الضرائب',
      title: 'كمبوست من مخلفات قصب السكر',
      description:
        'سماد عضوي طبيعي 100% منتج من مخلفات قصب السكر، غني بالمواد العضوية والألياف السيليلوزية والكائنات الدقيقة النافعة لتحسين خصوبة التربة وبنائها وترشيد مياه الري.',
      highlights: [
        'غني بالمادة العضوية (44.65%) وبنسبة كربون إلى نيتروجين متوازنة (13 : 1).',
        'خالٍ تماماً من بذور الحشائش ومسببات أمراض النباتات والشوائب غير النباتية.',
        'المنتج معفى من جميع الضرائب ومتوفر للطلبات القياسية والجملة والمخصصة.',
      ],
      ctaCalc: 'قدّر الكمية بالحاسبة',
      ctaQuote: 'اطلب عرض سعر',
      imgAlt: 'أيدٍ تحمل كمبوست قصب السكر العضوي مع نبتة خضراء صغيرة',
      benefitsTitle: 'مميزات المنتج',
      benefitsSubtitle: 'أربع فوائد زراعية موثقة لتربة أكثر خصوبة وتماسكاً وإنتاجية.',
      benefits: [
        {
          title: 'غني بالمواد العضوية',
          description: 'يحسن خصوبة التربة ويزيد من نشاطها الحيوي.',
          iconKey: 'iconCompostBag',
        },
        {
          title: 'يحسن بناء التربة',
          description: 'يحتوي على ألياف سيليلوزية تساعد على تفكيك التربة الثقيلة وتحسين التهوية والصرف.',
          iconKey: 'iconFieldRidges',
        },
        {
          title: 'يحافظ على الرطوبة',
          description: 'يزيد من قدرة التربة الرملية على الاحتفاظ بالماء ويساهم في ترشيد مياه الري.',
          iconKey: 'iconWaterDrop',
        },
        {
          title: 'ينشط الحياة الميكروبية',
          description: 'يحتوي على كائنات دقيقة نافعة تحول العناصر المعقدة في التربة إلى صور سهلة الامتصاص للنبات.',
          iconKey: 'iconSoilLeaves',
        },
      ],
      specsTitle: 'التحليل والمواصفات الفنية للمنتج',
      specsSubtitle:
        'البيانات المخبرية والمواصفات الفنية المعتمدة لكمبوست مواردنا مستقبلنا من مخلفات قصب السكر.',
      tableHeaders: {
        parameter: 'البيان',
        unit: 'الوحدة',
        value: 'قيمة المنتج',
      },
      labSpecs: [
        { parameter: 'وزن المتر المكعب', unit: 'كجم', value: '500 – 550' },
        { parameter: 'الرطوبة', unit: '%', value: '32' },
        { parameter: 'درجة الحموضة (pH)', unit: '—', value: '6.8' },
        { parameter: 'التوصيل الكهربائي (EC)', unit: 'dS/m', value: '1.03' },
        { parameter: 'النيتروجين الأمونيومي (NH₄⁺)', unit: 'ppm', value: '70' },
        { parameter: 'النيتروجين النتراتي', unit: 'ppm', value: '461' },
        { parameter: 'النيتروجين الكلي', unit: '%', value: '1.95' },
        { parameter: 'المادة العضوية', unit: '%', value: '44.65' },
        { parameter: 'الكربون العضوي', unit: '%', value: '25.9' },
        { parameter: 'الرماد', unit: '%', value: '55.35' },
        { parameter: 'نسبة الكربون إلى النيتروجين (C:N)', unit: '—', value: '13 : 1' },
        { parameter: 'الفوسفور الكلي (P₂O₅)', unit: '%', value: '1.89' },
        { parameter: 'البوتاسيوم الكلي (K₂O)', unit: '%', value: '1.67' },
        { parameter: 'بذور الحشائش', unit: '—', value: 'لا يوجد', isFree: true },
        { parameter: 'مسببات أمراض النباتات', unit: '—', value: 'لا يوجد', isFree: true },
        { parameter: 'الشوائب والمعادن غير النباتية', unit: '—', value: 'لا يوجد', isFree: true },
      ],
      guaranteeTitle: 'تتعهد شركة مواردنا مستقبلنا',
      guaranteeBody:
        'تتعهد شركة مواردنا مستقبلنا بأن عينة الكمبوست المقدمة منا بنفس جودة الكميات المتفق عليها.',
      guaranteeBadge: 'ضمان الجودة',
      specs: [
        { label: 'اسم المنتج', value: 'كمبوست مواردنا مستقبلنا — سماد عضوي طبيعي 100%' },
        { label: 'المصدر الأساسي', value: 'مخلفات قصب السكر الزراعية النباتية' },
        { label: 'وزن المتر المكعب', value: '500 – 550 كجم' },
        { label: 'الوضع الضريبي', value: 'المنتج معفى من جميع الضرائب' },
        { label: 'خيارات الطلب', value: 'قياسي (Standard)، جملة (Bulk)، ومخصص (Customized)' },
      ],
      docsTitle: 'هل ترغب في طلب عينة أو عرض سعر تجاري؟',
      docsBody:
        'اطلب عينة مطابقة لمواصفات التوريد أو تقارير الدفعة ضمن نموذج طلب عرض السعر القياسي أو الجملة أو المخصص.',
      docsCta: 'اطلب عينة وعرض سعر',
    },
    quotation: {
      eyebrow: 'نموذج الاستفسار التجاري الموحد',
      title: 'طلب عرض سعر',
      subtitle:
        'اختر نوع الطلب أدناه وأدخل تفاصيل مشروعك. الحقول المطلوبة مشار إليها بعلامة (*).',
      transferredBadge: 'تم نقله من حاسبة الكمبوست',
      areaPrefix: 'المساحة:',
      massPrefix: 'الكتلة التقديرية:',
      volumePrefix: 'الحجم التقديري:',
      transferredCaveat: 'تقدير مبدئي فقط — لا يُعد عرض سعر ملزماً أو توصية زراعية.',
      clearSummaryAria: 'إزالة ملخص الحاسبة المنقول',
      successTitle: 'تم تأكيد استلام طلب عرض السعر',
      successMessage:
        'تم استلام وتأكيد طلب عرض السعر بنجاح. سيقوم فريقنا التجاري بمراجعة متطلباتك والتواصل معك قريباً.',
      referencePrefix: 'الرقم المرجعي:',
      errorTitle: 'تعذّر إتمام إرسال الطلب',
      errorUnconfigured:
        'لم يتم إعداد نقطة استقبال عروض الأسعار (VITE_QUOTATION_ENDPOINT) بعد. تم الحفاظ على جميع بياناتك المدخلة — يرجى إعداد رابط Google Apps Script أو التواصل معنا مباشرة.',
      errorRejected:
        'لم يؤكد الخادم معالجة الطلب بنجاح. تم الحفاظ على جميع بياناتك — يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.',
      errorNetwork:
        'حدث خطأ في الاتصال حال دون إرسال الطلب. تم الحفاظ على جميع بياناتك — يرجى التحقق من الاتصال والمحاولة مجدداً.',
      viewContactChannels: 'عرض قنوات التواصل المباشر',
      step1Legend: '1. نوع الطلب *',
      selectedLabel: 'محدد',
      selectLabel: 'اختر',
      requestTypes: {
        Standard: {
          title: 'قياسي (Standard)',
          subtitle: 'طلبات الكمبوست العضوي الاعتيادية للمزارع وتنسيق الحدائق.',
        },
        Bulk: {
          title: 'جملة (Bulk)',
          subtitle: 'التوريد التجاري بكميات كبيرة والشحنات المجدولة.',
        },
        Customized: {
          title: 'مخصص (Customized)',
          subtitle: 'مواصفات مخصصة، سياق المحصول، أو متطلبات توثيق محددة.',
        },
      },
      step2LegendSuffix: 'تفاصيل الطلب',
      packagingLabel: 'تفضيل التعبئة',
      packagingOptions: ['يُحدد لاحقاً', 'معبأ في شكاير', 'سائب (صب)'],
      standardQtyLabel: 'الكمية التقديرية (طن أو م³)',
      standardQtyPlaceholder: 'مثال: 15 طن متري أو 25 م³',
      bulkVolumeLabel: 'كمية الجملة التقديرية (طن أو م³) *',
      bulkVolumePlaceholder: 'مثال: 100 طن متري',
      deliveryFreqLabel: 'جدول التوريد',
      deliveryFreqOptions: ['توريد لمرة واحدة', 'شحنات موسمية', 'توريد شهري متكرر'],
      siteAccessLabel: 'ملاحظات وصول الشاحنات والتفريغ بالموقع',
      siteAccessPlaceholder: 'قيود دخول الشاحنات أو معدات التفريغ أو ساعات الاستلام المفضلة',
      customSpecLabel: 'تفاصيل المتطلبات أو المواصفات المخصصة *',
      customSpecPlaceholder: 'اشرح متطلبات الغربلة أو الرطوبة أو التعبئة أو التوريد الخاصة بك',
      targetCropLabel: 'المحصول المستهدف أو نوع التربة',
      targetCropPlaceholder: 'مثال: أراضٍ صحراوية مستصلحة، بساتين، محاصيل حقلية',
      docNeedsLabel: 'الوثائق أو التحاليل المخبرية المطلوبة',
      docNeedsPlaceholder: 'مثال: تقرير تحليل مخبري للدفعة، طلب عينة',
      step3Legend: '3. بيانات التواصل والمشروع',
      fullNameLabel: 'الاسم الكامل *',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      orgLabel: 'اسم الشركة / المزرعة',
      orgPlaceholder: 'اسم المؤسسة أو المزرعة (اختياري)',
      emailLabel: 'البريد الإلكتروني *',
      emailPlaceholder: 'name@company.com',
      phoneLabel: 'رقم الهاتف / واتساب *',
      phonePlaceholder: '010 1234 5678',
      locationLabel: 'المحافظة / موقع المشروع *',
      locationPlaceholder: 'المدينة أو المحافظة المستهدفة للتوريد',
      timelineLabel: 'موعد التوريد المستهدف',
      timelinePlaceholder: 'مثال: خلال أسبوعين، بداية موسم الزراعة القادم',
      notesLabel: 'ملاحظات إضافية',
      notesPlaceholder: 'شارك أي تفاصيل إضافية حول مشروعك الزراعي أو استفساراتك لفريقنا',
      submitFootnote:
        'يُؤكد إرسال الطلب فقط بعد استلام إقرار رسمي من نقطة الاستقبال المهيّأة للشركة.',
      submitBtn: 'إرسال طلب عرض السعر',
      submittingBtn: 'جارٍ إرسال الطلب...',
      validationErrors: {
        requestType: 'يرجى اختيار نوع طلب عرض سعر صالح.',
        fullName: 'يرجى إدخال اسمك الكامل.',
        email: 'يرجى إدخال بريد إلكتروني صالح.',
        phone: 'يرجى إدخال رقم هاتف أو واتساب صالح.',
        location: 'يرجى تحديد المحافظة أو موقع المشروع.',
        bulkVolume: 'يرجى تحديد كمية الجملة التقديرية (بالطن أو م³).',
        customSpecification: 'يرجى وصف المتطلبات أو المواصفات المخصصة.',
      },
    },
    contact: {
      eyebrow: 'الدعم التجاري المباشر',
      title: 'تواصل مع مواردنا مستقبلنا',
      subtitle:
        'تواصل مباشرة مع فريقنا التجاري للاستفسار عن كمبوست قصب السكر العضوي، وتنسيق التوريد للمزارع والمشاريع الزراعية، أو طلب تقارير التحليل المخبرية المعتمدة.',
      channelsHeading: 'قنوات التواصل الرسمية',
      phoneTitle: 'الهاتف التجاري',
      phoneTag: 'اتصال مباشر',
      phonePending: '01X XXXX XXXX (بانتظار الإعداد)',
      phoneAction: 'اتصل الآن',
      whatsappTitle: 'واتساب',
      whatsappTag: 'مراسلة فورية',
      whatsappPending: '01X XXXX XXXX (بانتظار الإعداد)',
      whatsappAction: 'راسلنا عبر واتساب',
      emailTitle: 'البريد الإلكتروني',
      emailTag: 'المراسلات الرسمية وعروض الأسعار',
      emailPending: 'البريد الرسمي بانتظار الإعداد',
      emailAction: 'أرسل بريداً إلكترونياً',
      facebookTitle: 'صفحة فيسبوك الرسمية',
      facebookTag: 'التحديثات والحملات الزراعية',
      facebookValueConfigured: 'مواردنا مستقبلنا — فيسبوك',
      facebookPending: 'رابط صفحة فيسبوك بانتظار الإعداد',
      facebookAction: 'زيارة صفحة فيسبوك',
      useQuoteForm: 'استخدم نموذج عرض السعر',
      locationTitle: 'موقع الشركة ومناطق التوريد',
      locationBadge: 'الخريطة التفاعلية',
      locationPending:
        'يمكن ضبط موقع الشركة وإحداثيات الإنتاج الدقيقة عبر VITE_CONTACT_LOCATION و VITE_CONTACT_LOCATION_EMBED_URL لتحديد الدبوس على الخريطة.',
      mapIframeTitle: 'خريطة موقع شركة مواردنا مستقبلنا',
      mapOpenExternal: 'فتح في خرائط جوجل',
      mapPendingBadge: 'عرض إقليمي (مصر) — بانتظار إحداثيات الموقع',
      commercialBannerTitle: 'جاهز لتوريد الكمبوست العضوي لمزرعتك أو مشروعك؟',
      commercialBannerDesc:
        'أرسل طلب عرض سعر موحد للطلبيات القياسية أو الجملة أو المخصصة، أو قدّر احتياجات أرضك الزراعية مسبقاً عبر الحاسبة.',
      ctaQuote: 'اطلب عرض سعر',
      ctaCalc: 'حاسبة الكمبوست',
    },
  },
  en: {
    brand: {
      arabicName: 'مواردنا مستقبلنا',
      englishName: 'Mawariduna Mustaqabana',
      tagline: 'We create a future from our waste',
      copyright: '© 2025 Mawariduna Mustaqabana. All rights reserved.',
      homeAria: 'Mawariduna Mustaqabana Home',
    },
    nav: {
      items: [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Product', path: '/products' },
        { label: 'Calculator', path: '/calculator' },
        { label: 'Quotation', path: '/request-quotation' },
        { label: 'Contact', path: '/contact' },
      ],
      getInTouch: 'Get in Touch',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      primaryAria: 'Primary navigation',
      mobileAria: 'Mobile navigation',
      footerAria: 'Footer navigation',
      switchLangLabel: 'عربي',
      switchLangAria: 'التبديل إلى اللغة العربية',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      preferencesAria: 'Language and appearance settings',
      preferencesTitle: 'Preferences',
      languageHeading: 'Language',
      appearanceHeading: 'Appearance',
      darkModeLabel: 'Dark Mode',
      lightModeLabel: 'Light Mode',
      arabicLabel: 'العربية',
      englishLabel: 'English',
    },
    social: {
      facebookAria: 'Facebook — Mawariduna Mustaqabana',
      facebookLabel: 'Facebook',
    },
    home: {
      heroLine1: 'Turning',
      heroLine2: 'Agricultural',
      heroLine3: 'Waste into',
      heroHighlight: 'Lasting Value',
      heroSubtitle: 'Innovative compost solutions for a sustainable tomorrow.',
      heroPrimaryCta: 'Explore Our Solution',
      heroSecondaryCta: 'Try Calculator',
      heroImgAlt:
        'Circular transformation from sugarcane by-products to organic compost and thriving crops in a sunlit field',
      principlesAria: 'Core agricultural principles',
      principles: [
        { id: 'sustainable', line1: 'Sustainable', line2: 'by Design' },
        { id: 'excellence', line1: 'Agricultural', line2: 'Excellence' },
        { id: 'future', line1: 'A Greener', line2: 'Future' },
      ],
      productTitle: 'Our Product',
      productSubtitle:
        '100% natural organic sugarcane compost with 44.65% organic matter, neutral 6.8 pH, and zero weed seeds or plant pathogens.',
      productCta: 'View Full Specifications',
      productImgAlt: 'Hands holding rich dark organic sugarcane compost with a young green sprout',
      keyMetrics: [
        { value: '44.65%', label: 'Organic Matter' },
        { value: '6.8', label: 'Neutral pH' },
        { value: '500–550', label: 'kg / m³ Density' },
        { value: '13 : 1', label: 'C:N Ratio' },
      ],
      circularTitle: 'Circular Transformation Overview',
      circularSubtitle:
        'A conceptual overview of how sugarcane residues return value to agricultural soils.',
      circularStages: [
        {
          step: '01',
          title: 'Sugarcane By-Products',
          description:
            'Agricultural sugarcane residues are collected rather than discarded or burned, forming the plant-based feedstock.',
          iconKey: 'iconSugarcaneStalk',
        },
        {
          step: '02',
          title: '100% Natural Organic Compost',
          description:
            'Plant residues become dark, mature organic compost rich in organic matter and cellulosic fibers with zero impurities.',
          iconKey: 'iconCompostBag',
        },
        {
          step: '03',
          title: 'Soil & Plant Growth',
          description:
            'Improves soil structure, boosts moisture retention, and activates beneficial microbial life for thriving crops.',
          iconKey: 'iconSproutBlades',
        },
      ],
      qualityTitle: 'Company Quality Guarantee',
      qualityBody:
        'Mawariduna Mustaqabana guarantees that every compost sample provided matches the exact quality of the contracted supply quantities—and the product is fully tax-exempt.',
      qualityCta: 'Request a sample or quote',
      contextCards: [
        {
          title: 'Sugarcane-Origin Circularity',
          caption:
            'Utilizing agricultural sugarcane residues as a renewable organic input for regional cultivation.',
          imageKey: 'sugarcaneFieldMountains',
        },
        {
          title: 'Field & Soil Preparation',
          caption:
            'Supporting soil organic structure across open-field and agricultural reclamation applications.',
          imageKey: 'tilledSoilSunrise',
        },
      ],
      quoteBannerTitle: 'Request a Quotation',
      quoteBannerSubtitle: 'Get a tailored quote for your agricultural projects.',
      quoteBannerCta: 'Contact Us',
    },
    calculator: {
      sectionAria: 'Farm requirement compost calculator',
      title: 'Farm Requirement Calculator',
      subtitle: 'Get a preliminary min–max estimate of how much organic compost your farm needs.',
      pageEyebrow: 'Dual-Unit Feddan Estimator',
      pageTitle: 'Organic Compost Calculator',
      pageSubtitle:
        'Enter your farm area in Feddan, choose your crop type and soil type to view the min–max estimate in metric tons and equivalent cubic meters, then transfer it to Request a Quotation.',
      steps: [
        { num: '1', title: 'Enter Area in Feddan', desc: 'Input farm size in Feddan with instant Egypt unit conversion hints.' },
        { num: '2', title: 'Choose Crop & Soil Type', desc: 'Select your crop category and soil profile to tune the rate per Feddan.' },
        { num: '3', title: 'Review Range & Quote', desc: 'View min–max tons & m³, then transfer details to Request a Quotation.' },
      ],
      areaLabel: 'Farm area (Feddan) *',
      areaPlaceholder: 'e.g. 25',
      feddanUnit: 'Feddan',
      conversionHintAria: 'Show common Egyptian land area unit conversions',
      conversionHintTitle: 'Common Area Conversions in Egypt',
      conversions: [
        { unit: 'Feddan', value: '4,200 m² (24 Qirat)' },
        { unit: 'Qirat', value: '175 m²' },
        { unit: 'Hectare', value: '10,000 m² (≈ 2.38 Feddan)' },
        { unit: 'Square Meter', value: '1 m²' },
      ],
      cropTypeLabel: 'Crop type',
      soilTypeLabel: 'Soil type',
      cropTypes: {
        field_crops: 'Field crops',
        vegetables: 'Vegetables',
        orchards: 'Orchards and fruit trees',
        sugarcane: 'Sugarcane',
        date_palms: 'Date palms',
        protected_agriculture: 'Protected agriculture',
        newly_reclaimed: 'Newly reclaimed land',
      },
      soilTypes: {
        sandy: 'Sandy',
        loamy: 'Loamy',
        clay: 'Clay',
        calcareous: 'Calcareous',
        saline: 'Saline',
      },
      perFeddanRateLabel: 'Estimated rate per Feddan',
      perFeddanUnit: '/ Feddan',
      calculateBtn: 'Calculate',
      continueBtn: 'Continue to Quotation',
      openFullLink: 'Open Full Calculator',
      estimatedRangeLabel: 'Estimated Min–Max Range',
      estimatedRequirementLabel: 'Total Estimated Requirement',
      tonsUnit: 'Tons',
      cubicUnit: 'm³',
      dualUnitCaption: 'Min–max metric tons (mass) & equivalent cubic meters (m³)',
      densityNote: 'Based on verified product lab density: 500 – 550 kg/m³',
      disclaimer:
        'Outputs are preliminary min–max estimates derived from our verified lab bulk density (500–550 kg/m³) and standard agronomic guidelines. They do not constitute a final agronomic prescription or binding quotation.',
      invalidAreaError: 'Please enter a valid positive farm area in Feddan.',
    },
    about: {
      eyebrow: 'About Mawaredna Mostaqbaluna',
      title: 'Turning Sugarcane By-Products into Dependable Organic Compost',
      introSuffix:
        '(Mawaredna Mostaqbaluna) focuses on a single, purpose-built agricultural solution: organic compost produced from sugarcane residues to enrich farmland and support circular agriculture.',
      storyTitle: 'Our Story & Agricultural Mission',
      storyP1:
        'Sugarcane cultivation generates substantial plant by-products every harvest season. Rather than letting valuable organic matter go to waste, Mawaredna Mostaqbaluna transforms sugarcane residues into organic compost tailored for agricultural soil preparation.',
      storyP2:
        'We work with commercial farms, agricultural engineers, agribusiness buyers, and project developers who prioritize consistent organic inputs, straightforward documentation, and responsive commercial coordination.',
      storyImgAlt: 'Expansive green sugarcane fields in daylight',
      valuesTitle: 'Core Values',
      values: [
        {
          title: 'Circular Resource Stewardship',
          description:
            'We convert sugarcane by-products into practical organic inputs, keeping agricultural resources productive.',
        },
        {
          title: 'Dependable B2B Supply',
          description:
            'We serve farms, agricultural engineers, agribusinesses, and project developers with clear communication and transparent quotations.',
        },
        {
          title: 'Evidence-First Standards',
          description:
            'We publish only verified specifications and share official quality documentation directly with prospective buyers.',
        },
      ],
      cycleTitle: 'From By-Product to Soil Resource',
      cycleSubtitle: 'Conceptual overview of the circular sugarcane compost cycle.',
      productionTitle: 'Production & Supply Coordination',
      productionBody:
        'Dispatch coordination, site visits, and batch documentation are arranged directly with farms and commercial buyers based on location and seasonal supply schedules.',
      productionImgAlt: 'Prepared dark agricultural soil rows at sunrise',
      ctaQuote: 'Request a Quotation',
      ctaContact: 'Contact Our Team',
    },
    products: {
      eyebrow: 'Mawariduna Mustaqabana Compost',
      naturalBadge: '100% Natural Organic Fertilizer',
      taxExemptBadge: 'Tax-Exempt Product',
      title: 'Organic Sugarcane Compost',
      description:
        'A 100% natural organic soil amendment produced from sugarcane agricultural by-products—rich in organic matter, cellulosic fibers, and beneficial microorganisms to elevate soil fertility, structure, and water conservation.',
      highlights: [
        'Rich in organic matter (44.65%) with a balanced 13:1 Carbon-to-Nitrogen ratio.',
        'Completely free of weed seeds, plant pathogens, and non-plant impurities.',
        'Fully tax-exempt agricultural product available for Standard, Bulk, and Customized orders.',
      ],
      ctaCalc: 'Estimate with Calculator',
      ctaQuote: 'Request a Quotation',
      imgAlt: 'Hands holding organic sugarcane compost with a young green seedling',
      benefitsTitle: 'Product Advantages',
      benefitsSubtitle: 'Four verified agronomic benefits for healthier soil structure and higher irrigation efficiency.',
      benefits: [
        {
          title: 'Rich in Organic Matter',
          description: 'Enhances soil fertility and boosts vital biological activity.',
          iconKey: 'iconCompostBag',
        },
        {
          title: 'Improves Soil Structure',
          description: 'Contains cellulosic fibers that loosen heavy clay soils and improve aeration and drainage.',
          iconKey: 'iconFieldRidges',
        },
        {
          title: 'Retains Soil Moisture',
          description: 'Increases sandy soil water-holding capacity and helps conserve irrigation water.',
          iconKey: 'iconWaterDrop',
        },
        {
          title: 'Activates Microbial Life',
          description: 'Contains beneficial microorganisms that convert complex soil nutrients into plant-available forms.',
          iconKey: 'iconSoilLeaves',
        },
      ],
      specsTitle: 'Technical Analysis & Product Specifications',
      specsSubtitle:
        'Verified laboratory analysis and physical specifications for Mawariduna Mustaqabana sugarcane compost.',
      tableHeaders: {
        parameter: 'Parameter',
        unit: 'Unit',
        value: 'Verified Value',
      },
      labSpecs: [
        { parameter: 'Bulk Density (Weight per m³)', unit: 'kg', value: '500 – 550' },
        { parameter: 'Moisture Content', unit: '%', value: '32' },
        { parameter: 'pH Level', unit: '—', value: '6.8' },
        { parameter: 'Electrical Conductivity (EC)', unit: 'dS/m', value: '1.03' },
        { parameter: 'Ammonium Nitrogen (NH₄⁺)', unit: 'ppm', value: '70' },
        { parameter: 'Nitrate Nitrogen (NO₃⁻)', unit: 'ppm', value: '461' },
        { parameter: 'Total Nitrogen (N)', unit: '%', value: '1.95' },
        { parameter: 'Organic Matter', unit: '%', value: '44.65' },
        { parameter: 'Organic Carbon', unit: '%', value: '25.9' },
        { parameter: 'Ash Content', unit: '%', value: '55.35' },
        { parameter: 'Carbon-to-Nitrogen Ratio (C:N)', unit: '—', value: '13 : 1' },
        { parameter: 'Total Phosphorus (P₂O₅)', unit: '%', value: '1.89' },
        { parameter: 'Total Potassium (K₂O)', unit: '%', value: '1.67' },
        { parameter: 'Weed Seeds', unit: '—', value: 'None', isFree: true },
        { parameter: 'Plant Pathogens', unit: '—', value: 'None', isFree: true },
        { parameter: 'Non-Plant Impurities & Metals', unit: '—', value: 'None', isFree: true },
      ],
      guaranteeTitle: 'Our Company Pledge',
      guaranteeBody:
        'Mawariduna Mustaqabana guarantees that every compost sample provided matches the exact quality of the contracted supply quantities.',
      guaranteeBadge: 'Quality Guarantee',
      specs: [
        { label: 'Product Name', value: 'Mawariduna Mustaqabana Compost — 100% Natural Organic Fertilizer' },
        { label: 'Primary Origin', value: 'Plant-based sugarcane agricultural by-products' },
        { label: 'Bulk Density', value: '500 – 550 kg / m³' },
        { label: 'Tax Status', value: 'Exempt from all taxes' },
        { label: 'Order Options', value: 'Standard, Bulk, and Customized requests' },
      ],
      docsTitle: 'Ready to Request a Sample or Commercial Quote?',
      docsBody:
        'Request a quality-guaranteed sample or full batch report through our unified Standard, Bulk, or Customized quotation form.',
      docsCta: 'Request Sample & Quote',
    },
    quotation: {
      eyebrow: 'Unified Commercial Inquiry',
      title: 'Request a Quotation',
      subtitle:
        'Choose your request type below and provide your project details. Required fields are marked with an asterisk (*).',
      transferredBadge: 'Carried Over from Compost Calculator',
      areaPrefix: 'Area:',
      massPrefix: 'Est. Mass:',
      volumePrefix: 'Est. Volume:',
      transferredCaveat:
        'Preliminary estimate only — not a binding quotation or agronomic recommendation.',
      clearSummaryAria: 'Clear transferred calculator summary',
      successTitle: 'Quotation Request Confirmed',
      successMessage:
        'Your quotation request has been received and confirmed. Our commercial team will review your requirements and respond shortly.',
      referencePrefix: 'Reference ID:',
      errorTitle: 'Submission Could Not Be Completed',
      errorUnconfigured:
        'The quotation submission endpoint (VITE_QUOTATION_ENDPOINT) is not configured yet. Your entered details have been preserved—please configure the Google Apps Script endpoint or contact our team directly.',
      errorRejected:
        'The server did not confirm successful processing of your request. Your details are preserved—please retry or contact our team directly.',
      errorNetwork:
        'A network error prevented submitting your request. All your entered details have been preserved—please check your connection and try again.',
      viewContactChannels: 'View direct contact channels',
      step1Legend: '1. Request Type *',
      selectedLabel: 'Selected',
      selectLabel: 'Select',
      requestTypes: {
        Standard: {
          title: 'Standard',
          subtitle: 'Regular farm or landscaping organic compost orders.',
        },
        Bulk: {
          title: 'Bulk',
          subtitle: 'High-volume commercial supply and scheduled deliveries.',
        },
        Customized: {
          title: 'Customized',
          subtitle: 'Tailored specifications, crop context, or documentation.',
        },
      },
      step2LegendSuffix: 'Order Details',
      packagingLabel: 'Packaging Preference',
      packagingOptions: ['To be advised', 'Bagged', 'Loose bulk'],
      standardQtyLabel: 'Estimated Quantity (tons or m³)',
      standardQtyPlaceholder: 'e.g., 15 metric tons or 25 m³',
      bulkVolumeLabel: 'Estimated Bulk Quantity (tons or m³) *',
      bulkVolumePlaceholder: 'e.g., 100 metric tons',
      deliveryFreqLabel: 'Delivery Schedule',
      deliveryFreqOptions: ['One-time delivery', 'Seasonal shipments', 'Recurring monthly supply'],
      siteAccessLabel: 'Site Unloading & Transport Access Notes',
      siteAccessPlaceholder: 'Truck access constraints, offloading equipment, or preferred dispatch hours',
      customSpecLabel: 'Customized Requirement / Specification Details *',
      customSpecPlaceholder: 'Describe your custom screening, moisture, packaging, or delivery specifications',
      targetCropLabel: 'Target Crop or Soil Context',
      targetCropPlaceholder: 'e.g., Sandy desert reclamation, orchards, field crops',
      docNeedsLabel: 'Documentation or Lab Testing Needed',
      docNeedsPlaceholder: 'e.g., Batch lab analysis report, sample delivery',
      step3Legend: '3. Contact & Project Information',
      fullNameLabel: 'Full Name *',
      fullNamePlaceholder: 'Enter your full name',
      orgLabel: 'Company / Farm Name',
      orgPlaceholder: 'Optional organization or farm name',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'name@company.com',
      phoneLabel: 'Phone / WhatsApp *',
      phonePlaceholder: '010 1234 5678',
      locationLabel: 'Governorate / Project Location *',
      locationPlaceholder: 'City or governorate for delivery',
      timelineLabel: 'Target Delivery Window',
      timelinePlaceholder: 'e.g., Next 2 weeks, Upcoming planting season',
      notesLabel: 'Additional Notes',
      notesPlaceholder: 'Share any additional context about your agricultural project or questions for our team',
      submitFootnote:
        'Submissions are confirmed only once our configured commercial intake endpoint acknowledges receipt.',
      submitBtn: 'Submit Quotation Request',
      submittingBtn: 'Submitting Request...',
      validationErrors: {
        requestType: 'Please select a valid quotation request type.',
        fullName: 'Please enter your full name.',
        email: 'Please enter a valid email address.',
        phone: 'Please enter a valid phone or WhatsApp number.',
        location: 'Please specify your delivery governorate or project location.',
        bulkVolume: 'Please indicate your estimated bulk quantity (tons or m³).',
        customSpecification: 'Please describe your customized requirement or application details.',
      },
    },
    contact: {
      eyebrow: 'Direct Commercial Support',
      title: 'Contact Mawariduna Mustaqabana',
      subtitle:
        'Connect directly with our commercial team for organic sugarcane compost inquiries, agricultural supply coordination, or verified lab batch documentation.',
      channelsHeading: 'Official Communication Channels',
      channelsSubheading: 'Egypt country code (+2) is automatically prepended to all phone and WhatsApp numbers.',
      phoneTitle: 'Commercial Phone',
      phoneTag: 'Direct call',
      phonePending: '01X XXXX XXXX (pending setup)',
      phoneAction: 'Call now',
      whatsappTitle: 'WhatsApp',
      whatsappTag: 'Instant messaging',
      whatsappPending: '01X XXXX XXXX (pending setup)',
      whatsappAction: 'Message on WhatsApp',
      emailTitle: 'Email',
      emailTag: 'Official correspondence & RFQs',
      emailPending: 'Official email pending configuration',
      emailAction: 'Send an email',
      facebookTitle: 'Official Facebook Page',
      facebookTag: 'Updates & agricultural campaigns',
      facebookValueConfigured: 'Mawariduna Mustaqabana on Facebook',
      facebookPending: 'Official Facebook page link pending configuration',
      facebookAction: 'Visit Facebook Page',
      useQuoteForm: 'Use quotation form',
      locationTitle: 'Company Location & Dispatch',
      locationBadge: 'Interactive Map',
      locationPending:
        'Configure the verified office or facility pin via VITE_CONTACT_LOCATION and VITE_CONTACT_LOCATION_EMBED_URL to center the map on your exact site.',
      mapIframeTitle: 'Mawariduna Mustaqabana Location Map',
      mapOpenExternal: 'Open in Google Maps',
      mapPendingBadge: 'Regional View (Egypt) — Exact pin pending',
      mapDirectionsHint: 'Verified company pin on the map — use “Open in Google Maps” for direct directions.',
      commercialBannerTitle: 'Ready to Coordinate Organic Compost Supply for Your Farm?',
      commercialBannerDesc:
        'Submit a unified quotation request for Standard, Bulk, or Customized orders, or estimate your land requirements first with the calculator.',
      ctaQuote: 'Request a Quotation',
      ctaCalc: 'Compost Calculator',
    },
  },
};

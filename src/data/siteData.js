// Deterministic pseudo-random generator for SSR/client hydration parity
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const NAV_LINKS = [
  { href: '#about', label: 'من نحن' },
  { href: '#services', label: 'خدماتنا' },
  { href: '#compost', label: 'الكومبوست' },
  { href: '#process', label: 'رحلة المخلفات' },
  { href: '#calc', label: 'حاسبة المزرعة' },
  { href: '#faq', label: 'الأسئلة الشائعة' },
  { href: '#gallery', label: 'معرض الصور' },
  { href: '#contact', label: 'تواصل معنا' },
];

export const HERO_STATS = [
  { id: 'moisture', values: [35], decimals: 0, suffix: '٪', initial: '٣٥٪', label: 'نسبة الرطوبة' },
  { id: 'organic', values: [45, 55], decimals: 0, suffix: '٪', initial: '٤٥–٥٥٪', label: 'مادة عضوية' },
  { id: 'ph', values: [6.5], decimals: 1, suffix: '', initial: '٦٫٥', label: 'درجة الحموضة pH' },
  { id: 'density', values: [500, 550], decimals: 0, suffix: '', initial: '٥٠٠–٥٥٠', label: 'كجم/م³ وزن حجمي' },
];

export const SERVICES_DATA = {
  a: [
    {
      icon: 'truck',
      brandIcon: 'iconSugarcaneStalk',
      title: 'إدارة المخلفات الزراعية',
      desc: 'جمع ونقل وتجميع المخلفات، وخاصة مخلفات قصب السكر.',
    },
    {
      icon: 'rec',
      brandIcon: 'iconSoilLeaves',
      title: 'تدوير ومعالجة المخلفات',
      desc: 'فرز وتجهيز وفرم ومعالجة المخلفات وتحويلها إلى منتجات ذات قيمة.',
    },
    {
      icon: 'leaf',
      brandIcon: 'iconCompostBag',
      title: 'إنتاج الكومبوست (الكمبوست) النباتي',
      desc: 'إنتاج وتسويق الكومبوست النباتي ١٠٠٪ المعتمد على مخلفات قصب السكر.',
    },
    {
      icon: 'gear',
      brandIcon: 'iconFieldRidges',
      title: 'تشغيل مشروعات التدوير',
      desc: 'إدارة وتشغيل مواقع ومشروعات جمع وتدوير ومعالجة المخلفات.',
    },
    {
      icon: 'flask',
      brandIcon: 'iconSproutBlades',
      title: 'المنتجات العضوية والاقتصاد الدائري',
      desc: 'سماد عضوي ومنتجات تستفيد من المخلفات وتحقق قيمة اقتصادية وبيئية.',
    },
    {
      icon: 'fuel',
      brandIcon: 'iconWaterDrop',
      title: 'الوقود الحيوي',
      desc: 'التوسع مستقبلًا في إنتاج منتجات الوقود الحيوي من المخلفات.',
    },
  ],
  b: [
    {
      icon: 'leaf',
      brandIcon: 'iconSproutBlades',
      title: 'استشارات زراعية للكومبوست',
      desc: 'تحديد احتياجات المزرعة من الكومبوست وفقًا للتربة والمحصول والمساحة.',
    },
    {
      icon: 'truck',
      brandIcon: 'iconCompostBag',
      title: 'توصيل الكومبوست إلى المزرعة',
      desc: 'نقل وتحميل وتفريغ الكومبوست مباشرة في موقع العميل في جميع المحافظات.',
    },
    {
      icon: 'phone',
      brandIcon: 'iconWaterDrop',
      title: 'الدعم الفني للمزارعين',
      desc: 'إرشادات بمعدلات الإضافة وطريقة وتوقيت استخدام الكومبوست والسماد العضوي.',
    },
    {
      icon: 'rec',
      brandIcon: 'iconSugarcaneStalk',
      title: 'جمع ونقل المخلفات',
      desc: 'تنظيم عمليات جمع ونقل المخلفات، وخاصة مخلفات قصب السكر.',
    },
    {
      icon: 'gear',
      brandIcon: 'iconSoilLeaves',
      title: 'فرز وتجهيز ومعالجة المخلفات',
      desc: 'تجهيز المخلفات للاستفادة منها وإعادة تدويرها.',
    },
    {
      icon: 'box',
      brandIcon: 'iconFieldRidges',
      title: 'حلول متكاملة للمزارع والشركات',
      desc: 'خدمات من الجمع والنقل وحتى المعالجة والاستفادة من المخلفات.',
    },
  ],
};

export const DATASHEET_ROWS = [
  { name: 'المادة العضوية', en: 'Organic Matter', min: 45, max: 55, scale: 60, unit: '٪' },
  { name: 'الكربون العضوي', en: 'Organic Carbon', min: 25, max: 32, scale: 40, unit: '٪' },
  { name: 'الألياف (السليلوز)', en: 'Cellulose', min: 15, max: 25, scale: 40, unit: '٪' },
  { name: 'النيتروجين', en: 'N', min: 0.8, max: 1.5, scale: 2, unit: '٪' },
  { name: 'الفوسفور', en: 'P', min: 0.3, max: 0.8, scale: 2, unit: '٪' },
  { name: 'البوتاسيوم', en: 'K', min: 0.5, max: 1.2, scale: 2, unit: '٪' },
  { name: 'الرطوبة', en: 'Moisture', min: 0, max: 35, scale: 60, unit: '٪' },
  { name: 'الوزن الحجمي', en: 'Bulk density', min: 500, max: 550, scale: 800, unit: ' كجم/م³' },
];

export const PROCESS_STEPS = [
  'المخلفات الزراعية',
  'الجمع',
  'النقل',
  'التجميع',
  'المعالجة',
  'التخمير',
  'التقليب',
  'التجهيز',
  'الكومبوست',
  'الاستخدام الزراعي',
];

export const FAQ_ITEMS = [
  {
    q: 'ما هو الكومبوست (الكمبوست) النباتي من مخلفات قصب السكر؟',
    a: 'الكومبوست النباتي هو سماد عضوي ومحسّن تربة طبيعي ١٠٠٪ ناتج عن التخمير والمعالجة الهوائية المنظمة لمخلفات قصب السكر الزراعية. يتميز بارتفاع نسبة المادة العضوية (٤٥–٥٥٪) وخلوّه من بذور الحشائش، مما يجعله مثاليًا لتحسين خصوبة الأراضي الرملية والطينية في مصر.',
  },
  {
    q: 'ما معدل إضافة الكومبوست للفدان؟',
    a: 'تختلف الكمية المناسبة حسب نوع المحصول ونوع التربة؛ ففي المتوسط تحتاج المحاصيل الحقلية 6–8 طن/فدان، والخضروات والنخيل 8–12 طن/فدان، والبساتين 10–14 طن/فدان، وقصب السكر 10–15 طن/فدان، والأراضي المستصلحة حديثًا 12–18 طن/فدان، مع تعديل المعدل حسب نوع التربة (رملية، جيرية، ملحية) وبكثافة مخبرية 500–550 كجم/م³. يمكنك استخدام حاسبة المزرعة بالأعلى للحصول على تقدير فوري بالطن والمتر المكعب ثم تأكيده مع فريقنا الفني.',
  },
  {
    q: 'ما الفرق بين الكومبوست النباتي ١٠٠٪ والسماد البلدي غير المعالج؟',
    a: 'الكومبوست النباتي المعالج بالتخمير الحراري والتقليب يكون كامل التحلل، خاليًا من بذور الحشائش والنيماتودا والروائح الكريهة، وبدرجة حموضة متوازنة (pH 6.5). هذا يمنح التربة قدرة أعلى على الاحتفاظ بالماء وتغذية الجذور بأمان دون التسبب في حرق النبات أو نقل آفات.',
  },
  {
    q: 'هل توفر شركة مواردنا مستقبلنا توصيل الكومبوست إلى المزارع في مصر؟',
    a: 'نعم، نوفر خدمة نقل وتحميل وتفريغ الكومبوست (الكمبوست) مباشرة إلى موقع مزرعتك أو شركتك، بالإضافة إلى استشارات زراعية ودعم فني لتحديد أفضل توقيت ومعدل إضافة لمحصولك.',
  },
  {
    q: 'هل تقوم الشركة بجمع وتدوير مخلفات قصب السكر والمخلفات الزراعية؟',
    a: 'نعم، نقدم حلولًا متكاملة للمزارع ومصانع السكر تشمل جمع ونقل وفرز ومعالجة المخلفات الزراعية، وتشغيل مواقع ومشروعات التدوير لتحويل المخلفات إلى كومبوست ومنتجات عضوية ذات قيمة اقتصادية وبيئية مستدامة.',
  },
];

export const GALLERY_ITEMS = [
  'خطوط معالجة الكومبوست',
  'تحميل الشاحنات',
  'الحفارات في الموقع',
  'كومة الكومبوست',
  'النقل للمزارع',
];

// Deterministic SVG field stalks (36 stalks for hero)
const rngHero = mulberry32(202601);
export const HERO_FIELD_STALKS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: +(i * (1176 / 35) + rngHero() * 12).toFixed(1),
  t: +(44 + rngHero() * 48).toFixed(1),
  d: (0.9 + rngHero() * 1.4).toFixed(2) + 's',
  s: (3 + rngHero() * 3).toFixed(1) + 's',
}));

// Deterministic floating leaves (9 leaves for hero)
const rngLeaves = mulberry32(202602);
export const HERO_LEAVES = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: (i * 11 + rngLeaves() * 8).toFixed(0) + '%',
  t: (14 + rngLeaves() * 12).toFixed(1) + 's',
  dl: '-' + (rngLeaves() * 20).toFixed(1) + 's',
}));

// Deterministic scene field stalks (14 stalks for process scene)
const rngScene = mulberry32(202603);
export const SCENE_FIELD_STALKS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: +(950 + i * 18 + rngScene() * 8).toFixed(1),
  t: +(40 + rngScene() * 34).toFixed(1),
  s: (3 + rngScene() * 3).toFixed(1) + 's',
  d: (rngScene() * 1.2).toFixed(2) + 's',
}));

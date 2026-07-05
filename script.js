const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollProgressBar = document.querySelector(".scroll-progress span");
const backToTopButton = document.querySelector(".back-to-top");

const updateActiveNav = () => {
  const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 130);
  if (!current) return;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
};

const updateScrollUi = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0;
  scrollProgressBar?.style.setProperty("--scroll-progress", `${progress}%`);
  backToTopButton?.classList.toggle("is-visible", window.scrollY > 720);
};

window.addEventListener("scroll", () => {
  updateActiveNav();
  updateScrollUi();
}, { passive: true });
window.addEventListener("resize", updateScrollUi);
updateActiveNav();
updateScrollUi();

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

const teacherData = [
  { name: "MS LIM 林老师", focus: "BMP / BMK · Year 5-6", intro: "UASA 小学国文主任，小学国文高年组资料研发者，专研五至六年级国文。", ig: "im_ms.lim", tags: ["primary", "language"] },
  { name: "MS JANE 贞老师", focus: "BI / MM · UASA & SPM", intro: "中小学英文精英导师，中学数学培训官，专研英文与数学考试趋势。", ig: "imms_jane", tags: ["primary", "secondary", "language", "stem"] },
  { name: "MS WIN 吴老师", focus: "SN / MM / PA · 安亲", intro: "小学数理科主任、安亲班主任，研发 Newton Memory 趣味教学与心理辅导。", ig: "im_mswin", tags: ["primary", "secondary", "aftercare", "stem"] },
  { name: "MS QIAO 巧老师", focus: "Science / PA · Form 1-5", intro: "UASA/SPM 科学主任，负责科学实验、AI 漫画教学与一纸神功教法。", ig: "im_msqiao", tags: ["secondary", "stem"] },
  { name: "MS LIAW 廖老师", focus: "安亲 · Year 1-6", intro: "小学安亲班主任，家长指定安亲老师，参与 AI 漫画教学与孩子习惯跟进。", ig: "im_msliaw", tags: ["primary", "aftercare"] },
  { name: "MS SERENE", focus: "BM · Form 1-5", intro: "中学国文科主任，国文教法研发者之一，长期培训 UASA 与 SPM 国文学生。", ig: "im_msserene", tags: ["secondary", "language"] },
  { name: "MS YANG 杨老师", focus: "Year 4-6 · 安亲", intro: "高年组安亲老师，协助孩子完成课业、建立日常学习节奏，并作为家校沟通桥梁。", ig: "im_msyang", tags: ["primary", "aftercare"] },
  { name: "MS ANGEL", focus: "BI / SN / BIO / CHE / PHY", intro: "SPM 理科主任，整合高中组英文与理科教学，帮助学生提升答题结构。", ig: "im_msangel", tags: ["secondary", "language", "stem"] },
  { name: "MS COCO", focus: "BMP / BMK · UASA & SPM", intro: "中学 BM 资料研发者，UASA 与 SPM 国文学生培训官，参与 AI 漫画教学研发。", ig: "im_mscoco", tags: ["secondary", "language"] },
  { name: "MS IRENE", focus: "BMP / BMK / BIP / BIE", intro: "小学 UASA 国文组与英文组主任，负责趣味教学与 AI 漫画教学研发。", ig: "im_ms.irene", tags: ["primary", "language"] },
  { name: "MR J 捷老师", focus: "MM / AM · Form 1-5", intro: "中学数学与高数主任，SPM 数学及高数培训官，强调步骤、速度与信心建立。", ig: "im_mrj", tags: ["secondary", "stem"] },
  { name: "MR ALLEN", focus: "SEJ / GEO / RBT / Moral", intro: "历史地理科目主任，Newton Memory 研发者，擅长把史地重点转成记忆系统。", ig: "im_mrallen", tags: ["secondary", "humanities"] },
  { name: "MR QI 旗老师", focus: "SEJ / GEO / RBT / Moral", intro: "历史地理科目主任，Newton Memory 与漫画教学研发者，负责高年组资料编辑。", ig: "im_mrqi", tags: ["secondary", "humanities"] },
  { name: "MS YEE 仪老师", focus: "BC / MM / SN · Year 1-6", intro: "UASA 小学华文主任，小学 UASA 华文资料编辑者，兼任资料品质官。", ig: "im_msyee", tags: ["primary", "language", "stem"] },
  { name: "MS ELAINE", focus: "MM / AM / PHY / BC", intro: "全国中学高数讲师，中学高数、数学、华文资料编辑者，参与华文 AI 漫画教学研发。", ig: "im.ms_elaine", tags: ["primary", "secondary", "language", "stem"] },
  { name: "MS SIA 谢老师", focus: "BM / BI / BC / MM / SN", intro: "小学趣味教学与漫画教学制作者，小学数学、英文资料编辑者，兼顾安亲跟进。", ig: "im_mssia", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS WENDY", focus: "BMP / BMK / BIP / BIE / BC / CHE", intro: "用心整合考题与提分秘籍，培育大量 A 级和 A+ 学生，专研化学漫画教学与口诀记忆法。", ig: "im_mswendy", tags: ["primary", "secondary", "language", "stem"] },
  { name: "MR SEVEN", focus: "小学历史 · 教育顾问", intro: "全国小学历史讲师与教育顾问，培育多位历史 A 学生，并协助老师进行教学咨询。", ig: "im_mrseven", tags: ["primary", "humanities"] },
  { name: "MS YAN 彦老师", focus: "BIP / BIE / SN / PA", intro: "专研 SPM 与 UASA 历届考题，被学生称为弱生救星、精英生伯乐。", ig: "im_msyan", tags: ["secondary", "language", "stem"] },
  { name: "MS ELINE", focus: "BI / SN / GEO / BIO", intro: "小学与中学跨科老师，曾协助学生把 BIO 从不及格提升至 B+。", ig: "im_mseline", tags: ["primary", "secondary", "language", "stem", "humanities"] },
  { name: "MS MANDY", focus: "BM / SC / BC · 安亲", intro: "小学科学资料研发者，蝉联小学科学全国讲师，保持小学科学及格率 100%。", ig: "im_msmandy", tags: ["primary", "secondary", "aftercare", "language", "stem"] },
  { name: "MS ALICE", focus: "BMP / BMK / MM / AM", intro: "中学 MM 主任，独家中学数学资料研发者，整合最新考题资料。", ig: "im_msalice", tags: ["primary", "secondary", "language", "stem"] },
  { name: "MS SOH 苏老师", focus: "BIP / BIE / MM · Year 1-6", intro: "小学英文资料研发者与趣味教学研发者，擅长帮助基础生建立信心。", ig: "im_mssoh", tags: ["primary", "language", "stem"] },
  { name: "MS JUN 均老师", focus: "BM / SC / BC / MM · 安亲", intro: "全国小学科学讲师，小学科学及数学资料研发者，家长指定的用心老师。", ig: "im_msjun", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS LE 乐老师", focus: "BMP / BMK / MM · Form 1-5", intro: "专研 SPM 最新考题趋势与评分改法，打造高效精简笔记。", ig: "im_msle", tags: ["secondary", "language", "stem"] },
  { name: "MS HAPPY 开心老师", focus: "BMP / BMK / BI / BIE", intro: "UASA 与 SPM 资料研发者之一，学生指定的金牌老师。", ig: "im_mshappy", tags: ["secondary", "language"] },
  { name: "MS YAO 瑶老师", focus: "幼儿 / 安亲 · BC BM BI MM", intro: "学生情绪引导者，家长指定用心安亲老师，研发 Newton Memory 趣味教学法。", ig: "im_msyao", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS KOH 许老师", focus: "BC / BI / BM · Year 1-6", intro: "专研漫画式教学法，帮助基础生走稳学习路线。", ig: "im_mskoh", tags: ["primary", "language"] },
  { name: "MS XIAN 娴老师", focus: "BMP / BMK / BC / SN", intro: "漫画教学研发者，深度理解中小学国文答题与写作格式。", ig: "im_msxian", tags: ["primary", "language", "stem"] },
  { name: "MS TEO 张老师", focus: "英文 / 数学 / 科学 · 安亲", intro: "幼儿、小学与安亲老师，耐心负责，深受家长信任与指定。", ig: "im_msteo", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS CHLOE", focus: "SEJ / GEO / BMP / BMK / BC", intro: "UASA 教学资料研发者之一，漫画式教学法研发者，帮助学生显著进步。", ig: "im_mschloe", tags: ["primary", "secondary", "language", "humanities"] },
  { name: "MS SHARON", focus: "BIE / BIP · Year 3-6", intro: "长期辅导小学英文，擅长帮助基础薄弱、词汇量不足的学生建立信心。", ig: "im_mssharon", tags: ["primary", "language"] },
  { name: "MS MIN 敏老师", focus: "BC / BMP / BMK / SN · 安亲", intro: "系统性跟进作业与学习进度，帮助学生建立稳定学习习惯。", ig: "im_msmin", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS WENN 汶老师", focus: "BMP / BMK / BC / MM / SN / BI", intro: "以品格教育为核心，教学与安亲并行，全面照顾学习与成长。", ig: "im_mswenn", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS CRYSTAL", focus: "SEJ / GEO / BI / SN", intro: "深入研究 UASA 与 SPM BI，让学生知道考什么、怎么拿分。", ig: "im_mscrystal", tags: ["secondary", "language", "stem", "humanities"] },
  { name: "MS KELLY", focus: "安亲", intro: "从功课到行为全程陪伴，针对常见安亲功课问题设计清晰流程。", ig: "im_mskelly", tags: ["aftercare"] },
  { name: "MS BELLA", focus: "MM / SN / BIP / BIE", intro: "小学数理与英文老师，培育多位 A 等学生，重视孩子正确思想与方向。", ig: "im_msbella", tags: ["primary", "language", "stem"] },
  { name: "MS ABBY", focus: "BMP / BMK / BI / MM / BC / BIO", intro: "小学 UASA 专研者之一，SPM Bio 及格率 100%，擅长陪进步生与精英生成长。", ig: "im_msabby", tags: ["primary", "secondary", "language", "stem"] },
  { name: "MS YUAN 缘老师", focus: "BMP / BMK / SN / MM / BI", intro: "专研 UASA 考题，趣味教学与 AI 漫画研发者之一，培育多位 A 等学生。", ig: "im_msyuan", tags: ["primary", "secondary", "language", "stem"] },
  { name: "MS RUO 洛老师", focus: "BMP / BMK / BC / SN · 安亲", intro: "安亲班负责老师，细心照顾学习与日常生活，课堂趣味生动。", ig: "im_msruo", tags: ["primary", "aftercare", "language", "stem"] },
  { name: "MS XUAN 瑄老师", focus: "SEJ / BC / BMK / BMP", intro: "熟悉课程重点与考试方向，善于将复杂内容系统化讲解。", ig: "im_msxuan", tags: ["primary", "language", "humanities"] },
  { name: "MS TIAN 恬老师", focus: "幼儿华文 · 安亲", intro: "幼儿班语文老师，课堂温暖有趣，耐心陪伴孩子爱上学习。", ig: "im_mstian", tags: ["primary", "aftercare", "language"] },
  { name: "MS MOON", focus: "小学安亲", intro: "细心跟进功课与学习习惯，在温暖有秩序的环境中让孩子安心成长。", ig: "im_msmoon", tags: ["primary", "aftercare"] },
  { name: "MS TAN", focus: "SPM 英文写作", intro: "拥有十多年教学经验，专研 SPM 英文写作与最新考题资源。", ig: "im_mstan", tags: ["secondary", "language"] },
  { name: "MS APPLE", focus: "中小学教育顾问", intro: "金牌教育顾问，帮助超过 1000 位家长学生解决学习困扰。", ig: "im_msapple", tags: ["primary", "secondary"] },
  { name: "MS JOYI", focus: "中小学教育顾问", intro: "金牌教育顾问，拥有超过九年顾问经验，深受家长和学生爱戴。", ig: "im_msjoyi", tags: ["primary", "secondary"] },
  { name: "MS PURPLE", focus: "小学安亲", intro: "金牌安亲老师，家长指定老师，擅长协助孩子改善态度问题。", ig: "im_mspurple", tags: ["primary", "aftercare"] },
  { name: "MS CHERRY", focus: "小学安亲", intro: "金牌安亲老师，深受安亲学生爱戴，参与孩童心理辅导课程。", ig: "im_mscherry", tags: ["primary", "aftercare"] }
].map((teacher, index) => ({
  ...teacher,
  image: `assets/teacher-portraits/teacher-${String(index + 1).padStart(2, "0")}.jpg`,
  index
}));

const teacherDirectory = document.querySelector("#teacherDirectory");
const facultyControls = document.querySelectorAll(".faculty-controls button");
const teacherModal = document.querySelector("#teacherModal");
const teacherModalImage = teacherModal?.querySelector("img");
const teacherModalTitle = teacherModal?.querySelector("h2");
const teacherModalFocus = teacherModal?.querySelector(".teacher-modal-focus");
const teacherModalIntro = teacherModal?.querySelector('[data-profile="intro"]');
const teacherModalAchievement = teacherModal?.querySelector('[data-profile="achievement"]');
const teacherModalIdentity = teacherModal?.querySelector('[data-profile="identity"]');
const teacherModalBadges = teacherModal?.querySelector('[data-profile="badges"]');
const teacherModalIg = teacherModal?.querySelector('[data-profile="ig"]');
const teacherModalClose = teacherModal?.querySelector(".teacher-modal-close");
const teacherFilterLabel = document.querySelector("[data-teacher-filter-label]");
const teacherCount = document.querySelector("[data-teacher-count]");
let lastTeacherTrigger = null;

const tagLabels = {
  all: "全部老师",
  primary: "小学补习",
  secondary: "中学 / SPM",
  aftercare: "安亲跟进",
  language: "语文专研",
  stem: "数理专研",
  humanities: "史地人文"
};

const advisorContacts = {
  "MS APPLE": "SUMMIT 区金牌教育顾问 · Batu Pahat 家长咨询",
  "MS JOYI": "华中区 / 中江区金牌教育顾问 · Batu Pahat 家长咨询",
  "MR SEVEN": "王国区教育顾问 · 小学历史全国讲师"
};

const advisorAchievements = {
  "MS APPLE": "金牌教育顾问，帮助超过 1000 位家长学生解决学习困扰，负责 SUMMIT 区课程咨询与报名安排。",
  "MS JOYI": "金牌教育顾问，拥有超过九年顾问经验，负责华中区与中江区课程咨询，深受家长和学生爱戴。",
  "MR SEVEN": "全国小学历史讲师与教育顾问，培育多位历史 A 学生，并负责王国区家长课程咨询。"
};

const getTeacherBadges = (teacher) => {
  const badges = teacher.tags.map((tag) => tagLabels[tag]).filter(Boolean);

  if (/主任/.test(teacher.intro)) badges.unshift("科目主任");
  if (/研发|资料|编辑/.test(teacher.intro)) badges.unshift("资料研发");
  if (/讲师|培训官|全国/.test(teacher.intro)) badges.unshift("讲师培训");
  if (/顾问/.test(teacher.intro) || Object.keys(advisorContacts).some((key) => teacher.name.startsWith(key))) badges.unshift("主要咨询");
  if (/100%|A\+|A 学生|A 等/.test(teacher.intro)) badges.unshift("成绩见证");
  if (/心理|情绪|态度|习惯|品格/.test(teacher.intro)) badges.unshift("心智引导");

  return [...new Set(badges)].slice(0, 4);
};

const buildTeacherProfile = (teacher) => {
  const advisorKey = Object.keys(advisorContacts).find((key) => teacher.name.startsWith(key));
  const badges = getTeacherBadges(teacher);
  const identity = advisorContacts[advisorKey] ||
    `${badges.join(" · ")} · 學而思 Batu Pahat 教学团队`;

  const isLead = /主任|顾问|讲师|研发|培训官|资料|全国|金牌|100%|A|指定/.test(teacher.intro);
  const achievement = isLead
    ? (advisorAchievements[advisorKey] || teacher.intro)
    : `长期专注 ${teacher.focus}，在學而思系统内配合资料研发、课堂跟进与学习习惯建立，协助孩子把基础走稳。`;

  return {
    intro: `专研 ${teacher.focus}。${teacher.intro}`,
    achievement,
    identity,
    badges
  };
};

const openTeacherModal = (teacher, trigger = null) => {
  if (!teacherModal || !teacherModalImage || !teacherModalTitle || !teacherModalFocus || !teacherModalIntro || !teacherModalAchievement || !teacherModalIdentity || !teacherModalBadges || !teacherModalIg) return;

  lastTeacherTrigger = trigger;
  const profile = buildTeacherProfile(teacher);
  teacherModalImage.src = teacher.image;
  teacherModalImage.alt = teacher.name;
  teacherModalTitle.textContent = teacher.name;
  teacherModalFocus.textContent = teacher.focus;
  teacherModalBadges.innerHTML = profile.badges.map((badge) => `<span>${badge}</span>`).join("");
  teacherModalIntro.textContent = profile.intro;
  teacherModalAchievement.textContent = profile.achievement;
  teacherModalIdentity.textContent = profile.identity;
  teacherModalIg.href = `https://www.instagram.com/${teacher.ig}/`;
  teacherModalIg.textContent = `@${teacher.ig}`;
  teacherModal.classList.add("open");
  teacherModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  teacherModalClose?.focus();
};

const closeTeacherModal = () => {
  if (!teacherModal) return;
  teacherModal.classList.remove("open");
  teacherModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastTeacherTrigger?.focus?.();
  lastTeacherTrigger = null;
};

const renderTeachers = (filter = "all") => {
  if (!teacherDirectory) return;
  const filtered = filter === "all" ? teacherData : teacherData.filter((teacher) => teacher.tags.includes(filter));

  if (teacherFilterLabel) teacherFilterLabel.textContent = tagLabels[filter] || "老师团队";
  if (teacherCount) teacherCount.textContent = String(filtered.length);

  teacherDirectory.innerHTML = "";
  filtered.forEach((teacher, index) => {
    const article = document.createElement("article");
    article.className = "teacher-card reveal";
    article.dataset.teacherIndex = String(teacher.index);
    article.setAttribute("role", "button");
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-label", `查看${teacher.name}老师详细资料`);
    article.style.setProperty("--reveal-delay", `${Math.min(index * 55, 520)}ms`);

    const igUrl = `https://www.instagram.com/${teacher.ig}/`;
    const profile = buildTeacherProfile(teacher);
    article.innerHTML = `
      <figure><img src="${teacher.image}" alt="${teacher.name}" loading="lazy" /></figure>
      <div class="teacher-card-body">
        <span>${teacher.focus}</span>
        <strong>${teacher.name}</strong>
        <div class="teacher-card-badges">${profile.badges.map((badge) => `<em>${badge}</em>`).join("")}</div>
        <p>${teacher.intro}</p>
        <small>点击查看老师成就 / 介绍 / 身份</small>
        <div class="teacher-actions">
          <a href="${igUrl}" target="_blank" rel="noopener">Instagram</a>
          <a href="https://wa.me/message/LQ4ZHMNP5CMBE1" target="_blank" rel="noopener">预约试课</a>
        </div>
      </div>
    `;
    article.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openTeacherModal(teacher, article);
    });
    article.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openTeacherModal(teacher, article);
    });
    teacherDirectory.append(article);
  });

  if (prefersReducedMotion) {
    teacherDirectory.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  } else {
    observeReveals(teacherDirectory.querySelectorAll(".reveal, [data-count]"));
  }

  enableTilt(teacherDirectory);
};

facultyControls.forEach((button) => {
  button.setAttribute("aria-selected", button.classList.contains("active") ? "true" : "false");
  button.addEventListener("click", () => {
    facultyControls.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderTeachers(button.dataset.filter);
  });
});

const staggerGroups = [
  ".trust-row article",
  ".trust-proof article",
  ".promise-card",
  ".decision-card",
  ".decision-cta a",
  ".pathway-card",
  ".timeline article",
  ".method-panel",
  ".activity-copy article",
  ".review-card",
  ".result-card",
  ".result-metrics article",
  ".faq-item",
  ".advisor-card",
  ".branch-card",
  ".footer-branches article",
  ".footer > div"
];

staggerGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 85, 520)}ms`);
  });
});

const lightbox = document.querySelector("#posterLightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("modal-open");
};

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-lightbox-src]");
  if (!trigger || !lightbox || !lightboxImage) return;

  lightboxImage.src = trigger.dataset.lightboxSrc;
  lightboxImage.alt = trigger.querySelector("img")?.alt || "图片预览";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lightboxClose?.focus();
});

document.addEventListener("keydown", (event) => {
  const trigger = event.target.closest?.("[data-lightbox-src]");
  if (!trigger || (event.key !== "Enter" && event.key !== " ")) return;

  event.preventDefault();
  trigger.click();
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

const awardCarousel = document.querySelector(".award-carousel");
const awardSlides = [...document.querySelectorAll(".award-slide")];
const awardDots = document.querySelector(".award-dots");
const awardKicker = document.querySelector("[data-award-kicker]");
const awardTitle = document.querySelector("[data-award-title]");
const awardBody = document.querySelector("[data-award-body]");
const awardCopies = [
  {
    kicker: "ASEAN RECORD",
    title: "全马最多的教师培训",
    body: "成功举办了 154 场培训，赋能了 1048 位导师。"
  },
  {
    kicker: "THE MALAYSIA BOOK OF RECORD",
    title: "全马最高品质的资料",
    body: "资料品质创下马来西亚记录大全。"
  },
  {
    kicker: "ASEAN RECORD",
    title: "全马最多的教师培训",
    body: "成功举办了 154 场培训，赋能了 1048 位导师。"
  }
];
let activeAwardSlide = 0;
let awardTimer;

const showAwardSlide = (index) => {
  if (!awardSlides.length) return;
  activeAwardSlide = (index + awardSlides.length) % awardSlides.length;
  awardSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeAwardSlide);
  });
  awardDots?.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeAwardSlide);
    dot.setAttribute("aria-current", dotIndex === activeAwardSlide ? "true" : "false");
  });
  const copy = awardCopies[activeAwardSlide];
  if (copy) {
    if (awardKicker) awardKicker.textContent = copy.kicker;
    if (awardTitle) awardTitle.textContent = copy.title;
    if (awardBody) awardBody.textContent = copy.body;
  }
};

const startAwardSlider = () => {
  if (prefersReducedMotion || awardSlides.length < 2) return;
  window.clearInterval(awardTimer);
  awardTimer = window.setInterval(() => {
    showAwardSlide(activeAwardSlide + 1);
  }, 3800);
};

if (awardCarousel && awardDots && awardSlides.length) {
  awardSlides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `查看奖项照片 ${index + 1}`);
    button.addEventListener("click", () => {
      showAwardSlide(index);
      startAwardSlider();
    });
    awardDots.append(button);
  });
  showAwardSlide(0);
  startAwardSlider();
  awardCarousel.addEventListener("mouseenter", () => window.clearInterval(awardTimer));
  awardCarousel.addEventListener("mouseleave", startAwardSlider);
}

const activitySlider = document.querySelector(".activity-slider");
const activitySlides = [...document.querySelectorAll(".activity-slide")];
const activityDots = document.querySelector(".activity-dots");
let activeActivitySlide = 0;
let activityTimer;

const showActivitySlide = (index) => {
  if (!activitySlides.length) return;
  activeActivitySlide = (index + activitySlides.length) % activitySlides.length;
  activitySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeActivitySlide);
  });
  activityDots?.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeActivitySlide);
    dot.setAttribute("aria-current", dotIndex === activeActivitySlide ? "true" : "false");
  });
};

const startActivitySlider = () => {
  if (prefersReducedMotion || activitySlides.length < 2) return;
  window.clearInterval(activityTimer);
  activityTimer = window.setInterval(() => {
    showActivitySlide(activeActivitySlide + 1);
  }, 4000);
};

if (activitySlider && activityDots && activitySlides.length) {
  activitySlides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `查看活动照片 ${index + 1}`);
    button.addEventListener("click", () => {
      showActivitySlide(index);
      startActivitySlider();
    });
    activityDots.append(button);
  });
  showActivitySlide(0);
  startActivitySlider();
  activitySlider.addEventListener("mouseenter", () => window.clearInterval(activityTimer));
  activitySlider.addEventListener("mouseleave", startActivitySlider);
}

const courseMatches = {
  preschool: {
    stage: "5-6 岁 · 学前基础",
    title: "先建立语言、数学与专注力基础",
    body: "适合准备进入小学、需要建立课堂习惯与三语基础的孩子。",
    points: ["国英华数启蒙", "聆听、阅读、书写与表达", "专注力和课堂习惯"],
    cta: "WhatsApp MS JOYI",
    link: "https://wa.me/60177968266"
  },
  lower: {
    stage: "Year 1-3 · 小学低年级全能班",
    title: "把功课、基础和表达能力一起跟稳",
    body: "适合刚进入小学、需要老师陪伴建立学习节奏与各科基础的孩子。",
    points: ["功课同步监督", "国英华数科系统跟进", "表达与逻辑启蒙"],
    cta: "WhatsApp MS APPLE",
    link: "https://wa.me/60177967602"
  },
  upper: {
    stage: "Year 4-6 · UASA 全科专家",
    title: "开始进入考试格式、理解能力与答题技巧训练",
    body: "适合准备 UASA、需要全科拉齐并强化作文、理解、数理和历史的孩子。",
    points: ["13 州考题趋势", "UASA 答题格式", "作文与理解双线提升"],
    cta: "WhatsApp MR SEVEN",
    link: "https://wa.me/60177565928"
  },
  secondary: {
    stage: "Form 1-5 · 中学 / SPM 系统补习",
    title: "按科目难度分层推进，目标更清楚",
    body: "适合中学生面对 UASA、SPM 或单科弱项，需要笔记、考题和老师系统带领。",
    points: ["14 科系统补习", "KBAT 与 A+ 技巧", "一纸笔记与考题攻略"],
    cta: "WhatsApp MS JOYI",
    link: "https://wa.me/60177968266"
  }
};

const courseMatchButtons = document.querySelectorAll("[data-course-match]");
const courseMatchCard = document.querySelector(".course-match-card");
const matchStage = document.querySelector("[data-match-stage]");
const matchTitle = document.querySelector("[data-match-title]");
const matchBody = document.querySelector("[data-match-body]");
const matchList = document.querySelector("[data-match-list]");
const matchLink = document.querySelector("[data-match-link]");

const renderCourseMatch = (key) => {
  const match = courseMatches[key];
  if (!match || !courseMatchCard || !matchStage || !matchTitle || !matchBody || !matchList || !matchLink) return;

  courseMatchCard.classList.add("is-changing");
  window.setTimeout(() => {
    matchStage.textContent = match.stage;
    matchTitle.textContent = match.title;
    matchBody.textContent = match.body;
    matchLink.textContent = match.cta;
    matchLink.href = match.link;
    matchList.innerHTML = match.points.map((point) => `<li>${point}</li>`).join("");
    courseMatchCard.classList.remove("is-changing");
  }, 140);
};

courseMatchButtons.forEach((button) => {
  button.setAttribute("aria-selected", button.classList.contains("active") ? "true" : "false");
  button.addEventListener("click", () => {
    courseMatchButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderCourseMatch(button.dataset.courseMatch);
  });
});

const tiltSelectors = [
  ".award-stage article",
  ".decision-card",
  ".pathway-card",
  ".course-match-card",
  ".method-panel",
  ".promise-card",
  ".review-card",
  ".result-card",
  ".teacher-card",
  ".advisor-card",
  ".branch-card"
];

const resetTilt = (element) => {
  element.classList.remove("is-tilting");
  element.style.setProperty("--tilt-x", "0deg");
  element.style.setProperty("--tilt-y", "0deg");
  element.style.setProperty("--shine-x", "50%");
  element.style.setProperty("--shine-y", "0%");
};

const enableTilt = (root = document) => {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  root.querySelectorAll(tiltSelectors.join(",")).forEach((element) => {
    if (element.dataset.tiltReady === "true") return;
    element.dataset.tiltReady = "true";

    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * 5.5;
      const tiltY = (x - 0.5) * 6.5;

      element.classList.add("is-tilting");
      element.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      element.style.setProperty("--shine-x", `${(x * 100).toFixed(1)}%`);
      element.style.setProperty("--shine-y", `${(y * 100).toFixed(1)}%`);
    });

    element.addEventListener("mouseleave", () => resetTilt(element));
  });
};

enableTilt();

teacherModalClose?.addEventListener("click", closeTeacherModal);
teacherModal?.addEventListener("click", (event) => {
  if (event.target === teacherModal) closeTeacherModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeTeacherModal();
  }
});

let revealObserver;

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);
const animatedCounters = new WeakSet();

const animateCount = (element) => {
  if (animatedCounters.has(element)) return;

  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;

  animatedCounters.add(element);
  const duration = 1200;
  const startTime = performance.now();

  element.textContent = "0";

  const tick = (now) => {
    const elapsed = Math.min((now - startTime) / duration, 1);
    const eased = easeOutCubic(elapsed);
    element.textContent = String(Math.round(target * eased));

    if (elapsed < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = String(target);
      element.classList.add("count-pop");
      element.addEventListener("animationend", () => element.classList.remove("count-pop"), { once: true });
    }
  };

  requestAnimationFrame(tick);
};

const observeReveals = (elements) => {
  if (!revealObserver) return;
  elements.forEach((element) => revealObserver.observe(element));
};

if (prefersReducedMotion) {
  renderTeachers();
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  document.querySelectorAll("[data-count]").forEach((element) => {
    element.textContent = element.dataset.count;
  });
} else {
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);

      if (entry.target.matches("[data-count]")) {
        animateCount(entry.target);
      }

      observer.unobserve(entry.target);
    });
  }, {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.18
  });

  renderTeachers();
  observeReveals(document.querySelectorAll(".reveal, [data-count]"));
}

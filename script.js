/* ==========================================================================
   PCGuide — Интерактивная логика сайта (Конфигуратор и Мини-тест)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBuilder();
  initQuiz();
});

/* --------------------------------------------------------------------------
   1. Мобильное меню навигации
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Закрывать меню при клике по ссылке
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   2. Интерактивный подбор сборки ПК
   -------------------------------------------------------------------------- */
const BUILD_DATA = {
  office: {
    badge: 'Бюджетная сборка',
    title: 'Компьютер для работы, сёрфинга и учёбы',
    price: '~30 000 – 40 000 ₽',
    desc: 'Тихий и надёжный системный блок для текстовых редакторов, десятков вкладок в браузере, просмотра видео в 4K и простых нетребовательных задач.',
    parts: [
      { part: 'Процессор (CPU)', name: 'Intel Core i3-12100 или AMD Ryzen 3 3200G', reason: 'Включает встроенное графическое ядро — отдельная видеокарта не нужна!' },
      { part: 'Материнская плата', name: 'Чипсет Intel H610 или AMD A520', reason: 'Базовый надёжный функционал без лишних переплат' },
      { part: 'Память (RAM)', name: '16 ГБ DDR4 (2 × 8 ГБ) 3200 МГц', reason: 'Две планки для двухканального режима, система работает плавно' },
      { part: 'Накопитель (SSD)', name: '512 ГБ M.2 NVMe SSD', reason: 'Мгновенная загрузка Windows за 7-10 секунд' },
      { part: 'Видеокарта (GPU)', name: 'Встроенное видеоядро процессора', reason: 'Экономит до 50% бюджета, отлично справляется с видео и рабочим столом' },
      { part: 'Блок питания', name: '450–500 Вт (Deepcool / 1stPlayer)', reason: 'С огромным запасом надёжности для экономичной сборки' },
      { part: 'Охлаждение и корпус', name: 'Компактный корпус + кулер на 100 Вт', reason: 'Тихая работа без лишнего шума' }
    ]
  },
  gaming: {
    badge: 'Народный хит для игр',
    title: 'Оптимальный ПК для Full HD и 2K гейминга',
    price: '~80 000 – 95 000 ₽',
    desc: 'Идеальный баланс цены и мощности. Выдает 80–140+ FPS в современных играх (Cyberpunk 2077, CS2, Dota 2, GTA V, Warzone) на высоких настройках графики.',
    parts: [
      { part: 'Процессор (CPU)', name: 'AMD Ryzen 5 5600 или Intel Core i5-12400F', reason: '6 быстрых ядер и 12 потоков — золотой стандарт для гейминга' },
      { part: 'Материнская плата', name: 'Чипсет AMD B550 или Intel B760', reason: 'Слот PCIe 4.0 и радиаторы охлаждения на питании процессора' },
      { part: 'Память (RAM)', name: '32 ГБ (2 × 16 ГБ) DDR4 3600 МГц', reason: 'Запас для комфортной игры без закрытия браузера и Discord' },
      { part: 'Накопитель (SSD)', name: '1 ТБ M.2 NVMe SSD (до 5000 МБ/с)', reason: 'Быстрая загрузка уровней и место для 8–10 крупных игр' },
      { part: 'Видеокарта (GPU)', name: 'NVIDIA GeForce RTX 4060 8GB / RX 7600', reason: 'Поддержка DLSS 3, трассировки лучей и высокая энергоэффективность' },
      { part: 'Блок питания', name: '600–650 Вт 80 PLUS Bronze', reason: 'Стабильное питание и защита от скачков напряжения в сети' },
      { part: 'Охлаждение и корпус', name: 'Башенный кулер с 4 трубками + сетчатый корпус (Mesh)', reason: 'Отличная продуваемость компонентов' }
    ]
  },
  pro: {
    badge: 'Мощная рабочая станция',
    title: 'ПК для 3D-графики, монтажа 4K-видео и стримов',
    price: '~160 000 – 210 000 ₽',
    desc: 'Бескомпромиссная скорость для профессиональной работы в Blender, Premiere Pro, DaVinci Resolve, обучения локальных нейросетей и игр в 4K.',
    parts: [
      { part: 'Процессор (CPU)', name: 'AMD Ryzen 7 7800X3D или Intel Core i7-14700K', reason: 'Топовая производительность в многопоточных вычислениях и рендере' },
      { part: 'Материнская плата', name: 'AMD B650 / X670 или Intel Z790', reason: 'Мощная система питания VRM, Wi-Fi 6E и поддержка нескольких SSD M.2' },
      { part: 'Память (RAM)', name: '64 ГБ (2 × 32 ГБ) DDR5 6000 МГц', reason: 'Огромный буфер для тяжёлых видеодорожек и 3D-сцен' },
      { part: 'Накопитель (SSD)', name: '2 ТБ M.2 PCIe 4.0 SSD (до 7400 МБ/с)', reason: 'Сверхбыстрый рендеринг и экспорт тяжёлых файлов' },
      { part: 'Видеокарта (GPU)', name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB', reason: '16 ГБ скоростной видеопамяти и ядра CUDA / Tensor для рендеринга' },
      { part: 'Блок питания', name: '750–850 Вт 80 PLUS Gold (модульный)', reason: 'Высочайший КПД, японские конденсаторы и тишина' },
      { part: 'Охлаждение и корпус', name: '360-мм жидкостное охлаждение (СЖО) + просторный корпус', reason: 'Уверенное охлаждение мощного процессора под 100% нагрузкой' }
    ]
  }
};

function initBuilder() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const badgeEl = document.getElementById('build-category-badge');
  const titleEl = document.getElementById('build-title');
  const priceEl = document.getElementById('build-price');
  const descEl = document.getElementById('build-desc');
  const tbodyEl = document.getElementById('build-table-body');

  if (!tabButtons.length || !tbodyEl) return;

  function renderBuild(buildKey) {
    const data = BUILD_DATA[buildKey];
    if (!data) return;

    badgeEl.textContent = data.badge;
    titleEl.textContent = data.title;
    priceEl.textContent = data.price;
    descEl.textContent = data.desc;

    tbodyEl.innerHTML = data.parts.map(p => `
      <tr>
        <td><strong>${p.part}</strong></td>
        <td>${p.name}</td>
        <td><span style="color: var(--text-muted); font-size: 0.88rem;">${p.reason}</span></td>
      </tr>
    `).join('');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBuild(btn.getAttribute('data-build'));
    });
  });

  // Запуск первой сборки
  renderBuild('office');
}

/* --------------------------------------------------------------------------
   3. Интерактивный мини-квиз
   -------------------------------------------------------------------------- */
const QUIZ_QUESTIONS = [
  {
    q: 'Какой компонент в компьютере непосредственно отвечает за отрисовку трёхмерной графики и частоту кадров (FPS) в играх?',
    options: [
      'Центральный процессор (CPU)',
      'Видеокарта (GPU)',
      'Оперативная память (RAM)',
      'Блок питания (PSU)'
    ],
    answer: 1,
    hint: 'Правильно! Именно видеокарта с собственным графическим чипом и видеопамятью берёт на себя всю тяжесть трёхмерной графики.'
  },
  {
    q: 'В чём главное преимущество твердотельного накопителя SSD перед традиционным жёстким диском HDD?',
    options: [
      'SSD работает в 5–30 раз быстрее и не имеет хрупких механических деталей',
      'SSD вмещает намного больше терабайт за меньшие деньги',
      'SSD не требует подключения к материнской плате',
      'SSD охлаждает процессор компьютера'
    ],
    answer: 0,
    hint: 'Верно! SSD использует кремниевые чипы флеш-памяти вместо вращающихся магнитных дисков, что делает его сверхбыстрым и надёжным.'
  },
  {
    q: 'Какой объём оперативной памяти (ОЗУ) считается комфортным стандартом для домашнего и игрового ПК в 2026 году?',
    options: [
      '2 ГБ',
      '4 ГБ',
      '16 – 32 ГБ',
      '256 ГБ'
    ],
    answer: 2,
    hint: 'Точно! 16 ГБ — это надёжный современный минимум, а 32 ГБ гарантируют полный комфорт в тяжёлых играх и программах.'
  },
  {
    q: 'Почему оперативную память настоятельно рекомендуют устанавливать двумя планками (например, 2×8 ГБ вместо 1×16 ГБ)?',
    options: [
      'Чтобы одна планка отдыхала, пока работает вторая',
      'Для активации двухканального режима, удваивающего пропускную способность памяти',
      'Потому что операционная система Windows не запустится с одной планкой',
      'Это исключительно ради красивой подсветки внутри корпуса'
    ],
    answer: 1,
    hint: 'Отлично! Двухканальный режим задействует две независимые шины данных, давая бесплатную прибавку до 15-20% к скорости процессора.'
  },
  {
    q: 'Что обозначает маркировка сертификата «80 PLUS Bronze / Gold» на блоке питания?',
    options: [
      'Максимальную температуру нагрева блока питания',
      'Энергоэффективность и подтверждённый КПД не менее 80%',
      'Количество месяцев официальной гарантии',
      'Толщину металлического корпуса'
    ],
    answer: 1,
    hint: 'Правильно! Сертификат 80 PLUS гарантирует, что блок питания тратит минимум энергии впустую (на нагрев) и обеспечивает стабильное напряжение.'
  }
];

function initQuiz() {
  let currentIdx = 0;
  let score = 0;
  let answered = false;

  const badgeEl = document.getElementById('quiz-badge');
  const questionEl = document.getElementById('quiz-question-text');
  const optionsEl = document.getElementById('quiz-options-container');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next-btn');
  const restartBtn = document.getElementById('quiz-restart-btn');

  if (!questionEl || !optionsEl) return;

  function loadQuestion(idx) {
    answered = false;
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';

    const item = QUIZ_QUESTIONS[idx];
    badgeEl.textContent = `Вопрос ${idx + 1} из ${QUIZ_QUESTIONS.length}`;
    questionEl.textContent = item.q;

    optionsEl.innerHTML = '';
    item.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.addEventListener('click', () => handleSelectOption(optIdx, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleSelectOption(selectedIdx, clickedBtn) {
    if (answered) return;
    answered = true;

    const item = QUIZ_QUESTIONS[currentIdx];
    const allBtns = optionsEl.querySelectorAll('.quiz-opt-btn');

    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === item.answer) {
        btn.classList.add('correct');
      }
    });

    if (selectedIdx === item.answer) {
      score++;
      clickedBtn.classList.add('correct');
      feedbackEl.textContent = '🎉 ' + item.hint;
      feedbackEl.classList.add('success');
    } else {
      clickedBtn.classList.add('wrong');
      feedbackEl.textContent = '❌ Не совсем так. ' + item.hint;
      feedbackEl.classList.add('error');
    }

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      nextBtn.style.display = 'inline-flex';
    } else {
      showFinalResult();
    }
  }

  function showFinalResult() {
    badgeEl.textContent = 'Тест завершён!';
    questionEl.textContent = `Ваш результат: ${score} из ${QUIZ_QUESTIONS.length} правильных ответов!`;
    optionsEl.innerHTML = '';

    let message = '';
    if (score === 5) {
      message = '🏆 Превосходный результат! Вы отлично ориентируетесь в устройстве современного ПК.';
    } else if (score >= 3) {
      message = '👍 Хороший результат! Вы хорошо понимаете ключевые компоненты компьютера.';
    } else {
      message = '💡 Не расстраивайтесь! Перечитайте справочник выше и попробуйте пройти тест снова.';
    }

    feedbackEl.textContent = message;
    feedbackEl.className = 'quiz-feedback success';
    restartBtn.style.display = 'inline-flex';
  }

  nextBtn.addEventListener('click', () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      currentIdx++;
      loadQuestion(currentIdx);
    }
  });

  restartBtn.addEventListener('click', () => {
    currentIdx = 0;
    score = 0;
    loadQuestion(0);
  });

  loadQuestion(0);
}

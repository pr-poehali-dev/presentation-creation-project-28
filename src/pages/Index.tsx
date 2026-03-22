import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: 0, label: "01", title: "ТИТУЛ" },
  { id: 1, label: "02", title: "КОНЦЕПЦИЯ" },
  { id: 2, label: "03", title: "ПРОЦЕСС" },
  { id: 3, label: "04", title: "РЕЗУЛЬТАТЫ" },
  { id: 4, label: "05", title: "ГАЛЕРЕЯ" },
  { id: 5, label: "06", title: "КОНТАКТЫ" },
  { id: 6, label: "07", title: "ФИНАЛ" },
];

const IMG1 = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/ac147484-c91c-4266-9d73-19c4d486fbc6.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/60d4547c-9108-4479-8836-9e63a2d2a433.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/c1e8f863-b7db-467e-97ca-9e62619d21e8.jpg";

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [entering, setEntering] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const isAnimating = useRef(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const goTo = useCallback(
    (next: number) => {
      if (isAnimating.current || next === current) return;
      if (next < 0 || next >= SLIDES.length) return;
      isAnimating.current = true;
      setDirection(next > current ? "down" : "up");
      setEntering(true);
      setCurrent(next);
      setTimeout(() => {
        setEntering(false);
        isAnimating.current = false;
      }, 700);
    },
    [current]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  useEffect(() => {
    let ticking = false;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!ticking) {
        ticking = true;
        setTimeout(() => {
          if (e.deltaY > 0) goTo(current + 1);
          else goTo(current - 1);
          ticking = false;
        }, 50);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, goTo]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setCardTilt({ x, y });
  };

  const parallax = (depth: number) => ({
    transform: `translate(${mouse.x * depth}px, ${mouse.y * depth}px)`,
    transition: "transform 0.15s linear",
  });

  const slideClass = `slide-content ${
    entering
      ? direction === "down"
        ? "slide-enter-down"
        : "slide-enter-up"
      : "slide-visible"
  }`;

  return (
    <div className="pres-root">
      {/* Background layers */}
      <div className="pres-bg">
        <div className="bg-noise" />
        <div className="bg-grid" />
        <div
          className="bg-orb bg-orb-1"
          style={{ transform: `translate(${mouse.x * -30}px, ${mouse.y * -30}px)` }}
        />
        <div
          className="bg-orb bg-orb-2"
          style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)` }}
        />
        <div
          className="bg-orb bg-orb-3"
          style={{ transform: `translate(${mouse.x * -10}px, ${mouse.y * 15}px)` }}
        />
      </div>

      {/* Side nav dots */}
      <nav className="pres-nav">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`nav-dot ${i === current ? "nav-dot-active" : ""}`}
            onClick={() => goTo(i)}
            title={s.title}
          />
        ))}
      </nav>

      {/* Slide counter */}
      <div className="slide-counter">
        <span className="counter-current">{SLIDES[current].label}</span>
        <span className="counter-sep">/</span>
        <span className="counter-total">07</span>
      </div>

      {/* Main slide area */}
      <main className="pres-main">

        {/* 01 — ТИТУЛ */}
        {current === 0 && (
          <div className={slideClass}>
            <div className="slide-title-page">
              <div className="title-tag" style={parallax(8)}>
                <span>PRESENTATION</span>
                <span className="tag-line" />
                <span>2026</span>
              </div>
              <h1 className="main-title" style={parallax(15)}>
                <span className="title-line-1">ИДЕИ</span>
                <span className="title-line-2">
                  <em>&amp; Проекты</em>
                </span>
              </h1>
              <p className="subtitle" style={parallax(5)}>
                Интерактивная презентация концепций, процессов и результатов
              </p>
              <div className="title-cta" style={parallax(10)}>
                <button className="cta-btn" onClick={() => goTo(1)}>
                  Начать
                  <Icon name="ArrowRight" size={16} />
                </button>
                <div className="scroll-hint">
                  <Icon name="ChevronsDown" size={20} />
                  <span>Прокрутите вниз</span>
                </div>
              </div>
              <div className="title-deco" style={parallax(-20)}>◈</div>
            </div>
          </div>
        )}

        {/* 02 — КОНЦЕПЦИЯ */}
        {current === 1 && (
          <div className={slideClass}>
            <div className="slide-concept">
              <div className="section-label">02 — Концепция</div>
              <div className="concept-grid">
                <div className="concept-text">
                  <h2 className="section-title">
                    Большая
                    <br />
                    <em>Идея</em>
                  </h2>
                  <p className="body-text">
                    Каждый проект начинается с одной сильной мысли. Здесь
                    описывается ключевая концепция — то, что отличает этот
                    проект от всех остальных.
                  </p>
                  <div className="concept-tags">
                    <span className="tag">Инновации</span>
                    <span className="tag">Дизайн</span>
                    <span className="tag">Технологии</span>
                  </div>
                </div>
                <div className="concept-visual" style={parallax(12)}>
                  <div className="concept-cube">
                    <div className="cube-face cube-front">ИДЕЯ</div>
                    <div className="cube-face cube-back">ЦЕЛЬ</div>
                    <div className="cube-face cube-right">ПУТЬ</div>
                    <div className="cube-face cube-left">ИТОГ</div>
                    <div className="cube-face cube-top">СМЫСЛ</div>
                    <div className="cube-face cube-bottom">БАЗА</div>
                  </div>
                </div>
              </div>
              <div className="concept-stats" style={parallax(5)}>
                {[
                  { n: "5+", l: "лет опыта" },
                  { n: "∞", l: "возможностей" },
                  { n: "01", l: "уникальная идея" },
                ].map((s) => (
                  <div key={s.n} className="stat-item">
                    <span className="stat-num">{s.n}</span>
                    <span className="stat-label">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 03 — ПРОЦЕСС */}
        {current === 2 && (
          <div className={slideClass}>
            <div className="slide-process">
              <div className="section-label">03 — Процесс</div>
              <h2 className="section-title">
                Как это <em>работает</em>
              </h2>
              <div className="process-steps">
                {[
                  {
                    n: "01",
                    t: "Исследование",
                    d: "Глубокий анализ задачи, изучение контекста и поиск точки входа",
                  },
                  {
                    n: "02",
                    t: "Концепция",
                    d: "Формирование идеи, создание прототипов и проверка гипотез",
                  },
                  {
                    n: "03",
                    t: "Реализация",
                    d: "Воплощение концепции с вниманием к каждой детали",
                  },
                  {
                    n: "04",
                    t: "Запуск",
                    d: "Финальная полировка и презентация готового решения",
                  },
                ].map((step, i) => (
                  <div
                    key={step.n}
                    className="process-step"
                    style={{ animationDelay: `${i * 0.15}s`, ...parallax(i * 3) }}
                  >
                    <span className="step-num">{step.n}</span>
                    <div className="step-content">
                      <h3 className="step-title">{step.t}</h3>
                      <p className="step-desc">{step.d}</p>
                    </div>
                    <div className="step-line" />
                  </div>
                ))}
              </div>
              <div className="process-img" style={parallax(-15)}>
                <img src={IMG2} alt="Процесс" />
                <div className="img-overlay" />
              </div>
            </div>
          </div>
        )}

        {/* 04 — РЕЗУЛЬТАТЫ */}
        {current === 3 && (
          <div className={slideClass}>
            <div className="slide-results">
              <div className="section-label">04 — Результаты</div>
              <h2 className="section-title">
                Что <em>достигнуто</em>
              </h2>
              <div className="results-grid">
                {[
                  {
                    icon: "TrendingUp",
                    val: "+340%",
                    label: "Рост показателей",
                    desc: "По сравнению с базовым уровнем",
                  },
                  {
                    icon: "Users",
                    val: "12K+",
                    label: "Аудитория",
                    desc: "Активных пользователей ежемесячно",
                  },
                  {
                    icon: "Award",
                    val: "×3",
                    label: "Эффективность",
                    desc: "Ускорение ключевых процессов",
                  },
                  {
                    icon: "Star",
                    val: "9.4",
                    label: "Оценка",
                    desc: "Средний балл от пользователей",
                  },
                ].map((r, i) => (
                  <div
                    key={r.val}
                    className={`result-card ${hoveredCard === i ? "result-card-hovered" : ""}`}
                    style={
                      hoveredCard === i
                        ? {
                            transform: `perspective(600px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) scale(1.06)`,
                          }
                        : {}
                    }
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onMouseMove={onCardMouseMove}
                  >
                    <div className="result-icon">
                      <Icon name={r.icon as "Star"} fallback="Star" size={22} />
                    </div>
                    <div className="result-val">{r.val}</div>
                    <div className="result-label">{r.label}</div>
                    <div className="result-desc">{r.desc}</div>
                    <div className="card-shine" />
                  </div>
                ))}
              </div>
              <div className="results-img" style={parallax(10)}>
                <img src={IMG3} alt="Результаты" />
                <div className="img-overlay" />
              </div>
            </div>
          </div>
        )}

        {/* 05 — ГАЛЕРЕЯ */}
        {current === 4 && (
          <div className={slideClass}>
            <div className="slide-gallery">
              <div className="section-label">05 — Галерея</div>
              <h2 className="section-title">
                Визуальный <em>ряд</em>
              </h2>
              <div className="gallery-mosaic">
                <div className="gallery-item gallery-large" style={parallax(-8)}>
                  <img src={IMG1} alt="Концепт" />
                  <div className="gallery-caption">Концепция</div>
                </div>
                <div className="gallery-col">
                  <div className="gallery-item gallery-med" style={parallax(5)}>
                    <img src={IMG2} alt="Процесс" />
                    <div className="gallery-caption">Процесс</div>
                  </div>
                  <div className="gallery-item gallery-med" style={parallax(12)}>
                    <img src={IMG3} alt="Результат" />
                    <div className="gallery-caption">Результат</div>
                  </div>
                </div>
                <div className="gallery-item gallery-tall" style={parallax(-12)}>
                  <img src={IMG1} alt="Детали" />
                  <div className="gallery-caption">Детали</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 06 — КОНТАКТЫ */}
        {current === 5 && (
          <div className={slideClass}>
            <div className="slide-contacts">
              <div className="section-label">06 — Контакты</div>
              <div className="contacts-layout">
                <div className="contacts-text">
                  <h2 className="section-title">
                    Давайте
                    <br />
                    <em>поговорим</em>
                  </h2>
                  <p className="body-text">
                    Готовы обсудить ваш проект? Свяжитесь со мной удобным
                    способом.
                  </p>
                </div>
                <div className="contacts-cards">
                  {[
                    { icon: "Mail", label: "Email", val: "hello@example.com" },
                    { icon: "Phone", label: "Телефон", val: "+7 (900) 000-00-00" },
                    { icon: "MapPin", label: "Локация", val: "Москва, Россия" },
                    { icon: "Globe", label: "Сайт", val: "example.com" },
                  ].map((c, i) => (
                    <div
                      key={c.label}
                      className="contact-card"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="contact-icon">
                        <Icon name={c.icon as "Mail"} fallback="Mail" size={20} />
                      </div>
                      <div>
                        <div className="contact-label">{c.label}</div>
                        <div className="contact-val">{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="contact-deco" style={parallax(-18)}>
                ◈
              </div>
            </div>
          </div>
        )}

        {/* 07 — ФИНАЛ */}
        {current === 6 && (
          <div className={slideClass}>
            <div className="slide-final">
              <div className="final-bg-text">СПАСИБО</div>
              <div className="final-content" style={parallax(10)}>
                <div className="section-label">07 — Финал</div>
                <h2 className="final-title">
                  <em>Спасибо</em>
                  <br />
                  за внимание
                </h2>
                <p className="final-sub">
                  Вопросы? Идеи? Давайте создавать вместе.
                </p>
                <div className="final-actions">
                  <button className="cta-btn" onClick={() => goTo(5)}>
                    Связаться
                    <Icon name="ArrowRight" size={16} />
                  </button>
                  <button className="cta-btn cta-ghost" onClick={() => goTo(0)}>
                    С начала
                    <Icon name="RotateCcw" size={16} />
                  </button>
                </div>
              </div>
              <div className="final-deco" style={parallax(-25)}>
                <div className="deco-ring deco-ring-1" />
                <div className="deco-ring deco-ring-2" />
                <div className="deco-ring deco-ring-3" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <div className="bottom-nav">
        <button
          className="nav-btn"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          <Icon name="ChevronUp" size={20} />
        </button>
        <div className="slide-name">{SLIDES[current].title}</div>
        <button
          className="nav-btn"
          onClick={() => goTo(current + 1)}
          disabled={current === SLIDES.length - 1}
        >
          <Icon name="ChevronDown" size={20} />
        </button>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: 0, label: "01", title: "ЗАГЛАВНЫЙ" },
  { id: 1, label: "02", title: "ЦЕЛЬ" },
  { id: 2, label: "03", title: "МИССИЯ" },
  { id: 3, label: "04", title: "БАБАШКИ" },
  { id: 4, label: "05", title: "МОТОРИКА" },
  { id: 5, label: "06", title: "РЕЧЬ" },
  { id: 6, label: "07", title: "РЕЗУЛЬТАТЫ" },
  { id: 7, label: "08", title: "БУДУЩЕЕ" },
  { id: 8, label: "09", title: "СОТРУДНИЧЕСТВО" },
  { id: 9, label: "10", title: "СПАСИБО" },
];

const IMG_TITLE   = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/48c82c6a-80c7-4d28-a4bb-dbedf9a80b14.jpg";
const IMG_GOAL    = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/e620ba6d-e345-498d-a8ee-e452e648e625.jpg";
const IMG_BLOCKS  = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/f7298a93-5daf-4bc5-bc39-77ce13424ea0.jpg";
const IMG_MOTOR   = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/85124579-f53b-4f16-8dd3-4971bb0bc224.jpg";
const IMG_COLLAB  = "https://cdn.poehali.dev/projects/7f5f3e44-89fa-4c59-bf1c-58aec4e4f1cf/files/aadb86ef-daec-439b-9d2a-f50c5d5a05a5.jpg";

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [entering, setEntering] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const isAnimating = useRef(false);

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
      }, 650);
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
        }, 60);
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

  const px = (d: number) => ({
    transform: `translate(${mouse.x * d}px, ${mouse.y * d}px)`,
    transition: "transform 0.15s linear",
  });

  const sc = `slide-content ${
    entering
      ? direction === "down" ? "slide-enter-down" : "slide-enter-up"
      : "slide-visible"
  }`;

  return (
    <div className="pres-root">
      {/* Background */}
      <div className="pres-bg">
        <div className="bg-dots" />
        <div className="bg-orb bg-orb-1" style={{ transform: `translate(${mouse.x * -25}px, ${mouse.y * -25}px)` }} />
        <div className="bg-orb bg-orb-2" style={{ transform: `translate(${mouse.x * 18}px, ${mouse.y * 18}px)` }} />
        <div className="bg-orb bg-orb-3" style={{ transform: `translate(${mouse.x * -12}px, ${mouse.y * 12}px)` }} />
      </div>

      {/* Side nav */}
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

      {/* Counter */}
      <div className="slide-counter">
        <span className="counter-current">{SLIDES[current].label}</span>
        <span className="counter-sep">/</span>
        <span className="counter-total">10</span>
      </div>

      {/* Slides */}
      <main className="pres-main">

        {/* 01 — ЗАГЛАВНЫЙ */}
        {current === 0 && (
          <div className={sc}>
            <div className="s-title-layout">
              <div className="s-title-text">
                <div className="badge-tag" style={px(6)}>
                  <span className="badge-dot" />
                  Детский сад №123, г. Иркутск
                </div>
                <h1 className="main-heading" style={px(12)}>
                  День<br />
                  <em>бабашек</em>
                  <br />
                  <span className="heading-sub">— шагаем в будущее</span>
                </h1>
                <p className="greeting-text" style={px(5)}>
                  Добрый день, уважаемые коллеги!
                </p>
                <p className="intro-text" style={px(4)}>
                  Меня зовут <strong>Коростелева Анна Александровна</strong>,
                  я <strong>Петрова Наталья Андреевна</strong>.
                  Мы представляем проект «День бабашек — шагаем в будущее».
                </p>
                <button className="cta-btn" onClick={() => goTo(1)} style={px(8)}>
                  Перейти к проекту
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="s-title-img" style={px(-10)}>
                <img src={IMG_TITLE} alt="Дети и педагоги с конструктором" />
                <div className="img-frame" />
              </div>
            </div>
          </div>
        )}

        {/* 02 — ЦЕЛЬ */}
        {current === 1 && (
          <div className={sc}>
            <div className="s-two-col">
              <div className="s-text-col">
                <div className="section-label">02 — Цель проекта</div>
                <h2 className="section-heading">
                  Что мы делаем<br /><em>и зачем</em>
                </h2>
                <p className="body-p">
                  Мы помогаем детям с тяжёлыми нарушениями речи развивать
                  <strong> речь, мышление и уверенность в себе</strong> с помощью
                  конструктора БАБАШКИ.
                </p>
                <div className="goal-box">
                  <div className="goal-icon">🎯</div>
                  <p>
                    <strong>Наша цель:</strong> формировать зрительно–пространственные функции
                    и готовить детей к успешному обучению и жизни.
                  </p>
                </div>
              </div>
              <div className="s-img-col" style={px(-8)}>
                <img src={IMG_GOAL} alt="Дети строят вместе" />
                <div className="img-frame" />
              </div>
            </div>
          </div>
        )}

        {/* 03 — МИССИЯ */}
        {current === 2 && (
          <div className={sc}>
            <div className="s-mission">
              <div className="section-label">03 — Проблематика и миссия</div>
              <h2 className="section-heading">
                Мир <em>особенных</em> детей
              </h2>
              <div className="mission-cards">
                <div className="mission-card">
                  <div className="mission-emoji">🌫️</div>
                  <p>
                    Для детей 5–7 лет с тяжёлыми нарушениями речи мир слов
                    и форм может быть неясен; каждое слово даётся с трудом.
                  </p>
                </div>
                <div className="mission-card mission-card-accent">
                  <div className="mission-emoji">🔑</div>
                  <p>
                    <strong>Бабашки</strong> — это ключ к пониманию, общению
                    и уверенности в себе.
                  </p>
                </div>
                <div className="mission-card">
                  <div className="mission-emoji">🌱</div>
                  <p>
                    Через игру и строительство ребёнок познаёт себя, пространство
                    и слово.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 04 — БАБАШКИ */}
        {current === 3 && (
          <div className={sc}>
            <div className="s-two-col">
              <div className="s-img-col" style={px(-10)}>
                <img src={IMG_BLOCKS} alt="Деревянные блоки бабашки" />
                <div className="img-frame" />
              </div>
              <div className="s-text-col">
                <div className="section-label">04 — Что такое «бабашки»</div>
                <h2 className="section-heading">
                  Конструктор —<br /><em>не просто кубики</em>
                </h2>
                <ul className="feature-list">
                  <li>
                    <span className="fl-icon">🧱</span>
                    <span>Волшебные строительные блоки <strong>без жёстких креплений</strong></span>
                  </li>
                  <li>
                    <span className="fl-icon">⚖️</span>
                    <span>Учёба через физику: баланс, гравитация, пространственное мышление</span>
                  </li>
                  <li>
                    <span className="fl-icon">📐</span>
                    <span>Большой объём — дети <strong>строят в рост</strong>, действуют внутри пространства</span>
                  </li>
                  <li>
                    <span className="fl-icon">🌳</span>
                    <span>Деревянные детали с «живым весом» — радость рук и мышечная активность</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 05 — МОТОРИКА */}
        {current === 4 && (
          <div className={sc}>
            <div className="s-two-col">
              <div className="s-text-col">
                <div className="section-label">05 — Развитие через игру</div>
                <h2 className="section-heading">
                  От мелкой моторики<br /><em>к речи</em>
                </h2>
                <p className="body-p">
                  Через игру с бабашками развиваем <strong>мелкую моторику</strong> и
                  <strong> зрительно–пространственные функции</strong>.
                </p>
                <div className="arrow-chain">
                  <div className="chain-item">Моторика рук</div>
                  <Icon name="ArrowRight" size={20} />
                  <div className="chain-item">Пространство</div>
                  <Icon name="ArrowRight" size={20} />
                  <div className="chain-item">Буквы и слова</div>
                  <Icon name="ArrowRight" size={20} />
                  <div className="chain-item chain-item-accent">Речь!</div>
                </div>
                <p className="body-p" style={{ marginTop: 16 }}>
                  Эти навыки помогают ориентироваться в мире, запоминать буквы
                  и слова, снижать ошибки в письме.
                </p>
              </div>
              <div className="s-img-col" style={px(-8)}>
                <img src={IMG_MOTOR} alt="Ребёнок с блоками" />
                <div className="img-frame" />
              </div>
            </div>
          </div>
        )}

        {/* 06 — РЕЧЬ */}
        {current === 5 && (
          <div className={sc}>
            <div className="s-mission">
              <div className="section-label">06 — Речь и общение</div>
              <h2 className="section-heading">
                Мост <em>к речи</em>
              </h2>
              <div className="speech-layout">
                <div className="speech-text">
                  <p className="body-p">
                    Совместное строительство, обмен идеями и объяснение действий
                    развивают речь.
                  </p>
                  <p className="body-p">
                    Бабашки создают <strong>естественную среду для диалога</strong>,
                    сотрудничества и голоса ребёнка.
                  </p>
                  <div className="bubble-row">
                    <div className="speech-bubble">«Давай сюда!»</div>
                    <div className="speech-bubble speech-bubble-r">«Я построил!»</div>
                    <div className="speech-bubble">«Смотри как!»</div>
                  </div>
                </div>
                <div className="s-img-col speech-img" style={px(-10)}>
                  <img src={IMG_GOAL} alt="Дети общаются" />
                  <div className="img-frame" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 07 — РЕЗУЛЬТАТЫ */}
        {current === 6 && (
          <div className={sc}>
            <div className="s-results">
              <div className="section-label">07 — Результаты (март 2026)</div>
              <h2 className="section-heading">
                Что уже <em>достигнуто</em>
              </h2>
              <div className="results-list">
                {[
                  {
                    icon: "🎓",
                    bold: "25 педагогов",
                    text: "прошли повышение квалификации «Пространственное моделирование в среде конструирования \u00ABбабашки\u00BB»",
                  },
                  {
                    icon: "🏆",
                    bold: "Максимальный набор бабашек",
                    text: "приобретён в рамках регионального конкурса «Есть решение» — создан Центр конструирования",
                  },
                  {
                    icon: "🌟",
                    bold: "Статус инновационной площадки",
                    text: "федерального значения «Воспитание культурных привычек средствами пространственного моделирования»",
                  },
                  {
                    icon: "📍",
                    bold: "Демонстрация на СТЭМ-площадке",
                    text: "в Иркутске, 2026 год",
                  },
                  {
                    icon: "📋",
                    bold: "Разработаны:",
                    text: "график занятий, цикл занятий для детей с ТНР, индикаторы эффективности проекта",
                  },
                ].map((r, i) => (
                  <div key={i} className="result-row" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="rr-icon">{r.icon}</span>
                    <p><strong>{r.bold}</strong> — {r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 08 — БУДУЩЕЕ */}
        {current === 7 && (
          <div className={sc}>
            <div className="s-mission">
              <div className="section-label">08 — Цели на будущее</div>
              <h2 className="section-heading">
                Что <em>дальше?</em>
              </h2>
              <div className="future-steps">
                {[
                  {
                    n: "01",
                    t: "Укрепление функций",
                    d: "Развивать зрительно–пространственные функции детей 5–7 лет с ТНР",
                  },
                  {
                    n: "02",
                    t: "Расширение программы",
                    d: "Расширить программное обеспечение занятий и показатели эффективности",
                  },
                  {
                    n: "03",
                    t: "Семья и среда",
                    d: "Продолжать развивать взаимодействие с семьёй и образовательной средой",
                  },
                ].map((s, i) => (
                  <div key={s.n} className="future-step" style={{ animationDelay: `${i * 0.15}s` }}>
                    <div className="fs-num">{s.n}</div>
                    <div className="fs-body">
                      <div className="fs-title">{s.t}</div>
                      <div className="fs-desc">{s.d}</div>
                    </div>
                    <div className="fs-arrow">
                      <Icon name="ArrowUpRight" size={22} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 09 — СОТРУДНИЧЕСТВО */}
        {current === 8 && (
          <div className={sc}>
            <div className="s-two-col">
              <div className="s-img-col" style={px(-10)}>
                <img src={IMG_COLLAB} alt="Руки вместе над конструктором" />
                <div className="img-frame" />
              </div>
              <div className="s-text-col">
                <div className="section-label">09 — Призыв к сотрудничеству</div>
                <h2 className="section-heading">
                  Давайте строить<br /><em>вместе!</em>
                </h2>
                <p className="body-p">
                  Проект «День бабашек» — инвестиция в <strong>счастливое
                  и полноценное будущее детей</strong>.
                </p>
                <p className="body-p">
                  Приглашаем к поддержке педагогов, родителей и управленцев.
                </p>
                <div className="goal-box">
                  <div className="goal-icon">🤝</div>
                  <p>
                    <strong>Общая цель:</strong> дать детям инструменты для
                    преодоления трудностей и раскрытия потенциала.
                  </p>
                </div>
                <button className="cta-btn" onClick={() => goTo(9)}>
                  К финалу
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 10 — СПАСИБО */}
        {current === 9 && (
          <div className={sc}>
            <div className="s-final">
              <div className="final-bg-word">СПАСИБО</div>
              <div className="final-body" style={px(8)}>
                <div className="section-label">10 — Благодарность</div>
                <h2 className="final-heading">
                  <em>Спасибо</em><br />за внимание!
                </h2>
                <p className="body-p final-p">
                  Благодарим за ваше внимание и поддержку.
                </p>
                <div className="contact-row">
                  <div className="contact-item">
                    <Icon name="Mail" size={16} />
                    <span>email@detsad123.ru</span>
                  </div>
                  <div className="contact-item">
                    <Icon name="Globe" size={16} />
                    <span>detsad123-irkutsk.ru</span>
                  </div>
                </div>
                <div className="final-actions">
                  <button className="cta-btn" onClick={() => goTo(8)}>
                    Назад
                    <Icon name="ArrowLeft" size={16} />
                  </button>
                  <button className="cta-btn cta-ghost" onClick={() => goTo(0)}>
                    С начала
                    <Icon name="RotateCcw" size={16} />
                  </button>
                </div>
              </div>
              <div className="final-rings">
                <div className="deco-ring deco-ring-1" />
                <div className="deco-ring deco-ring-2" />
                <div className="deco-ring deco-ring-3" />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Bottom nav */}
      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => goTo(current - 1)} disabled={current === 0}>
          <Icon name="ChevronUp" size={20} />
        </button>
        <div className="slide-name">{SLIDES[current].title}</div>
        <button className="nav-btn" onClick={() => goTo(current + 1)} disabled={current === SLIDES.length - 1}>
          <Icon name="ChevronDown" size={20} />
        </button>
      </div>
    </div>
  );
}
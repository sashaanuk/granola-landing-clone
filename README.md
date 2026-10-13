# Granola landing — учебный клон

**Демо:** https://sashaanuk.github.io/granola-landing-clone/

Учебная копия лендинга [granola.ai](https://www.granola.ai/) на чистом HTML/CSS/JS, без фреймворков и сборщика.
С Granola проект не связан. Логотипы компаний заменены текстом, фотографии заменены градиентами.

## Запуск

Можно просто открыть `index.html` в браузере. Удобнее через локальный сервер:

```bash
npx serve .
# или
python3 -m http.server 8000
```

## Структура

```
.
├── index.html          # вся разметка, секции идут сверху вниз
├── css/
│   ├── tokens.css      # дизайн-токены: цвета, шрифты, отступы, радиусы, тени
│   ├── base.css        # reset, типографика, .container, scroll-reveal
│   ├── components.css  # кнопки, navbar, dropdown, мокап окна, chip, marquee
│   └── sections.css    # раскладка каждой секции + адаптив
├── js/main.js          # navbar-pill, dropdown, мобильное меню, табы, typewriter, чат, marquee
└── assets/logo.svg
```

## Что стоит изучить

| Приём | Где | Зачем |
|---|---|---|
| Двухслойные токены (примитивы → семантика) | `css/tokens.css` | компоненты не знают про `#5b6f00`, только про `--fill-accent`; тему меняют в одном месте |
| Fluid-типографика `clamp()` | `--text-h1`, `--text-h2` | заголовок плавно масштабируется без media queries |
| `max-width: 10ch` | `.hero__title` | ширина в символах даёт одинаковые переносы на любом экране |
| Navbar → «пилюля» при скролле | `.navbar.is-scrolled` + `main.js` | класс переключается в JS, анимацию делает CSS `transition` |
| Бесконечная бегущая строка | `.marquee` + `main.js` | контент дублируется, трек сдвигается на `-50%` и бесшовно зацикливается |
| Scroll-reveal | `.reveal` + `IntersectionObserver` | без слушателя `scroll` на каждом кадре |
| Bento-сетка | `.bento`, `grid-column: span 2` | карточки разного размера на одном grid |
| `prefers-reduced-motion` | `base.css` | анимации отключаются, если пользователь так настроил систему |

## Шрифты

Оригинальные шрифты коммерческие, вместо них бесплатные аналоги из Google Fonts:

- **Quadrant** (serif для заголовков) → **Newsreader**
- **KMR Melange Grotesk** (основной текст) → **Inter Tight**
- **JetBrains Mono** — тот же

## Палитра

Взята из CSS оригинала (шкала «oats»): тёплые нейтральные `#fcfcf8 … #212121`,
оливковый акцент `#5b6f00`, лаймовый хайлайт `#d1e043`.

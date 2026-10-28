# Pixie: оформление стрима

Тема — «волшебный ночной лес»: крылышки феи, светящиеся грибочки и летающая пыльца.

- **index.html** — анимированная презентация всего дизайна (её и показывает сайт).
- **guide.html** — превью с размерами и инструкцией для OBS.

| Что | Файл |
|---|---|
| Скоро начнём (с таймером) | `scenes/starting.html` |
| Просто общение (вебка + чат) | `scenes/chatting.html` |
| Скоро вернусь | `scenes/brb.html` |
| Спасибо за стрим | `scenes/ending.html` |
| Игровой оверлей (прозрачный) | `overlays/game.html` |
| Отдельная рамка для вебки | `overlays/webcam.html` |
| Алерты: фолловер, саб, донат, рейд | `alerts/alert.html` |
| Картинки для Twitch и весь дизайн одной картинкой | `export/*.png`, `export/pixie-showcase.jpg` |

**Ник, соцсети, фразы, расписание** правятся в `config.js`.
После правок пересобери картинки (Windows, нужен Microsoft Edge):

```
powershell -ExecutionPolicy Bypass -File export.ps1
```

Шрифты (Pacifico, Comfortaa, Nunito) лежат в `assets/fonts`, интернет для них не нужен.

Сайт: https://w1ldh4re.github.io/pixie-showcase/ (запасной адрес: https://pixie-showcase.vercel.app)

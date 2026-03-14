# Защищённая версия MMO (один HTML)

**Не меняет** `mmo-map.html`. Один скрипт → один файл.

## Сборка

```bash
node scripts/build-protected-mmo.js
```

Результат: **mmo-map-protected.html** в корне — весь код игры в одном файле в виде зашифрованного blob (AES-GCM), расшифровка в браузере без fetch и без сервера. Работает с file:// и GitHub Pages.

Свой ключ: `MMO_ENCRYPT_KEY=секрет node scripts/build-protected-mmo.js`

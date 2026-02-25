# Биометрические данные

Поместите CSV файлы с данными PhysioNet и WESAD в эту директорию.

## Формат данных

### PhysioNet (ECG + RESP)
`physionet_ecg_resp.csv`:
```csv
timestamp,ecg,resp
1730700000000,0.012,-0.18
1730700000010,0.018,-0.17
```

### WESAD (эмоциональные метки)
`wesad_labels.csv`:
```csv
start_ts,end_ts,label
1730700000000,1730700300000,calm
1730700300000,1730700600000,stress
```

## Использование

В коде:
```typescript
await biometricSimulator.loadFromDatasets({
    physioUrl: '/data/physionet_ecg_resp.csv',
    wesadUrl: '/data/wesad_labels.csv',
    targetHz: 30
});
biometricSimulator.playExternal();
```

## Демо-данные

В этой директории уже есть примеры:
- `physionet_ecg_resp.csv` — демо-данные ECG и дыхания (~31 секунда)
- `wesad_labels.csv` — демо-метки эмоций с переходами между состояниями

Эти файлы можно использовать для тестирования интеграции с реальными данными.


# Pulsar OEE - Manufacturing Dashboard

Sistema integral de monitoreo OEE (Overall Equipment Effectiveness) en tiempo real para manufactura.

## 📋 Estructura del Proyecto

```
OEE/
├── pulsar_oee/              # Módulo Odoo
│   ├── __init__.py
│   ├── __manifest__.py
│   ├── models/
│   ├── views/
│   ├── security/
│   ├── reports/
│   ├── controllers/
│   └── data/
│
└── frontend/                # Frontend React
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── types/
    │   ├── data/
    │   └── App.tsx
    ├── package.json
    └── tailwind.config.js
```

## 🚀 Instalación

### Backend (Odoo Module)
1. Copiar carpeta `pulsar_oee/` a `addons/` en tu instancia Odoo
2. Activar modo desarrollador en Odoo
3. Ir a Aplicaciones > Actualizar lista
4. Buscar e instalar "Pulsar OEE"

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 📊 Características

- ✅ Dashboard en tiempo real
- ✅ Cálculo automático de OEE
- ✅ Monitoreo de máquinas
- ✅ Registro de paradas
- ✅ Reportes y análisis
- ✅ Alertas y notificaciones
- ✅ APIs REST para integración

## 🔐 Seguridad

- Control de acceso basado en roles
- Permisos granulares por módulo
- Auditoría de cambios

## 📝 Versión

v1.0.0 - Mayo 2026

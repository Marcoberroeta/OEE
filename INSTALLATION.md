# Pulsar OEE - Manufacturing Dashboard

## 📋 Project Overview

Pulsar OEE is a complete manufacturing monitoring solution combining:

### Backend (Odoo Module)
- Real-time OEE calculation
- Machine status tracking
- Production order management
- Machine stop/downtime logging
- Analytics and metrics
- REST API for frontend integration

### Frontend (React Dashboard)
- Modern, responsive UI
- Real-time machine monitoring
- Production metrics visualization
- Alerts and notifications
- Analytics and reporting

## 🚀 Getting Started

### Backend (Odoo)

1. Copy `pulsar_oee/` folder to your Odoo `addons/` directory
2. Activate developer mode in Odoo
3. Go to Apps > Update Apps List
4. Search for "Pulsar OEE" and install

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Access the dashboard at `http://localhost:5173`

## 📚 Documentation

- [Backend Documentation](pulsar_oee/README.md)
- [Frontend Documentation](frontend/README.md)

## 🏗️ Architecture

```
Pulsar OEE
├── Backend (Odoo)
│   ├── Models (Machine, Production, Stops, Metrics)
│   ├── Views (Forms, Trees, Kanbans)
│   └── APIs (REST endpoints)
└── Frontend (React)
    ├── Pages (Dashboard, Real-time, Analytics)
    ├── Components (Cards, Charts, Tables)
    └── Data Layer (API client)
```

## 📊 Key Features

- **Real-time Monitoring**: Live machine status and metrics
- **OEE Calculation**: Automatic availability, performance, quality metrics
- **Production Tracking**: Order management and completion
- **Downtime Analysis**: Stop reason logging and analysis
- **Reporting**: Metrics export and analytics
- **Alerts**: Real-time notifications
- **User Management**: Role-based access control

## 🔒 Security

- Role-based access control (RBAC)
- User authentication via Odoo
- Audit trails for all changes
- Secure API endpoints

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and conventions.

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues and questions, please open a GitHub issue.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Machine learning predictions
- [ ] Integration with ERP systems
- [ ] Real-time data streaming (WebSockets)
- [ ] Multi-site support

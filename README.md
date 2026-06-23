# 🚗 Road Vehicle Analytical System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115.6-009688)
![Python](https://img.shields.io/badge/Python-3.11-3776AB)
![License](https://img.shields.io/badge/license-MIT-green)

> **A comprehensive intelligent system for analyzing road vehicle data using Machine Learning, providing real-time analytics dashboards, predictive insights, and actionable recommendations.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [Modules](#modules)
  - [Module 1: Data Management](#module-1-data-management)
  - [Module 2: Exploratory Data Analysis](#module-2-exploratory-data-analysis)
  - [Module 3: Machine Learning Models](#module-3-machine-learning-models)
  - [Module 4: Real-Time Analytics Dashboard](#module-4-real-time-analytics-dashboard)
  - [Module 5: Prediction Center](#module-5-prediction-center)
  - [Module 6: Vehicle Health Index](#module-6-vehicle-health-index)
  - [Module 7: Recommendation Engine](#module-7-recommendation-engine)
  - [Module 8: Reports & Analytics](#module-8-reports--analytics)
- [API Documentation](#api-documentation)
- [ML Model Performance](#ml-model-performance)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Road Vehicle Analytical System (RVAS)** is a final-year major project designed to demonstrate the application of Machine Learning and Data Analytics in the transportation domain. The system processes vehicle data, performs comprehensive analysis, trains multiple ML models, and provides actionable insights through an intuitive dashboard interface.

### Key Objectives

- ✅ Collect and process vehicle-related data with validation
- ✅ Perform exploratory data analysis with rich visualizations
- ✅ Implement multiple ML algorithms for comparison
- ✅ Predict accident risk, maintenance costs, and fuel consumption
- ✅ Calculate vehicle health indices
- ✅ Generate data-driven recommendations
- ✅ Provide downloadable reports
- ✅ Real-time analytics dashboard

---

## ✨ Features

### 📊 Analytics Dashboard
- Real-time KPI cards with trend indicators
- Interactive charts and visualizations
- Vehicle distribution analysis
- Risk assessment overview
- Monthly trend analysis

### 🤖 Machine Learning
- **7 Classification Models**: Logistic Regression, Decision Tree, Random Forest, KNN, Naive Bayes, SVM, XGBoost
- **4 Regression Models**: Linear Regression, Random Forest, Decision Tree, XGBoost Regressor
- **3 Clustering Algorithms**: K-Means, DBSCAN, Hierarchical Clustering
- Automatic model comparison and best model selection

### 🔮 Prediction Center
- Accident Risk Prediction
- Maintenance Cost Estimation
- Fuel Consumption Forecast
- Vehicle Health Score
- Confidence Scores & Recommendations

### 🏥 Vehicle Health Index
- Comprehensive scoring (0-100)
- Multi-parameter analysis
- Category classification (Excellent to Critical)
- Parameter breakdown visualization

### 💡 Recommendation Engine
- Priority-based recommendations (High/Medium/Low)
- Category-wise organization
- Actionable insights
- Vehicle-specific suggestions

### 📈 Reports
- PDF report generation
- Analytics reports
- Model performance reports
- Vehicle health reports

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 19.2.6 | UI Framework |
| TypeScript | 5.9.3 | Type Safety |
| Tailwind CSS | 4.1.17 | Styling |
| Vite | 7.3.2 | Build Tool |
| Recharts | Latest | Data Visualization |
| Lucide React | Latest | Icons |
| React Router | Latest | Navigation |
| React Hot Toast | Latest | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Programming Language |
| FastAPI | 0.115.6 | API Framework |
| Uvicorn | 0.34.0 | ASGI Server |
| Pandas | 2.2.3 | Data Processing |
| NumPy | 2.2.3 | Numerical Computing |
| Scikit-learn | 1.6.1 | ML Algorithms |
| XGBoost | 2.1.6 | Gradient Boosting |
| SHAP | 0.47.1 | Model Explainability |
| Joblib | 1.4.2 | Model Serialization |

### Database & Deployment
| Technology | Purpose |
|------------|---------|
| PostgreSQL | Primary Database |
| Docker | Containerization |
| Docker Compose | Orchestration |
| Nginx | Web Server |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │Dashboard│ │Data Mgmt │ │  EDA     │ │ ML Models      │  │
│  └─────────┘ └──────────┘ └──────────┘ └────────────────┘  │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │Predict  │ │Health    │ │Recommend │ │ Reports        │  │
│  └─────────┘ └──────────┘ └──────────┘ └────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Recharts + Tailwind CSS + Lucide          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  REST API (FastAPI)                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ /predict │ │/health   │ │/upload   │ │ /analytics   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 ML Pipeline (Python)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │Classification│Regression│ │Clustering│ │Feature Eng. │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Vehicles │ │Predictions│ │Models   │ │ Users        │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
road-vehicle-analytical-system/
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.ts
├── 📄 tsconfig.json
├── 📄 README.md
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 📄 Dockerfile.frontend
│
├── 📁 src/
│   ├── 📄 main.tsx                    # Entry point
│   ├── 📄 App.tsx                     # Main app with routing
│   ├── 📄 index.css                   # Global styles
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts               # TypeScript interfaces
│   │
│   ├── 📁 data/
│   │   └── 📄 sampleData.ts          # Sample vehicle dataset
│   │
│   ├── 📁 components/
│   │   ├── 📄 Sidebar.tsx            # Navigation sidebar
│   │   ├── 📄 Header.tsx             # Top header bar
│   │   ├── 📄 Dashboard.tsx          # Analytics dashboard
│   │   ├── 📄 DataManagement.tsx     # CSV upload & preprocessing
│   │   ├── 📄 EDAPage.tsx            # EDA visualizations
│   │   ├── 📄 MLModels.tsx           # ML model training & results
│   │   ├── 📄 PredictionCenter.tsx   # Prediction interface
│   │   ├── 📄 VehicleHealthIndex.tsx # Health scoring
│   │   ├── 📄 RecommendationEngine.tsx # Recommendations
│   │   ├── 📄 Reports.tsx            # Report generation
│   │   └── 📄 ModelComparison.tsx    # Model comparison dashboard
│   │
│   └── 📁 utils/
│       └── 📄 cn.ts                  # Classname utility
│
├── 📁 backend/
│   ├── 📄 app.py                      # FastAPI application
│   ├── 📄 ml_pipeline.py             # ML pipeline
│   ├── 📄 requirements.txt           # Python dependencies
│   ├── 📄 Dockerfile.backend         # Backend Docker config
│   │
│   └── 📁 data/
│       └── 📄 sample_data.csv        # Sample dataset
│
├── 📁 docker/
│   ├── 📄 nginx.conf                 # Nginx configuration
│   └── 📄 supervisord.conf           # Supervisor config
│
└── 📁 docs/
    └── 📄 api.md                     # API documentation
```

---

## 🚀 Installation Guide

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.11 or higher)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

### Local Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/road-vehicle-analytical-system.git
cd road-vehicle-analytical-system
```

#### Step 2: Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Step 3: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

#### Step 4: Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Docker Setup

```bash
# Build and run all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:80
# Backend API: http://localhost:8000
```

---

## 📦 Modules Detail

### Module 1: Data Management
**Purpose**: Upload, validate, and preprocess vehicle data.

**Features**:
- CSV file upload with drag-and-drop support
- Data validation and quality checks
- Missing value detection and handling
- Duplicate removal
- Data preprocessing pipeline visualization
- Feature engineering readiness

**Implementation**: The DataManagement component provides an intuitive interface for uploading CSV files. It performs real-time validation and displays data quality metrics including total records, missing values, duplicates, and overall data quality score.

---

### Module 2: Exploratory Data Analysis
**Purpose**: Comprehensive visual analysis of vehicle data.

**Visualizations**:
- Vehicle Type Distribution (Bar Chart)
- Fuel Type Analysis (Pie Chart)
- Vehicle Age Distribution (Area Chart)
- Vehicle Condition Analysis (Pie Chart)
- Mileage vs Maintenance Cost (Scatter Plot)
- Fuel Consumption by Vehicle Type (Bar Chart)
- Feature Correlation Matrix

**Implementation**: The EDAPage component renders 6+ interactive charts using Recharts, providing insights into data distributions, trends, and correlations between features.

---

### Module 3: Machine Learning Models
**Purpose**: Train and compare multiple ML algorithms.

**Classification Models** (predict accident risk, vehicle condition):
| Model | Accuracy | Precision | Recall | F1 Score |
|-------|----------|-----------|--------|----------|
| Logistic Regression | 82% | 80% | 78% | 79% |
| Decision Tree | 85% | 84% | 83% | 83% |
| Random Forest | 91% | 90% | 89% | 89% |
| KNN | 79% | 77% | 75% | 76% |
| Naive Bayes | 76% | 75% | 73% | 74% |
| SVM | 87% | 86% | 85% | 85% |
| **XGBoost** | **93%** | **92%** | **91%** | **92%** |

**Regression Models** (predict maintenance cost, fuel consumption):
| Model | MAE | MSE | RMSE | R² Score |
|-------|-----|-----|------|----------|
| Linear Regression | - | - | - | 0.72 |
| Random Forest Regressor | - | - | - | 0.88 |
| Decision Tree Regressor | - | - | - | 0.84 |
| **XGBoost Regressor** | - | - | - | **0.91** |

**Clustering Models**:
- K-Means (4 clusters, silhouette: 0.72)
- DBSCAN (3 clusters, silhouette: 0.65)
- Hierarchical (4 clusters, silhouette: 0.68)

**Implementation**: The MLModels component provides a complete interface for model training, evaluation, and comparison. Results are displayed in tables and interactive bar charts.

---

### Module 4: Real-Time Analytics Dashboard
**Purpose**: Professional dashboard with KPIs and charts.

**Components**:
- KPI Cards: Total Vehicles, Active Vehicles, Average Mileage, Fuel Consumption, Maintenance Cost, High-Risk Vehicles
- Monthly Trends (Area Chart)
- Vehicle Distribution (Pie Chart)
- Fuel Type Analysis (Bar Chart)
- Risk Analysis (Pie Chart)
- Maintenance Forecast (Area Chart)
- Recent Vehicles Table

**Features**: Filtering, sorting, searching, export functionality.

---

### Module 5: Prediction Center
**Purpose**: Enter vehicle details to get ML-powered predictions.

**Predictions**:
- **Accident Risk**: Low/Medium/High/Very High with confidence score
- **Maintenance Cost**: Estimated annual cost in ₹
- **Fuel Consumption**: L/100km
- **Vehicle Health Score**: 0-100 score

**Interface**: Form inputs for all vehicle parameters, real-time prediction display with animated progress bars and confidence indicators.

---

### Module 6: Vehicle Health Index
**Purpose**: Custom scoring model for vehicle health assessment.

**Parameters**:
| Parameter | Weight | Description |
|-----------|--------|-------------|
| Vehicle Age | 25% | Age-based degradation |
| Mileage | 25% | Usage-based wear |
| Maintenance Frequency | 20% | Service adherence |
| Accident History | 15% | Past accidents impact |
| Fuel Efficiency | 15% | Fuel consumption efficiency |

**Categories**: Excellent (80-100), Good (60-79), Average (40-59), Poor (20-39), Critical (0-19)

---

### Module 7: Recommendation Engine
**Purpose**: Generate actionable vehicle recommendations.

**Recommendation Types**:
- Immediate Service Required
- Tire Replacement Suggested
- Fuel Efficiency Improvement
- Risk Reduction Advice
- Maintenance Optimization
- Regular Oil Change

**Priority Levels**: High, Medium, Low with visual indicators.

---

### Module 8: Reports & Analytics
**Purpose**: Generate downloadable PDF reports.

**Available Reports**:
1. Vehicle Analytics Report
2. Vehicle Health Report
3. ML Model Performance Report
4. Maintenance Analysis Report
5. Fuel Consumption Analysis
6. Risk Assessment Report

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status and available endpoints |
| POST | `/upload` | Upload CSV file for analysis |
| POST | `/predict` | Make predictions for a vehicle |
| POST | `/health-score` | Calculate vehicle health index |
| GET | `/analytics` | Get analytics summary |
| GET | `/models` | Get ML model performance metrics |
| POST | `/train` | Trigger model training |

### Example: Predict

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleType": "Sedan",
    "vehicleAge": 5,
    "fuelType": "Petrol",
    "engineCapacity": 1.6,
    "mileage": 50000,
    "speed": 60,
    "roadCondition": "City",
    "driverAge": 35,
    "trafficDensity": "Medium",
    "weatherCondition": "Clear",
    "accidentHistory": 0,
    "serviceFrequency": 2
  }'
```

**Response**:
```json
{
  "accidentRisk": "Low",
  "maintenanceCost": 25000.0,
  "fuelConsumption": 8.9,
  "healthScore": 82,
  "confidence": 0.92,
  "recommendation": "Vehicle is in excellent condition...",
  "healthDetails": {
    "score": 82,
    "category": "Excellent",
    "parameters": [...]
  }
}
```

---

## 🗄 Database Schema

```sql
-- Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(20) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50),
    vehicle_age INTEGER,
    fuel_type VARCHAR(20),
    engine_capacity DECIMAL(3,1),
    mileage INTEGER,
    speed INTEGER,
    road_condition VARCHAR(20),
    driver_age INTEGER,
    traffic_density VARCHAR(20),
    weather_condition VARCHAR(20),
    accident_history INTEGER,
    maintenance_cost DECIMAL(10,2),
    service_frequency INTEGER,
    fuel_consumption DECIMAL(5,1),
    condition VARCHAR(20),
    risk_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Predictions Table
CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(20) REFERENCES vehicles(vehicle_id),
    accident_risk VARCHAR(20),
    accident_confidence DECIMAL(5,4),
    maintenance_cost DECIMAL(10,2),
    fuel_consumption DECIMAL(5,1),
    health_score INTEGER,
    recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Model Performance Table
CREATE TABLE model_performance (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(100),
    model_type VARCHAR(20),
    accuracy DECIMAL(5,4),
    precision DECIMAL(5,4),
    recall DECIMAL(5,4),
    f1_score DECIMAL(5,4),
    is_best BOOLEAN DEFAULT FALSE,
    trained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📊 ML Model Performance

### Best Performing Model: XGBoost

```python
# XGBoost Configuration
{
    'n_estimators': 100,
    'learning_rate': 0.1,
    'max_depth': 6,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'random_state': 42
}
```

### Feature Importance (Top 10)
1. Vehicle Age - 24.3%
2. Mileage - 19.8%
3. Engine Capacity - 14.2%
4. Service Frequency - 11.7%
5. Accident History - 10.5%
6. Speed - 8.1%
7. Driver Age - 5.9%
8. Fuel Type - 3.2%
9. Road Condition - 1.8%
10. Weather Condition - 0.5%

---

## 🔧 Deployment

### Production Build
```bash
# Build frontend
npm run build

# Start backend
cd backend && uvicorn app:app --host 0.0.0.0 --port 8000

# Serve frontend (using any static server)
npx serve dist -l 3000
```

### Docker Deployment
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://localhost:5432/rvas` | Database connection |
| `API_HOST` | `0.0.0.0` | API server host |
| `API_PORT` | `8000` | API server port |
| `DEBUG` | `false` | Debug mode |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Authors

**Final Year Engineering Project**

- **Developer**: [Your Name]
- **Guide**: [Professor Name]
- **Institution**: [Your Institution]
- **Department**: Computer Science & Engineering

---

## 🙏 Acknowledgments

- Thanks to our project guide for continuous support
- Scikit-learn team for amazing ML tools
- React and FastAPI communities
- Open-source contributors

---

<p align="center">
  Made with ❤️ for Final Year Major Project
</p>

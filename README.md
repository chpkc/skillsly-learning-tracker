# 📊 Skillsly — Personal Learning Analytics Tracker

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Supabase-1C1C1C?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

### 🎯 Project Overview
**Skillsly** is an MVP application designed to systematize and analyze the self-education process. Unlike generic bookmark managers, this project focuses on a **data-driven approach to learning**: every educational resource is linked to a specific skill, enabling precise progress tracking and knowledge gap identification.

---

### 🧬 Data Architecture & Insights
As a future **Data Analyst**, I engineered the application architecture with a focus on relational integrity and data aggregation:

* **Relational Structure**: Powered by **PostgreSQL (Supabase)** to ensure robust data management.
* **Schema Highlights**:
    * **Skills Table**: Primary table for competencies with color-coding for visual categorization.
    * **Resources Table**: Contains learning materials linked to skills via `uuid[]` arrays, allowing for complex many-to-many relationship modeling.
* **Security**: Implemented **Row Level Security (RLS)** to guarantee complete data isolation and privacy at the database level.

---

### 🚀 Key Features
* **Interactive Dashboard**: Real-time visualization of learning statistics, including total resources, tracked skills, and completion rates.
* **Learning Activity**: A heatmap visualization (GitHub-style) to track daily learning consistency and intensity.
* **Skill Tracker**: A dedicated system to manage competencies through different stages of mastery (To Learn / Learning).
* **Recent Activity**: Time-series logging of the latest additions to monitor learning dynamics.

---

### 🛠 Tech Stack
* **Frontend**: React (Vite), Tailwind CSS, Framer Motion.
* **Backend/DB**: Supabase (PostgreSQL).
* **State Management**: React Context API.

---

### 💻 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/chpkc/skillsly-learning-tracker.git](https://github.com/chpkc/skillsly-learning-tracker.git)

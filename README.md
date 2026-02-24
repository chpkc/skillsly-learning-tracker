📊 Skillsly — Personal Learning Analytics Tracker

English | Русский
English
🎯 Project Overview

Skillsly is an MVP application designed to systematize the self-education process. Unlike generic bookmark managers, this project focuses on a data-driven approach to learning: every resource is linked to a specific skill, enabling progress tracking and knowledge gap identification.
🧬 Data Architecture & Insights

As a future Data Analyst, I engineered the architecture with a focus on relational integrity and data aggregation:

    Relational Structure: Powered by PostgreSQL (Supabase).

    Schema Highlights:

        Skills: Primary table for competencies with color-coding for visual categorization.

        Resources: Contains learning materials linked to skills via uuid[] arrays, allowing one resource to cover multiple competencies.

    Security: Implemented Row Level Security (RLS) to ensure complete data isolation at the database level.

🚀 Key Features

    Interactive Dashboard: Real-time visualization of learning stats, including resource distribution and activity logs.

    Skill Tracking: A dedicated system to manage competencies by stages of mastery.

    Recent Activity: Time-series logging of latest additions to analyze learning dynamics.

🛠 Tech Stack

    Frontend: React (Vite), Tailwind CSS, Framer Motion.

    Backend/DB: Supabase (PostgreSQL).

Русский
🎯 О проекте

Skillsly — это MVP-приложение для систематизации самообразования. В отличие от обычных менеджеров закладок, этот проект ориентирован на аналитический подход к обучению: каждый ресурс привязан к конкретному навыку, что позволяет наглядно отслеживать прогресс.
🧬 Архитектура данных

Как будущий аналитик данных, я спроектировал архитектуру с упором на реляционные связи:

    Реляционная структура: Работает на базе PostgreSQL (Supabase).

    Особенности схемы:

        Skills: Таблица компетенций с цветовой маркировкой для визуальной классификации.

        Resources: Материалы, связанные с навыками через массивы uuid[]. Это позволяет одному ресурсу закрывать сразу несколько тем.

    Безопасность: Настроены политики Row Level Security (RLS) для изоляции данных пользователей.

🚀 Ключевые функции

    Интерактивный дашборд: Визуализация статистики обучения и распределения ресурсов в реальном времени.

    Трекер навыков: Система управления компетенциями по этапам освоения.

    Последняя активность: Логирование действий для анализа динамики обучения по времени.

🛠 Технологический стек

    Frontend: React (Vite), Tailwind CSS, Framer Motion.

    Backend/DB: Supabase (PostgreSQL).

# SATVIK_AI
Sattvic AI - A Comprehensive Cloud-Based Practice Management & Nutrient Analysis Software for Ayurvedic Dietitians

---

## Table of Contents
- [Satvik-AI](#satvik-ai)
- [Core Features](#core-features)
  - [For Patients (The User App)](#for-patients-the-user-app)
  - [For Doctors (The Clinician's Portal)](#for-doctors-the-clinicians-portal)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [License](#license)
- [Doctor Authentication](#doctor-authentication)
  - [Ayurvedic Doctor Verification & Auth Platform](#ayurvedic-doctor-verification--auth-platform)
  - [Project Purpose](#project-purpose)
  - [Features](#features)
  - [Pages Included](#pages-included)
  - [Screenshots](#screenshots)
  - [Technologies Used](#technologies-used)
  - [How to Use](#how-to-use)
  - [Future Scope](#future-scope)

---

## Satvik-AI
✨ Satvik-AI: Ayurvedic Wellness Platform  
Satvik-AI is a modern, AI-powered web application that seamlessly blends the ancient wisdom of Ayurveda with cutting-edge technology. It serves as a comprehensive platform connecting patients with certified Ayurvedic doctors, offering personalized wellness plans, and providing a suite of tools for both users to manage their health journey effectively.

This repository contains the complete frontend prototype, built as a single-file React application, demonstrating the full scope of the platform's features and user interface.

---

## 🚀 Core Features
The application is divided into two distinct, feature-rich portals tailored for patients and clinicians.

### 🧘 For Patients (The User App)
- Creative & Action-Oriented Dashboard: A visually engaging home base with a "Today's Focus" card, appointment reminders, and quick-action buttons.
- Interactive Dosha Questionnaire: A guided self-assessment to help users discover their Ayurvedic constitution (Prakriti).
- Find & Book Doctors: A powerful search engine to find verified Ayurvedic doctors with filters for location and specialization.
- AI-Powered Recipe Generation: Users can click on any food item in their diet plan to instantly generate a detailed recipe and its nutritional analysis.
- Centralized Health Records: A secure vault to access a complete history of diet plans, prescriptions, and consultation notes.
- Customized Wellness Section: Personalized yoga (Asanas) and breathing (Pranayama) guides tailored to the user's profile.
- Built-in Health Trackers: A suite of tools to monitor daily habits, including a Water Intake Log, BMI Calculator, and Menstrual Cycle Tracker.
- Direct Chat with Doctor: A secure, private chat interface for follow-up questions and communication.

### 🩺 For Doctors (The Clinician's Portal)
- At-a-Glance Clinician Dashboard: A central hub displaying key metrics like total patients, new assessments, and upcoming appointments.
- Holistic Patient View: A 360-degree profile for each patient, consolidating all health data into a clean, tabbed interface.
- Visual Dosha Imbalance Report: An intuitive doughnut chart that visually represents a patient's current Vata, Pitta, and Kapha levels.
- AI-Assisted Prakriti Analysis: A tool to assist doctors by analyzing (mock) images of a patient's hair, skin, and nails to suggest a Prakriti.
- AI-Generated Diet Plans: An intelligent system that generates complete, scientifically sound diet charts based on a patient's comprehensive profile.
- Full Customization Control: The ability for doctors to review, modify, and approve all AI-generated recommendations.
- Digital Prescriptions: A streamlined feature to create and digitally send prescriptions for medicines and lifestyle changes.
- Patient Progress Tracking: Visual charts to monitor a patient's reported adherence and symptom improvement over time.

---

## 🛠️ Tech Stack
This prototype is built with a modern frontend stack and designed to integrate with a powerful backend.

**Frontend:**
- React.js (v18+)
- Vite (for development environment)
- Tailwind CSS (for styling)
- Chart.js (for data visualization)
- Axios (for API calls)

**Backend (Designed For):**
- Python with Django & Django REST Framework
- MongoDB Database
- Google Gemini API for AI-powered generation
- Google Cloud Vision API for image analysis

---


**Prerequisites:**
- Node.js (v16 or later)
- npm or yarn package manager


## Doctor Authentication
Ayurvedic Doctor Verification & Auth Platform  
This project provides the front-end components for a secure authentication and verification system designed for an Ayurvedic medicine platform in India. Ensuring that every practitioner is genuine, qualified, and trustworthy is a critical safety issue. This web application addresses this by providing a clear, multi-layered verification process and a user-friendly interface for doctors to register and log in.

### Project Purpose
The primary goal is to build trust and safety between patients and Ayurvedic doctors. By creating a transparent and robust verification system, the platform can ensure the credibility of its registered practitioners, protecting users from fraudulent or unqualified individuals.

### Features
1. Comprehensive Verification Flow Page (Doctor-auth.html)  
   A detailed informational page that transparently communicates the entire verification process to potential applicants and users.

   - Multi-Tiered Approach: Breaks down the process into three distinct tiers:
     - Tier 1: Mandatory Document Submission (BAMS Degree, Council Registration, etc.).
     - Tier 2: Digital & Manual Verification (Database checks, QR code scanning).
     - Tier 3: Personal & Professional Confirmation (Video KYC, Reference Checks).
   - Ongoing Monitoring: Explains how the platform maintains trust through "Verified" badges, patient feedback, and periodic re-verification.
   - Professional Design: Clean, responsive, and easy-to-understand layout.

2. Doctor Authentication Page (Doctor-auth.html)  
   A sleek, modern, and interactive page for doctor authentication.

   - Unified Interface: A single page handles both Login and Registration for a seamless user experience.
   - Interactive Form Switching: Features a smooth 3D flip animation to toggle between the login and registration forms.
   - Doctor-Centric Fields: The registration form is specifically designed to capture essential information like the NCISM/State Council Registration Number from the start.
   - Responsive Design: Fully functional and aesthetically pleasing on desktops, tablets, and mobile devices.


### Screenshots
  - Doctor Authentication

    
    <img width="777" height="583" alt="Screenshot 2025-10-07 at 12 51 15 PM" src="https://github.com/user-attachments/assets/64c665c0-c3cf-40b0-9aef-2db50e18fbe1" />
    <img width="777" height="583" alt="Screenshot 2025-10-07 at 12 51 29 PM" src="https://github.com/user-attachments/assets/a279b288-8bc1-4fae-bb91-ce1c9ca17fa5" />

  - Satvi-AI
    

    ![Screenshot 2025-10-07 at 12 37 37 PM](https://github.com/user-attachments/assets/55824e77-e07f-4e87-abc6-01c21f5965dc)
    ![Screenshot 2025-10-07 at 12 38 42 PM](https://github.com/user-attachments/assets/9d2fe68e-a8cc-43b6-9ea4-70b1d8b1cfe9)
    ![Screenshot 2025-10-07 at 12 39 02 PM](https://github.com/user-attachments/assets/27008e32-b440-4431-a659-dac3b4972d9a)
    ![Screenshot 2025-10-07 at 12 41 05 PM](https://github.com/user-attachments/assets/c75a28ad-5473-427d-8e26-d8c572df1be3)
    ![Screenshot 2025-10-07 at 12 40 43 PM](https://github.com/user-attachments/assets/c1b42e18-d265-41f7-a362-9f20c35cd120)


    


### Future Scope
This project currently covers the front-end components. Future development would involve:
- Backend Integration: Building a server-side application (e.g., using Node.js, Django, or Ruby on Rails) to handle user registration, login logic, and secure data processing.
- Database Connection: Integrating a database (like PostgreSQL, MongoDB, or Firebase Firestore) to store and manage doctor profiles, documents, and verification statuses.
- Secure Document Uploads: Implementing a secure file storage solution (like AWS S3 or Cloudinary) for doctors to upload their verification documents.
- API Integration: Connecting to official medical council databases to automate parts of the verification process.
- Dashboard Development: Creating a full-featured dashboard for verified doctors to manage their profiles, appointments, and patient interactions.

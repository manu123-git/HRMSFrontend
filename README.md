
# 💻 HRMS Frontend (React.js)

This is the frontend application for the **Human Resource Management System (HRMS)** built using **React.js**. It provides a responsive and user-friendly interface for interacting with the HRMS backend services.

---

## 🧰 Technologies Used

- **React.js**
- **React Router**
- **Axios**
- **Bootstrap**
- **React Hooks**
- **Formik + Yup (for forms and validation)**

---

## 🌟 Features

- 🔐 **User Login & Registration**
- 👤 **Role-based Dashboards** (Admin, HR, Employee)
- 👨‍💼 **Employee Directory & Profile View**
- 📅 **Leave Application Interface**
- 🕒 **Attendance Marking & History**
- 🗂️ **Department and Designation Management**
- 📢 **Notice Board / Announcements**
- 📬 **Email Notifications (optional)**

---

## 📁 Folder Structure

```
src/
├── components/
├── pages/
├── services/
├── hooks/
├── utils/
├── App.js
└── index.js
```

---

## 🔗 API Integration

- Communicates with backend using **Axios**
- All requests are secured using JWT stored in localStorage or context
- Base URL is configurable in `.env` file

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/hrms-frontend.git
cd hrms-frontend

# Install dependencies
npm install

# Run the application
npm start
```

---

## 🌐 Environment Variables

Create a `.env` file in the root:

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

---

## 🧪 TODO

- [ ] Improve responsive UI
- [ ] Add unit testing (React Testing Library)
- [ ] Add PWA support
- [ ] Add loading states and toast notifications

---

## 🤝 Contribution

Contributions are welcome! Please fork the repository and create a pull request for any enhancements.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

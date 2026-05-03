# 🧩 Checkboxes App

A scalable checkbox management system built using **Node.js, Express, and Redis**.
This project demonstrates efficient handling of a large number of checkboxes with backend state management and fast data access using Redis.

---

## 🚀 Features

* ✅ Handle **checkboxes efficiently**
* ⚡ Fast state management using **Redis**
* 🔄 Real-time or near real-time updates
* 🌐 Backend powered by **Node.js + Express**
* 📦 Docker support for easy setup
* 🧠 Optimized for performance and scalability

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Database / Cache:** Redis
* **Frontend:** HTML, CSS, JavaScript
* **Containerization:** Docker

---

## 📂 Project Structure

```
2000-CHECKBOX/
│── public/
│   └── index.html        # Frontend UI
│
│── server.js             # Express server
│── redis-connection.js   # Redis setup
│
│── package.json
│── package-lock.json
│── docker-compose.yml    # Redis container setup
│── .gitignore
│── node_modules/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Happy-negi238/checkboxes.git
cd checkboxes
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start Redis (using Docker)

```bash
npm run db:docker-up
```

---

### 4️⃣ Run the server

```bash
npm run dev
```

---

### 5️⃣ Open in browser

```
http://localhost:PORT
```

*(Replace PORT with your configured port, e.g., 3000 or 8000)*

---

## 💡 How It Works

* The frontend renders a large number of checkboxes.
* Each interaction (check/uncheck) is sent to the backend.
* The backend stores and retrieves checkbox states using **Redis**.
* Redis ensures:

  * ⚡ ultra-fast read/write
  * 🧠 efficient memory usage
  * 🔄 persistence of checkbox state (depending on config)

---

## 🧪 Use Cases

* Large-scale form handling
* Polling systems
* Feature toggles
* Real-time selection systems

---

## 👨‍💻 Author

**Happy Negi**
GitHub: https://github.com/Happy-negi238


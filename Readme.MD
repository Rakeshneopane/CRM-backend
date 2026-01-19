# Anvaya CRM – Backend API

This repository contains the **backend API** for the **Anvaya CRM application**.  
It is built using **Node.js, Express, and MongoDB**, and provides REST APIs for managing CRM-related resources such as **leads, tags, agents, and reports**.

---

## 🚀 Features

- RESTful API architecture
- MongoDB database integration using Mongoose
- Modular route-based structure
- Environment variable configuration
- CORS enabled for cross-origin requests
- Scalable and maintainable codebase

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB  
- **ODM:** Mongoose  
- **Validation:** Joi  
- **Middleware:** CORS  
- **Environment Management:** dotenv  

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO=your_mongodb_connection_string
```
---
## Getting Started

**Clone the repository**

``` 
git clone https://github.com/Rakeshneopane/CRM-backend.git 
```

**Install Dependency**

```
npm install
```

**Run the server**
```
npm run dev
```

**API available at**
```
http://localhost:3000
```

## API

**API base url**
```
/api
```
Example:
```
/api/tags
/api/leads
/api/agents
/api/reports
```
**Verify Server**

GET /
Response : Anvaya CRM API is working
# 🚀 Entvas NodeJS + Typescript API with mongoDB

A full-stack Node.js + TypeScript application with Docker Compose, MongoDB for data storage, and a rate-limited public API.

---

## 📦 Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🧠 Why MongoDB?

MongoDB is a flexible and scalable NoSQL database that stores data in a JSON-like format. It’s ideal for modern applications because:

- Schema-less — Easily evolve your data models
- Fast and scalable
- Perfect for storing geolocation data and user info
- Seamless integration with Node.js

---

## Running the App

### 1. Clone the Repository

```bash
git clone https://github.com/lee19591020/entvas.git
cd backend
yarn install
yarn dev -> development for development
yarn build -> create production ready
yarn start -> start production
```
## Add Environment Variables
.env is included on this repo.

## 📡 Public API
This project exposes a secure API endpoint with a rate limit of 30 requests per minute per IP.

## 🔐 Rate Limiting
Limit: 30 requests/minute per IP

Response when exceeded:

```bash
{
  "status": 429,
  "message": "Too many requests. Please try again later."
}
```
## 🧾 Endpoint
```bash
POST /api/location
```
## 📥 Payload (All Fields Required)
```bash
{
  "lat": 10.123456,
  "lng": 123.456789,
  "userData": {
    "name": "John Doe"
  }
}
```
```bash
| Field      | Type   | Description          |
| ---------- | ------ | -------------------- |
| `lat`      | number | Latitude coordinate  |
| `lng`      | number | Longitude coordinate |
| `userData` | object | User info container  |
| `name`     | string | Name of the user     |
```
## 📤 Example cURL Request
```bash
curl -X POST http://localhost:8008/api/location \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 10.123456,
    "lng": 123.456789,
    "userData": {
      "name": "John Doe"
    }
  }'
```

## 📚 API Documentation (Swagger)
You can explore and test the API using Swagger UI:
```bash
🌐 http://localhost:8008/docs
```

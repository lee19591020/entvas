# entvas (MERN)

A Node.js + TypeScript application with Docker support for both backend and frontend services.

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

##  Running with Docker Compose

### Clone the Repository

```bash
git clone https://github.com/lee19591020/entvas.git
cd entvas
```
## Build and Run the Containers
```
docker-compose up --build

Build and start the backend (Node.js)

Build and start the frontend (Next.js or React)
```
### Expose ports:
```
Backend → http://localhost:8008

Frontend → http://localhost:3000
```
Access the App
Frontend: http://localhost:3000

Backend API: http://localhost:8008
```
entvas/
│
├── backend/
│   ├── Dockerfile
│   ├── .env
│   └── ...
│
├── frontend/
│   ├── Dockerfile
│   ├── .env.local
│   └── ...
│
├── docker-compose.yml
└── README.md
```
## Database

This project is using mongoDB database

### Why MongoDB?

MongoDB is a **NoSQL database** that's great for:

- Storing JSON-like flexible documents
- Fast development with changing schemas
- High scalability and performance
- Great fit for modern Node.js applications

### Open API

This project exposes a secure API endpoint with a rate limit of 30 requests per minute per IP to prevent abuse.

Security
    Rate Limited: Max 30 requests/minute/IP

    No authentication/token is currently required
```
POST /api/location

{
  "lat": 10.123456,
  "lng": 123.456789,
  "userData": {
    "name": "John Doe"
  }
}

Field	Type	Description
lat	    number	Latitude coordinate
lng	    number	Longitude coordinate
userData object	User info object
name	string	Name of the user

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
### Rate Limit Response
```
{
  "status": false,
  "message": "Too many requests. Please try again later."
}
```
## Additional information
The frontend will display a map, and when you sent a coordinates; it will display on the map as a blue dot with the name in it when hovered. All updates are in real time.

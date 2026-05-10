# Hotel-Offer-Orchestrator-Nilesh

A backend service that aggregates hotel offers from multiple suppliers, removes duplicate hotels, selects the cheapest offer, stores results in Redis, and orchestrates the workflow using Temporal.io.

---

# Tech Stack

- Node.js
- TypeScript
- Express.js
- Temporal.io
- Redis
- Docker Compose

---

# Features

- Fetch hotels from multiple suppliers
- Parallel supplier calls using Temporal workflows
- Deduplicate hotels by name
- Select the cheapest hotel offer
- Redis caching
- Price range filtering
- Health check endpoint
- Dockerized setup

---

# Project Structure

```text
src/
|-- activities/
|-- workflows/
|-- redis/
|-- utils/
|-- controllers/
|-- routes/
|-- server.ts
|-- worker.ts
```

---

# Setup & Deployment

## 1. Clone Repository

```bash
git clone <repo-url>
cd Hotel-Offer-Orchestrator
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create .env File

```env
PORT=3000
REDIS_URL=redis://redis:6379
TEMPORAL_ADDRESS=temporal:7233
```

---

## 4. Run Application

```bash
docker compose up --build
```

This starts:

- API Server
- Redis
- Temporal Server
- Temporal Worker

---

# API Endpoints

## Get Hotels

```http
GET /api/hotels?city=delhi
```

---

## Filter Hotels By Price

```http
GET /api/hotels?city=delhi&minPrice=5000&maxPrice=7000
```

---

## Supplier APIs

```http
GET /supplierA/hotels
GET /supplierB/hotels
```

---

## Health Check

```http
GET /health
```

---

# Sample Response

```json
[
  {
    "hotelId": "b1",
    "name": "Holtin",
    "price": 5340,
    "city": "delhi",
    "commissionPct": 20,
    "supplier": "Supplier B"
  }
]
```

---

# Workflow Logic

1. Fetch hotels from Supplier A and Supplier B in parallel
2. Merge hotel lists
3. Deduplicate hotels by name
4. Select the cheapest offer
5. Store results in Redis
6. Apply optional price filtering

---

# Local Development

## Start API

```bash
npm run dev
```

## Start Worker

```bash
npm run worker
```

---

# Deployment

The application is containerized using Docker Compose and can be deployed with:

```bash
docker compose up --build
```

# Vectorshift Frontend Technical Assessment

## 🧾 Overview


This project is part of the VectorShift Frontend Technical Assessment. It showcases the implementation of a modular and interactive pipeline builder using React and React Flow, featuring drag-and-drop functionality, state management with Zustand, and customizable UI components. A reusable node abstraction system enables scalable creation of new node types, while enhanced text nodes support dynamic resizing and variable parsing. The frontend is integrated with a FastAPI backend to submit the pipeline structure, which responds with key metrics such as node and edge counts, and verifies whether the graph forms a Directed Acyclic Graph (DAG).

---

## 🛠 Technologies Used

- **React** (with Vite)
- **React Flow** – for interactive node-based UI
- **Zustand** – for state management
- **Tailwind CSS** – for styling
- **ShadCN UI** – for UI components
- **React Icons** – for iconography
- **FastAPI** – as backend (for parsing and pipeline validation)
- **NetworkX** - for DAG Validation

---

## 📁 Project Structure
---

## 🚀 How to Run

### 🖥 Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the dev server:
   ```bash
   npm run dev

4. Open the app in your browser:
   ```bash
   http://localhost:5173

5.🔧 **Note**: Update the API base URL in the environment configuration file to use the local FastAPI server:
   ENV_BASE_URL= http://localhost:8000


### ⚙ Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend

2. Create and activate a virtual environment:
   ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate

3. Install dependencies:
   ```bash
    pip3 install -r requirements.txt


4. Start the FastAPI server:
   ```bash
    uvicorn main:app --reload

import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="CareFlow API")

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True, 
    allow_methods=["*"], allow_headers=["*"]
)

# CHANGE THIS TO YOUR PGADMIN PASSWORD
DB_PASSWORD = "pavan@2008" 

def get_db_connection():
    return psycopg2.connect(host="localhost", database="careflow", user="postgres", password=DB_PASSWORD)

class AmbulanceData(BaseModel):
    case_id: str
    patient_status: str
    heart_rate: int
    oxygen_level: int
    timestamp: str

@app.post("/api/v1/ingest")
async def receive_ambulance_data(data: AmbulanceData):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO patient_case (case_id, patient_status, heart_rate, oxygen_level, timestamp) VALUES (%s, %s, %s, %s, %s)", 
                    (data.case_id, data.patient_status, data.heart_rate, data.oxygen_level, data.timestamp))
        conn.commit()
        cur.close()
        conn.close()
        return {"status": "200 OK"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/database")
async def view_hospital_database():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor) 
        cur.execute("SELECT * FROM patient_case ORDER BY id ASC")
        records = cur.fetchall()
        cur.close()
        conn.close()
        return {"live_patient_data": records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
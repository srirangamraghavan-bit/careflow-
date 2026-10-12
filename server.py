#!/usr/bin/env python3
"""
CareFlow - Advanced Emergency Medical Dashboard Server
Zero-dependency Python standard library server providing full RESTful CRUD:
- CREATE: POST /api/v1/patients  (or POST /api/v1/ingest)
- READ:   GET  /api/v1/patients, GET /api/v1/patients/<id>, GET /api/v1/database
- UPDATE: PUT  /api/v1/patients/<id>, PATCH /api/v1/patients/<id>
- DELETE: DELETE /api/v1/patients/<id>
- STATIC: GET / (serves index.html with live UI)
"""

import http.server
import socketserver
import json
import os
import sys
import urllib.parse
from datetime import datetime

DEFAULT_PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DIRECTORY, "patient_data.json")

def load_data():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []

def save_data(data):
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving data: {e}", flush=True)

class CareFlowRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    # -------------------------------------------------------------
    # READ OPERATIONS (GET)
    # -------------------------------------------------------------
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")
        
        # Healthcheck
        if path == "/api/v1/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "service": "CareFlow Hub", "crud": True}).encode("utf-8"))
            return

        # READ ALL PATIENTS: GET /api/v1/database or GET /api/v1/patients
        if path in ("/api/v1/database", "/api/v1/patients"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()
            data = load_data()
            response = {
                "status": "200 OK",
                "total_cases": len(data),
                "live_patient_data": data
            }
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        # READ SINGLE PATIENT: GET /api/v1/patients/<id>
        if path.startswith("/api/v1/patients/"):
            patient_id = path.split("/api/v1/patients/")[1]
            data = load_data()
            match = next((p for p in data if (p.get("id") == patient_id or p.get("case_id") == patient_id)), None)
            if match:
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "200 OK", "patient": match}).encode("utf-8"))
            else:
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Patient with ID '{patient_id}' not found."}).encode("utf-8"))
            return

        # Serve index.html by default
        if parsed.path in ("/", ""):
            self.path = "/index.html"
            
        return super().do_GET()

    # -------------------------------------------------------------
    # CREATE OPERATIONS (POST)
    # -------------------------------------------------------------
    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path in ("/api/v1/ingest", "/api/v1/patients"):
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode("utf-8"))
                payload["received_at"] = datetime.now().isoformat()
                patient_id = payload.get("id") or payload.get("case_id") or f"CASE-{int(datetime.now().timestamp())}"
                payload["id"] = patient_id
                
                cases = load_data()
                # If already exists, update; otherwise prepend
                existing_idx = next((i for i, p in enumerate(cases) if (p.get("id") == patient_id or p.get("case_id") == patient_id)), None)
                if existing_idx is not None:
                    cases[existing_idx] = payload
                else:
                    cases.insert(0, payload)

                save_data(cases)

                self.send_response(201)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                
                resp = {
                    "status": "201 Created",
                    "operation": "CREATE",
                    "message": "Patient telemetry created & stored successfully.",
                    "patient_id": patient_id,
                    "total_active": len(cases)
                }
                self.wfile.write(json.dumps(resp).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    # -------------------------------------------------------------
    # UPDATE OPERATIONS (PUT / PATCH)
    # -------------------------------------------------------------
    def do_PUT(self):
        self._handle_update()

    def do_PATCH(self):
        self._handle_update()

    def _handle_update(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/v1/patients/"):
            patient_id = path.split("/api/v1/patients/")[1]
            content_length = int(self.headers.get("Content-Length", 0))
            body_data = self.rfile.read(content_length)

            try:
                updates = json.loads(body_data.decode("utf-8"))
                cases = load_data()
                match_idx = next((i for i, p in enumerate(cases) if (p.get("id") == patient_id or p.get("case_id") == patient_id)), None)

                if match_idx is not None:
                    # Update fields
                    cases[match_idx].update(updates)
                    cases[match_idx]["updated_at"] = datetime.now().isoformat()
                    save_data(cases)

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.send_cors_headers()
                    self.end_headers()

                    resp = {
                        "status": "200 OK",
                        "operation": "UPDATE",
                        "message": f"Patient '{patient_id}' successfully updated.",
                        "patient": cases[match_idx]
                    }
                    self.wfile.write(json.dumps(resp).encode("utf-8"))
                else:
                    # If not found in file yet, create it with ID
                    updates["id"] = patient_id
                    updates["updated_at"] = datetime.now().isoformat()
                    cases.insert(0, updates)
                    save_data(cases)

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.send_cors_headers()
                    self.end_headers()
                    resp = {
                        "status": "200 OK",
                        "operation": "UPDATE_UPSERT",
                        "message": f"Patient '{patient_id}' recorded and updated.",
                        "patient": updates
                    }
                    self.wfile.write(json.dumps(resp).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    # -------------------------------------------------------------
    # DELETE OPERATIONS (DELETE)
    # -------------------------------------------------------------
    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/v1/patients/"):
            patient_id = path.split("/api/v1/patients/")[1]
            cases = load_data()
            initial_count = len(cases)
            cases = [p for p in cases if not (p.get("id") == patient_id or p.get("case_id") == patient_id)]

            save_data(cases)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()

            resp = {
                "status": "200 OK",
                "operation": "DELETE",
                "message": f"Patient '{patient_id}' successfully discharged/deleted.",
                "deleted_id": patient_id,
                "remaining_active": len(cases)
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

def run_server(port=DEFAULT_PORT):
    socketserver.TCPServer.allow_reuse_address = True
    try:
        httpd = socketserver.TCPServer(("", port), CareFlowRequestHandler)
    except OSError:
        port = 8081
        httpd = socketserver.TCPServer(("", port), CareFlowRequestHandler)

    print(f"===========================================================", flush=True)
    print(f"  CareFlow - Full RESTful CRUD Emergency Server Active", flush=True)
    print(f"  CREATE : POST   http://localhost:{port}/api/v1/patients", flush=True)
    print(f"  READ   : GET    http://localhost:{port}/api/v1/patients", flush=True)
    print(f"  UPDATE : PUT    http://localhost:{port}/api/v1/patients/<id>", flush=True)
    print(f"  DELETE : DELETE http://localhost:{port}/api/v1/patients/<id>", flush=True)
    print(f"  UI App : http://localhost:{port}/index.html", flush=True)
    print(f"===========================================================", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down CareFlow server.", flush=True)

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    run_server(port)

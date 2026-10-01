#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

Handler = http.server.SimpleHTTPRequestHandler

print("=" * 65)
print("⚡ CampusPulse — Modern Student Hub")
print(f"🚀 Server running live at: http://localhost:{PORT}")
print("👉 Opening default browser. Press Ctrl+C in terminal to stop.")
print("=" * 65)

try:
    webbrowser.open(f"http://localhost:{PORT}")
except Exception:
    pass

try:
    with ReusableTCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nCampusPulse server stopped.")
    sys.exit(0)

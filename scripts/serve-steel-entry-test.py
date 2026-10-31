from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
import os,urllib.parse
from pathlib import Path
os.chdir(Path(__file__).resolve().parents[1])
class Handler(SimpleHTTPRequestHandler):
 def do_GET(self):
  p=urllib.parse.urlsplit(self.path)
  if not os.path.isfile(p.path.lstrip('/')) and os.path.isfile(p.path.lstrip('/')+'.html'):self.path=p.path+'.html'+('?' + p.query if p.query else '')
  return super().do_GET()
ThreadingHTTPServer(('127.0.0.1',8766),Handler).serve_forever()

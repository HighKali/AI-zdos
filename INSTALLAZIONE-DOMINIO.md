# 🌐 GUIDA INSTALLAZIONE ZDOS SU DOMINIO

## 📋 OPZIONI DI DEPLOYMENT

### 🚀 **OPZIONE 1: Deploy Rapido (Test)**
Per testare immediatamente il sistema banking:

```bash
# Carica solo test-banking.html sul tuo server
scp frontend/test-banking.html user@tuodominio.com:/var/www/html/banking.html
# Accesso: https://tuodominio.com/banking.html
```

### 🏗️ **OPZIONE 2: Full Stack Production**

#### **1. Preparazione Server (Ubuntu/CentOS)**
```bash
# Aggiorna sistema
sudo apt update && sudo apt upgrade -y

# Installa dipendenze
sudo apt install nginx nodejs npm git curl -y

# Verifica versioni
node --version  # Richiesto: v18+
npm --version   # Richiesto: v8+
```

#### **2. Clone Repository**
```bash
# Posizionati nella directory web
cd /var/www/

# Clone del progetto
sudo git clone https://github.com/HighKali/AI-zdos.git zdos-banking
cd zdos-banking

# Cambia ownership
sudo chown -R www-data:www-data /var/www/zdos-banking
```

#### **3. Setup Frontend**
```bash
cd frontend

# Installa dipendenze
npm install

# Build per produzione
npm run build

# Verifica build
ls -la .next/
```

#### **4. Setup Backend**
```bash
cd ../backend

# Installa dipendenze
npm install

# Test backend
npm start
# Ctrl+C per fermare
```

#### **5. Configurazione Nginx**

Crea file `/etc/nginx/sites-available/zdos-banking`:

```nginx
server {
    listen 80;
    server_name tuodominio.com www.tuodominio.com;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Test banking (standalone)
    location /banking-test {
        alias /var/www/zdos-banking/frontend/test-banking.html;
    }
    
    # Static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### **6. Abilita Sito Nginx**
```bash
# Abilita configurazione
sudo ln -s /etc/nginx/sites-available/zdos-banking /etc/nginx/sites-enabled/

# Disabilita sito default (opzionale)
sudo rm /etc/nginx/sites-enabled/default

# Test configurazione
sudo nginx -t

# Ricarica nginx
sudo systemctl reload nginx
```

#### **7. SSL con Let's Encrypt**
```bash
# Installa certbot
sudo apt install certbot python3-certbot-nginx -y

# Ottieni certificato SSL
sudo certbot --nginx -d tuodominio.com -d www.tuodominio.com

# Verifica auto-renewal
sudo certbot renew --dry-run

# Programma auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

#### **8. Process Manager (PM2)**
```bash
# Installa PM2 globalmente
sudo npm install -g pm2

# Avvia frontend
cd /var/www/zdos-banking/frontend
pm2 start npm --name "zdos-frontend" -- start

# Avvia backend
cd ../backend
pm2 start index.js --name "zdos-backend"

# Salva configurazione
pm2 save

# Auto-start al boot
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u www-data --hp /var/www
```

#### **9. Firewall Setup**
```bash
# Configura UFW
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw --force enable

# Verifica status
sudo ufw status
```

### 🔧 **OPZIONI CLOUD ALTERNATIVE**

#### **Vercel (Frontend-only)**
```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod

# Dominio automatico: zdos-banking.vercel.app
```

#### **Netlify (Drag & Drop)**
1. Vai su netlify.com
2. Drag & drop cartella `frontend/`
3. Configura build: `npm run build`
4. Output directory: `.next`

#### **DigitalOcean App Platform**
```yaml
# app.yaml
name: zdos-banking
services:
- name: frontend
  source_dir: frontend
  github:
    repo: HighKali/AI-zdos
    branch: main
  build_command: npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
- name: backend
  source_dir: backend
  github:
    repo: HighKali/AI-zdos
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

### 📊 **VERIFICA INSTALLAZIONE**

#### **Health Checks**
```bash
# Verifica servizi PM2
pm2 status
pm2 logs

# Verifica porte
sudo netstat -tlnp | grep :3000  # Frontend
sudo netstat -tlnp | grep :5001  # Backend

# Test connessione
curl -I https://tuodominio.com
curl https://tuodominio.com/api/users
```

#### **Monitoraggio**
```bash
# Log real-time
pm2 logs --lines 50

# Monitoring dashboard
pm2 monit

# Restart servizi se necessario
pm2 restart all
```

### 🔒 **SICUREZZA PRODUZIONE**

#### **Environment Variables**
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://tuodominio.com/api
NEXT_PUBLIC_ENVIRONMENT=production

# Backend (.env)
PORT=5001
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here
```

#### **Backup Automatico**
```bash
# Script backup (/etc/cron.daily/zdos-backup)
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backup/zdos-$DATE.tar.gz /var/www/zdos-banking
find /backup -name "zdos-*.tar.gz" -mtime +7 -delete
```

### 🎯 **ACCESSI FINALI**

Dopo installazione completa:

- **Frontend**: `https://tuodominio.com`
- **Test Banking**: `https://tuodominio.com/banking-test`
- **API Backend**: `https://tuodominio.com/api`
- **Monitoring**: `pm2 monit`

### 📞 **SUPPORTO INSTALLAZIONE**

In caso di problemi:

1. **Verifica log**: `pm2 logs`
2. **Check nginx**: `sudo nginx -t`
3. **Test API**: `curl https://tuodominio.com/api`
4. **Restart servizi**: `pm2 restart all`

---

**🚀 Il sistema ZDOS Banking sarà accessibile al tuo dominio con HTTPS e pronto per la produzione!**

# Gunakan image resmi Node.js sebagai image dasar
FROM node:20

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Instal nodemon secara global
RUN npm install -g nodemon

RUN npm uninstal bcrypt

RUN npm  install   bcrypt

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber aplikasi ke dalam container
COPY . .

# Ekspos port yang akan digunakan oleh aplikasi
EXPOSE 5000

# Tentukan perintah untuk menjalankan aplikasi
CMD ["nodemon", "index.js"]
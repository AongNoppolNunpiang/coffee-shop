# ใช้ Node.js base image
FROM node:16

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ที่เหลือทั้งหมด
COPY . .

# สั่งให้รันเซิร์ฟเวอร์
CMD ["node", "server.js"]

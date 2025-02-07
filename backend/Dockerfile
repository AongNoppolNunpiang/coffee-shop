# Dockerfile ของ backend
FROM node:14

# ตั้งค่าการทำงานภายใน container
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดจากเครื่องที่ใช้งานเข้า container
COPY . .

# ติดตั้ง netcat สำหรับการตรวจสอบการเชื่อมต่อ
RUN apt-get update && apt-get install -y netcat

# ติดตั้ง dependencies
RUN npm install

# เปิด port ที่ backend จะทำงาน
EXPOSE 5000

# เริ่มทำงานของ backend
CMD ["npm", "start"]

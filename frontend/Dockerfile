# ใช้ Node.js base image
FROM node:16 AS build

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมด
COPY . .

# สร้าง production build
RUN npm run build

# ใช้ Nginx เพื่อเสิร์ฟ build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

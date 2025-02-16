# coffee-sho
# eiei
!!เปิด docker ไว้ด้วย!!
!!ต้องอยู่โฟล์เดอร์หน้าสุด!!
docker-compose up --build

# ถ้าทำแค่ front หลัง build เสร็จ 
cd frontend
npm start

# ถ้าต้องการเปิดทั้ง backend และ frontend 
docker compose up
!!ต้องอยู่โฟล์เดอร์หน้าสุด!!


docker exec -it mysql_db mysql -u root -p

USE coffee_shop;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


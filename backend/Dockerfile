# Sử dụng Node.js image làm base image
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng 5000
EXPOSE 5000

# Chạy lệnh để khởi động ứng dụng
CMD ["node", "index.js"]

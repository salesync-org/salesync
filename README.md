## Back-end structure

- components: chứa các component
- configuration: chứa các config, thường sử dụng để tạo bean cho thư viện bên thứ ba
- constants: chứa các hằng, enum,...
- controllers: chứa các controller, nhận rest api
- dtos: data transfer objec, chứa các dto class, dùng để truyền dữ liệu giữa các layer
- entities: chứa các entity, entity đại diện cho bảng trong DB, dùng để thao tác với dao hoặc jpa repository
- exceptions: Chứa các exceptions và global handler.
- repositories: chứa các class dùng truy cập DB thông qua jpa repository
- services: chứa các service class, dùng để xử lý logic ứng dụng
- utils

## note:

- Tránh gọi thẳng entity manager ở service mà phải gọi repository.
- Dùng querydsl thay cho native query hoặc JPQL khi cần.

## Dependencies

![Screenshot 2024-02-21 105031](https://github.com/salesync-org/test-salesync/assets/113912946/3b574094-ddf5-4d4b-ae21-83f1567efc46) ![Screenshot 2024-02-21 105002](https://github.com/salesync-org/test-salesync/assets/113912946/f7375010-8220-47b6-a29c-12e1bc06e35c)

## Project

![Screenshot 2024-02-21 105124](https://github.com/salesync-org/test-salesync/assets/113912946/616a419b-6d9f-4034-b1d8-b2cbf972472b)

## Environment variables

### Backend

- Gateway:
  - AUTH_SERVER_URL: URL của Authentication Service. Ví dụ: http://localhost: 8082
- Authentication Service:
  - KEYSTORE_PATH: Đường dẫn tới file "auth.jks". Ví dụ: D:\\\DATN\\\auth.jks
- Record/Type/Notification service:
  - DB_NAME=
  - DB_HOST=
  - DB_PORT=
  - DB_USER=
  - DB_PASSWORD=
  - TOKEN_PUBLIC_KEY=
  - RABBITMQ_HOST=
  - RABBITMQ_PORT=
  - RABBITMQ_USER=
  - RABBITMQ_PASSWORD=

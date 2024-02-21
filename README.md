## Back-end structure
- components: chứa các component
- configuration: chứa các config, thường sử dụng để tạo bean cho thư viện bên thứ ba
- constants: chứa các hằng, enum,...
- controllers: chứa các controller, nhận rest api
- daos: data access object, chứa các class dùng truy cập DB thông qua entity manager
- dtos: data transfer objec, chứa các dto class, dùng để truyền dữ liệu giữa các layer
- entities:  chứa các entity, entity đại diện cho bảng trong DB, dùng để thao tác với dao hoặc jpa repository
- exceptions
- model: chứa pojo clas
- repositories: chứa các class dùng truy cập DB thông qua jpa repository
- services: chứa các service class, dùng để xử lý logic ứng dụng
- utils

note: có thể thao tác với DB thông qua entity manager hoặc jpa repository, jpa repository  code đơn giản hơn(?)


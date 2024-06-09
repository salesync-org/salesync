
set "current_dir=%cd%"
set "folders=type-service record-service service-registry notification-service authentication api-gateway"
for %%d in (%folders%) do (
    if exist "%%d" (
        cd "%%d"
        if exist run_local.bat (
            echo dang chay
            start run_local.bat
        ) else (
            echo khong tim thay
        )
        cd "%current_dir%"
    ) else (
        echo Thư mục %%d không tồn tại
    )
)

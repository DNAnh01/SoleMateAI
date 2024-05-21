def email_verify_template(user_name: str, redirect_url: str, mode: int) -> str:
    if mode == 1:
        button_text = "Trang chủ"
        button_style = "background-color: #0f2f48; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;"
        button_link = redirect_url
    elif mode == 2:
        button_text = "Xác nhận Email"
        button_style = "background-color: #0f2f48; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;"
        button_link = redirect_url
    return f"""
            <!DOCTYPE html>
            <html lang="vi">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Xác nhận địa chỉ Email cho Sole Mate AI</title>
            </head>

            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #eff2f4;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center">
                            <img src="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/sole-mate_ai-logo.png"
                                alt="SoleMateAI Logo" style="display: block; width: 200px; margin: 20px auto;">
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #153643; font-size: 28px;">
                                        <b>Chào {user_name},</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 30px 0; color: #153643; font-size: 16px; line-height: 20px;">
                                        Cảm ơn bạn đã đăng ký tài khoản trên SoleMateAI! Trước khi bắt đầu, chúng tôi chỉ cần xác nhận rằng đây là bạn. Nhấp vào liên kết dưới đây để xác nhận địa chỉ email của bạn:
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="{button_link}"
                                            style="{button_style}">{button_text}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;">
                            <hr>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #153643; font-size: 14px; text-align: center;">
                                        Điều khoản dịch vụ | Chính sách bảo mật
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>

            </html>
            """


def email_forgot_password_template(user_name: str, password_reset: str) -> str:
    return f"""
            <!DOCTYPE html>
            <html lang="vi">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Đặt lại mật khẩu cho Sole Mate AI</title>
            </head>

            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #eff2f4;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center">
                            <img src="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/sole-mate_ai-logo.png"
                                alt="SoleMateAI Logo" style="display: block; width: 200px; margin: 20px auto;">
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #153643; font-size: 28px;">
                                        <b>Chào {user_name},</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 30px 0; color: #153643; font-size: 16px; line-height: 20px;">
                                        Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn. Vui lòng làm theo hướng dẫn dưới đây để đặt lại mật khẩu của bạn:
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 20px 0 30px 0; color: #153643; font-size: 20px; line-height: 20px; text-align: center; font-weight: 600; display: flex; justify-content: center; align-items: center;">
                                        <div
                                            style="background-color: #eff2f4; border: 2px solid #2c2c2c; padding: 10px; border-radius: 5px; width: 40%; display: flex; justify-content: center; align-items: center;">
                                            {password_reset}
                                        </div>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;">
                            <hr>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #153643; font-size: 14px; text-align: center;">
                                        Điều khoản dịch vụ | Chính sách bảo mật
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>

            </html>
            """

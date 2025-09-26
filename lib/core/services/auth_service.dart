import 'package:dio/dio.dart';
import '../utils/result.dart';
import 'api_service.dart';

class AuthService {
  final Dio _dio = ApiService().dio;

  Future<Result<String>> login(String email, String password) async {
    try {
      final response = await _dio.post("/auth/login", data: {
        "email": email,
        "password": password,
      });

      if (response.statusCode == 200) {
        final token = response.data["token"];
        return Success(token);
      }
      return const Failure("Đăng nhập thất bại");
    } catch (e) {
      return Failure("Lỗi đăng nhập", exception: e as Exception?);
    }
  }

  Future<Result<void>> logout() async {
    try {
      await _dio.post("/auth/logout");
      return const Success(null);
    } catch (e) {
      return Failure("Lỗi đăng xuất", exception: e as Exception?);
    }
  }
}

import 'package:dio/dio.dart';
import '../utils/result.dart';
import 'api_service.dart';

class UserService {
  final Dio _dio = ApiService().dio;

  Future<Result<Map<String, dynamic>>> getProfile() async {
    try {
      final response = await _dio.get("/user/profile");
      if (response.statusCode == 200) {
        return Success(response.data);
      }
      return const Failure("Không lấy được thông tin người dùng");
    } catch (e) {
      return Failure("Lỗi kết nối", exception: e as Exception?);
    }
  }

  Future<Result<void>> updateProfile(Map<String, dynamic> data) async {
    try {
      await _dio.put("/user/update", data: data);
      return const Success(null);
    } catch (e) {
      return Failure("Cập nhật thất bại", exception: e as Exception?);
    }
  }
}

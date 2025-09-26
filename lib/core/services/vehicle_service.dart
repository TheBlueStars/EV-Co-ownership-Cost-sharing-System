import 'package:dio/dio.dart';
import '../utils/result.dart';
import 'api_service.dart';

class VehicleService {
  final Dio _dio = ApiService().dio;

  Future<Result<List<dynamic>>> getVehicles() async {
    try {
      final response = await _dio.get("/vehicles");
      if (response.statusCode == 200) {
        return Success(response.data as List<dynamic>);
      }
      return const Failure("Không có dữ liệu xe");
    } catch (e) {
      return Failure("Lỗi khi lấy danh sách xe", exception: e as Exception?);
    }
  }

  Future<Result<Map<String, dynamic>>> getVehicleDetail(String id) async {
    try {
      final response = await _dio.get("/vehicles/$id");
      if (response.statusCode == 200) {
        return Success(response.data);
      }
      return const Failure("Không tìm thấy thông tin xe");
    } catch (e) {
      return Failure("Lỗi khi lấy chi tiết xe", exception: e as Exception?);
    }
  }
}

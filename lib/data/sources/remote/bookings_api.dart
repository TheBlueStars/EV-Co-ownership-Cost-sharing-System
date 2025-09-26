import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../models/booking_dto.dart';

class BookingsApi {
  final String baseUrl;

  BookingsApi(this.baseUrl);

  Future<List<BookingDto>> fetchAll() async {
    final response = await http.get(Uri.parse('$baseUrl/bookings'));
    if (response.statusCode == 200) {
      final List<dynamic> jsonList = jsonDecode(response.body);
      return jsonList.map((e) => BookingDto.fromJson(e)).toList();
    }
    throw Exception("Failed to fetch bookings");
  }

  Future<BookingDto?> fetchById(String id) async {
    final response = await http.get(Uri.parse('$baseUrl/bookings/$id'));
    if (response.statusCode == 200) {
      return BookingDto.fromJson(jsonDecode(response.body));
    }
    return null;
  }

  Future<void> create(BookingDto dto) async {
    await http.post(
      Uri.parse('$baseUrl/bookings'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(dto.toJson()),
    );
  }

  Future<void> delete(String id) async {
    await http.delete(Uri.parse('$baseUrl/bookings/$id'));
  }
}

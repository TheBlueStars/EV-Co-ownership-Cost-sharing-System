import 'package:intl/intl.dart';

/// Định dạng tiền tệ (VNĐ)
class CurrencyFormatter {
  static String format(double value) {
    final formatter = NumberFormat.currency(locale: 'vi_VN', symbol: '₫');
    return formatter.format(value);
  }
}

/// Định dạng ngày tháng
class DateFormatter {
  /// yyyy-MM-dd
  static String formatDate(DateTime date) {
    return DateFormat('yyyy-MM-dd').format(date);
  }

  /// dd/MM/yyyy
  static String formatDateVN(DateTime date) {
    return DateFormat('dd/MM/yyyy').format(date);
  }

  /// dd/MM/yyyy HH:mm
  static String formatDateTime(DateTime date) {
    return DateFormat('dd/MM/yyyy HH:mm').format(date);
  }
}

/// Định dạng số điện thoại VN
class PhoneFormatter {
  static String format(String phone) {
    if (phone.startsWith('0')) {
      return '+84${phone.substring(1)}';
    }
    return phone;
  }
}

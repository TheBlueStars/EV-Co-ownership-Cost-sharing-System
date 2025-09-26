import 'package:flutter/material.dart';

/// Hiển thị snackbar dùng chung trong app
class AppSnackbar {
  static void show(
      BuildContext context, {
        required String message,
        Color backgroundColor = Colors.black87,
        Duration duration = const Duration(seconds: 3),
      }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          message,
          style: const TextStyle(color: Colors.white),
        ),
        backgroundColor: backgroundColor,
        duration: duration,
      ),
    );
  }

  /// Snackbar báo thành công
  static void success(BuildContext context, String message) {
    show(context, message: message, backgroundColor: Colors.green);
  }

  /// Snackbar báo lỗi
  static void error(BuildContext context, String message) {
    show(context, message: message, backgroundColor: Colors.red);
  }
}

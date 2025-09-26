import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData light() {
    final seed = const Color(0xFF2ECC71);
    final cs = ColorScheme.fromSeed(seedColor: seed, brightness: Brightness.light);

    return ThemeData(
      useMaterial3: true,
      colorScheme: cs,
      appBarTheme: AppBarTheme(
        backgroundColor: cs.primary,
        foregroundColor: cs.onPrimary,
        elevation: 0,
      ),
      scaffoldBackgroundColor: const Color(0xFFF9FAFB),
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );
  }

  static ThemeData dark() {
    final seed = const Color(0xFF2ECC71);
    final cs = ColorScheme.fromSeed(seedColor: seed, brightness: Brightness.dark);
    return ThemeData(useMaterial3: true, colorScheme: cs);
  }
}

import 'package:shared_preferences/shared_preferences.dart';

class Prefs {
  static const _kThemeDark = 'pref_theme_dark';
  final SharedPreferences _prefs;

  Prefs._(this._prefs);

  static Future<Prefs> getInstance() async {
    final sp = await SharedPreferences.getInstance();
    return Prefs._(sp);
  }

  bool get isDarkMode => _prefs.getBool(_kThemeDark) ?? false;
  Future<void> setDarkMode(bool v) async => await _prefs.setBool(_kThemeDark, v);

  // Generic helpers
  String? getString(String key) => _prefs.getString(key);
  Future<void> setString(String key, String value) async => await _prefs.setString(key, value);

  int? getInt(String key) => _prefs.getInt(key);
  Future<void> setInt(String key, int value) async => await _prefs.setInt(key, value);

  Future<void> remove(String key) async => await _prefs.remove(key);
}

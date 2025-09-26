import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStore {
  static const _keyAccessToken = 'access_token';
  static const _keyRefreshToken = 'refresh_token';

  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  // Optional init if you need, but flutter_secure_storage doesn't require init
  Future<void> init() async {}

  Future<void> writeToken(String token) async {
    await _storage.write(key: _keyAccessToken, value: token);
  }

  Future<String?> readToken() async {
    return await _storage.read(key: _keyAccessToken);
  }

  Future<void> deleteToken() async {
    await _storage.delete(key: _keyAccessToken);
  }

  Future<void> writeRefreshToken(String token) async {
    await _storage.write(key: _keyRefreshToken, value: token);
  }

  Future<String?> readRefreshToken() async {
    return await _storage.read(key: _keyRefreshToken);
  }

  Future<void> deleteRefreshToken() async {
    await _storage.delete(key: _keyRefreshToken);
  }
}

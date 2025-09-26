import 'package:dio/dio.dart';
import '../storage/secure_store.dart';

/// Ghi log đơn giản cho requests/responses/errors
class LoggingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    // ignore: avoid_print
    print('→ [API] ${options.method} ${options.uri}');
    // headers small preview
    // ignore: avoid_print
    print('   headers: ${options.headers}');
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    // ignore: avoid_print
    print('← [API] ${response.statusCode} ${response.requestOptions.uri}');
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    // ignore: avoid_print
    print('✖ [API] ${err.message} ${err.requestOptions.uri}');
    handler.next(err);
  }
}

/// Interceptor thêm Authorization header lấy token từ SecureStore.
/// Lưu ý: onRequest cần thực hiện async nhưng Interceptor.onRequest không trả Future.
/// Giải pháp: dùng then(...) để đọc token bất đồng bộ và sau đó gọi handler.next.
class AuthInterceptor extends Interceptor {
  final SecureStore secureStore;
  AuthInterceptor(this.secureStore);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    secureStore.readToken().then((token) {
      if (token != null && token.isNotEmpty) {
        options.headers['Authorization'] = 'Bearer $token';
      }
      handler.next(options);
    }).catchError((_) {
      handler.next(options);
    });
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    // TODO: handle 401 -> refresh token flow here if you implement refresh token
    handler.next(err);
  }
}

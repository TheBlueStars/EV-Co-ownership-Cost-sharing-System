import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';

import '../network/api_client.dart';
import '../network/interceptors.dart';
import '../storage/secure_store.dart';
import '../storage/prefs.dart';

final sl = GetIt.instance;

Future<void> initCore({String baseUrl = 'https://api.example.com'}) async {
  // 1) Storage / prefs (register sync/async singletons first)
  sl.registerLazySingleton<SecureStore>(() => SecureStore());

  final prefs = await Prefs.getInstance();
  sl.registerSingleton<Prefs>(prefs);

  // 2) Dio
  sl.registerLazySingleton<Dio>(() {
    final dio = Dio(
      BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 15),
        responseType: ResponseType.json,
      ),
    );

    // Add interceptors (logging + auth)
    dio.interceptors.addAll([
      LoggingInterceptor(),
      AuthInterceptor(sl<SecureStore>()),
    ]);

    return dio;
  });

  // 3) ApiClient wrapper
  sl.registerLazySingleton<ApiClient>(() => ApiClient(sl<Dio>()));
}

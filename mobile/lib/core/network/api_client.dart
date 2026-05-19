import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient {
  late Dio _dio;
  final String baseUrl = "http://localhost:5000/api/v1";

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
        final tenantId = prefs.getString('tenantId');

        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        if (tenantId != null) {
          options.headers['x-tenant-id'] = tenantId;
        }
        return handler.next(options);
      },
      onError: (e, handler) {
        if (e.response?.statusCode == 401) {
          // Handle session expiry
        }
        return handler.next(e);
      },
    ));
  }

  Dio get dio => _dio;
}

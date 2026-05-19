import 'package:geolocator/geolocator.dart';
import 'package:dio/dio.dart';

class GpsService {
  final Dio dio;

  GpsService(this.dio);

  Future<void> startLocationTracking() async {
    // 1. Request background permissions
    // 2. Setup location stream
    Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // Update every 10 meters
      ),
    ).listen((Position position) {
      _sendLocationToBackend(position);
    });
  }

  Future<void> _sendLocationToBackend(Position pos) async {
    try {
      await dio.post('/tracking/ping', data: {
        'lat': pos.latitude,
        'lng': pos.longitude,
        'timestamp': DateTime.now().toIso8601String(),
      });
    } catch (e) {
      // Store locally if failed
    }
  }

  bool isInsideGeofence(double lat, double lng, double targetLat, double targetLng, double radius) {
    double distance = Geolocator.distanceBetween(lat, lng, targetLat, targetLng);
    return distance <= radius;
  }
}

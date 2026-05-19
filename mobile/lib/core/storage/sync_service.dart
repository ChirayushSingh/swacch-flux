import 'dart:io';
import 'package:dio/dio.dart';
import 'package:isar/isar.dart';

class SyncService {
  final Isar isar;
  final Dio dio;

  SyncService(this.isar, this.dio);

  Future<void> syncOfflineTasks() async {
    // 1. Fetch pending updates from local DB
    // 2. Upload images first to S3
    // 3. Sync status updates to backend
    // 4. Update local DB status on success
  }

  Future<void> queueTaskUpdate(String taskId, String status, {File? proofImage}) async {
    // 1. Save update to Isar local queue
    // 2. If online, trigger sync immediately
    // 3. If offline, wait for connectivity_plus event
  }
}

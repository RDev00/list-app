import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

Future<void> saveSession(String sesionToken) async {
  await storage.write(key: 'token', value: sesionToken);
}


Future<bool> checkSession() async {
  final sessionActive = await storage.read(key: 'token');
  return sessionActive != null && sessionActive.isNotEmpty;
}

Future<String?> getSession() async {
  final userSession = await storage.read(key: "token");
  if (userSession == null || userSession.isEmpty) {
    return null;
  }
  return userSession;
}

Future<void> closeSession() async {
  await storage.delete(key: 'token');
}
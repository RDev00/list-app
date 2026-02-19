import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

void saveSession(String sesionToken) {
  storage.write(key: 'token', value: sesionToken);
}


Future<bool> checkSession() async {
  dynamic sessionActive = await storage.read(key: 'token');
  if(sessionActive.isNotEmpty) {
    return true;
  }
  return false;
}

Future<dynamic> getSession() async {
  dynamic userSession = await storage.read(key: "token");
  if(userSession.isEmpty) {
    return null;
  }
  return userSession;
}

void closeSession() {
  storage.delete(key: 'token');
}
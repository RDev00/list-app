// ignore: depend_on_referenced_packages
import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveSession(String sesionToken) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('token', sesionToken);
}

Future<bool> checkSession() async {
  final prefs = await SharedPreferences.getInstance();
  final sessionActive = prefs.getString('token');
  return sessionActive != null && sessionActive.isNotEmpty;
}

Future<String?> getSession() async {
  final prefs = await SharedPreferences.getInstance();
  final userSession = prefs.getString('token');
  if (userSession == null || userSession.isEmpty) {
    return null;
  }
  return userSession;
}

Future<void> closeSession() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove('token');
}
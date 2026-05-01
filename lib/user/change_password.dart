// ignore_for_file: depend_on_referenced_packages

import 'dart:convert';

import 'package:flutter/material.dart';
import '../dashboard.dart';
import '../auth/login.dart';
import '../services/session_storage.dart';
import 'package:http/http.dart' as http;

class ChangePassword extends StatelessWidget {
  const ChangePassword({super.key});

  @override
  Widget build(BuildContext context) {
    return const ChangePasswordState();
  }
}

class ChangePasswordState extends StatefulWidget {
  const ChangePasswordState({super.key});

  @override
  State<ChangePasswordState> createState() {
    return _ChangePasswordState();
  }
}

class _ChangePasswordState extends State<ChangePasswordState> {
  final fgk = GlobalKey<FormState>();
  final TextEditingController password = TextEditingController();
  final TextEditingController newPassword = TextEditingController();
  Map<String, dynamic> userData = {};
  bool isPressed = false;

  @override
  void dispose() {
    password.dispose();
    newPassword.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    updateUserData();
  }

  Future<void> updateUserData() async{
    String? token = await getSession();
    final res = await getUserData(token!);
    if (!mounted) return;
    if(res!.isEmpty || res["error"] != null) {
      const errorSnackBar = SnackBar(content: Text("Sesión invalida o error en el servidor, intente regresar más tarde"));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
      Navigator.push(
        context, 
        MaterialPageRoute(
          builder: (context) => LogInWidget(),
        )
      );
    } else {
      setState(() {
        userData = {
          "id": res["user"]["id"],
          "email": res["user"]["email"],
        };
      });
    }

    return;
  }

  Future<void> updatePassword() async {
    if(fgk.currentState!.validate()) {
      String passwordString = password.text;
      String newPasswordString = newPassword.text;
      final token = await getSession();
      final res = await saveNewPassword(passwordString, newPasswordString, token!);

      if (!mounted) return;
      if(res["error"] != null){
        String message = "${res["message"]}, error: ${res["error"]}";
        final errorSnackBar = SnackBar(content: Text(message));
        ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
      } else {
        String message = res["message"];
        final successSnackBar = SnackBar(content: Text(message));
        ScaffoldMessenger.of(context).showSnackBar(successSnackBar);

        Navigator.push(
          context, 
          MaterialPageRoute(
            builder: (context) => DashboardWidget(),
          )
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            "CloudBook",
            style: TextStyle(
              fontWeight: FontWeight.w600
            ),
          ),
        ),
        body: Center(
          child: Form(
            key: fgk,
            child: Column(
              children: <Widget>[
                Container(
                  width: 300.0,
                  height: 400.0,
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 245, 245, 245),
                    borderRadius: BorderRadius.circular(10),
                    boxShadow: [
                      BoxShadow(
                        color: Color.fromARGB(50,0,0,0),
                        blurRadius: 15,
                        spreadRadius: 5,
                        offset: Offset(0, 15)
                      )
                    ]
                  ),
                  child: Column(
                    children: [
                      SizedBox(height: 10.0,),
                      Text(
                        "Cambia tu contraseña",
                        style: TextStyle(
                          fontSize: 30.0,
                          fontWeight: FontWeight.w500
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 20.0,),
                      SizedBox(
                        width: 250.0,
                        child: TextFormField(
                          controller: password,
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: "Contraseña original",
                            hintText: "Contraseña segura",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: BorderSide.none,
                            ),
                            filled: true,
                            fillColor: const Color.fromARGB(5, 0, 0, 0)
                          ),
                          validator: (value) {
                            if(value!.isEmpty) {
                              return "La contraseña es de caracter obligatorio";
                            }
                            return null;
                          },
                        ),
                      ),
                      SizedBox(height: 20.0,),
                      SizedBox(
                        width: 250.0,
                        child: TextFormField(
                          controller: newPassword,
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: "Contraseña nueva",
                            hintText: "Contraseña segura",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: BorderSide.none,
                            ),
                            filled: true,
                            fillColor: const Color.fromARGB(5, 0, 0, 0)
                          ),
                          validator: (value) {
                            if(value!.isEmpty) {
                              return "La contraseña es de caracter obligatorio";
                            }
                            return null;
                          },
                        ),
                      ),
                      SizedBox(height: 40.0,),
                      SizedBox(
                        width: 200.0,
                        child: ElevatedButton(
                          onPressed: isPressed ? null : updatePassword,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isPressed ? const Color.fromARGB(255, 83, 83, 83) : Colors.blue,
                            foregroundColor: Colors.white,
                          ),
                          child: Text("Cambiar contraseña"),
                        ),
                      ),
                      SizedBox(height: 10.0,),
                    ],
                  )
                )
              ]
            ),
          ),
        ),
      );
  }
}

Future<Map<String, dynamic>> saveNewPassword(String password, String newPassword, String token) async {
  try {
    final uri = Uri.parse("https://cloudbook.ravexcode.com/api/users");
    final res = await http.put(
      uri,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: jsonEncode({"password": password, "newPassword": newPassword})
    );

    if(res.statusCode == 200) {
      return {
        "message": "Contraseña actualizada con éxito"
      };
    } else {
      final resBody = jsonDecode(res.body);
      return {
       "message": "No se actualizó tu contraseña debido a un error",
       "error": resBody["error"],
      };
    }
  } catch (err) {
    return {
      "message": "Ha ocurrido un error en el servidor",
      "error": err,
    };
  }
}
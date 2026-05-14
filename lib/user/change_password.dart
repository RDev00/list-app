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
  bool _isObscure = false;
  // ignore: non_constant_identifier_names
  bool _isObscure_confirm = false;

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
        ),body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(30.0),
            child: Form(
              key: fgk,
              child: Container(
                width: double.infinity,
                constraints: const BoxConstraints(
                  maxWidth: 360
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: 25.0,
                  vertical: 32.0
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[

                    const Text(
                      "Cambiar contraseña",
                      style: TextStyle(
                        fontSize: 25.0,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87
                      ),
                    ),
                    const SizedBox(height: 20.0),

                    TextFormField(
                      controller: password,
                      keyboardType: TextInputType.text,
                      obscureText: _isObscure,
                      textInputAction: TextInputAction.next,
                      decoration: InputDecoration(
                        labelText: "Ingresa tu contraseña",
                        hintText: "••••••••",
                        filled: true,
                        fillColor: Colors.grey.shade50,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide.none,
                        ),

                        suffixIcon: IconButton(
                          onPressed: () {
                            setState(() {
                              _isObscure = !_isObscure;
                            });
                          },
                          icon: Icon(
                            _isObscure ? Icons.visibility : Icons.visibility_off,
                          )
                        )
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "La contraseña es obligatoria";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16.0),

                    TextFormField(
                      controller: newPassword,
                      keyboardType: TextInputType.text,
                      obscureText: _isObscure_confirm,
                      textInputAction: TextInputAction.next,
                      decoration: InputDecoration(
                        labelText: "Ingresa tu nueva contraseña",
                        hintText: "••••••••",
                        filled: true,
                        fillColor: Colors.grey.shade50,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide.none,
                        ),

                        suffixIcon: IconButton(
                          onPressed: () {
                            setState(() {
                              _isObscure_confirm = !_isObscure_confirm;
                            });
                          },
                          icon: Icon(
                            _isObscure_confirm ? Icons.visibility : Icons.visibility_off,
                          )
                        )
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Es necesario confirmar tu contraseña";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 50.0),

                    SizedBox(
                      width: double.infinity,
                      height: 40.0,
                      child: ElevatedButton(
                        onPressed: isPressed ? null : updateUserData,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? Colors.blueGrey[200] : Colors.blueAccent,
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: Text(
                          isPressed ? "Actualizando tus datos..." : "Cambiar tu contraseña",
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600
                          ),
                        ),
                      ),
                    ),

                    SizedBox(height: 20.0,),
                    Text(
                      "v1.1.2",
                      style: TextStyle(
                        fontSize: 15.0,
                        color: Color.fromARGB(200, 0, 0, 0)
                      ),
                    )
                  ],
                ),
              ),
            ),
          )
        )
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
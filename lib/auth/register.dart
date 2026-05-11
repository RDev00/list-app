// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'package:cloudbook/dashboard.dart';
import 'package:cloudbook/unregistred/dashboard.dart';
import 'package:flutter/material.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'login.dart';
import 'package:flutter/gestures.dart';
import '../services/session_storage.dart';
import 'package:url_launcher/url_launcher.dart';

class RegisterForm extends StatefulWidget {
  const RegisterForm({super.key});

  @override
  State<RegisterForm> createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final formKey = GlobalKey<FormState>();
  final TextEditingController email = TextEditingController();
  final TextEditingController password = TextEditingController();
  final TextEditingController confirmPassword = TextEditingController();
  String responseText = "";
  bool isPressed = false;
  Uri tycURI = Uri.parse("https://cloudbook.ravexcode.com/tyc");
  bool _isObscure = true;
  bool _isObscure_confirm = true;

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    confirmPassword.dispose();
    super.dispose();
  }

  void _submitForm() async {
    if(formKey.currentState!.validate()) {
      setState(() {
        isPressed = true;
      });

      dynamic res = await register(email.text, password.text);

      setState(() {
        isPressed = false;
      });

      if (res['error'] != null || res.isEmpty) {
        String message = res["message"];
        String error = res["error"];
        final errorSnackBar = SnackBar(content: Text("$message.\n Error: $error"), duration: const Duration(seconds: 2));
        ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
        return;
      }

      if(res["token"] != null) {
        saveSession(res["token"]);
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const DashboardWidget()),
          (route) => false,
        );

        return;
      }

      return;
    }
  }

  void _navigateToLogin(BuildContext context) {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const LogInWidget()),
      (route) => false,
    );
  }

  void _goToDashboard() {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const UnregistedDashboard()),
      (route) => true
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 245, 245, 245),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 245, 245, 245),
        elevation: 0,
        centerTitle: true, // Opcional: para mantener la simetría
        title: GestureDetector(
          onTap: _goToDashboard,
          child: MouseRegion(
            cursor: SystemMouseCursors.click, // Cambia el cursor a "click" en web/desktop
            child: const Text(
              "CloudBook",
              style: TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.black87,
              ),
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(30.0),
            child: Form(
              key: formKey,
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
                      "Registrate",
                      style: TextStyle(
                        fontSize: 25.0,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87
                      ),
                    ),
                    const SizedBox(height: 20.0),

                    TextFormField(
                      controller: email,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.next,
                      decoration: InputDecoration(
                        labelText: "Ingresa tu correo",
                        hintText: "usuario@domain.com",
                        filled: true,
                        fillColor: Colors.grey.shade50,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide.none,
                        ),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "El correo es obligatorio";
                        }
                        
                        // Patrón de expresión regular para email
                        final bool emailValid = 
                            RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                            .hasMatch(value);

                        if (!emailValid) {
                          return "Por favor, ingresa un correo válido (usuario@domain.com)";
                        }
                        
                        return null;
                      },
                    ),
                    const SizedBox(height: 16.0),

                    TextFormField(
                      controller: password,
                      keyboardType: TextInputType.text,
                      obscureText: _isObscure,
                      textInputAction: TextInputAction.next,
                      decoration: InputDecoration(
                        labelText: "Confirma tu contraseña",
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
                      controller: confirmPassword,
                      keyboardType: TextInputType.text,
                      obscureText: _isObscure_confirm,
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
                        onPressed: isPressed ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? Colors.blueGrey[200] : Colors.blueAccent,
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: Text(
                          isPressed ? "Registrandote..." : "Registrarme",
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600
                          ),
                        ),
                      ),
                    ),

                    SizedBox(height: 15.0),
                    RichText(
                      text: TextSpan(
                        style: TextStyle(
                          fontSize: 15.0,
                        ),
                        children: [
                          TextSpan(
                            text: "Al ingresar aceptas nuestros ",
                            style: TextStyle(
                              fontSize: 15.0,
                              color: Colors.black
                            ),
                          ),
                          TextSpan(
                            text: "Terminos y condiciones",
                            style: TextStyle(
                              fontSize: 15.0,
                              color: Colors.blue,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => launchUrl(tycURI),
                          )
                        ],
                      ),
                      textAlign: TextAlign.center,
                    ),
                    RichText(
                      text: TextSpan(
                        style: TextStyle(
                          fontSize: 15.0,
                        ),
                        children: [
                                TextSpan(
                            text: "¿Ya tienes cuenta? ",
                            style: const TextStyle(
                              color: Colors.black,
                            ),
                          ),
                          TextSpan(
                            text: "¡Inicia sesión!",
                            style: const TextStyle(
                              color: Colors.blue,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => _navigateToLogin(context),
                          ),
                        ],
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 10.0,),
                    SizedBox(height: 20.0,),
                    Text(
                      "v1.1.0",
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

Future<dynamic> register(String email, String password) async {
  try {
    final url = Uri.parse("https://cloudbook.ravexcode.com/api/users/register");
    final res = await http.post(
    url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    ).timeout(const Duration(seconds: 10));

    if(res.statusCode == 200){
      final body = jsonDecode(res.body);
      return {
        "message": body["message"],
        "token": body["token"]
      };
    } else {
      final body = jsonDecode(res.body);
      return {
        "message": body["message"],
        "error": body["error"]
      };
    }
  } catch(err){
    return {
      "message": "Ha ocurrido un error en el servidor",
      "error": err
    };
  }
}

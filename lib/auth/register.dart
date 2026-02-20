import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'login.dart';
import 'package:flutter/gestures.dart';
import '../services/session_storage.dart';

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
  Uri tycURI = Uri.parse("https://list-app-neon.vercel.app/tyc");

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
      saveSession(res.token);
      setState(() {
        isPressed = false;
        responseText = res?.body.message ?? "Error desconocido";
      });

      if(res?.statusCode == 201) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LogInForm()),
        );
      }
    }
  }

  void _navigateToLogin(BuildContext context) {
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("CloudBook"),
      ),
      body: Center(
        child: Form(
          key: formKey,
          child: Column(
            children: <Widget>[
              Container(
                width: 300.0,
                height: 450.0,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 230, 230, 230),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  children: [
                    const SizedBox(height: 10.0,),
                    const Text(
                      "Crear Cuenta",
                      style: TextStyle(
                        fontSize: 30.0,
                        fontWeight: FontWeight.w500
                      ),
                    ),
                    const SizedBox(height: 20.0,),
                    SizedBox(
                      width: 250.0,
                      child: TextFormField(
                        controller: email,
                        decoration: InputDecoration(
                          labelText: "Correo",
                          hintText: "example@email.com",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: const Color.fromARGB(20, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "El correo es obligatorio";
                          }
                          return null;
                        },
                      ),
                    ),
                    const SizedBox(height: 20.0,),
                    SizedBox(
                      width: 250.0,
                      child: TextFormField(
                        controller: password,
                        obscureText: true,
                        decoration: InputDecoration(
                          labelText: "Contraseña",
                          hintText: "Contraseña segura",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: const Color.fromARGB(20, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "La contraseña es obligatoria";
                          }
                          return null;
                        },
                      ),
                    ),
                    const SizedBox(height: 20.0,),
                    SizedBox(
                      width: 250.0,
                      child: TextFormField(
                        controller: confirmPassword,
                        obscureText: true,
                        decoration: InputDecoration(
                          labelText: "Confirmar Contraseña",
                          hintText: "Repite tu contraseña",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: const Color.fromARGB(20, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "Confirma tu contraseña";
                          }
                          if(value != password.text) {
                            return "Las contraseñas no coinciden";
                          }
                          return null;
                        },
                      ),
                    ),
                    const SizedBox(height: 30.0,),
                    SizedBox(
                      width: 200.0,
                      child: ElevatedButton(
                        onPressed: isPressed ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? const Color.fromARGB(255, 83, 83, 83) : Colors.blue,
                          foregroundColor: Colors.white,
                        ),
                        child: const Text("Registrarse"),
                      ),
                    ),
                    const SizedBox(height: 15.0,),
                    Text(
                      responseText,
                      style: const TextStyle(
                        color: Color.fromARGB(200, 0, 0, 0),
                        fontSize: 15.0,
                      ),
                      textAlign: TextAlign.center,
                      textDirection: TextDirection.ltr,
                    ),
                    const SizedBox(height: 10.0,),
                    RichText(
                      text: TextSpan(
                        children: [
                          const TextSpan(
                            text: "¿Ya tienes cuenta? ",
                            style: TextStyle(
                              fontSize: 15.0,
                              color: Colors.black,
                            ),
                          ),
                          TextSpan(
                            text: "¡Inicia sesión!",
                            style: const TextStyle(
                              fontSize: 15.0,
                              color: Colors.blue,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => _navigateToLogin(context),
                          )
                        ]
                      ),
                    ),
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

Future<dynamic> register(String email, String password) async {
  final url = Uri.parse("https://list-app-iota.vercel.app/api/users/register");
  final response = await http.post(
    url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    ).timeout(const Duration(seconds: 10)); //En caso de tardar mucho lo corta y envia timeoutError
  print('$email $password'); // <- debug
  return response; // <- Obligatorio
}

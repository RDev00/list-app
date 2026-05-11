// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'package:cloudbook/auth/reset_password.dart';
import 'package:cloudbook/unregistred/dashboard.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import '../dashboard.dart';
import '../services/session_storage.dart';
// ignore: depend_on_referenced_packages
import 'package:url_launcher/url_launcher.dart';
import './register.dart';

class LogInWidget extends StatelessWidget {
  const LogInWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const LogInForm();
  }
}

class LogInForm extends StatefulWidget {
  const LogInForm({super.key});

  @override
  State<LogInForm> createState() => _LogInFormState();
}

//Tomar en cuenta *
class _LogInFormState extends State<LogInForm> {
  final formKey = GlobalKey<FormState>();
  final TextEditingController email = TextEditingController();
  final TextEditingController password = TextEditingController();
  bool isPressed = false;
  final Uri tycURI = Uri.parse("https://cloudbook.ravexcode.com/tyc");
  bool _isObscure = true;

  //Limpieza de datos previos (prevencion de leaks, bugs o requests incorrectas)
  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }

  void _navigateToRegister() {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const RegisterForm()),
      (route) => false,
    );
  }
  
  void _navigateToResetPasswordWidget() {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const ResetPasswordWidget()),
      (route) => true
    );
  }

  void _goToDashboard() {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const UnregistedDashboard()),
      (route) => true
    );
  }

  Future<void> _submitForm() async {
    if (!formKey.currentState!.validate()) return;
    if (!mounted) return;

    setState(() => isPressed = true);

    final res = await logIn(email.text, password.text);

    setState(() => isPressed = false);

    if (res['error'] != null || res.isEmpty) {
      String message = res["message"];
      String error = res["error"];
      final errorSnackBar = SnackBar(content: Text("$message. Error: $error"), duration: const Duration(seconds: 2));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
      return;
    }

    final token = res["token"];
    await saveSession(token);
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(
        builder: (context) => DashboardWidget(),
      ),
      (route) => false
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
                      "Inicia sesión",
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
                          isPressed ? "Ingresando..." : "Iniciar sesión",
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
                            text: "¿No tienes cuenta? ",
                            style: const TextStyle(
                              color: Colors.black,
                            ),
                          ),
                          TextSpan(
                            text: "¡Registrate!",
                            style: const TextStyle(
                              color: Colors.blue,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = _navigateToRegister,
                          ),
                        ],
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 10.0,),
                    RichText(
                      text: TextSpan(
                        style: TextStyle(
                          fontSize: 15.0,
                        ),
                        children: [
                          TextSpan(
                            text: "Olvidé mi contraseña",
                            style: TextStyle(
                              fontSize: 15.0,
                              color: Colors.blue,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = _navigateToResetPasswordWidget,
                          )
                        ],
                      ),
                      textAlign: TextAlign.center,
                    ),
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

/*Funcion:
  Future: Promesa*/
Future<Map<String, dynamic>> logIn(String email, String password) async {
  //Try para mejor manejo de errores
  try {
    //URLS: /login, /register, ambas piden lo mismo
    final url = Uri.parse("https://cloudbook.ravexcode.com/api/users/login");
    //Esto es el fetch
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}), //Esto no se cambiara en el register
    ).timeout(const Duration(seconds: 10)); //En caso de tardar mucho lo corta y envia timeoutError

    return jsonDecode(response.body) as Map<String, dynamic>;
  } catch (e) {
    return {
      "message": "Ha ocurrido un error en el servidor",
      "error": e
    };
  }
}
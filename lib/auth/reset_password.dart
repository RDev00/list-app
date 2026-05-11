// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:cloudbook/unregistred/dashboard.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './login.dart';

class ResetPasswordWidget extends StatefulWidget {
  const ResetPasswordWidget({super.key});

  @override
  State<ResetPasswordWidget> createState() => _ResetPasswordForm();
}

class _ResetPasswordForm extends State<ResetPasswordWidget> {
  final fgk = GlobalKey<FormState>();
  final TextEditingController email = TextEditingController();
  final TextEditingController emailConfirm = TextEditingController();
  bool isPressed = false;

  @override
  void dispose() {
    email.dispose();
    emailConfirm.dispose();
    super.dispose();
  }

  void turnOnButton() {
    setState(() {
      isPressed = false;
    });
  }

  void turnOffButton() {
    setState(() {
      isPressed = true;
    });
  }

  Future<void> _submitForm() async {
    if(!fgk.currentState!.validate()) return;
    if(!mounted) return;
    turnOffButton();

    if(email.text != emailConfirm.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Los emails no coinciden"))
      );
      turnOnButton();
      return;
    }

    final url = Uri.parse("https://cloudbook.ravexcode.com/api/users/password-reset");
    final res = await http.post(
      url,
      headers: { "Content-Type": "application/json" },
      body: jsonEncode({'email': email.text,}),
    ).timeout(const Duration(seconds: 10));

    Map<String, dynamic> data = jsonDecode(res.body);

    if(res.statusCode != 200) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("${data["message"] ?? "Ha ocurrido un error en el servidor"}. Error: ${data["error"] ?? "El servidor no responde"}"))
      );
      turnOnButton();
      return;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("${data["message"]}."))
    );
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const LogInWidget()),
      (route) => false,
    );
    return;
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
                      "Recuperemos tu contraseña",
                      style: TextStyle(
                        fontSize: 25.0,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87,
                      ),
                      textAlign: TextAlign.center,
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
                      controller: emailConfirm,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.next,
                      decoration: InputDecoration(
                        labelText: "Confirma tu correo",
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
                          isPressed ? "Enviando..." : "Recuperar contraseña",
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600
                          ),
                        ),
                      ),
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
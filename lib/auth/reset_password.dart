// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

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
                    SizedBox(
                      width: 250.0,
                      child: Text(
                        "Recuperar contraseña",
                        style: TextStyle(
                          fontSize: 30.0,
                          fontWeight: FontWeight.w500
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(height: 20.0,),
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
                          fillColor: const Color.fromARGB(5, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "El correo es de caracter obligatorio";
                          }
                          return null;
                        },
                      ),
                    ),
                    SizedBox(height:10.0,),
                    SizedBox(
                      width: 250.0,
                      child: TextFormField(
                        controller: emailConfirm,
                        decoration: InputDecoration(
                          labelText: "Confirmación",
                          hintText: "example@email.com",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: const Color.fromARGB(5, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "El correo es de caracter obligatorio";
                          }
                          return null;
                        },
                      ),
                    ),
                    SizedBox(height: 40.0,),
                    SizedBox(
                      width: 200.0,
                      child: ElevatedButton(
                        onPressed: isPressed ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? const Color.fromARGB(255, 83, 83, 83) : Colors.blue,
                          foregroundColor: Colors.white,
                        ),
                        child: Text("Recuperar contraseña"),
                      ),
                    ),
                    SizedBox(height: 20.0,),
                    SizedBox(
                      width: 250.0,
                      child: Text(
                        "Recibiras un email por parte de CloudBook ¡No compartas el enlace con nadie!",
                        style: TextStyle(
                          color: Color.fromARGB(150, 0, 0, 0)
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(height: 15.0,),
                  ],
                )
              )
            ],
          )
        ),
      )
    );
  }
}
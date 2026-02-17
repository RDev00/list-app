//Isaac: Tienes 2 TODO's pendientes en este documento

import 'dart:convert';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import 'register.dart';

class LogInWidget extends StatelessWidget{
  const LogInWidget ({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: LogInForm(),
    );
  }
}

class LogInForm extends StatefulWidget {
  const LogInForm({super.key});

  @override
  State<LogInForm> createState() => _LogInFormState();
}

//Tomar en cuenta *
class _LogInFormState extends State<LogInForm> {
  //LLave general del formulario (form id)
  final formKey = GlobalKey<FormState>();
  //Valores de inputs
  final TextEditingController email = TextEditingController();
  final TextEditingController password = TextEditingController();
  String responseText = "";
  bool isPressed = false;
  Uri tycURI = Uri.parse("https://list-app-neon.vercel.app/tyc");

  //Limpieza de datos previos (prevencion de leaks, bugs o requests incorrectas)
  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }

  void _submitForm() async {
    if(formKey.currentState!.validate()) {  //Valida si tiene id el form
      const SnackBar(content: Text("Iniciando sesión..."));
      
      setState(() {
        isPressed = true;
      });
      /*TODO - Isaac: Verificar que:
        Crear variable para la funcion del login e insertar respuesta en responseText
      
      Tipos:
        Email: String
        Password: String
        Respuesta: String (response.body.message de la funcion logIn)
        
      Cambiar:
        Funcion de login, el valor de la contraseña quitar la estatica y agregar la ingresada*/

      dynamic res = await logIn(email.text, password.text); //Ejecuta funcion de login

      setState(() {
        isPressed = false;
        responseText = 
          responseText = res?.body.message ?? "Error desconocido";;
      });
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
          ),),
      ),
      body: Center(
        child: Form(
          key: formKey,
          child: Column(
            children: <Widget>[
              Container(
                width: 300.0,
                height: 400.0,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 230, 230, 230),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  children: [
                    SizedBox(height: 10.0,),
                    Text(
                      "Inicia Sesión",
                      style: TextStyle(
                        fontSize: 30.0,
                        fontWeight: FontWeight.w500
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
                          fillColor: const Color.fromARGB(20, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "El correo es de caracter obligatorio";
                          }
                          return null;
                        },
                      ),
                    ),
                    SizedBox(height: 20.0,),
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
                        onPressed: isPressed ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? const Color.fromARGB(255, 83, 83, 83) : Colors.blue,
                          foregroundColor: Colors.white,
                        ),
                        child: Text("Iniciar sesión"),
                      ),
                    ),
                    SizedBox(height: 20.0,),
                    Text(
                      responseText,
                      style: TextStyle(
                        color: Color.fromARGB(200, 0, 0, 0),
                        fontSize: 15.0,
                      ),
                      textAlign: TextAlign.center,
                      textDirection: TextDirection.ltr,
                    ),
                    SizedBox(height: 5.0,),
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
                            style: TextStyle(
                              color: Colors.black,
                            ),
                          ),
                          TextSpan(
                            text: "¡Registrate!",
                            style: TextStyle(
                              color: Colors.blue,
                            ),
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => RegisterForm()),
                            ),
                          ),
                        ],
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 5.0,),
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

/*Funcion:
  Future: Promesa*/
Future<dynamic> logIn(String email, String password) async {
  //Try para mejor manejo de errores
  try {
    //URLS: /login, /register, ambas piden lo mismo
    final url = Uri.parse("https://list-app-neon.vercel.app/api/users/login");
    //Esto es el fetch
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}), //Esto no se cambiara en el register
    ).timeout(const Duration(seconds: 10)); //En caso de tardar mucho lo corta y envia timeoutError

    return response;
  } catch (e) {
    print("Error: $e");
    const SnackBar(content: Text("Hubo un error al querer iniciar sesión"));
  }
}
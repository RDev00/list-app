//Isaac: Tienes 2 TODO's pendientes en este documento
//Rafa: Tienes 4+ TODO's pendientes en este documento

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main(){
  runApp(const LogInWidget());
}

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
  final TextEditingController password = TextEditingController(); //Aun sin uso
  //String de respuesta
  String responseText = ""; //Aun sin uso

  //Limpieza de datos previos (prevencion de leaks, bugs o requests incorrectas)
  @override
  void dispose() {
    email.dispose();
    password.dispose(); //Sin uso
    super.dispose();
  }

  void _submitForm() async {
    if(formKey.currentState!.validate()) {  //Valida si tiene id el form
      print("Iniciando sesion");  //TODO - Rafa: Cambiar a un snackbar
    }

    /*TODO - Isaac: Verificar que:
      Hayan datos en ambos inputs con la funcion isNotEmpty
      Los tipos de ambos sean String
      Crear variable para la funcion del login e insertar respuesta en responseText
    
    Tipos:
      Email: String
      Password: String
      Respuesta: String (response.body.message de la funcion logIn)
      
    Cambiar:
      Funcion de login, el valor de la contraseña quitar la estatica y agregar la ingresada*/

    await logIn(email.text, "example1234"); //Ejecuta funcion de login
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        //TODO - Rafa: Agregar headers
        child: Form(
          key: formKey,
          child: Column(
            //TODO - Rafa: mejorar el diseño del login
            children: <Widget>[//Widget 
              SizedBox( //Uso de sized box para determinar el tamaño del input
                width: 200.0, //Ancho del input
                child: TextFormField( //Input
                  controller: email, //Variable que cambia
                  decoration: const InputDecoration( //Valores unicos de inputs (label, placeholder, etc)
                    labelText: "Correo",  //Label
                    hintText: "Ingresa tu correo",  //Placeholder
                    border: OutlineInputBorder(), //Borde (activado)
                  ),
                  validator: (value) {  //Validador de datos (required)
                    if(value == null || value.isEmpty) {  //Verifica si está vació o no
                      return "Por favor ingresa tu correo"; //Mensaje de error
                    }
                    return null;  //Si es valido, lo salta
                  },
                ),
              ),
              const SizedBox(height: 20), //Espaciado
              SizedBox( //Uso de sized box para determinar el tamaño del input
                width: 200.0, //Ancho del input
                child: TextFormField( //Input
                  controller: password, //Variable que cambia
                  decoration: const InputDecoration( //Valores unicos de inputs (label, placeholder, etc)
                    labelText: "Contraseña",  //Label
                    hintText: "Ingresa tu contraseña",  //Placeholder
                    border: OutlineInputBorder(), //Borde (activado)
                  ),
                  validator: (value) {  //Validador de datos (required)
                    if(value == null || value.isEmpty) {  //Verifica si está vació o no
                      return "Por favor ingresa tu contraseña"; //Mensaje de error
                    }
                    return null;  //Si es valido, lo salta
                  },
                ),
              ),
              const SizedBox(height: 20), //Espaciado
              SizedBox( //El botón de submit
                width: 200.0, //Tamaño
                child: ElevatedButton(  //ElevatedButton = <button type="submit"></button> (creo)
                  onPressed: _submitForm, //Esto es la funcion onClick
                  style: ElevatedButton.styleFrom(  //Estilos
                    backgroundColor: Colors.blue, //Fondo
                    foregroundColor: Colors.white,  //Texto
                  ),
                  child: Text("LogIn"),  //Texto del botón
                  //Creo que los efectos del hover se agregan solos
                ),
              ),

              //TODO - Rafa: Agregar texto de respuesta, texto de redireccion y aceptacion de TYC (con su redireccion a la pagina) en checkbox
            ]
          ),
        ),
      ),
    );
  }
}

/*Funcion:
  Future: Promesa*/
Future<void> logIn(String email, String password) async {
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

    print("Status: ${response.statusCode}");  //Codigo de respuesta (Debug)
    print("Body: ${response.body}");  //JSON de respuesta (Debug)

    //TODO - Isaac: Agregar el return de la respuesta 
  } catch (e) {
    print("Error: $e"); //Error (debug)
    //TODO - Rafa: Agregar SnackBar
  }
}
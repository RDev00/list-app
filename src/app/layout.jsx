import './styles/global.css';

export default function Layout(props){
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title> List-app </title>
    </head>
    <body>
      {props.children}
    </body>
    </html>
  )
}
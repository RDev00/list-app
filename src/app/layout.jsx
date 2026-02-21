import './styles/global.css';

export default function Layout(props){
  return (
    <html lang="en">
    <head>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title> CloudBook </title>
    </head>
    <body>
      {props.children}
    </body>
    </html>
  )
}
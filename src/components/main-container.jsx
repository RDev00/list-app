export default function MainContainer(props){
  return(
    <main className="min-h-dvh grid grid-cols">
      {props.children}
    </main>
  )
}
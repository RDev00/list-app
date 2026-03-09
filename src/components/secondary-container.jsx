export default function SecondaryContainer(props){
  return (
    <article className="flex flex-col justify-center items-center gap-6 py-10 px-5 min-h-dvh">
      {props.children}
    </article>
  )
}
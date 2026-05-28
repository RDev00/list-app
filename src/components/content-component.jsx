//Next imports
import Image from "next/image"

export default function ContentComponent(props) {
  return (
    <section
    className="flex flex-col md:flex-row gap-10 justify-start items-center w-full max-w-400 mx-auto px-8 md:px-10 timeline-view-y animate-zoom-in animate-range-[entry_0%_cover_30%]">
      <div
      className={props.parentClasses + " w-full md:w-[60%]"}>
        { props.children }
      </div>

      <Image
      width={1000}
      height={1000}
      alt="image"
      preload
      loading="eager"
      src={props.image}
      className="max-w-80 md:max-w-150 w-full md:w-[40%] rounded-xl" />
    </section>
  )
}
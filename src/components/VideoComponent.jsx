const videoComponent = ({id,small = true})=>{
    return(
        <iframe  width="90%"
                 height={small?"150":"500"}
                 src={`https://www.youtube.com/embed/${id}`}
                 title="YouTube video player"
                 allowFullScreen={true}
        >

        </iframe>
    )
}
export default videoComponent;
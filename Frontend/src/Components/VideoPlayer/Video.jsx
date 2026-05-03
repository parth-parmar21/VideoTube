const Video = ({ className, videoUrl }) => {
    // console.log("Video: ", videoUrl);
    
    return (
        <div className={`${className} bg-black`}>
            <video controls className="w-full h-full rounded-xl">
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    )
}

export default Video;
const Video = ({ className }) => {
    return (
        <div className={`${className} bg-black`}>
            <video controls className="w-full h-full rounded-xl">
                <source src="https://www.pexels.com/download/video/10233506/" type="video/mp4" />
            </video>
        </div>
    )
}

export default Video;
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import ChannelDetails from "./ChannelDetails";

const Description = ({desc, videoId, channelId}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-black border rounded-xl p-6">
            <ChannelDetails videoId={videoId} channelId = {channelId}/>
            <h2 className="text-xl font-semibold my-2">
                Description
            </h2>

            <p className={`${expanded ? '' : 'line-clamp-2'}`}>
                {desc}
            </p>

            <button
                onClick={() => setExpanded(!expanded)}
                className="text-white mt-2 "
            >
                {expanded ? <ChevronUp /> : <ChevronDown />}
            </button>

        </div>
    )
}

export default Description;
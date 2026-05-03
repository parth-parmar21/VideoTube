import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Description = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-black border p-3 rounded-xl">

            <h2 className="text-lg font-semibold mb-2">
                Video Title
            </h2>

            <p className={`${expanded ? '' : 'line-clamp-2'}`}>
                This is your video description... it can be very long and should expand properly when user clicks show more.
            </p>

            <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-900 mt-2 "
            >
                {expanded ? <ChevronUp /> : <ChevronDown />}
            </button>

        </div>
    )
}

export default Description;
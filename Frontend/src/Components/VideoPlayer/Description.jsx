import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Description = ({desc}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-black border p-3 rounded-xl">

            <h2 className="text-lg font-semibold mb-2">
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
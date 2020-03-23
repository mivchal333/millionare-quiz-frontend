import * as React from "react";
import {useRef} from "react";
import {useState} from "react";

export const ImageCard = (props) => {
    const {description, urls} = props.image;
    const onClick = () => props.onClick(urls.thumb)
    const imageRef = useRef(null)

    const [spans, setSpans] = useState(0)

    const calculateSpans = () => {
        const height = imageRef.current.clientHeight;
        const spans = Math.ceil(height / 10);
        setSpans(spans)
    }

    return (
            <img
                onLoad={calculateSpans}
                onClick={onClick}
                ref={imageRef}
                alt={description}
                src={urls.thumb}
                style={{gridRowEnd: `span ${spans}`}}
            />
    )

}

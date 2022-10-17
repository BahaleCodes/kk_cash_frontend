import React from "react"

const RangeSlider = (props) => {

    return (
        <div>
            <section>
                <input
                    type="range"
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    value={props.volume}
                    onChange={props.onChange}
                    name={props.name}
                />
            </section>
            <br />
        </div>
    )
}

export default RangeSlider;
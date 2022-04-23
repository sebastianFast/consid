import React, {useState, useRef, useEffect} from "react"
import classes from "./SliderMenu.module.css"
import {motion} from "framer-motion"
import images from "../../../../images/carousel/cImages.js"

const SliderMenu = () => {

    //Static slider menu items
    const[sliderItem, setSliderItem] = useState(
        [
            {
                title: "First Item",
                description: "Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm",
                image: "Image"
            },
            {
                title: "Second Item",
                description: "Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm",
                image: "Image"
            },
            {
                title: "Third Item",
                description: "Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm",
                image: "Image"
            },
            {
                title: "Fourth Item",
                description: "Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm",
                image: "Image"
            },
            {
                title: "Fifth Item",
                description: "Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm",
                image: "Image"
            },
            {
                title: "Sixth Item",
                description: "Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm",
                image: "Image"
            }

        ]
    )

    const[ width, setWidth ] = useState(0)
    const carouselRef = useRef()

    useEffect(()=>{
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    },[])


    return(
        <div className={classes.slider}>
           <motion.div ref={carouselRef} className={classes.carousel1}>
                <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className={classes.innerCarousel}>
                {images.map((image, key) => {
                    return(
                        <motion.div key={key} className={classes.item}>
                            <img src={image} alt=""/>
                        </motion.div>
                    );
                })}
                </motion.div>
            </motion.div> 
        </div>
    )
}

export default SliderMenu
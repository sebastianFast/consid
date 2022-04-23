import React, {useState, useRef, useEffect} from "react"
import classes from "./IndexPage.module.css"
import happy from "../../../images/happyreading.png"
import ReactReadMoreReadLess from "react-read-more-read-less";
import {gsap, Power2} from "gsap";

const IndexPage = () =>{

    const[author] = useState("Author")
    const[title] = useState("Book Title")
    const[subTitle] = useState("Sub Title")
    const[description] = useState("Proin nunc arcu, tempus ut nibh sit amet, volutpat vestibulum mauris. Mauris bibendum sollicitudin laoreet. Etiam pellentesque, turpis a suscipit congue, sapien erat ornare est, at dapibus enim ex ac urna. Mauris sed ipsum eget neque mattis tincidunt. Sed nec dolor vitae lorem interdum fringilla in eu nulla. Sed a urna consectetur, aliquet augue at, porta ligula. Nam quam nisi, efficitur vel finibus eget, sodales quis nisl. Nunc justo elit, lacinia vitae justo eget, rutrum vehicula nunc. Phasellus auctor venenatis risus. Sed dapibus posuere metus. Suspendisse sem nulla, lobortis non vestibulum nec, tristique ac arcu. Quisque iaculis eu mi in venenatis. Integer molestie aliquet dolor et fringilla. Vestibulum vehicula, risus id placerat convallis, quam neque sollicitudin est, a interdum turpis erat eu ex. Ut viverra eros ante, a sollicitudin tortor efficitur eu. Nam sollicitudin.")

    //Effekter
    const backgroundRef = useRef()
    const authorRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()
    const buttonRef = useRef()
    const triangleRef = useRef()

    useEffect(()=>{
        setTimeout(()=>{
            window.scrollTo(0, 0);
        }, 80)

        gsap.fromTo(backgroundRef.current,{left: "0%", top: "70%", opacity: 0}, {left: "25%", top: "50%" , opacity: 1, duration: 1, ease: Power2.easeInOut})
       gsap.fromTo(authorRef.current,{y: -80 ,opacity: 0}, {y: 0 ,opacity: 1, duration: 1 ,ease: Power2.easeOut});
       gsap.fromTo(titleRef.current,{x: 80 ,opacity: 0}, {x: 0 ,opacity: 1, duration: 1 ,ease: Power2.easeOut});
       gsap.fromTo(buttonRef.current,{y: 80 ,opacity: 0}, {y: 0 ,opacity: 1, duration: 1 ,ease: Power2.easeOut});
       gsap.fromTo(descRef.current,{opacity: 0}, {opacity: 1, duration: 1 ,ease: Power2.easeOut}).delay(0.7);
       gsap.fromTo( triangleRef.current,{x: 300, opacity: 0}, {x: 0, opacity: 1, duration: 1 ,ease: Power2.easeOut}).delay(0.7);
      

    },[])

    return(
        <div className={classes.indexPage}>
        <div ref={backgroundRef} className={classes.backgroundImageContainer}>
           <img src={happy} alt="Background_Image" className={classes.backgroundImage}/>
        </div>
        <div className={classes.mainText}>
            <div className={classes.mainWrapper}>
                <h5 ref={authorRef} className={classes.author}>
                    {author}
                </h5>
                <h2 ref={titleRef} className={classes.topText}>
                   {title}
                </h2>
            <div ref={descRef} className={classes.descriptionContainer}>
                <h5 className={classes.subTitle}>
                    {subTitle}
                </h5>
            <div className={classes.readMore}>
                <ReactReadMoreReadLess
                    charLimit={150}
                    readMoreText={"read more"}
                    readLessText={"read less"}
                >
                    {description}
                </ReactReadMoreReadLess>
            </div>    
            </div>
                <button ref={buttonRef} type="button" className={classes.borrow}>Borrow this Book</button>
            </div>
        </div>

        <div ref={triangleRef} className={classes.triangle}></div>

        </div>
    )
}

export default IndexPage
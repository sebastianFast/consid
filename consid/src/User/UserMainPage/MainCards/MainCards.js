import React, {Suspense} from "react"
import classes from "./MainCards.module.css"
//import SliderMenu from "./SliderMenu/SliderMenu.js"
import cn from "classnames"
import ReactReadMoreReadLess from "react-read-more-read-less";

const MainCards = () => {
    const SliderMenu = React.lazy(()=> import("./SliderMenu/SliderMenu.js"))
    return(
        <div className={classes.mainCard}>
            
           <div className={classes.leftSide}>
               <div className={classes.leftSideContent}>
               <h2 className={cn(classes.mainTitle, classes.title)}>Our</h2>
                   <h2 className={cn(classes.mainTitle, classes.title)}>Library</h2>
               </div>
           </div>
           <div className={classes.line}></div>
           <div className={classes.rightSide}>
                <div className={classes.rightSideContent}>
                    <h2 className={classes.title}>
                        Read your Heart Out
                    </h2>
                    <h4 className={classes.subTitle}>
                        Discover your world in our Stories
                    </h4>
                    <p className={classes.text}>
                    <ReactReadMoreReadLess
                    charLimit={500}
                    readMoreText={"read more"}
                    readLessText={"read less"}
                >
                     Pellentesque faucibus accumsan arcu, eget lobortis erat. Maecenas elementum, diam sed consectetur auctor, lectus orci vestibulum magna, at molestie magna augue at turpis. Aliquam ullamcorper nulla pellentesque rutrum efficitur. In quis diam quam. In vestibulum, nibh ac vulputate blandit, lorem urna mollis odio, nec lobortis erat orci non erat. Nulla molestie urna vel mattis malesuada. Sed interdum accumsan ipsum. Etiam finibus leo vitae metus vehicula, non semper ex fringilla. Sed suscipit molestie bibendum. Pellentesque eget posuere quam, non tincidunt risus. Nullam eget maximus lectus, pretium finibus augue. In maximus lacinia nibh, vitae consectetur arcu suscipit sed.
                   
                </ReactReadMoreReadLess>
                    </p>
                    <div className={classes.buttonContainer}>
                <button type="button" className={classes.explore}>Explore Us</button>
                </div>
                </div>
           </div>
           <Suspense fallback={<div>Loading ... </div>}>
            <SliderMenu />
            </Suspense>
        </div>
    )
}

export default MainCards
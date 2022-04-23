import React, {useState} from "react"

const checkScroll = (setVariable) => {
    const onScroll = () => setVariable(window.pageYOffset);
// clean up code
window.removeEventListener('scroll', onScroll);
window.addEventListener('scroll', onScroll, { passive: true });
return () => window.removeEventListener('scroll', onScroll);
}

export {checkScroll}
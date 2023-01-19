import {useEffect, useState} from 'react'

export const useReadyTimer = () => {
    const [secondsPassed, setSeconds] = useState(0);
    // Need to wrap setInterval in a useEffect as setSeconds will trigger a re-render,
    // thus, setInterval will run multiple times
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(mainThreadSeconds => {
                // setInterval splits into a background thread rather than the main thread.
                // Thus need to use a funciton callback to grab the original seconds value
                // so that setSeconds can write AND read to the main thread. 
                // (Normally it only writes to main thread)
                let updatedSeconds = 0;
                updatedSeconds = mainThreadSeconds+1;
                // need this block of code inside setSeconds because setSeconds seems asynchronous,
                // thus, the following block of code may run before setSeconds has been exucted
                if(updatedSeconds >= 5) {
                    console.log("Stopped");
                    clearInterval(timer);
                }
                return updatedSeconds;
            }
            );
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {secondsPassed};
}
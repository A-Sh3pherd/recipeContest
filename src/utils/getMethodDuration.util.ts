
export const getMethodDuration = (startTimer: number): String => {
    const ms = calculateTime(startTimer);
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    // @ts-ignore       =>      Wtf is wrong ?
    return `${ minutes }:${ seconds < 10 ? '0' : '' }${ seconds }`;
};

const calculateTime = (startTimer: number): number => {
    const end = new Date().getTime();
    return end - startTimer;
};
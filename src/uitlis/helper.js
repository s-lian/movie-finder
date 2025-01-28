export function ratingToPercentage(rating){
    return Math.round(rating * 10)
}
export const ratingColor= ((rating)=>{
    if(rating>=7) return "green.400";
    else if (rating >=5) return "orange.400"
    else return "red.400"
})

export function minsToHours(min){
    const hours = Math.floor(min/60);
    const minutes = Math.floor(min%60);
    return `${hours}hr ${minutes}m`;
}
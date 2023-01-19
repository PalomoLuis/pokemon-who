function randomNum (maxNumber) {
    const number = Math.floor(Math.random() * maxNumber) + 1;
    return number;
}

export default function sortNum (maxNumber, array = []) {

    let number = randomNum(maxNumber);
    if(array.length < maxNumber) {
        if(!array.find(num => num === number)) {
            array.push(number);
            return sortNum(maxNumber, [...array])
        } else {
            return sortNum(maxNumber, [...array])
        }
    }

    return array;
}
export default class RandomData{
    
    public static randomNumber(maxValue: number){
        return Math.floor(Math.random() * maxValue) + 1;
    }
}
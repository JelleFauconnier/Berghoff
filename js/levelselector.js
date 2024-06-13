export function setDifficulty(level) {
    switch(level) {
        case 'easy':
            return {
                zombieSpeed: 1000 / 15, 
                zombieIntervalTime: 9000 
            };
        case 'normal':
            return {
                zombieSpeed: 1000 / 30, 
                zombieIntervalTime: 6000 
            };
        case 'hard':
            return {
               zombieSpeed: 1000 / 60, 
               zombieIntervalTime: 3000 
            };
        default:
            return {
                zombieSpeed: 9000,
                zombieIntervalTime: 5000
            };
    }
}

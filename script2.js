/* Workout Advice Generator */

const initWorkoutAdvice = () => {
    const workoutAdviceButton = document.querySelector(".workout-advice-button");
    
    let paragraph = document.createElement('p');
    
    workoutAdviceButton.addEventListener("click", () => {
        const workoutAdvice = {
            goal: ['lose bodyfat', 'build muscle', 'gain strength'],
            start: ['going to bed early', 'eating real food', 'training hard'],
            stop: ['staying up late', 'eating junk food', 'skipping the gym']
        };
    
        function generateRandomNumber(num) {
            return Math.floor(Math.random() * num);
        };
    
        let yourAdvice = [];
    
        for (let advice in workoutAdvice) {
            let selector = generateRandomNumber(workoutAdvice[advice].length)
    
            switch (advice) {
                case 'goal':
                    yourAdvice.push(`If your goal is to ${workoutAdvice[advice][selector]},`);
                    break;
                case 'start':
                    yourAdvice.push(`you should start ${workoutAdvice[advice][selector]},`);
                    break;
                case 'stop':
                    yourAdvice.push(`and you should stop ${workoutAdvice[advice][selector]}.`);
                    break;
                default:
                    yourAdvice.push('Invalid entry');
                    break;
            };
        };
    
        function formatAdvice() {
            const formattedAdvice = yourAdvice.join(' ');
            console.log(formattedAdvice);
            paragraph.innerHTML = formattedAdvice;
            paragraph.className = "workout-advice-p"
        };

        formatAdvice(yourAdvice);

        document.body.appendChild(paragraph);

    })

};

window.addEventListener("load", initWorkoutAdvice);
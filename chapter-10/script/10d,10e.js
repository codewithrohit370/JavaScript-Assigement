function toggleGame(toggle_name){
            let btnElement = document.querySelector(toggle_name);
            console.log(btnElement)
            let cheakToggle = btnElement.classList.contains('is-toggle');
            if(cheakToggle === false){
                btnElement.classList.add('is-toggle');
            }else{
                btnElement.classList.remove('is-toggle')
            }
        }
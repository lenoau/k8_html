document.addEventListener('DOMContentLoaded', () =>
    {
        //요소 가져오기
        const bt1 = document.querySelector('#bt1');
        const divNum = document.querySelector('#divNum');
        const divPlus = document.querySelector('.divplus');
        const divBonus = document.querySelector('#divBonus');

        //요소 숨기기

        bt1.addEventListener('click', (e) => 
            {
                e.preventDefault();

                let arr = [];
                while(arr.length < 7)
                {
                    let n = Math.floor(Math.random() *45) + 1 ; //1~45
                    if (!arr.includes(n)) arr.push(n);
                }
                
                let arrBonus = arr.splice(6,1);
                arr.sort((a,b) => a-b);
                console.log(arr);
                console.log(arrBonus);

                arr = arr.map(item => `<span class='sp${Math.floor(item/10)}'>${item}</span>`)
                arr = arr.join('');
                divNum.innerHTML = arr ;
                console.log(arr);

                arrBonus = arrBonus.map(item => `<span class='sp${Math.floor(item/10)}'>${item}</span>`)
                arrBonus = arrBonus.join('');
                divBonus.innerHTML = arrBonus;
            });
    });


  
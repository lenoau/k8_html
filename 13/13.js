let arr = [0,0,0,0,0,0,0,0,1];
let isShuffle = false;
let cnt = 0;

document.addEventListener("DOMContentLoaded", () => 
    {
        const cols = document.querySelectorAll(".box")
        const bt = document.querySelector("button");
        const msg = document.querySelector("#msg");

        bt.addEventListener("click", (e) => 
            {
                e.preventDefault();

                if(!isShuffle)
                {
                    isShuffle = true;
                    arr.sort(() => Math.random() - 0.5);

                    console.log(arr);
                    bt.innerHTML = "게임중!!";
                }
            });
        
        for(let col of cols)
        {
        col.addEventListener("click", () => 
            {   
                //폭탄이 섞이지 않으면 클릭 X
                if(!isShuffle)
                {
                    msg.innerHTML = "<h2>폭탄을 섞어주세요!!</h2>";
                    return;
                }

                //이미지가 있는지 확인
                if(col.innerHTML.includes('img')) return;
                //실패시 진행 X
                if(msg.innerHTML.includes("<h2>Game Over..😅</h2>")) return;

                //폭탄 이미지 출력 후 클릭불가
                if(msg.innerHTML.includes("<h2>Game Over..</h2>")) return;

                let idx = col.getAttribute("id").slice(-1) - 1;
                if(arr[idx] == 0)
                {   
                    //하트 이미지
                    col.innerHTML = '<img src = "../img/hart.png">';

                    //하트 개수 증가
                    cnt++;

                if (cnt == 8) 
                    {
                    msg.style.color = 'blue' ;
                    msg.innerHTML = '<h2>Game clear!!</h2>';
            
                    //전체 하트
                    let i = arr.indexOf(1);
                     document.querySelector(`#box${i+1}`).innerHTML = '<img src="../img/hart.png">';
                    }
                }   
                else
                {   
                    //폭탄 이미지, 하트가 8개 되면 게임 클리어
                    //폭탄
                    col.innerHTML = '<img src="../img/boom.png">';
                    msg.style.color = 'red' ;
                    msg.innerHTML = '<h2>Game Over..</h2>';
                    bt.innerHTML = '폭탄을 섞어 주세요..' ;
                    isShuffle = false ;
                }
                
                console.log(idx , arr[idx]);
            });
        }
    });
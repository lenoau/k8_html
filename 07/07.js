//dom 생성된 후 이벤트 감지
document.addEventListener('DOMContentLoaded', ()=>{
    //버튼가져오기
    const bts = document.querySelectorAll('.bt1 > button');

    //이미지가져오기
    const imgs = document.querySelectorAll('.bt2 > img');

    //결과 가져오기
    const result = document.querySelector('.result');

    //버튼 클릭

    for(let bt of bts) {
        bt.addEventListener('click', ()=>{
            //컴퓨터 랜덤 수
            let comN = Math.floor(Math.random()*6)+1;
            imgs[0].setAttribute('src', `../img/${comN}.png`);

            //사용자 선택 수
            let UserN = parseInt(bt.textContent.charAt(0));
            imgs[1].setAttribute('src', `../img/${UserN}.png`);

            //비교 결과 출력
            if(comN == UserN) result.innerHTML = '맞음';
            else result.innerHTML = '틀림';
        });
    }
});
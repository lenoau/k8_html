//OPEN API 데이터 가져오기
const getData = (selDt, ul, gubun) => 
    {
        const testAPI = "82ca741a2844c5c180a208137bb92bd7" ;
        let url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`;
        url = `${url}key=${testAPI}&targetDt=${selDt}`;
        if(gubun != 'D')
        {
            url = `${url}&repNationCd=${gubun}`;
        }
        console.log(url);

        fetch(url)
            .then(resp => resp.json())
            .then(data => 
                {
                    let mv = data.boxOfficeResult.dailyBoxOfficeList;
                    console.log(mv);
                    
                    let mvLi = mv.map(item => 
                        `<li class="mvli">
                            <span class="rank">${item.rank}</span>
                            <span class="movieNm">${item.movieNm}</span>
                            <span class = "movieopen">개봉일 ${item.openDt}</span>
                            <span class = "movierank">${item.rankInten > 0 ? '<span class="up">▲</span>' : item.rankInten < 0 ? '<span class="down">▼</span>' : '-'}
                            ${item.rankInten != 0 ? Math.abs(item.rankInten) : ''}</span>
                        </li>`)
                
                    mvLi= mvLi.join('')
                    ul.innerHTML = mvLi;

                    console.log(mvLi);
                    
                })
            .catch(err => console.log(err)) ;

    }


const getYesterday = () => 
{   
    //const 는 상수 이기에 값 변경 불가 변경하려면 setter로 불러와야됨
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);

    const year = yesterday.getFullYear();
    let month = yesterday.getMonth() + 1;
    let day = yesterday.getDate();

    //월 2자리
    month = month < 10 ? '0' + month : month ;
    day = day < 10 ? '0' + day : day ;

    //month = `0${month}`.slice(-2);
    //month = `${month}`.padStart(2, 0);
    //consolw.log("month = ", month);
    
    return `${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', () => 
    {
        //요소 가져오기
        const dt = document.querySelector("#dt");
        const ul = document.querySelector(".sec > ul")
        const sel1 = document.querySelector("#sel1")

        //어제 날짜 구하기
        let yesterday = getYesterday();
        console.log("yesterday = ", yesterday);

        //date 요소 최대값 결정
        dt.max = yesterday;

        //date 기본값
        dt.value = yesterday;

        //기본 첫 페이지
        getData(dt.value.replaceAll('-' , '') , ul , sel1.value);

        //데이터 가져오기
        dt.addEventListener('change', () => 
            {
                getData(dt.value.replaceAll('-' , '') , ul , sel1.value);
            });
        sel1.addEventListener('change', () =>
            {
                getData(dt.value.replaceAll('-' , '') , ul , sel1.value);
            });

    });
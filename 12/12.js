const testAPI = "82ca741a2844c5c180a208137bb92bd7" ;

const getDetail = (movieCd) => 
    {
        //alert("moviecd = " + moviecd)
        const mvinfo = document.querySelector("#mvinfo");
        let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?`;
        url = `${url}key=${testAPI}&movieCd=${movieCd}`;

        fetch(url)
        .then(resp => resp.json())
        .then(data =>
            {
                let mvinfor = data.movieInfoResult.movieInfo;
                console.log(mvinfor);
                
                let genres = mvinfor.genres
                genres = genres.map(item => item.genreNm).join(', ');
                console.log('genres' , genres);

                let directors = mvinfor.directors
                directors = directors.map(item => item.peopleNm).join('');
                console.log('directors' , directors);
                
                let actors = mvinfor.actors.slice(0,5).map(item => item.peopleNm).join(', ');
                console.log('actors' , actors);
                
                mvinfo.innerHTML = `<ul>
                                        <h1>Information</h1>
                                        <li><strong>영화명 </strong> ${mvinfor.movieNm}</li>
                                        <li><strong>장르 </strong> ${genres}</li>
                                        <li><strong>감독 </strong> ${directors}</li>
                                        <li><strong>배우 </strong> ${actors}</li>
                                    </ul>`;
            })
            .catch(err => console.error(err))
    }

//OPEN API 데이터 가져오기
const getData = (selDt, ul, gubun) => 
    {
        
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
                        `<a href = "#" onclick = "getDetail(${item.movieCd})">
                        <li class="mvli">
                            <span class="rank">${item.rank}</span>
                            <span class="movieNm">${item.movieNm}</span>
                            <span class = "movieopen">개봉일 ${item.openDt}</span>
                            <span class = "movierank">${item.rankInten > 0 ? '<span class="up">▲</span>' : item.rankInten < 0 ? '<span class="down">▼</span>' : '-'}
                            ${item.rankInten != 0 ? Math.abs(item.rankInten) : ''}</span>
                        </li>
                        </a>`)
                
                    mvLi= mvLi.join('')
                    ul.innerHTML = mvLi;

                    console.log(mvLi);
                    
                })
            .catch(err => console.log(err));
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
    //radio값 가져오기
}

const getGubun = () => 
    {
        // const r1 = document.querySelector("#r1");
        // const r2 = document.querySelector("#r2");
        // const r3 = document.querySelector("#r3");

        // if (r1.Checked) return r1.value;
        // else if (r2.Checked) return r2.value;
        // else if (r3.Checked) return r3.value;

        //radio 클릭된 것만 가져오기
        const gubun = document.querySelector('input[name=rb]:checked') ;
        return gubun.value ;
    }
document.addEventListener('DOMContentLoaded', () => 
    {
        //요소 가져오기
        const dt = document.querySelector("#dt");
        const ul = document.querySelector(".sec > ul");
        //const radios = document.querySelector("input[type = radio]");
        //const radios = document.getElementsByName("rb");
        const radios = document.querySelectorAll("input[name = rb]")
        

        //어제 날짜 구하기
        let yesterday = getYesterday();
        console.log("yesterday = ", yesterday);

        //date 요소 최대값 결정
        dt.max = yesterday;

        //date 기본값
        dt.value = yesterday;

        //guBun값
        console.log(getGubun());

        //기본 첫 페이지
        getData(dt.value.replaceAll('-' , '') , ul , getGubun());

        //데이터 가져오기
    
        dt.addEventListener('change', () => 
            {
                getData(dt.value.replaceAll('-' , '') , ul , getGubun());
            });

            for(let radio of radios) {
                radio.addEventListener('click' , ()=>
                {
                  if (radio.checked) getData(dt.value.replaceAll('-',''), ul, radio.value);
                });
        }
    });
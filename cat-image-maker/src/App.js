import logo from './logo.svg';
import React from "react"
import Title from "./components/Title"
import './App.css';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};


const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const BASE_IMG = {
  cat : "./assets/imgs/cat.jpg",
  lion : "./assets/imgs/lion.jpg",
  icefox : "./assets/imgs/icefox.jpg"
}

const catitemlist = [
{url : BASE_IMG.cat, name : "고양이"},
{url : BASE_IMG.lion, name : "사자"},
{url : BASE_IMG.icefox, name : "눈여우"}]

// 변수를 컴포넌트로 변환하기 const catItem -> function catItem
function CatItem(props){
  return(
    <li>
      <img src={props.img}/>
    </li>
  )
}



const Favorites = ({favorites}) =>{
  if(favorites.length === 0){
    return <div>
       하트를 눌러서 고양이 목록을 저장해주세요
    </div>
  }
  return(
    //리액트에서 배열을 순회할때 배열마다 id값이 필요하다.
    <ul className="cat-list">
      {favorites.map((item) => {
        return <CatItem img={item} key={item}/>
      })}
    </ul>
  )
}

const MainCard = ({img, onHeartClick, alreadyClickedHeartIcon}) => {
  const heartIcon = alreadyClickedHeartIcon ? "💖" : "🤍";
  return(
    <div className="main-card">
      <img src={img} alt="사자" width="400"/>
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  )
}

const Form = ({updateMainCat}) =>{
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('')

  // 생성하기 버튼 이벤트
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('')
    if(value === ''){
      setErrorMessage('메시지를 입력해주세요')
      return
      //만약 빈값이라서 에러메시지 '메시지를 입력해주세요가 나온다면 밑에 updateMainCat을 실행하지말고 hanldCreateSubmit을 종료하기'
    }
    updateMainCat(e, value)
  }
  
  const handleInputChange = (e) => {

    const userInputValue = e.target.value
    setErrorMessage('')
     if(includesHangul(userInputValue)){
       setErrorMessage('한글은 입력할 수 없습니다.')
     }
    setValue(userInputValue.toUpperCase())
  }

  return (
    <form onSubmit={handleCreateSubmit}>
      <input type="text" name="name" value={value} placeholder="영어 대사를 입력해주세요" onChange={handleInputChange}></input>
      <button >생성하기</button>
      <p style={{color:'red'}}>{errorMessage}</p>
    </form>
  )
}

const App = () => {

  const [counter, setCounter] = React.useState( (e)=>{
    return jsonLocalStorage.getItem('counter')
  })
  const [MainImgState, setMainImgState] = React.useState(BASE_IMG.icefox)
  const [favorites, setFavorites] = React.useState((e)=>{
    return jsonLocalStorage.getItem('favorites') || []}
  //앞에가 없으면 || 뒤에 것을 사용 반환
  )

  const alreadyClickedHeartIcon = favorites.includes(MainImgState)

  async function setInitialCat(){
    const newCat = await fetchCat('First Cat')
    setMainImgState(newCat)
    console.log(newCat)
  }

  React.useEffect(()=> {setInitialCat()}, [])

  // 생성하기 버튼 이벤트
  const updateMainCat = async (e,value) => {
    const newCat = await fetchCat(value)
    setMainImgState(newCat)

    setCounter((prev) => {
      const nextCounter = prev + 1
      jsonLocalStorage.setItem('counter', nextCounter)
      return nextCounter;
    })


  }

  // 하트 클릭 이벤트
  function handleHeartClick (){
    const nextFavorites = [...favorites, MainImgState]
  //... 스프레드 문법을 사용해서 기존 배열(인자1)에 새로운 값(인자2)을 push것과 같음
    setFavorites(nextFavorites)
    jsonLocalStorage.setItem('favorites', nextFavorites)
  }

  return (
    <div>
      <Title counter={counter}></Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard onHeartClick={handleHeartClick} img={MainImgState} alreadyClickedHeartIcon={alreadyClickedHeartIcon}/>
      <Favorites favorites={favorites}/>
    </div>
  );
};

export default App;

import { useState } from 'react'
import './App.css'
import CardComponent from './components/CardComponent'
function App() {

  class fCardBase {
    constructor(color, colorProp, side, matched) {
      this.color = color;
      this.colorProp = colorProp;
      this.side = side;
      this.matched = matched;
      };
  }
  const [gameStart, setGameStart] = useState(false)
  const [baseCards, setBaseCards] = useState([
    new fCardBase("red","bg-red-500",true,false),
    new fCardBase("red","bg-red-500",true,false),
    new fCardBase("yellow","bg-yellow-500",true,false),
    new fCardBase("yellow","bg-yellow-500",true,false),
    new fCardBase("green","bg-green-500",true,false),
    new fCardBase("green","bg-green-500",true,false),
    new fCardBase("purple","bg-purple-500",true,false),
    new fCardBase("purple","bg-purple-500",true,false),
    new fCardBase("orange","bg-orange-500",true,false),
    new fCardBase("orange","bg-orange-500",true,false),
    new fCardBase("orange","bg-slate-500",true,false),
    new fCardBase("orange","bg-slate-500",true,false),
  ]);
  const [cardsArray, setCardsArray] = useState(baseCards);

  function randomizeCards(event){
    if (event) {
      event.preventDefault();
    }
    setGameStart(true);
    const newArray = [...cardsArray];
    for(let i = newArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [newArray[i],newArray[j]] = [newArray[j],newArray[i]]
    };
    return setCardsArray(newArray);
  }


    function colorSearcher(colorVal){
      let results = []
      cardsArray.forEach(function(obj, index) {
        if (obj.color === colorVal) {
          results.push(index);
        }
      })
      return results;
    }

    const [points, setPoints] = useState(0);
    const [checker1, setChecker1] = useState("")
    const [checker2, setChecker2] = useState("")

    function ColorChecker(arg){
      if(checker1.length < 1){
        setChecker1(arg)
      } else{
        setChecker2(arg)
      }
      console.log([checker1, checker2])
    }

    if(checker1 !== "" && checker2 !== ""){
      if(checker1 === checker2){
        const updatedCardsArray = [...cardsArray];
      
        let indexes = []
        let colorSearch = checker1;
        indexes = colorSearcher(colorSearch)
        updatedCardsArray[indexes[0]] = { ...updatedCardsArray[indexes[0]], matched: true };
        updatedCardsArray[indexes[1]] = { ...updatedCardsArray[indexes[1]], matched: true };
        setCardsArray(updatedCardsArray);
        setChecker1("")
        setChecker2("")
        setPoints(points + 1)
        console.log(cardsArray[indexes[0]])
      } else{
        setChecker1("")
        setChecker2("")
      }

    }

    const intro = (
    <>
      <div className='m-auto w-5/6 lg:text-3xl text-2xl'>At the start of this game, you will be shown the color of the cards. You have to match them to score points. If you miss the match, you wont gain any points, so be careful!</div>
      <div className='m-auto w-1/6 pt-8'>
        <div className='my-8 text-center lg:w-54 lg:text-4xl text-3xl'>Are you ready?</div>
        <button className='bg-gray-400 border-2 border-black rounded-sm w-full hover:bg-gray-300' onClick={(event) => randomizeCards(event)}>Ready!</button>
      </div>
    </>
    )
    
    const gameElements = (
      <>
      <div className='text-3xl m-auto lg:w-1/12 w-1/3'>Points:{points}</div>
        <div className='flex flex-row flex-wrap m-auto w-5/6'>
          {cardsArray.map((card, index) =>
          <CardComponent
      key={index}
      CardBase={card}
      Color={card.color}
      ColorProp={card.colorProp}
      ColorChecker={ColorChecker}
      MatchedValue={card.matched}
      Checker1={checker1}
      Checker2={checker2}
    />
    )
  }
    </div>
      </>
    )
  return (
    <>
      <div className='m-auto lg:w-full w-5/6'>
        <div className='text-5xl pt-2 font-semibold text-center'>Matching card game</div>
      </div>
      <div className='mt-8 w-full'>
        {(gameStart === true ? gameElements : intro)}
      </div>
      
      
      
    </>
  )
}

export default App

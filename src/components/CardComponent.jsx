import { useEffect, useState } from "react";

function CardComponent( {CardBase, Color, ColorProp, ColorChecker, MatchedValue, Checker1, Checker2} ){
    
  const [thisCard, setThisCard] = useState(() => ({ ...CardBase, color: Color }));

  function flipFaceDown(){
    setTimeout(()=> {
      setThisCard(prevCard =>{
        const flippedCard = {...prevCard, side: false}
        return flippedCard;
      })
    }, 5000)
  }
  
  useEffect(()=> {
    flipFaceDown();
  }, []);

  function flipFaceUp(event) {
    event.preventDefault();
    setThisCard(prevCard => {
      const updatedCard = { ...prevCard, side: true };
      ColorChecker(Color);
      if(MatchedValue === true){
        return {...updatedCard, matched: true};
      }
      return updatedCard;
    });
  }

  if(MatchedValue == false && Checker1 !== Checker2 && Checker1 !== "" && Checker2 !== ""){
    setThisCard(prevCard => {
      const updatedCard = {...prevCard, side: false};
    return {...updatedCard, matched: false};
    })
  }

  const cardClassName = `lg:h-56 h-36 lg:mx-3 mx-2 my-4 lg:w-40 w-3/12 border-2 border-black ${
    thisCard.side === true ? `${ColorProp}` : 'bg-blue-800'

  }`;

  return( 
    <>
      <div
        onClick={(thisCard.side === false ? flipFaceUp : undefined)}
        className={cardClassName}
      ></div>
    </>
  )
}

export default CardComponent;
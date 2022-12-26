import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './List.module.css'

const List = ({contractions, setContractions}) => {
  let [isHover, setIsHover] = useState(0);
  let [hoverID, setHoverID] = useState(0);
  const handleMouseEnter = (id) => {
    setIsHover(true);
    setHoverID(id);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
    setHoverID(0);
  };
  const handleClick = (id) => {
    setContractions(contractions.filter(contraction => contraction.id !== id));
  }

  return (
    <div className={classes.list}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.opetation}>order</th>
            <th>Length</th>
            <th>Time apart</th>
            <th>Start & end time</th>
          </tr>
        </thead>
        <tbody>
          {
            contractions.map((contraction,index)=> {
              let start = new Date(contraction.start);
              let end = new Date(contraction.end);
              let length = new Date(end - start);
              let timeApart = new Date(start - (contractions[index+1]||{}).end);
              return (
                <tr key={contraction.id} onMouseEnter={()=> handleMouseEnter(contraction.id)} onMouseLeave={() => handleMouseLeave()}>
                  <td>
                    { isHover && hoverID === contraction.id ? <FontAwesomeIcon onClick={()=> handleClick(contraction.id)} className={classes.deleteBtn} icon="xmark" /> : <span>{contractions.length - index}</span>}
                  </td>
                  <td>
                    {length.getUTCHours() > 0 ? length.getUTCHours() + 'hr ' : ''}
                    {length.getUTCMinutes() > 0 ? length.getUTCMinutes() + 'min ' : ''}
                    {length.getUTCSeconds() + 'sec'}
                  </td>
                  <td>
                    {timeApart.getUTCHours() > 0 ? timeApart.getUTCHours() + 'hr ' : ''}
                    {timeApart.getUTCMinutes() > 0 ? timeApart.getUTCMinutes() + 'min ' : ''}
                    {index === contractions.length -1 ? '-' : timeApart.getUTCSeconds() + 'sec'}
                  </td>
                  <td>
                    {start.getUTCHours() +':'+ start.getUTCMinutes().toString().padStart(2,'00')} - 
                    {end.getUTCHours() +':'+ end.getUTCMinutes().toString().padStart(2,'00')}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default List
import React from 'react'

const Listheader = ({listName}) => {
  return (
    <div className='listheader'>
	<h1 className='listname'>{listName}</h1>
	<div className = 'button-container'>
	<button className='add-new'>Add New</button>
	<button className='sign-out'>SignOut</button>
	</div>
    </div>
  )
}

export default Listheader

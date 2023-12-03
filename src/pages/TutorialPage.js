import React from 'react'

const TutorialPage = () => {
  return (
    <div >
        <div className='text-center'>

            <h3 >Watch the tutorial</h3>
        </div>
        <div className='flex justify-content-center align-items-center'>
            <iframe width="853" height="480" src="https://www.youtube.com/embed/uvjJEQBGbJQ" title="The Unfair Advantage Of The 60 Second Procrastination Rule" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen={true}></iframe>
        </div>
        
    </div>
  )
}

export default TutorialPage
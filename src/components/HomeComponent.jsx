// eslint-disable-next-line no-unused-vars
import React from 'react'
import PostStatus from './common/PostUpdate';

// eslint-disable-next-line react/prop-types
export default function HomeComponent({currentUser}) {
  return (
    <div>
      <PostStatus currentUser={currentUser} />
    </div>
  )
}

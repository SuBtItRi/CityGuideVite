import React from 'react'
import ContentLoader from 'react-content-loader'

const ResponsiveLoader = () => (
  <ContentLoader
    speed={2}
    width="290px"
    height={551}
    viewBox="0 0 300 551"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="250" />
    <rect x="10" y="260" rx="5" ry="5" width="80%" height="20" />
    <rect x="10" y="330" rx="5" ry="5" width="50" height="25" />
    <rect x="10" y="360" rx="5" ry="5" width="50%" height="15" />
    <rect x="10" y="390" rx="5" ry="5" width="90%" height="120" />
    <rect x="10" y="535" rx="5" ry="5" width="75%" height="15" />
  </ContentLoader>
)

export default ResponsiveLoader

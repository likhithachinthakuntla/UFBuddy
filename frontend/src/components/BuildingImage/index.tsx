import * as React from 'react';


type Props = {
  buildingId: string | null | undefined,
  style: React.CSSProperties
}


const placeholderImageUrl = 'https://thelivingstonpost.com/wp-content/themes/fox/images/placeholder.jpg'

export default function BuildingImage({buildingId, style}: Props) {

  const [src, setSrc] = React.useState(`https://stars.facilities.ufl.edu/public/api/photos/photo?bldg=${buildingId}`)

  const onError = () => {
    setSrc(placeholderImageUrl)
  }

  return <img key={src} alt="" src={src} onError={onError} style={style} />
}
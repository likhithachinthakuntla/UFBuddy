import * as React from 'react';
import { Box, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type StarsProps = {
  rating: number,
  setRating?: (newRating: number) => void, 
  size: number,
  interactive?: boolean
  sx?: SxProps
}

const spacing = 0.25

const Star = styled('div', {
  shouldForwardProp: (prop) => prop !== "size" && prop !=="percentFill"
})<{size: number, percentFill: number}>(({theme, size, percentFill}) => ({
  display: 'inline-flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  background: `linear-gradient(90deg, #ff7e42 ${percentFill}%, #D3D3D3 0%)`,
  lineHeight: '100%',
  cursor: 'inherit',
  fontSize: size*0.8,
  boxSizing: 'border-box',
  verticalAlign: 'middle',
  paddingBottom: size/10,
  borderRadius: size/4,
  color: '#FFF',
  height: size,
  width: size,
  '&:not(:last-child)': {
    marginRight: size*spacing
  }
}))

const star = '★'
const MAX_RATING = 5
const chars = (new Array(MAX_RATING)).fill('')


export default function Stars({rating, size, sx, setRating}: StarsProps) {

  const [displayedRating, setDisplayedRating] = React.useState(rating)

  const totalWidth = React.useMemo(() => MAX_RATING*size + (MAX_RATING - 1)*(spacing*size), [size])

  React.useEffect(() => {
    setDisplayedRating(rating)
  }, [rating])

  const ref = React.useRef<HTMLDivElement>();
 
  React.useEffect(() => {

    if(!setRating) {
      return
    }

      let refValue: HTMLDivElement | null = null

      function update(e: MouseEvent): void {
        var bounds = refValue?.getBoundingClientRect();
        var x = bounds ? e.clientX - bounds.left : 0;
        const r = Math.floor((x/totalWidth)*MAX_RATING) + 1
        setDisplayedRating(r >= 0 ? r : 0)
      }

      function updateRating(e: MouseEvent): void {
        setDisplayedRating(rating)
      }

      if(ref.current) {
        ref.current.addEventListener("mousemove", update, false);
        ref.current.addEventListener("mouseleave", updateRating, false);
        refValue = ref.current
      }

      return function cleanup() {
        refValue?.removeEventListener("mousemove", update, false);
        refValue?.removeEventListener("mouseleave", updateRating, false);
      }
  }, [totalWidth, setDisplayedRating, rating, setRating]);

  const r = !!setRating ? displayedRating : rating
  
  return (<Box sx={sx} ref={ref} onClick={setRating ? () => setRating(displayedRating) : undefined} style={{ cursor: setRating ? 'pointer' : 'default'}}>
      {chars.map((c, i) => {
        const temp = r - (i+1)
        const pFill = temp >= 0 ? 100 : (temp > -1 ? (temp+1)*100 : 0)
        return <Star key={i} percentFill={pFill} size={size}>
          {star}
        </Star>
      })}
    </Box>);
};
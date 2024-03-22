import { Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '../../../../components'
import { headerLinks } from '../../config'


const StyledLink = styled(Link)(({ theme }) => {
  return {
    '&:not(:last-child)': {
      marginRight: theme.spacing(3)
    }
  }
})

export default function Links() {

  return(<Box style={{paddingTop: 6}}>
          {headerLinks.map(({href, label}) => <StyledLink key={label} to={href} underline="hover" color="#FFF">{label}</StyledLink>)}
      </Box>)
}
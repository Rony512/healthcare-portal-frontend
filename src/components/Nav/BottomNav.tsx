import { AppBar, Toolbar } from '@mui/material'
import { Element } from '../../interfaces'


const BottomNav = ({ elements }: Element) => {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, alignItems: 'center' }}>
            <Toolbar>
                {elements.map((elem, index) => {
                    return (
                        <div key={index} style={{ margin: '5px' }}>
                            {elem}
                        </div>)
                })}
            </Toolbar>
        </AppBar>
    )
}

export default BottomNav
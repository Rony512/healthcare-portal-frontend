import { Button } from '@mui/material';
import '../App.css'

interface LoginProps {
    login: Function;
}

const Login = ({ login }: LoginProps) => {
    return (
        <div className='login'>
            <div className='centerButton' >
                <Button variant="contained" disableElevation onClick={() => login()}>
                    Get Started
                </Button>
            </div>
        </div>

    )
}

export default Login;

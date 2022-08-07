import { Fragment } from 'react';

interface Props {
    child: any
}

const SimpleContainer = (props: Props) => {
    return (
        <Fragment>
            <div className='container'>
                {props.child()}
            </div>
        </Fragment>
    );
}

export default SimpleContainer
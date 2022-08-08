
interface FieldSet {
    title_1: string;
    title_2: string;
    element: any;

}


const FieldSet = ({ title_1, title_2, element }: FieldSet) => {

    return (
        <div style={{ margin: '20px' }}>
            <fieldset>
                <legend>{title_1}{title_2}</legend>
                <div>
                    {element}
                </div>
            </fieldset>
        </div >
    )
}

export default FieldSet
import {takeState} from "../App/State";

export default () => {

    const {state, setState} = takeState();

    const onButtonClick = () => setState({...state, token: undefined});

    return (
        <>
            <h1 className="title">Dashboard</h1>
            <h6 className="subtitle is-6">This is user dashboard</h6>
            <span className="tag is-primary"><b style={{paddingRight: 10}}>Token:</b>{state.token}</span>

            <div className="is-clearfix mt-6">
                <button
                    className="button is-primary is-pulled-right"
                    onClick={onButtonClick}>
                    Log out
                </button>
            </div>
        </>
    );

};

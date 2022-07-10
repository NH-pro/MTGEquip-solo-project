import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

function MatchHistory() {
    const history = useHistory();

    return (
        <>
            <button  onClick={() => history.goBack()}>Back</button>
        </>
    )
}

export default MatchHistory;
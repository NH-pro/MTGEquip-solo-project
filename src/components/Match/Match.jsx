import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import './Match.css';

function Match() {
    const dispatch = useDispatch();

    useEffect(() => {

    },[])


    

    return (
        <>
            <div className='opponents_info'>
                <div>
                    <h3>player 2: username</h3>
                    <h3>40 Life</h3>
                    <h4>p1 cdmg: 0 Dmg</h4>
                    <h4>p3 cdmg: 0 Dmg</h4>
                    <h4>p4 cdmg: 0 Dmg</h4>
                    <div>
                        <button className='add_btn'>+</button>
                        <br/>
                        <h3 className='cdmg'>p2 cdmg: 0 Dmg</h3>
                        <br/>
                        <button className='sub_btn'>-</button>
                    </div>
                </div>
                <div>
                    <h3>player 3: username</h3>
                    <h3>40 Life</h3>
                    <h4>p1 cdmg: 0 Dmg</h4>
                    <h4>p2 cdmg: 0 Dmg</h4>
                    <h4>p4 cdmg: 0 Dmg</h4>
                    <div>
                        <button className='add_btn'>+</button>
                        <br/>
                        <h3 className='cdmg'>p3 cdmg: 0 Dmg</h3>
                        <br/>
                        <button className='sub_btn'>-</button>
                    </div>
                </div>
                <div>
                    <h3>player 4: username</h3>
                    <h3>40 Life</h3>
                    <h4>p1 cdmg: 0 Dmg</h4>
                    <h4>p2 cdmg: 0 Dmg</h4>
                    <h4>p3 cdmg: 0 Dmg</h4>
                    <div>
                        <button className='add_btn'>+</button>
                        <br/>
                        <h3 className='cdmg'>p4 cdmg: 0 Dmg</h3>
                        <br/>
                        <button className='sub_btn'>-</button>
                    </div>
                </div>
            </div>
            <div className='user_info'>
                <div>
                    <button className='add_btn'>+</button>
                    <br/>
                    <h3 >Poison: 0</h3>
                    <br/>
                    <button className='sub_btn'>-</button>
                </div>
                <div>
                    <button className='add_life_btn'>+</button>
                    <br/>
                    <h2 className='player_life'>40 Life</h2>
                    <br/>
                    <button className='sub_life_btn'>-</button>
                </div>
            </div>
        </>
    )
};
export default Match;
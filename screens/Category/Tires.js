import React, { useState } from 'react'; 
import { MultipleSelectList } from 'react-native-dropdown-select-list'

function Tires () {
 const [selected, setSelected] = useState([]);

const types = [
    {key:'1', value:'Witer Tires'},
    {key:'2', value:'Summer Tires'},
    {key:'3', value:'All Seasons Tires'},
    {key:'4', value:'All Tires'},
]

return(
    <MultipleSelectList
    setSelected={(val) => setSelected(val)}
    data={types}
    save="value"
    onSelect={() => Alert(selected)}
    label='Categories'
    />
)
} ;


export default Tires; 


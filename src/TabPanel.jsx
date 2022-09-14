import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import React from 'react';


export default function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <TextField
                        id={index.toString()}
                        defaultValue={other.editInput.find(text => +text.id === +index).text}
                        label={`От Tab-а ${index} ой формы`}
                        onChange={other.handleInputChange}
                    />
                </Box>
            )}
        </div>
    );
}
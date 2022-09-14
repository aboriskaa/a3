import { AppBar, Button, Grid, Tab, Tabs } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import TabPanel from "./TabPanel";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: "60px",
        width: "100%",
        backgroundColor: "#fff"
    },
    appBar: {
        color: "inherit",
        backgroundColor: "a09b87",
        "& .myTab": {
            backgroundColor: "yellow",
            color: "white"
        }
    },
    textField: {
        marginTop: 2
    }
}));

const CustomTabsHook = () => {

    const NUMBER_OF_TABS = 5;
    const classes = useStyles();

    const [tabList, setTabList] = useState([{ key: 0, id: 0 }]);
    const [tabValue, setTabValue] = useState(0);
    const [editInput, setEditInput] = useState([{ id: 0, text: '' }]);


    const handleInputChange = (event) => {
        setEditInput(() => {
            let idx = editInput.findIndex((element) => +element.id === +event.currentTarget.id)
            if (idx !== -1) {
                let arr = [];
                arr = editInput;
                arr[+idx].text = event.target.value
                return arr
            } else return [...editInput, { id: +event.currentTarget.id, text: '' }]
        })
    }

    const handleTabChange = (event, value) => {
        setTabValue(() => value);
    };

    const addTab = () => {
        let id = tabList[tabList.length - 1].id + 1;
        if (tabList.length < NUMBER_OF_TABS) {
            setEditInput(() => [...editInput, { id: id, text: '' }]);
            setTabList(() => [...tabList, { key: id, id: id }]);
        }
    };

    const deleteTab = e => {
        e.stopPropagation();
        if (tabList.length === 1) {
            return;
        }
        let tabId = parseInt(e.target.id);
        let tabIDIndex = 0;

        let tabs = tabList.filter((value, index) => {
            if (value.id === tabId) {
                tabIDIndex = index;
            }
            return value.id !== tabId;
        });
        let curValue = parseInt(tabValue);
        if (curValue === tabId) {
            if (tabIDIndex === 0) {
                curValue = tabList[tabIDIndex + 1].id;
            } else {
                curValue = tabList[tabIDIndex - 1].id;
            }
        }
        setTabValue(() => curValue);
        setTabList(() => tabs);
        setEditInput(() => {
            let arr = [];
            arr = editInput.filter((e) => e.id !== tabId)
            return arr
        });
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {tabList.map(tab => (
                                <Tab
                                    key={tab.key.toString()}
                                    value={tab.id}
                                    label={"Node " + tab.id}
                                    icon={<Close id={tab.id} onClick={deleteTab} />}
                                    className="mytab"
                                />
                            ))}
                        </Tabs>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                        {(tabList.length < NUMBER_OF_TABS) &&
                            <Button variant="outlined" onClick={addTab}>
                                <Add />
                            </Button>
                        }
                    </Grid>
                </Grid>
            </AppBar>

            {tabList.map(tab => (
                <TabPanel
                    key={tab.key.toString()}
                    value={tabValue}
                    index={tab.id}
                    editInput={editInput}
                    handleInputChange={handleInputChange}
                />
            ))}

        </>
    );
};

export default CustomTabsHook;
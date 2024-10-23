import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
const FriendsPage: React.FC = () => {

    const { id } = useParams();
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(0);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const {user} = useAuth0();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    const handleAcceptRequest = async (from, index) => {
        console.log(from)
        try {
            const accept = await axios.post(`http://localhost:8080/api/user/friend_accept/${from}/${id}?decision=true`);
            console.log(accept);
            requests.splice(index, 1)
        } catch(err) {
            console.log("Error accepting friend request", err)
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const friendsList = await axios.get(`http://localhost:8080/api/user/friend_list/${id}`);
                console.log(friendsList)
                setFriends(friendsList.data)

                const requestList = await axios.get(`http://localhost:8080/api/user/friend_requests/${id}`)
                setRequests(requestList.data)
                console.log(requestList)

                const currUserResponse = await axios.post("http://localhost:8080/api/user/", user)
                console.log(currUserResponse.data)
                setLoggedInUserId(currUserResponse.data[0].id)

            } catch(err) {
                console.error('Error fetching data', err);
            }
        }
        fetchData();
    }, [])

  return (
    <div className="card center">
    <Box sx={{ bgcolor: 'background.paper', width: "auto"}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Friends" {...a11yProps(0)} />
          {parseInt(String(loggedInUserId)) === parseInt(id) && <Tab label="Requests" {...a11yProps(1)} />}
          <Tab label="Blocked" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        {(friends).map((f, i) => {
            return <li key={i}>{f.name}</li>
        })}
      </TabPanel>
      {parseInt(String(loggedInUserId)) === parseInt(id) && <TabPanel value={value} index={1} dir={theme.direction}>
        {requests.map((r, i) => {
            return <li key={i}>
            {r.name}
            <Button sx={{m:4}} onClick={() => handleAcceptRequest(r.id, i)} color="success" variant="contained">Accept</Button>
            <Button variant="contained" color="error">Decline</Button>
          </li>
        })}
      </TabPanel>}
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </Box>
    </div>
  )
}

export default FriendsPage


import { useState, Fragment } from "react";

import api from "./api";

import data from "./api/data.json";
import { mapItem } from "./utils/index";

import Header from "./components/Header";
import SongsBox from "./components/Songs";
import MessageBox from "./components/MessageBox";
import SaveDialog from "./components/Dialog";
import { SavedListDialog } from "./components/Dialog";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Container,
  TextField,
  IconButton,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function App() {
  const [theme, setTheme] = useState({
    palette: {
      type: "dark",
    },
  });

  const handleChangeTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType,
      },
    });
  };

  const muiTheme = createMuiTheme(theme);

  const [artistName, setArtistName] = useState("");
  const [songsData, setSongsData] = useState([]);
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [messageBoxText, setMessageBoxText] = useState("");
  const [userList, setUserList] = useState([]);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openSavedListDialog, setOpenSavedListDialog] = useState(false);
  const [userSavedLists, setUserSavedLists] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);

  const handleInputSearch = (event) => {
    setArtistName(event.target.value);
  };

  const handleBtnSearch = (event) => {
    event.preventDefault();
    if (artistName) {
      setOpenLoader(true);
      api.get(artistName).then((response) => {
        if (response.data.error) {
          setMessageBoxText(`Query error: ${response.data.error.message}`);
          setMessageBoxOpen(true);
          const mapData = mapItem(data);
          setSongsData(mapData);
          setOpenLoader(false);
        } else {
          const mapData = mapItem(response.data.data);
          setSongsData(mapData);
          setOpenLoader(false);
        }
      }).catch((error) => {
        setMessageBoxText(`${error}`);
        setMessageBoxOpen(true);
      });
    } else {
      setMessageBoxText("Enter value");
      setMessageBoxOpen(true);
    }
  };

  const handleMessageBoxClose = () => {
    setMessageBoxOpen(false);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const handleCloseSavedListDialog = () => {
    setOpenSavedListDialog(false);
  };

  const addToList = (params) => (event) => {
    if (userList.length === 5) {
      setMessageBoxText("You have the maximum number of songs in the list (5)");
      setMessageBoxOpen(true);
    } else if (userList.some((item) => item.id === params.id)) {
      setMessageBoxText("You already have this track on your list");
      setMessageBoxOpen(true);
    } else {
      setUserList([...userList, params]);
    }
  };

  const removeFromList = (params) => (event) => {
    const newTrackList = userList.filter((item) => item.id !== params.id);
    setUserList(newTrackList);
  };

  const handleSaveBtn = (event) => {
    event.preventDefault();
    setOpenSaveDialog(true);
  };

  const saveList = (params) => (event) => {
    if (params.listName) {
      setOpenSaveDialog(false);
      setUserList([]);
      setUserSavedLists([...userSavedLists, params]);
      setMessageBoxText("Track list was saved");
      setMessageBoxOpen(true);
    } else {
      setMessageBoxText("Enter your track list name");
      setMessageBoxOpen(true);
    }
  };

  const showSavedList = () => {
    setOpenSavedListDialog(true);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: 0,
      marginTop: "4rem",
    },
    songsPaper: {
      padding: "2rem",
      margin: "1rem",
      "@media (max-width: 600px)": {
        padding: "1rem",
        margin: 0,
        marginBottom: "1rem",
      },
    },
    listPaper: {
      padding: "2rem",
      margin: "1rem",
      "@media (max-width: 600px)": {
        padding: "1rem",
        margin: 0,
      },
    },
    searchBox: {
      height: "5rem",
    },
    searchInput: {
      width: "calc(100% - 59px)",
    },
    listTitle: {
      fontSize: "1.1rem",
      padding: 11,
    },
    saveBtn: {
      marginTop: 20,
    },
  }));

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Header
        onToggleDark={handleChangeTheme}
        showSavedList={showSavedList}
        userSavedLists={userSavedLists}
      />
      <Container maxWidth="lg">
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <Paper elevation={4} className={classes.songsPaper}>
              <div className={classes.searchBox}>
                <TextField
                  className={classes.searchInput}
                  label="Enter artist"
                  value={artistName}
                  onChange={handleInputSearch}
                />
                <IconButton
                  color="secondary"
                  aria-label="search"
                  onClick={handleBtnSearch}
                >
                  <SearchIcon fontSize="large" />
                </IconButton>
              </div>
              {openLoader ? (
                <LinearProgress color="secondary" />
              ) : (
                <SongsBox
                  songsData={songsData}
                  handleAction={addToList}
                  whichList="songs"
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Paper elevation={4} className={classes.listPaper}>
              <p className={classes.listTitle}>Create your own track list</p>
              {userList.length ? <Divider /> : null}
              <SongsBox
                songsData={userList}
                handleAction={removeFromList}
                whichList="user"
              />
              {userList.length ? (
                <Fragment>
                  <Divider />
                  <Button
                    className={classes.saveBtn}
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveBtn}
                  >
                    Save list
                  </Button>
                </Fragment>
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <MessageBox
        messageBoxOpen={messageBoxOpen}
        message={messageBoxText}
        messageBoxClose={handleMessageBoxClose}
      />
      <SaveDialog
        openSaveDialog={openSaveDialog}
        closeSaveDialog={handleCloseSaveDialog}
        saveList={saveList}
      />
      <SavedListDialog
        openSavedListDialog={openSavedListDialog}
        closeSavedListDialog={handleCloseSavedListDialog}
        userSavedLists={userSavedLists}
      />
    </MuiThemeProvider>
  );
}

export default App;

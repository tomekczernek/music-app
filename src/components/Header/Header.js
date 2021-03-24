import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Badge
} from "@material-ui/core";
import { LibraryMusic, BrightnessMediumOutlined } from "@material-ui/icons";

function Header({ onToggleDark, showSavedList, userSavedLists }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      marginRight: 10,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              musicApp
            </Typography>
            <IconButton
              className={classes.icon}
              aria-label="add"
              color="default"
              onClick={showSavedList}
            >
              <Badge badgeContent={userSavedLists.length} color="secondary">
                <LibraryMusic />
              </Badge>
            </IconButton>

            <IconButton aria-label="add" color="default" onClick={onToggleDark}>
              <BrightnessMediumOutlined />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;

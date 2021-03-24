import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, Avatar, IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

function SongItem({
  title,
  id,
  artist,
  album,
  albumImage,
  handleAction,
  whichList,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      border: "none",
      boxShadow: "none",
    },
    icon: {
      marginRight: 15,
      '@media (max-width: 600px)' : {
        marginRight: 0
      }
    },
  }));

  function Icon() {
    if (whichList === "songs") {
      return <AddIcon />;
    }
    return <RemoveIcon />;
  }

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img alt={`image-${artist}`} src={albumImage} />
          </Avatar>
        }
        action={
          <IconButton
            className={classes.icon}
            aria-label="add"
            onClick={handleAction({
              title: title,
              id: id,
              artist: artist,
              album: album,
              albumImage: albumImage,
            })}
          >
            <Icon />
          </IconButton>
        }
        title={title}
        subheader={`${artist} | ${album}`}
      />
    </Card>
  );
}

export default SongItem;

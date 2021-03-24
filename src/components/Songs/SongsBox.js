import SongItem from "./SongItem";

import { makeStyles } from "@material-ui/core/styles";

function SongsBox({ songsData, handleAction, whichList }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxHeight: "calc(100vh - 16rem)",
      overflowY: "auto",
      "@media (max-width: 600px)": {
        maxHeight: "50vh"
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {songsData.map((item) => (
        <SongItem
          key={item.id}
          id={item.id}
          title={item.title}
          artist={item.artist}
          album={item.album}
          albumImage={item.albumImage}
          handleAction={handleAction}
          whichList={whichList}
        />
      ))}
    </div>
  );
}

export default SongsBox;

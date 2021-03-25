import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, Divider } from "@material-ui/core";

function ListItem({ listName, createDate }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      border: "none",
      boxShadow: "none",
    },
    item: {
      fontSize: "1rem",
      "& :nth-child(2)": {
        fontSize: "0.75rem",
      },
    },
  }));

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.item}
        title={listName}
        subheader={`Create date: ${createDate}`}
      />
      <Divider />
    </Card>
  );
}

export default ListItem;

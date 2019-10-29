import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function DirectionSnackbar() {
  const [open, setOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(undefined);

  const handleClick = Transition => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="section-snackbar">
      {/* <Button onClick={handleClick(TransitionDown)}>Down</Button> */}
      <Snackbar
        open={open}
        autoHideDuration="2500"
        onClose={handleClose}
        className="snackbar-body"
        TransitionComponent={transition}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Halo Selamat Datang Kembali</span>}
      />
    </div>
  );
}

function TopCenterNotification(props) {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",

        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.6rem",
        marginTop: ".5rem",
        borderRadius: ".5rem",
        border: `1px solid ${props.color}`,
        color: props.color,
      }}
    >
      {props.message}
    </div>
  );
}

export default TopCenterNotification;

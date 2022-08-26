function Card(props) {
  return (
    <>
      <h1
        style={{
          fontWeight: "900",
          color: "gray",
        }}
      >
        {props["title"]}
      </h1>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0", color: "gray" }}>{props["dateCreated"]}</p>
        <p
          style={{
            marginLeft: ".5rem",
            marginRight: ".5rem",
            color: "gray",
          }}
        >
          {" "}
          •{" "}
        </p>
        <p style={{ margin: "0", color: "gray" }}>
          {props["readTime"]} ☕️ min read
        </p>
      </div>
      <p>{props["description"]}</p>
    </>
  );
}

export default Card;

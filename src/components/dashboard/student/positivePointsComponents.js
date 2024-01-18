const TotalPositivePoints = ({ data = { points: 0 } }) => {
    return (
      <>
        <h3>Total Positive Points Component</h3>
        <h1>{data.points}</h1>
      </>
    );
  };
  
  export default TotalPositivePoints;
  
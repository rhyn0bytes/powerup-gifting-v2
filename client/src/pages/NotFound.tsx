function NotFound() {
  return (
    <div>
      Not found...
      <br />
      <img src={process.env.PUBLIC_URL + '404-southpark.jpg'} alt="Opps we dun' goofed..." />
    </div>
  );
}

export default NotFound;

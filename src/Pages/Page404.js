import StopImage from "../assets/img/stop-icon.jpg";

const Page404 = () => {
  return (
    <div className="comics-body">
      <p className="text-404">
        Where are <span>you</span> coming from ?
      </p>
      <div>
        <img src={StopImage} alt="" />
      </div>
      <p className="text-404">
        This is <span>ERROR 404 page not found</span> territory here !
      </p>
    </div>
  );
};
export default Page404;

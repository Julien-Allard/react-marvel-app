import { FC } from 'react';
import StopImage from '../assets/img/deadpool-404.jpg';

const Page404: FC = () => {
  return (
    <div className="body-404">
      <p className="text-404">
        Don't <span>you</span> come in here ! I'm not wearing pants !
      </p>
      <div className="img-404">
        <img src={StopImage} alt="" />
      </div>
      <p className="text-404">
        Plus, this page <span>doesn't exist</span> !
      </p>
      <p>
        (Actually it <span>does</span> exist but you know what I mean. It's like
        the <span>Schrödinger</span> page : it's here but not here. But did the
        guy ever opened that box ? The kitty must be <span>miserable</span> by
        now. I locked a guy in a box one day, I still wonder if he's okay. Maybe
        I should bring him <span>a sandwich</span>. Or a chimichanga. Do you
        like <span>chimichangas</span> ?)
      </p>
    </div>
  );
};

export default Page404;

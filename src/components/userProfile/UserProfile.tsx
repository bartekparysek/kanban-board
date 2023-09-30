import Images from '../../assets/images';
import s from './UserProfile.module.scss';

export const UserProfile = () => {
  const user = {
    name: 'John Doe',
    image: Images.User,
  };

  return (
    <div className={s.userProfile}>
      <img className={s.image} src={user.image} alt={user.name} />
      <span className={s.name}>{user.name}</span>
    </div>
  );
};

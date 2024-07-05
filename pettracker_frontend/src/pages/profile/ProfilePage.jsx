import { isLogged } from "../../helpers/helperFunctions";
import { LoginView } from "./LoginView";
import { ProfileView } from "./ProfileView";

export const ProfilePage = () => {
  return <>{isLogged() ? <ProfileView /> : <LoginView />} </>;
};

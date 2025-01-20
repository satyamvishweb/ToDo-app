import Logo from '../assets/Logo.png';
import BgImage from '../assets/BgImage.png';
import Gicon from '../assets/Gicon.png';
import Group from '../assets/Group.png';
import list_icon from '../assets/list_icon.png';
import SearchNotFound from '../assets/SearchNotFound.png';


// Define the type for the Imageobj
interface ImageObj {
  [key: string]: string; // This allows any key with a string value
}

const Imageobj: ImageObj = {
  Logo,
  BgImage,
  Gicon,
  Group,
  list_icon,
  SearchNotFound
 
  // Add other images as needed
};

export default Imageobj;

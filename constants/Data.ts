import { IUserProfilLinks } from "@/types";
import { Dimensions } from "react-native";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const wp = (value: number): number => {
  return (ScreenWidth / 100) * value;
};

const hp = (value: number): number => {
  return (ScreenHeight / 100) * value;
};

const categories: { title: string; image?: string }[] = [
  {
    title: "Hostel",
    image: require("../assets/images/hostel.jpg"),
  },
  {
    title: "Flat",
    image: require("../assets/images/flat.jpg"),
  },
  {
    title: "PG",
    image: require("../assets/images/PG.jpg"),
  },
];

const UserProfileLinks: IUserProfilLinks[] = [
  {
    name: "Edit Profile",
    icon: "pencil-sharp",
    link: "/(tabs)/Profile/editProfile",
  },
  {
    name: "Give Feedback",
    icon: "star-outline",
  },
  {
    name: "Notifications",
    icon: "notifications-outline",
    link: "/(screens)/NotificationScreen",
  },
];

const SupportLinks = [
  {
    name: "How Application Works",
    icon: "information-circle-outline",
    link: "",
  },
  {
    name: "Support & FAQ",
    icon: "headset-outline",
  },
  {
    name: "Privacy Policy",
    icon: "lock-closed-outline",
    link: "/(screens)/privacy-policy",
  },
  {
    name: "Terms & Condition",
    icon: "newspaper-outline",
    link: "/(screens)/terms-condition",
  },
];

const socialLinks = [
  {
    name: "facebook",
    link: "https://www.facebook.com/share/gA615LdP4GpKaBoC/?mibextid=qi2Omg",
  },
  {
    name: "youtube",
    link: "https://youtube.com/@hostlio-b6o?si=Phia1hobpnl-yNjN",
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/hostlio7/",
  },
  {
    name: "telegram",
    link: "https://t.me/+917255038251",
  },
  {
    name: "whatsapp",
    link: "https://chat.whatsapp.com/IoSDBcylTapKM5QlOIl43G",
  },
];

const AmenitiesWithIcon: { name: string; icon: string }[] = [
  {
    name: "Bed",
    icon: "https://cdn-icons-png.flaticon.com/512/7118/7118098.png",
  },
  {
    name: "AC/Cooler",
    icon: "https://cdn-icons-png.flaticon.com/512/9801/9801841.png",
  },
  {
    name: "Attached Kitchen/Bathrooms",
    icon: "https://cdn-icons-png.flaticon.com/512/2607/2607254.png",
  },
  {
    name: "Study Table",
    icon: "https://cdn-icons-png.flaticon.com/512/8198/8198436.png",
  },
  {
    name: "Chair",
    icon: "https://cdn-icons-png.flaticon.com/512/253/253480.png",
  },
  {
    name: "Parking",
    icon: "https://cdn-icons-png.flaticon.com/512/75/75905.png",
  },
  {
    name: "Wifi",
    icon: "https://cdn-icons-png.flaticon.com/512/1/1848.png",
  },
  {
    name: "Security Guards",
    icon: "https://cdn-icons-png.flaticon.com/512/10047/10047446.png",
  },
  {
    name: "CCTV Camera",
    icon: "https://cdn-icons-png.flaticon.com/512/10682/10682549.png",
  },
  {
    name: "Fan",
    icon: "https://cdn-icons-png.flaticon.com/512/10059/10059623.png",
  },
];

const playstorelink =
  "https://play.google.com/store/apps/details?id=com.xecurecode.hostlio";

const homeSlider = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg",
    title: "Let Us Guide You P.G",
    btnText: "Explore Now",
    link: "/(screens)/ListingByCategory?id=66c04376031cc3d4fae7fbba",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf_105762-2099.jpg",
    title: "Find Your Perfect Flat",
    btnText: "Browse Flats",
    link: "/(screens)/ListingByCategory?id=66c04406031cc3d4fae7fbc0",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-photo/view-modern-office_1170-1969.jpg",
    title: "Best Office Spaces Available",
    btnText: "Discover Offices",
    link: "/(screens)/ListingByCategory?id=674aa1ad2efb65f67bf548d4",
  },
];

export {
  ScreenWidth,
  ScreenHeight,
  wp,
  hp,
  categories,
  UserProfileLinks,
  socialLinks,
  SupportLinks,
  AmenitiesWithIcon,
  playstorelink,
  homeSlider,
};

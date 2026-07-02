import { Search } from "./Search";
import { Notifications } from "./Notifications";
import { HelpOutline } from "./HelpOutline";
import { Security } from "./Security";
import { ChevronRight } from "./ChevronRight";
import { Logout } from "./Logout";
import { Settings } from "./Settings";
import { AccountBalanceWallet } from "./AccountBalanceWallet";
import { Language } from "./Language";
import { Add } from "./Add";
import { EditNote } from "./EditNote";
import { ArrowForward } from "./ArrowForward";
import { AddCircle } from "./AddCircle";
import { AutoAwesome } from "./AutoAwesome";
import { TrendingUp } from "./TrendingUp";
import { ArrowDownward } from "./ArrowDownward";
import { AccountBalance } from "./AccountBalance";
import { FilterList } from "./FilterList";
import { ExpandMore } from "./ExpandMore";
import { Download } from "./Download";
import { MoreVert } from "./MoreVert";
import { ChevronLeft } from "./ChevronLeft";
import { Savings } from "./Savings";
import { Stars } from "./Stars";
import { CalendarToday } from "./CalendarToday";
import { Psychology } from "./Psychology";
import { Mail } from "./Mail";
import { Lock } from "./Lock";
import { Person } from "./Person";
import { VerifiedUser } from "./VerifiedUser";
import { Dashboard } from "./Dashboard";
import { Payments } from "./Payments";
import { BarChart } from "./BarChart";
import { ShoppingCart } from "./ShoppingCart";
import { Home } from "./Home";
import { DirectionsCar } from "./DirectionsCar";
import { Bolt } from "./Bolt";
import { Work } from "./Work";
import { Restaurant } from "./Restaurant";
import { ShoppingBag } from "./ShoppingBag";
import { SportsEsports } from "./SportsEsports";
import { FitnessCenter } from "./FitnessCenter";
import { Router } from "./Router";
import { Movie } from "./Movie";
import { NotificationsActive } from "./NotificationsActive";
import { TrendingDown } from "./TrendingDown";
import { Visibility } from "./Visibility";
import { VisibilityOff } from "./VisibilityOff";

export const iconMap = {
  search: Search,
  notifications: Notifications,
  help_outline: HelpOutline,
  security: Security,
  chevron_right: ChevronRight,
  logout: Logout,
  settings: Settings,
  account_balance_wallet: AccountBalanceWallet,
  language: Language,
  add: Add,
  edit_note: EditNote,
  arrow_forward: ArrowForward,
  add_circle: AddCircle,
  auto_awesome: AutoAwesome,
  trending_up: TrendingUp,
  arrow_downward: ArrowDownward,
  account_balance: AccountBalance,
  filter_list: FilterList,
  expand_more: ExpandMore,
  download: Download,
  more_vert: MoreVert,
  chevron_left: ChevronLeft,
  savings: Savings,
  stars: Stars,
  calendar_today: CalendarToday,
  psychology: Psychology,
  mail: Mail,
  lock: Lock,
  person: Person,
  verified_user: VerifiedUser,
  dashboard: Dashboard,
  payments: Payments,
  bar_chart: BarChart,
  shopping_cart: ShoppingCart,
  home: Home,
  directions_car: DirectionsCar,
  bolt: Bolt,
  work: Work,
  restaurant: Restaurant,
  shopping_bag: ShoppingBag,
  sports_esports: SportsEsports,
  fitness_center: FitnessCenter,
  router: Router,
  movie: Movie,
  notifications_active: NotificationsActive,
  trending_down: TrendingDown,
  visibility: Visibility,
  visibility_off: VisibilityOff,
} as const;

export type IconName = keyof typeof iconMap;

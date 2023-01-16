import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import ForceSvg from "../assets/force.svg";
import GasolineSvg from "../assets/gasoline.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import EnergySvg from "../assets/energy.svg";
import HybridSvg from "../assets/hybrid.svg";

const accessoryIcons = {
  speed: SpeedSvg,
  acceleration: AccelerationSvg,
  turning_diameter: ForceSvg,
  gasoline_motor: GasolineSvg,
  exchange: ExchangeSvg,
  seats: PeopleSvg,
  electric_motor: EnergySvg,
  hybrid_motor: HybridSvg,
};

export function getAccessoryIcon(icon: string) {
  const iconExists = Object.entries(accessoryIcons).some(([key]) => {
    return key === icon;
  });

  if (iconExists) {
    return accessoryIcons[icon];
  } else {
    return accessoryIcons.speed;
  }
}

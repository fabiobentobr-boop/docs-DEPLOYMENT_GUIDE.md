
import {
  TocoIcon, TruckIcon, CarretaBauIcon, CarretaSiderIcon,
  BitremBauIcon, BitremSiderIcon, RodotremBauIcon, RodotremSiderIcon
} from './components/Icons.tsx';
import type { VehicleOption } from './types.ts';

export const vehicleOptions: VehicleOption[] = [
  { id: 'toco', name: 'Toco', svg: TocoIcon },
  { id: 'truck', name: 'Truck', svg: TruckIcon },
  { id: 'carreta_bau', name: 'Carreta (BAÚ)', svg: CarretaBauIcon },
  { id: 'carreta_sider', name: 'Carreta (SIDER)', svg: CarretaSiderIcon },
  { id: 'bitrem_bau', name: 'Bitrem (BAÚ)', svg: BitremBauIcon },
  { id: 'bitrem_sider', name: 'Bitrem (SIDER)', svg: BitremSiderIcon },
  { id: 'rodotrem_bau', name: 'Rodotrem (BAÚ)', svg: RodotremBauIcon },
  { id: 'rodotrem_sider', name: 'Rodotrem (SIDER)', svg: RodotremSiderIcon },
];

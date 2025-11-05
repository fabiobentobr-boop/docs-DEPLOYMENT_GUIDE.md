
import React from 'react';

export interface FormDataType {
  date: string;
  carrier: string;
  globalProcessNumber: string;
  vehiclePlate: string;
  implement1Plate: string;
  implement2Plate: string;
  vehicleConfig: string;
  pbtCompliant: 'Sim' | 'Não' | '';
  pbtEvidence: File[];
  loadType: 'Paletizada' | 'Batida' | 'Carregamento misto' | '';
  palletSpaces: 'Sim' | 'Não' | '';
  palletSpacesEvidence: File[];
  palletsTipped: 'Sim' | 'Não' | '';
  palletsTippedEvidence: File[];
  stretchMissing: 'Sim' | 'Não' | '';
  stretchMissingEvidence: File[];
  woodCorrectAmount: 'Sim' | 'Não' | '';
  woodCorrectAmountEvidence: File[];
  woodWrongThickness: 'Sim' | 'Não' | '';
  woodWrongThicknessEvidence: File[];
  woodAbnormalSpacing: 'Sim' | 'Não' | '';
  woodAbnormalSpacingEvidence: File[];
  woodCorrectlyPlaced: 'Sim' | 'Não' | '';
  woodCorrectlyPlacedEvidence: File[];
  internalRopes: 'Sim' | 'Não' | '';
  internalRopesEvidence: File[];
  ratchetStrapsOverWood: 'Sim' | 'Não' | '';
  ratchetStrapsOverWoodEvidence: File[];
  uniformLoading: 'Sim' | 'Não' | '';
  uniformLoadingEvidence: File[];
  generalRemarks: File[];
}

export interface VehicleOption {
  id: string;
  name: string;
  svg: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

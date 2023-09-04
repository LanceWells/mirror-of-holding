import { OutfitType, PartType } from "@prisma/client";

enum OutfitLayerType {
  Skin,
  Clothing,
  Armour,
}

type OutfitLayerConfig = {
  [Property in keyof typeof OutfitType]: OutfitLayerType;
}

const OutfitLayerConfig: OutfitLayerConfig = {
  Body:           OutfitLayerType.Skin,
  FaceAccessory:  OutfitLayerType.Armour,
  FacialHair:     OutfitLayerType.Skin,
  Hair:           OutfitLayerType.Skin,
  HairAccessory:  OutfitLayerType.Armour,
  Helmet:         OutfitLayerType.Armour,
  Mask:           OutfitLayerType.Clothing,
  Pants:          OutfitLayerType.Clothing,
  Robes:          OutfitLayerType.Clothing,
  Top:            OutfitLayerType.Clothing,
  Vest:           OutfitLayerType.Armour,
  ArmAccessory:   OutfitLayerType.Armour,
};

const OutfitLayerOrder: OutfitType[] = [
  OutfitType.Body,
  OutfitType.Pants,
  OutfitType.Top,
  OutfitType.Vest,
  OutfitType.ArmAccessory,
  OutfitType.Robes,
  OutfitType.FaceAccessory,
  OutfitType.FacialHair,
  OutfitType.Mask,
  OutfitType.Helmet,
  OutfitType.Hair,
  OutfitType.HairAccessory
]

const BodyPartOrder: PartType[] = [
  PartType.RightLeg,
  PartType.RightArm,
  PartType.Body,
  PartType.Head,
  PartType.FacialHair,
  PartType.Hair,
  PartType.HairAccessory,
  PartType.Eyes,
  PartType.FaceAccessory,
  PartType.LeftArm,
  PartType.LeftLeg,
];

const OutfitLayerTypeOrder: OutfitLayerType[] = [
  OutfitLayerType.Skin,
  OutfitLayerType.Clothing,
  OutfitLayerType.Armour,
]

type OutfitThumbnailConfig = {
  [Property in keyof typeof OutfitType]: PartType;
}

const OutfitThumbnailConfig: OutfitThumbnailConfig = {
  Body:           PartType.Head,
  FaceAccessory:  PartType.FaceAccessory,
  FacialHair:     PartType.FacialHair,
  Hair:           PartType.Hair,
  HairAccessory:  PartType.HairAccessory,
  Helmet:         PartType.Head,
  Mask:           PartType.FaceAccessory,
  Pants:          PartType.LeftLeg,
  Robes:          PartType.Body,
  Top:            PartType.Body,
  Vest:           PartType.Body,
  ArmAccessory:   PartType.LeftArm,
}

export {
  OutfitLayerType,
  OutfitLayerConfig,
  OutfitThumbnailConfig,
  OutfitLayerOrder,
  BodyPartOrder,
  OutfitLayerTypeOrder,
};

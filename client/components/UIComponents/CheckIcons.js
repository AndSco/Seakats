import React from "react";
import Colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

export const PositiveIcon = (
  <FontAwesome
    name="check"
    size={30}
    style={{ marginTop: 25, color: Colors.secondary }}
  />
);

export const NegativeIcon = (
  <FontAwesome
    name="remove"
    size={30}
    style={{ marginTop: 25, color: Colors.lightAzure }}
  />
);

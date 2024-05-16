import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

export const initialFilters = { formats: { movie: true, series: true } };

export default function (props: {
  visible: boolean;
  onFilter: (filters: typeof initialFilters) => void;
}) {
  const [filters, setFilters] = useState(initialFilters);

  return (
    <Modal visible={props.visible}>
      <View style={[s.bgDark, s.flex1, s.p3]}>
        <View style={[s.flex1, s.bgMedium, s.rt4, s.p4, s.g4]}>
          <View style={[s.row, s.aiCenter, s.g3]}>
            <MaterialCommunityIcons
              name="filter"
              color={palette.primary}
              size={20}
            />
            <Text style={[s.textStrong, { fontSize: 16 }]}>Filtrar Lista</Text>
          </View>

          <View style={[s.g3]}>
            <Text style={[s.textStrong]}>Tipo</Text>
            <View style={[s.row, s.g5]}>
              <CheckboxField
                label="Filme"
                checked={filters.formats.movie}
                setChecked={(checked) =>
                  setFilters({
                    formats: { movie: checked, series: filters.formats.series },
                  })
                }
              />
              <CheckboxField
                label="Série"
                checked={filters.formats.series}
                setChecked={(checked) =>
                  setFilters({
                    formats: { movie: filters.formats.movie, series: checked },
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={[s.bgLight, s.p4, s.rb4]}>
          <Pressable
            style={[
              s.bgAccent,
              s.r3,
              s.row,
              s.aiCenter,
              s.jcCenter,
              s.p3,
              s.g3,
            ]}
            onPress={() => props.onFilter(filters)}
          >
            <MaterialCommunityIcons
              name="filter"
              color={palette.text}
              size={20}
            />
            <Text style={[s.textBold, { fontSize: 14 }]}>Filtrar Catálogo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function CheckboxField(props: {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) {
  return (
    <View style={[s.row, s.aiCenter, s.g2]}>
      <Pressable onPress={() => props.setChecked(!props.checked)}>
        <MaterialCommunityIcons
          name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
          color={palette.primary}
          size={20}
        />
      </Pressable>
      <Text style={[s.text]}>{props.label}</Text>
    </View>
  );
}

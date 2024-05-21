import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Filters } from "../app/(catalog)";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

type CheckboxFieldType = {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

export default function (props: {
  filters: Filters;
  onFilter: (filters: Filters) => void;
}) {
  const [filters, setFilters] = useState(props.filters);

  return (
    <View style={[s.bgDark, s.flex1, s.p3, s.absolute]}>
      <View style={[s.flex1, s.bgMedium, s.rt4, s.p4, s.g4]}>
        <View style={[s.row, s.aiCenter, s.g3]}>
          <MaterialCommunityIcons
            name="filter"
            color={palette.primary}
            size={20}
          />
          <Text style={[s.textStrong, { fontSize: 16 }]}>Filtrar Lista</Text>
        </View>

        <CheckboxFilter
          name="Tipo"
          fields={[
            {
              label: "Filme",
              checked: filters.formats.movie,
              setChecked: (checked) =>
                setFilters({
                  ...filters,
                  formats: { movie: checked, series: filters.formats.series },
                }),
            },
            {
              label: "Série",
              checked: filters.formats.series,
              setChecked: (checked) =>
                setFilters({
                  ...filters,
                  formats: { movie: filters.formats.movie, series: checked },
                }),
            },
          ]}
        />

        <CheckboxFilter
          name="Gênero"
          fields={[
            {
              label: "Ação",
              checked: filters.genres.action,
              setChecked: (checked) =>
                setFilters({
                  ...filters,
                  genres: { action: checked, lgbt: filters.genres.lgbt },
                }),
            },
            {
              label: "lgbt",
              checked: filters.genres.lgbt,
              setChecked: (checked) =>
                setFilters({
                  ...filters,
                  genres: { action: filters.genres.action, lgbt: checked },
                }),
            },
          ]}
        />
      </View>

      <View style={[s.bgLight, s.p4, s.rb4]}>
        <Pressable
          style={[s.bgAccent, s.r3, s.row, s.aiCenter, s.jcCenter, s.p3, s.g3]}
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
  );
}

function CheckboxFilter(props: { name: string; fields: CheckboxFieldType[] }) {
  return (
    <View style={[s.g3]}>
      <Text style={[s.textStrong]}>{props.name}</Text>
      <View style={[s.row, s.g5]}>
        {props.fields.map((field) => (
          <CheckboxField
            label={field.label}
            checked={field.checked}
            setChecked={field.setChecked}
          />
        ))}
      </View>
    </View>
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

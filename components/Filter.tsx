import React, { useEffect, useReducer, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Filters } from "../app/(catalog)";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";

type CheckboxOption<T> = {
  label: string;
  value: T;
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
          options={[
            { label: "Filmes", value: "MOVIE" },
            { label: "Séries", value: "SERIES" },
          ]}
          onChange={(formats) => setFilters({ ...filters, formats })}
        />

        <CheckboxFilter
          name="Gênero"
          options={[
            { label: "Ação", value: 18 },
            { label: "Comédia", value: 91 },
          ]}
          onChange={(genres) => setFilters({ ...filters, genres })}
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

function CheckboxFilter<T>(props: {
  name: string;
  options: CheckboxOption<T>[];
  onChange: (value: T[]) => void;
}) {
  const [options, setChecked] = useReducer(setOptions, new Set<T>());

  useEffect(() => {
    props.onChange([...options]);
  }, [options]);

  return (
    <View style={[s.g3]}>
      <Text style={[s.textStrong]}>{props.name}</Text>
      <View style={[s.row, s.g5]}>
        {props.options.map((option) => (
          <CheckboxField
            label={option.label}
            onChange={(checked) => setChecked({ value: option.value, checked })}
          />
        ))}
      </View>
    </View>
  );

  function setOptions(
    checkedOptions: Set<T>,
    payload: { value: T; checked: boolean },
  ) {
    if (payload.checked) {
      checkedOptions.add(payload.value);
    } else {
      checkedOptions.delete(payload.value);
    }

    return checkedOptions;
  }
}

function CheckboxField(props: {
  label: string;
  onChange: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    props.onChange(!checked);
  }, [checked]);

  return (
    <View style={[s.row, s.aiCenter, s.g2]}>
      <Pressable onPress={() => setChecked(!checked)}>
        <MaterialCommunityIcons
          name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
          color={palette.primary}
          size={20}
        />
      </Pressable>
      <Text style={[s.text]}>{props.label}</Text>
    </View>
  );
}
